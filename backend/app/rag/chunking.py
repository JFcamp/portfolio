"""Section-aware markdown chunking with overlap.

Splits documents by markdown headings first (to preserve the context of an
experience, project, or skill group), then packs sections into chunks bounded
by ``chunk_size`` with ``chunk_overlap`` between consecutive chunks.
"""
from __future__ import annotations

import re
from dataclasses import dataclass, field

_HEADING = re.compile(r"^(#{1,6})\s+(.*)$", re.M)


@dataclass
class Chunk:
    text: str
    metadata: dict = field(default_factory=dict)


def _split_sections(content: str) -> list[tuple[str, str]]:
    """Return (heading, body) pairs. Text before the first heading is 'intro'."""
    matches = list(_HEADING.finditer(content))
    if not matches:
        return [("", content.strip())]

    sections: list[tuple[str, str]] = []
    if matches[0].start() > 0:
        intro = content[: matches[0].start()].strip()
        if intro:
            sections.append(("", intro))

    for i, m in enumerate(matches):
        heading = m.group(2).strip()
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(content)
        body = content[start:end].strip()
        sections.append((heading, body))
    return sections


def _pack(text: str, chunk_size: int, overlap: int) -> list[str]:
    """Greedy word-based packing with overlap; keeps chunks near chunk_size chars."""
    words = text.split()
    if not words:
        return []

    chunks: list[str] = []
    current: list[str] = []
    length = 0

    for word in words:
        current.append(word)
        length += len(word) + 1
        if length >= chunk_size:
            chunks.append(" ".join(current))
            # start next chunk with an overlap tail
            if overlap > 0:
                tail: list[str] = []
                tail_len = 0
                for w in reversed(current):
                    tail_len += len(w) + 1
                    tail.insert(0, w)
                    if tail_len >= overlap:
                        break
                current = tail
                length = tail_len
            else:
                current = []
                length = 0

    if current:
        chunks.append(" ".join(current))
    return chunks


def chunk_document(
    content: str,
    base_metadata: dict,
    chunk_size: int,
    chunk_overlap: int,
) -> list[Chunk]:
    """Chunk one document into section-aware, overlapping pieces."""
    chunks: list[Chunk] = []
    for heading, body in _split_sections(content):
        if not body:
            continue
        section_label = heading or base_metadata.get("section", "")
        # Prefix the heading so the embedding captures section intent.
        prefixed = f"{heading}\n{body}".strip() if heading else body
        for piece in _pack(prefixed, chunk_size, chunk_overlap):
            meta = dict(base_metadata)
            if section_label:
                meta["section"] = section_label
            chunks.append(Chunk(text=piece, metadata=meta))
    return chunks
