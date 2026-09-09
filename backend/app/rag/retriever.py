"""Retriever: embeds a query and fetches the most relevant chunks.

The behavior adapts to the embedder that was ACTUALLY built (``embedder.semantic``):
a real semantic model needs no query expansion, while the hashing fallback gets
light expansion to compensate. Threshold is chosen the same way, so config and
runtime never disagree.
"""
from __future__ import annotations

from app.core.config import Settings
from app.rag.embeddings import EmbeddingProvider
from app.rag.query import expand_query
from app.rag.vector_store import SearchResult, VectorStore


class Retriever:
    def __init__(self, embedder: EmbeddingProvider, store: VectorStore, settings: Settings) -> None:
        self._embedder = embedder
        self._store = store
        self._settings = settings
        # Decide from the built provider, not the config string.
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
        # Semantic models understand phrasing directly; only the hashing
        # fallback benefits from light keyword expansion.
        text = query if self._semantic else expand_query(query)
        vector = self._embedder.embed_one(text)

        # Over-fetch so the language filter still has candidates after filtering.
        raw = self._store.search(vector, max(k * 4, k + 10))
        relevant = [r for r in raw if r.score >= self._threshold]

        if lang:
            same_lang = [r for r in relevant if (r.metadata.get("lang") or "en") == lang]
            if same_lang:
                return same_lang[:k]
        return relevant[:k]

    @property
    def size(self) -> int:
        return self._store.size()
