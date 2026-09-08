"""Retriever: embeds a query and fetches the most relevant chunks."""
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
        # Query expansion is a crutch for the hashing fallback; a real semantic
        # model understands phrasing on its own, so we skip it there.
        self._use_expansion = settings.embedding_provider.lower() not in (
            "local",
            "sentence-transformers",
            "st",
        )
        self._threshold = settings.effective_relevance_threshold

    def retrieve(
        self, query: str, top_k: int | None = None, lang: str | None = None
    ) -> list[SearchResult]:
        k = top_k or self._settings.retrieval_top_k
        text = expand_query(query) if self._use_expansion else query
        vector = self._embedder.embed_one(text)

        # Over-fetch so we can filter by language and still return k results.
        raw = self._store.search(vector, max(k * 4, k + 10))
        relevant = [r for r in raw if r.score >= self._threshold]

        if lang:
            same_lang = [r for r in relevant if (r.metadata.get("lang") or "en") == lang]
            # Only apply the language filter if that language exists in the index;
            # otherwise fall back to all languages so answers still work.
            if same_lang:
                return same_lang[:k]
        return relevant[:k]

    @property
    def size(self) -> int:
        return self._store.size()
