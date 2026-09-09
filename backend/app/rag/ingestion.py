"""Ingestion pipeline: knowledge_base/*.md -> chunks -> embeddings -> store.

Steps:
1. Locate markdown documents under the knowledge base directory.
2. Load content and parse simple YAML front matter for metadata.
3. Clean text.
4. Chunk section-aware with overlap.
5. Generate embeddings.
6. Store vectors + metadata in the vector store.
"""
from __future__ import annotations

import re
from pathlib import Path

from app.core.config import KNOWLEDGE_BASE_DIR, Settings
from app.core.logging import get_logger
from app.rag.chunking import chunk_document
from app.rag.embeddings import build_embedding_provider
from app.rag.query import expand_query
from app.rag.vector_store import build_vector_store

logger = get_logger("ingestion")

_FRONT_MATTER = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.S)


def _parse_front_matter(raw: str) -> tuple[dict, str]:
    """Extract a minimal key: value front matter block, return (meta, body)."""
    m = _FRONT_MATTER.match(raw)
    if not m:
        return {}, raw
    meta: dict = {}
    for line in m.group(1).splitlines():
        if ":" in line:
            key, _, value = line.partition(":")
            meta[key.strip()] = value.strip()
    return meta, raw[m.end() :]


def _clean(text: str) -> str:
    # Drop HTML comments and collapse excessive blank lines.
    text = re.sub(r"<!--.*?-->", "", text, flags=re.S)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def discover_documents(base_dir: Path | None = None) -> list[Path]:
    base = base_dir or KNOWLEDGE_BASE_DIR
    return sorted(base.rglob("*.md"))


def build_index(settings: Settings, base_dir: Path | None = None):
    """Run the full pipeline and return (vector_store, chunk_count)."""
    embedder = build_embedding_provider(settings)
    store = build_vector_store(embedder.dim)

    # Concept expansion only helps the hashing fallback; a real semantic model
    # embeds meaning directly. Decide from what was ACTUALLY built.
    use_expansion = not getattr(embedder, "semantic", False)

    docs = discover_documents(base_dir)
    logger.info("ingestion_start", documents=len(docs))

    all_texts: list[str] = []       # text shown to the user / LLM
    all_embed_texts: list[str] = []  # text actually embedded (concept-expanded)
    all_meta: list[dict] = []

    for path in docs:
        raw = path.read_text(encoding="utf-8")
        front, body = _parse_front_matter(raw)
        body = _clean(body)
        if not body:
            continue

        # Language is taken from front matter, or inferred from a top-level
        # "pt/" folder in the knowledge base; defaults to English.
        base = base_dir or KNOWLEDGE_BASE_DIR
        rel_parts = path.relative_to(base).parts
        inferred_lang = "pt" if "pt" in rel_parts else "en"

        base_meta = {
            "source": front.get("source", path.name),
            "category": front.get("category", ""),
            "project": front.get("project", ""),
            "section": front.get("section", ""),
            "date": front.get("date", ""),
            "lang": front.get("lang", inferred_lang),
        }

        chunks = chunk_document(body, base_meta, settings.chunk_size, settings.chunk_overlap)
        for c in chunks:
            all_texts.append(c.text)
            # Symmetric concept expansion: enrich the embedded text with the same
            # domain/intent vocabulary used for queries, plus the section and
            # project labels, so natural-language questions match reliably.
            label = " ".join(
                v for v in (c.metadata.get("section", ""), c.metadata.get("project", "")) if v
            )
            enriched = f"{label} {c.text}".strip()
            all_embed_texts.append(expand_query(enriched) if use_expansion else enriched)
            all_meta.append(c.metadata)

    if all_texts:
        vectors = embedder.embed(all_embed_texts)
        store.add(vectors, all_texts, all_meta)

    logger.info("ingestion_complete", chunks=len(all_texts))
    return store, len(all_texts)


def ingest_and_persist(settings: Settings, base_dir: Path | None = None) -> int:
    store, count = build_index(settings, base_dir)
    store.save(settings.store_path)
    logger.info("ingestion_persisted", path=str(settings.store_path), chunks=count)
    return count
