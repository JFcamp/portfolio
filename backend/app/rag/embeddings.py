"""Embedding provider abstraction.

The application depends on the ``EmbeddingProvider`` protocol, not on any single
vendor, so providers can be swapped via configuration.

Providers:
- ``GeminiEmbeddingProvider`` (recommended for hosting): real semantic
  embeddings via Google's free embedding API. No local RAM cost, so it runs on
  small free instances and gives strong PT + EN retrieval.
- ``LocalEmbeddingProvider``: sentence-transformers, real semantic embeddings
  that run locally (needs the model + RAM). Great for local dev.
- ``OpenAIEmbeddingProvider``: OpenAI embeddings when a key is configured.
- ``OfflineEmbeddingProvider`` (last-resort fallback): deterministic hashing
  embeddings, no key and no network. Weaker, but keeps the app working.

``build_embedding_provider`` returns the provider it *actually* built, and each
provider exposes ``.semantic`` so the rest of the app can adapt (e.g. skip the
query-expansion crutch that only the hashing fallback needs).
"""
from __future__ import annotations

import hashlib
import math
import re
from typing import Protocol

from app.core.config import Settings

# Unicode-aware tokenizer: keeps accented letters (á, ç, ã, é...) as part of
# tokens so Portuguese words like "formação" and "Viçosa" stay intact.
_TOKEN = re.compile(r"[0-9a-zà-öø-ÿ]+", re.IGNORECASE)

# Function words (EN + PT) carry little topical signal; downweighting them keeps
# similarity driven by meaningful terms even in the hashing fallback.
_STOPWORDS = frozenset(
    """
    a an and are as at be by do does did for from has have he her him his how i in
    into is it its me my of on or the their them they this to us was were what when
    where which who whom whose why will with you your about tell give show please
    can could would should
    o os as um uma uns umas de do da dos das e ou que qual quais quando onde como
    porque por para com sem seu sua seus suas ele ela dele dela eles elas em no na
    nos nas ao aos meu minha sobre tem ter faz fez sao eh ser esta estao quanto
    quantos quantas me te se isso isto aquele aquela ja mais muito voce
    pedro campos
    """.split()
)


class EmbeddingProvider(Protocol):
    dim: int
    semantic: bool  # True for real semantic models; False for the hashing fallback

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

    Last-resort fallback: no key, no network, no RAM. Weaker than a trained
    model, but stable. Unicode-aware and PT-stopword-aware so accented
    Portuguese questions still carry their meaningful terms.
    """

    semantic = False

    def __init__(self, dim: int = 384) -> None:
        self.dim = dim

    def _features(self, text: str) -> list[tuple[str, float]]:
        tokens = _TOKEN.findall(text.lower())
        content = [t for t in tokens if t not in _STOPWORDS and len(t) > 1]
        feats: list[tuple[str, float]] = []
        for tok in content:
            feats.append((tok, 3.0))
            padded = f"#{tok}#"
            for i in range(len(padded) - 2):
                feats.append((padded[i : i + 3], 1.0))  # sub-word robustness
        for a, b in zip(content, content[1:]):
            feats.append((f"{a}_{b}", 2.0))  # a little word-order signal
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

    Multilingual (PT + EN). No API key and no network at inference time (the
    model is downloaded once and cached). Needs RAM for the model.
    """

    semantic = True

    def __init__(self, model_name: str) -> None:
        from sentence_transformers import SentenceTransformer  # lazy import

        self._model = SentenceTransformer(model_name)
        self.dim = int(self._model.get_sentence_embedding_dimension())

    def embed(self, texts: list[str]) -> list[list[float]]:
        vecs = self._model.encode(
            texts,
            normalize_embeddings=True,
            convert_to_numpy=True,
            show_progress_bar=False,
        )
        return [v.tolist() for v in vecs]

    def embed_one(self, text: str) -> list[float]:
        return self.embed([text])[0]


