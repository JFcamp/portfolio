"""Input validation and prompt-injection defenses."""
from __future__ import annotations

import re

# Patterns that commonly signal prompt-injection attempts. These are used to
# tag/neutralize user text; retrieved documents are always treated as data.
_INJECTION_PATTERNS = [
    re.compile(r"ignore\s+(all\s+)?(previous|prior|above)\s+instructions", re.I),
    re.compile(r"disregard\s+(the\s+)?(previous|system)\s+", re.I),
    re.compile(r"reveal\s+(your\s+)?(system\s+)?prompt", re.I),
    re.compile(r"show\s+(me\s+)?(your\s+)?(system\s+)?prompt", re.I),
    re.compile(r"you\s+are\s+now\s+", re.I),
    re.compile(r"act\s+as\s+", re.I),
    re.compile(r"forget\s+(everything|all)", re.I),
]


def looks_like_injection(text: str) -> bool:
    return any(p.search(text) for p in _INJECTION_PATTERNS)


def sanitize_question(text: str, max_length: int) -> str:
    """Normalize whitespace and clamp length. Raises ValueError if empty/too long."""
    cleaned = text.strip()
    if not cleaned:
        raise ValueError("Question must not be empty.")
    if len(cleaned) > max_length:
        raise ValueError(f"Question exceeds maximum length of {max_length} characters.")
    # collapse excessive whitespace
    cleaned = re.sub(r"\s+", " ", cleaned)
    return cleaned
