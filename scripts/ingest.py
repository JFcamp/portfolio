#!/usr/bin/env python
"""CLI to (re)build the RAG vector index from knowledge_base/.

Usage (from the backend/ directory so imports resolve):
    python ../scripts/ingest.py
or from repo root:
    python scripts/ingest.py
"""
from __future__ import annotations

import sys
from pathlib import Path

# Ensure backend/ is importable regardless of where this is run from.
REPO_ROOT = Path(__file__).resolve().parents[1]
BACKEND_ROOT = REPO_ROOT / "backend"
sys.path.insert(0, str(BACKEND_ROOT))

from app.core.config import get_settings  # noqa: E402
from app.core.logging import configure_logging  # noqa: E402
from app.rag.embeddings import build_embedding_provider  # noqa: E402
from app.rag.ingestion import ingest_and_persist  # noqa: E402
from app.rag.vector_store import load_vector_store  # noqa: E402


def main() -> None:
    configure_logging()
    settings = get_settings()
    force = "--force" in sys.argv

    # By default, SKIP re-ingestion if a valid committed index already exists
    # that matches the active embedder. This keeps cold starts fast even when a
    # host runs this script at every boot (re-embedding 300+ chunks via the API
    # can take minutes). Use --force to rebuild explicitly.
    if not force:
        store = load_vector_store(settings.store_path)
        if store is not None:
            embedder = build_embedding_provider(settings)
            if store.dim == embedder.dim and store.size() > 0:
                print(
                    f"Index already present and matches embedder "
                    f"(dim={store.dim}, chunks={store.size()}). Skipping ingest. "
                    f"Use --force to rebuild."
                )
                return

    print(
        f"Ingesting knowledge base "
        f"(embedding_provider={settings.embedding_provider}, "
        f"chunk_size={settings.chunk_size}, overlap={settings.chunk_overlap})..."
    )
    count = ingest_and_persist(settings)
    print(f"Done. Indexed {count} chunks into {settings.store_path}")


if __name__ == "__main__":
    main()
