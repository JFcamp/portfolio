"""API request/response schemas."""
from __future__ import annotations

from enum import Enum

from pydantic import BaseModel, Field


class ChatMode(str, Enum):
    default = "default"
    recruiter = "recruiter"


class Lang(str, Enum):
    en = "en"
    pt = "pt"


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)
    mode: ChatMode = ChatMode.default
    lang: Lang = Lang.en


class Source(BaseModel):
    source: str
    category: str | None = None
    project: str | None = None
    section: str | None = None


class RetrievedChunk(BaseModel):
    """A single retrieved chunk, exposed for the Live RAG Inspector."""

    rank: int
    score: float
    source: str
    section: str | None = None
    project: str | None = None
    preview: str


class ChatResponse(BaseModel):
    answer: str
    sources: list[Source] = Field(default_factory=list)
    confidence: float = 0.0
    retrieved: list[RetrievedChunk] = Field(default_factory=list)


class HealthResponse(BaseModel):
    status: str
    index_loaded: bool
    chunks: int
    llm_provider: str
    embedding_provider: str
    llm_model: str = ""
    llm_key_set: bool = False
    loaded_from_disk: bool = False
    store_backend: str = ""
    store_dim: int = 0
    embedder_dim: int = 0
    retrieval_top_k: int = 0
