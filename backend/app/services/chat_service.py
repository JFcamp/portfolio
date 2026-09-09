"""Orchestrates the RAG flow: validate -> retrieve -> ground -> generate."""
from __future__ import annotations

from app.core.config import Settings, get_settings
from app.core.logging import get_logger
from app.core.security import looks_like_injection, sanitize_question
from app.models.schemas import ChatMode, ChatResponse, Lang, RetrievedChunk, Source
from app.rag.embeddings import build_embedding_provider
from app.rag.generation import (
    OfflineLLMProvider,
    build_context_block,
    build_llm_provider,
    no_context_message,
)
from app.rag.ingestion import build_index
from app.rag.retriever import Retriever
from app.rag.vector_store import load_vector_store

logger = get_logger("chat_service")


class ChatService:
    """Holds the loaded index and answers questions. Built once at startup."""

    def __init__(self, settings: Settings | None = None) -> None:
        self._settings = settings or get_settings()
        self._embedder = build_embedding_provider(self._settings)
        self._llm = build_llm_provider(self._settings)

        store = load_vector_store(self._settings.store_path)
        # Diagnostics so /api/health can reveal exactly what production is using.
        self.loaded_from_disk = store is not None
        self.store_backend = type(store).__name__ if store is not None else "none"
        self.store_dim = store.dim if store is not None else 0
        # Guard: the committed index must match the active embedder's dimension.
        # If they differ (index built with a different provider) or no index
        # exists, rebuild in memory so the API never crashes on a dim mismatch.
        if store is None or store.dim != self._embedder.dim:
            if store is not None:
                logger.info(
                    "index_dim_mismatch_rebuilding",
                    index_dim=store.dim,
                    embedder_dim=self._embedder.dim,
                )
            else:
                logger.info("index_missing_building_in_memory")
            store, _ = build_index(self._settings)
            self.loaded_from_disk = False
            self.store_backend = type(store).__name__
            self.store_dim = store.dim
        self._retriever = Retriever(self._embedder, store, self._settings)

    @property
    def index_size(self) -> int:
        return self._retriever.size

    def answer(
        self,
        message: str,
        mode: ChatMode = ChatMode.default,
        lang: Lang = Lang.en,
    ) -> ChatResponse:
        lang_code = lang.value if isinstance(lang, Lang) else str(lang)
        question = sanitize_question(message, self._settings.max_question_length)
        injection = looks_like_injection(question)

        results = self._retriever.retrieve(question, lang=lang_code)
        top_score = max((r.score for r in results), default=0.0)

        # Retrieval already applied the relevance threshold. If nothing cleared
        # it, there's no grounded context — return the standard message. The LLM
        # (real or offline) then judges whether the retrieved context answers.
        if not results:
            logger.info("no_relevant_context", injection=injection, top_score=round(top_score, 3))
            return ChatResponse(
                answer=no_context_message(lang_code), sources=[], confidence=0.0
            )

        context = build_context_block(results)
        recruiter = mode == ChatMode.recruiter
        answer_text = self._safe_generate(context, question, recruiter, lang_code)

        sources = _dedupe_sources(results)
        confidence = round(min(1.0, top_score), 3)
        retrieved = _to_retrieved(results)

        logger.info(
            "answered",
            mode=mode.value,
            lang=lang_code,
            retrieved=len(results),
            confidence=confidence,
            injection=injection,
        )
        return ChatResponse(
            answer=answer_text,
            sources=sources,
            confidence=confidence,
            retrieved=retrieved,
        )

    def _safe_generate(self, context: str, question: str, recruiter: bool, lang: str) -> str:
        """Call the LLM provider; fall back to offline extraction on any error.

        A hosted provider can fail (network, rate limit, cold start). Rather than
        erroring the request, we degrade to the grounded extractive answer.
        """
        try:
            return self._llm.generate(context, question, recruiter, lang)
        except Exception as exc:  # pragma: no cover - network dependent
            # Log the error type/message (no user content) to help diagnose a
            # bad key, wrong model name, or rate limit — then degrade gracefully.
            logger.error("llm_generate_failed_falling_back", error=f"{type(exc).__name__}: {exc}")
            return OfflineLLMProvider().generate(context, question, recruiter, lang)


def _to_retrieved(results) -> list[RetrievedChunk]:
    """Expose retrieved chunks (with scores) for the Live RAG Inspector.

    TODO_ placeholders are stripped so unfilled data never surfaces, and the
    preview is truncated to keep payloads small.
    """
    from app.rag.generation import _TODO  # local import to avoid cycle at import time

    chunks: list[RetrievedChunk] = []
    for i, r in enumerate(results, start=1):
        preview = _TODO.sub("[not specified]", r.text).strip()
        if len(preview) > 240:
            preview = preview[:240].rsplit(" ", 1)[0] + "…"
        m = r.metadata
        chunks.append(
            RetrievedChunk(
                rank=i,
                score=round(float(r.score), 3),
                source=m.get("source", "portfolio"),
                section=m.get("section") or None,
                project=m.get("project") or None,
                preview=preview,
            )
        )
    return chunks


def _dedupe_sources(results) -> list[Source]:
    seen: set[tuple[str, str]] = set()
    sources: list[Source] = []
    for r in results:
        m = r.metadata
        key = (m.get("source", ""), m.get("project", ""))
        if key in seen:
            continue
        seen.add(key)
        sources.append(
            Source(
                source=m.get("source", "portfolio"),
                category=m.get("category") or None,
                project=m.get("project") or None,
                section=m.get("section") or None,
            )
        )
    return sources
