"""Embedding provider abstraction.

The application depends on the ``EmbeddingProvider`` protocol, not on any single
vendor, so providers can be swapped via configuration.

- ``OfflineEmbeddingProvider`` (default): deterministic, dependency-free
  embeddings using hashed character n-grams. Good enough to demonstrate a real
  retrieval pipeline without any API key or network access.
- ``OpenAIEmbeddingProvider``: uses the OpenAI embeddings API when configured
  with a key. Imported lazily so the offline path never requires the SDK.
"""
from __future__ import annotations

import hashlib
import math
import re
from typing import Protocol

from app.core.config import Settings

_TOKEN = re.compile(r"[a-z0-9]+")

# Common words carry little topical signal. Downweighting them keeps similarity
# driven by meaningful terms (skills, technologies, project names) so that
# off-topic questions score low even when they mention "Pedro" or "what".
_STOPWORDS = frozenset(
    """
    a an and are as at be by do does did for from has have he her him his how i in
    into is it its me my of on or que the their them they this to us was were what
    when where which who whom whose why will with you your pedro campos about tell
    give show me please can could would should experience does_he
    """.split()
)


class EmbeddingProvider(Protocol):
    dim: int

    def embed(self, texts: list[str]) -> list[list[float]]:
        """Embed a batch of texts into fixed-size vectors."""
        ...

    def embed_one(self, text: str) -> list[float]:
        ...


def _l2_normalize(vec: list[float]) -> list[float]:
    norm = math.sqrt(sum(v * v for v in vec))
    if norm == 0:
        return vec
    return [v / norm for v in vec]


class OfflineEmbeddingProvider:
    """Deterministic hashing embeddings (bag of hashed word + char n-grams).

    Not semantically as strong as a trained model, but stable and fully local:
    similar wording maps to nearby vectors, enabling genuine similarity search.
    """

    def __init__(self, dim: int = 384) -> None:
        self.dim = dim

    def _features(self, text: str) -> list[tuple[str, float]]:
        """Return (feature, weight) pairs. Stopwords are heavily downweighted."""
        tokens = _TOKEN.findall(text.lower())
        content = [t for t in tokens if t not in _STOPWORDS and len(t) > 1]
        feats: list[tuple[str, float]] = []

        # Content words carry the main signal.
        for tok in content:
            feats.append((tok, 3.0))
            padded = f"#{tok}#"
            for i in range(len(padded) - 2):
                feats.append((padded[i : i + 3], 1.0))  # sub-word robustness

        # Bigrams over content words for a little word-order signal.
        for a, b in zip(content, content[1:]):
            feats.append((f"{a}_{b}", 2.0))

        # Stopwords contribute only a whisper so they can't dominate similarity.
        for tok in tokens:
            if tok in _STOPWORDS:
                feats.append((tok, 0.05))
        return feats

    def embed_one(self, text: str) -> list[float]:
        vec = [0.0] * self.dim
        for feat, weight in self._features(text):
            h = hashlib.md5(feat.encode("utf-8")).digest()
            idx = int.from_bytes(h[:4], "little") % self.dim
            sign = 1.0 if h[4] & 1 else -1.0
            vec[idx] += sign * weight
        return _l2_normalize(vec)

    def embed(self, texts: list[str]) -> list[list[float]]:
        return [self.embed_one(t) for t in texts]


class LocalEmbeddingProvider:
    """Real semantic embeddings via sentence-transformers, running locally.

    Uses a multilingual model so Portuguese and English questions match the
    knowledge base equally well. No API key and no network at inference time
    (the model is downloaded once and cached). This is the recommended default:
    it dramatically improves retrieval quality over the hashing fallback.
    """

    def __init__(self, model_name: str) -> None:
        from sentence_transformers import SentenceTransformer  # lazy import

        self._model = SentenceTransformer(model_name)
        self.dim = int(self._model.get_sentence_embedding_dimension())

    def embed(self, texts: list[str]) -> list[list[float]]:
        vecs = self._model.encode(
            texts,
            normalize_embeddings=True,  # cosine similarity via inner product
            convert_to_numpy=True,
            show_progress_bar=False,
        )
        return [v.tolist() for v in vecs]

    def embed_one(self, text: str) -> list[float]:
        return self.embed([text])[0]


class OpenAIEmbeddingProvider:
    """OpenAI embeddings. Requires ``llm_api_key`` and the ``openai`` package."""

    def __init__(self, api_key: str, model: str) -> None:
        from openai import OpenAI  # lazy import

        self._client = OpenAI(api_key=api_key)
        self._model = model
        self.dim = 1536  # text-embedding-3-small default

    def embed(self, texts: list[str]) -> list[list[float]]:
        resp = self._client.embeddings.create(model=self._model, input=texts)
        return [d.embedding for d in resp.data]

    def embed_one(self, text: str) -> list[float]:
        return self.embed([text])[0]


def build_embedding_provider(settings: Settings) -> EmbeddingProvider:
    """Select the embedding provider from config, with safe fallbacks.

    Order: explicit "openai" (if key) -> "local" (sentence-transformers) ->
    hashing fallback. If "local" is requested but the package/model is missing,
    we fall back to the hashing provider so the app always starts.
    """
    provider = settings.embedding_provider.lower()

    if provider == "openai" and settings.llm_api_key:
        return OpenAIEmbeddingProvider(settings.llm_api_key, settings.embedding_model)

    if provider in ("local", "sentence-transformers", "st"):
        try:
            return LocalEmbeddingProvider(settings.local_embedding_model)
        except Exception:  # pragma: no cover - depends on environment
            # Package or model unavailable — degrade gracefully.
            return OfflineEmbeddingProvider(dim=settings.embedding_dim)

    return OfflineEmbeddingProvider(dim=settings.embedding_dim)