class GeminiEmbeddingProvider:
    """Google Gemini embeddings via the generativelanguage REST API (httpx).

    Free tier, no local RAM cost — ideal for small hosting instances. Uses
    ``gemini-embedding-001`` by default (3072-dim). Vectors are L2-normalized so
    cosine similarity equals inner product in the vector store. The dimension is
    probed at init, so a different model just works.
    """

    semantic = True
    _BASE = "https://generativelanguage.googleapis.com/v1beta"

    def __init__(self, api_key: str, model: str, timeout: int = 30) -> None:
        self._key = api_key
        self._model = model if model.startswith("models/") else f"models/{model}"
        self._timeout = timeout
        # Detect the real vector size once, so the store dim always matches the
        # model (gemini-embedding-001 -> 3072) even if the model changes later.
        self.dim = len(self.embed_one("dimension probe"))

    def _post(self, url: str, payload: dict):
        """POST with retry + backoff on 429/5xx so ingestion survives the free
        tier's low rate limit (a few requests/minute). Honors the server's
        suggested retry delay when present."""
        import re as _re
        import time

        import httpx

        delay = 5.0
        for attempt in range(12):
            resp = httpx.post(url, json=payload, timeout=self._timeout)
            if resp.status_code == 200:
                return resp.json()
            if resp.status_code == 429 or resp.status_code >= 500:
                # Prefer the server's RetryInfo delay ("retryDelay": "37s") if given.
                wait = delay
                m = _re.search(r'"retryDelay"\s*:\s*"(\d+)s"', resp.text)
                if m:
                    wait = float(m.group(1)) + 1
                time.sleep(min(wait, 90))
                delay = min(delay * 1.8, 90)  # exponential backoff, capped
                continue
            raise RuntimeError(f"Gemini embed {resp.status_code}: {resp.text[:200]}")
        raise RuntimeError("Gemini embed: rate limit / server error after retries")

    def embed(self, texts: list[str]) -> list[list[float]]:
        import time

        url = f"{self._BASE}/{self._model}:batchEmbedContents?key={self._key}"
        out: list[list[float]] = []
        # One batchEmbedContents call counts as ONE request, so batching many
        # texts per call is the most rate-limit-friendly way to ingest.
        batch_size = 100
        batches = [texts[i : i + batch_size] for i in range(0, len(texts), batch_size)]
        for n, batch in enumerate(batches):
            payload = {
                "requests": [
                    {"model": self._model, "content": {"parts": [{"text": t}]}}
                    for t in batch
                ]
            }
            data = self._post(url, payload)
            for emb in data.get("embeddings", []):
                out.append(_l2_normalize(emb["values"]))
            if n < len(batches) - 1:
                time.sleep(8)  # gentle spacing to stay under free-tier RPM
        return out

    def embed_one(self, text: str) -> list[float]:
        url = f"{self._BASE}/{self._model}:embedContent?key={self._key}"
        payload = {"model": self._model, "content": {"parts": [{"text": text}]}}
        data = self._post(url, payload)
        return _l2_normalize(data["embedding"]["values"])


class OpenAIEmbeddingProvider:
    """OpenAI embeddings. Requires an API key and the ``openai`` package."""

    semantic = True

    def __init__(self, api_key: str, model: str) -> None:
        from openai import OpenAI  # lazy import

        self._client = OpenAI(api_key=api_key)
        self._model = model
        self.dim = 1536  # text-embedding-3-small default

    def embed(self, texts: list[str]) -> list[list[float]]:
        resp = self._client.embeddings.create(model=self._model, input=texts)
        return [_l2_normalize(d.embedding) for d in resp.data]

    def embed_one(self, text: str) -> list[float]:
        return self.embed([text])[0]


def build_embedding_provider(settings: Settings) -> EmbeddingProvider:
    """Build the embedding provider from config, with safe fallbacks.

    Order of preference: gemini -> openai -> local (sentence-transformers) ->
    offline hashing. If a preferred provider can't initialize (missing key,
    package, or network), we degrade to the next option so the app always runs.
    The returned object's ``.semantic`` flag reflects what was ACTUALLY built,
    which the retriever/ingestion use to decide whether query expansion is needed.
    """
    provider = settings.embedding_provider.lower()
    key = settings.embedding_api_key or settings.llm_api_key

    if provider == "gemini" and key:
        try:
            return GeminiEmbeddingProvider(
                key, settings.gemini_embedding_model, settings.llm_timeout_seconds
            )
        except Exception:  # pragma: no cover - network/env dependent
            pass

    if provider == "openai" and settings.llm_api_key:
        try:
            return OpenAIEmbeddingProvider(settings.llm_api_key, settings.embedding_model)
        except Exception:  # pragma: no cover
            pass

    if provider in ("local", "sentence-transformers", "st"):
        try:
            return LocalEmbeddingProvider(settings.local_embedding_model)
        except Exception:  # pragma: no cover - package/model unavailable
            pass

    return OfflineEmbeddingProvider(dim=settings.embedding_dim)
