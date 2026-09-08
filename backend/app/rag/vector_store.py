"""Vector store abstraction.

``VectorStore`` is the interface the retriever depends on. The default
implementation uses FAISS (inner product on L2-normalized vectors == cosine
similarity). If FAISS is not installed, a pure-NumPy fallback is used so the
system still runs everywhere. Both persist to a small on-disk format.
"""
from __future__ import annotations

import json
import os
import pickle
import shutil
import tempfile
import uuid
from dataclasses import dataclass
from pathlib import Path
from typing import Protocol

import numpy as np


def _faiss_write(index, dest: Path) -> None:
    """Write a FAISS index, working around FAISS's poor non-ASCII path support.

    FAISS's C++ file writer fails on Windows paths containing non-ASCII
    characters (e.g. accented folder names). Write to an ASCII-safe temp file
    first, then move it into place with Python (which handles Unicode paths).
    """
    tmp = Path(tempfile.gettempdir()) / f"faiss_{uuid.uuid4().hex}.index"
    faiss.write_index(index, str(tmp))
    shutil.move(str(tmp), str(dest))


def _faiss_read(src: Path):
    """Read a FAISS index with the same non-ASCII path workaround."""
    tmp = Path(tempfile.gettempdir()) / f"faiss_{uuid.uuid4().hex}.index"
    shutil.copy(str(src), str(tmp))
    try:
        return faiss.read_index(str(tmp))
    finally:
        os.remove(tmp)

try:  # pragma: no cover - environment dependent
    import faiss  # type: ignore

    _HAS_FAISS = True
except Exception:  # pragma: no cover
    _HAS_FAISS = False


@dataclass
class SearchResult:
    text: str
    metadata: dict
    score: float


class VectorStore(Protocol):
    dim: int

    def add(self, vectors: list[list[float]], texts: list[str], metadatas: list[dict]) -> None: ...
    def search(self, vector: list[float], top_k: int) -> list[SearchResult]: ...
    def save(self, path: Path) -> None: ...
    def size(self) -> int: ...


class _BaseStore:
    def __init__(self, dim: int) -> None:
        self.dim = dim
        self._texts: list[str] = []
        self._metadatas: list[dict] = []

    def size(self) -> int:
        return len(self._texts)


class NumpyVectorStore(_BaseStore):
    """Portable fallback: brute-force cosine similarity with NumPy."""

    def __init__(self, dim: int) -> None:
        super().__init__(dim)
        self._matrix = np.zeros((0, dim), dtype="float32")

    def add(self, vectors, texts, metadatas) -> None:
        arr = np.asarray(vectors, dtype="float32")
        self._matrix = np.vstack([self._matrix, arr]) if self._matrix.size else arr
        self._texts.extend(texts)
        self._metadatas.extend(metadatas)

    def search(self, vector, top_k) -> list[SearchResult]:
        if self._matrix.shape[0] == 0:
            return []
        q = np.asarray(vector, dtype="float32")
        scores = self._matrix @ q
        k = min(top_k, len(scores))
        idx = np.argsort(-scores)[:k]
        return [
            SearchResult(self._texts[i], self._metadatas[i], float(scores[i])) for i in idx
        ]

    def save(self, path: Path) -> None:
        path.mkdir(parents=True, exist_ok=True)
        np.save(path / "matrix.npy", self._matrix)
        _dump_docs(path, self._texts, self._metadatas, self.dim, backend="numpy")


class FaissVectorStore(_BaseStore):
    """FAISS inner-product index over L2-normalized vectors (== cosine)."""

    def __init__(self, dim: int) -> None:
        super().__init__(dim)
        self._index = faiss.IndexFlatIP(dim)

    def add(self, vectors, texts, metadatas) -> None:
        arr = np.asarray(vectors, dtype="float32")
        self._index.add(arr)
        self._texts.extend(texts)
        self._metadatas.extend(metadatas)

    def search(self, vector, top_k) -> list[SearchResult]:
        if self._index.ntotal == 0:
            return []
        q = np.asarray([vector], dtype="float32")
        k = min(top_k, self._index.ntotal)
        scores, idx = self._index.search(q, k)
        results: list[SearchResult] = []
        for score, i in zip(scores[0], idx[0]):
            if i < 0:
                continue
            results.append(SearchResult(self._texts[i], self._metadatas[i], float(score)))
        return results

    def save(self, path: Path) -> None:
        path.mkdir(parents=True, exist_ok=True)
        _faiss_write(self._index, path / "index.faiss")
        _dump_docs(path, self._texts, self._metadatas, self.dim, backend="faiss")


def _dump_docs(path: Path, texts, metadatas, dim, backend: str) -> None:
    with open(path / "docs.pkl", "wb") as f:
        pickle.dump({"texts": texts, "metadatas": metadatas}, f)
    with open(path / "meta.json", "w", encoding="utf-8") as f:
        json.dump({"dim": dim, "backend": backend, "count": len(texts)}, f)


def build_vector_store(dim: int) -> VectorStore:
    return FaissVectorStore(dim) if _HAS_FAISS else NumpyVectorStore(dim)


def load_vector_store(path: Path) -> VectorStore | None:
    """Load a persisted store, or None if nothing has been ingested yet."""
    meta_file = path / "meta.json"
    docs_file = path / "docs.pkl"
    if not meta_file.exists() or not docs_file.exists():
        return None

    meta = json.loads(meta_file.read_text(encoding="utf-8"))
    dim = int(meta["dim"])
    with open(docs_file, "rb") as f:
        docs = pickle.load(f)

    if _HAS_FAISS and (path / "index.faiss").exists():
        store = FaissVectorStore(dim)
        store._index = _faiss_read(path / "index.faiss")
        store._texts = docs["texts"]
        store._metadatas = docs["metadatas"]
        return store

    if (path / "matrix.npy").exists():
        store = NumpyVectorStore(dim)
        store._matrix = np.load(path / "matrix.npy")
        store._texts = docs["texts"]
        store._metadatas = docs["metadatas"]
        return store

    return None
