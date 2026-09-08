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
from app.rag.ingestion import ingest_and_persist  # noqa: E402


def main() -> None:
    configure_logging()
    settings = get_settings()
    print(
        f"Ingesting knowledge base "
        f"(embedding_provider={settings.embedding_provider}, "
        f"chunk_size={settings.chunk_size}, overlap={settings.chunk_overlap})..."
    )
    count = ingest_and_persist(settings)
    print(f"Done. Indexed {count} chunks into {settings.store_path}")


if __name__ == "__main__":
    main()
