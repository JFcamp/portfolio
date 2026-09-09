"""Central configuration loaded from environment / .env."""
from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

# backend/ root (two levels up from this file: app/core/config.py -> backend/)
BACKEND_ROOT = Path(__file__).resolve().parents[2]
PROJECT_ROOT = BACKEND_ROOT.parent
KNOWLEDGE_BASE_DIR = PROJECT_ROOT / "knowledge_base"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(BACKEND_ROOT / ".env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # Providers
    # LLM: "offline" (extractive, no key) | "groq" | "gemini" | "openai"
    llm_provider: str = Field(default="offline")
    # Embeddings: "local" (sentence-transformers, recommended) | "offline" | "openai"
    # Embeddings:
    #   "gemini"    — free API, ZERO local RAM (required for the 512MB host).
    #                 Query embeddings hit the API (1 request/question).
    #   "fastembed" — in-process ONNX; DEV ONLY (loads ~500MB, OOMs the host).
    #                 Use it locally to build the committed index.
    #   "local" | "openai" | "offline"
    embedding_provider: str = Field(default="gemini")
    llm_api_key: str = Field(default="")
    # Dedicated key for embeddings (Gemini/OpenAI). Falls back to llm_api_key.
    embedding_api_key: str = Field(default="")
    llm_model: str = Field(default="openai/gpt-oss-20b")
    embedding_model: str = Field(default="text-embedding-3-small")  # openai
    gemini_embedding_model: str = Field(default="gemini-embedding-001")
    gemini_embedding_dim: int = Field(default=3072)  # gemini-embedding-001
    # Local multilingual model (PT + EN) used when embedding_provider == "local".
    local_embedding_model: str = Field(default="paraphrase-multilingual-MiniLM-L12-v2")
    # fastembed (ONNX) multilingual model — same MiniLM, no torch. Used when
    # embedding_provider == "fastembed" (the production default).
    fastembed_model: str = Field(
        default="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
    )

    # Vector store
    vector_db: str = Field(default="faiss")
    vector_store_path: str = Field(default="app/rag/store")

    # RAG tuning
    chunk_size: int = Field(default=800)
    chunk_overlap: int = Field(default=120)
    # Retrieve a generous number of chunks and let the grounded LLM pick what's
    # relevant. Higher recall matters because skills are split across several
    # category chunks (a broad question can span DevOps + Cloud + Databases).
    retrieval_top_k: int = Field(default=10)
    # Minimum cosine similarity for a chunk to count as relevant. The hashing
    # fallback and real semantic models have different score scales, so each has
    # its own threshold; the retriever picks based on the built provider.
    relevance_threshold: float = Field(default=0.25)  # hashing fallback
    # Semantic gate for MiniLM (fastembed): off-topic questions sit around
    # 0.31-0.43, real on-topic is 0.45+ (often 0.5-0.8). 0.45 rejects off-topic
    # while the hybrid retriever's lexical path still catches exact terms
    # (FAISS, PostgreSQL, formação) that the embedding may score lower.
    semantic_relevance_threshold: float = Field(default=0.45)  # fastembed/local/gemini
    embedding_dim: int = Field(default=384)

    # API / security
    allowed_origins: str = Field(default="http://localhost:5173,http://127.0.0.1:5173")
    max_question_length: int = Field(default=1000)
    rate_limit: str = Field(default="20/minute")
    llm_timeout_seconds: int = Field(default=30)
    log_level: str = Field(default="INFO")

    # Env values pasted into dashboards (Render, etc.) often carry a trailing
    # newline or spaces. Those break HTTP headers (e.g. the Authorization key)
    # and provider/model lookups, so we strip these string fields defensively.
    @field_validator(
        "llm_provider",
        "embedding_provider",
        "llm_api_key",
        "embedding_api_key",
        "llm_model",
        "local_embedding_model",
        "gemini_embedding_model",
        "embedding_model",
        "vector_db",
        "allowed_origins",
        mode="before",
    )
    @classmethod
    def _strip_str(cls, v):
        return v.strip() if isinstance(v, str) else v

    @property
    def allowed_origins_list(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]

    @property
    def store_path(self) -> Path:
        p = Path(self.vector_store_path)
        return p if p.is_absolute() else BACKEND_ROOT / p


@lru_cache
def get_settings() -> Settings:
    return Settings()
