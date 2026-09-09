"""Retriever: embeds a query and fetches the most relevant chunks.

Uses HYBRID retrieval: semantic similarity (embeddings) fused with a lexical
signal (keyword overlap) computed over the WHOLE corpus. The lexical part
guarantees that chunks containing exact query terms — names and tech like
"FAISS", "PostgreSQL", "Kubernetes", "formação" — are always considered, even
when a small embedding model ranks them too low to enter the semantic pool.

Accents are folded (formação == formacao) so PT queries match reliably.
"""
from __future__ import annotations

import re
import unicodedata

from app.core.config import Settings
from app.rag.embeddings import EmbeddingProvider
from app.rag.query import expand_query
from app.rag.vector_store import SearchResult, VectorStore

_TOKEN = re.compile(r"[0-9a-z]+")

_STOPWORDS = {
    # pt
    "de", "da", "do", "das", "dos", "um", "uma", "que", "com", "em", "no", "na",
    "nos", "nas", "para", "por", "ele", "ela", "seu", "sua", "tem", "ter", "qual",
    "quais", "quem", "onde", "como", "sobre", "ao", "aos", "se", "ou", "pedro",
    "campos", "possui", "trabalha", "sabe", "conhece",
    # en
    "of", "and", "or", "to", "in", "on", "for", "is", "are", "he", "she", "his",
    "her", "has", "have", "does", "do", "what", "which", "who", "where", "how",
    "about", "with", "work", "works", "experience", "the", "a", "an", "know",
}


def _fold(text: str) -> str:
    """Lowercase and strip accents so 'formação' == 'formacao'."""
    nfkd = unicodedata.normalize("NFKD", text.lower())
    return "".join(c for c in nfkd if not unicodedata.combining(c))


def _content_tokens(text: str) -> set[str]:
    return {t for t in _TOKEN.findall(_fold(text)) if len(t) > 2 and t not in _STOPWORDS}


class Retriever:
    def __init__(self, embedder: EmbeddingProvider, store: VectorStore, settings: Settings) -> None:
        self._embedder = embedder
        self._store = store
        self._settings = settings
        self._semantic = getattr(embedder, "semantic", False)
        self._threshold = (
            settings.semantic_relevance_threshold
            if self._semantic
            else settings.relevance_threshold
        )

    def retrieve(
        self, query: str, top_k: int | None = None, lang: str | None = None
    ) -> list[SearchResult]:
        k = top_k or self._settings.retrieval_top_k
        text = query if self._semantic else expand_query(query)
        vector = self._embedder.embed_one(text)

        # Semantic scores for a candidate pool.
        pool = self._store.search(vector, max(k * 6, 40))
        sem_by_key = {(r.metadata.get("source"), r.text): r.score for r in pool}

        query_tokens = _content_tokens(query)

        # Score EVERY chunk: lexical over the whole corpus + semantic where known.
        # 314 chunks -> cheap. This guarantees exact-term chunks are considered.
        scored: list[tuple[float, float, SearchResult]] = []
        for item in self._store.all_items():
            key = (item.metadata.get("source"), item.text)
            sem = sem_by_key.get(key, 0.0)
            lexical = 0.0
            if query_tokens:
                overlap = len(query_tokens & _content_tokens(item.text))
                lexical = overlap / len(query_tokens)
            fused = sem + 0.6 * lexical
            scored.append((fused, sem, SearchResult(item.text, item.metadata, sem or fused)))

        scored.sort(key=lambda x: x[0], reverse=True)

        # Keep chunks that clear the semantic threshold OR match >=50% of query
        # content words lexically (covers exact-term questions the embedding misses).
        lex_floor = 0.6 * 0.5
        relevant = [
            sr for fused, sem, sr in scored
            if sem >= self._threshold or (fused - sem) >= lex_floor
        ]

        if lang:
            same_lang = [r for r in relevant if (r.metadata.get("lang") or "en") == lang]
            if same_lang:
                return same_lang[:k]
        return relevant[:k]

    @property
    def size(self) -> int:
        return self._store.size()
