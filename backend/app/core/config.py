"""Central configuration loaded from environment / .env."""
from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from pydantic import Field
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
    embedding_provider: str = Field(default="local")
    llm_api_key: str = Field(default="")
    llm_model: str = Field(default="openai/gpt-oss-20b")
    embedding_model: str = Field(default="text-embedding-3-small")
    # Local multilingual model (PT + EN) used when embedding_provider == "local".
    local_embedding_model: str = Field(default="paraphrase-multilingual-MiniLM-L12-v2")

    # Vector store
    vector_db: str = Field(default="faiss")
    vector_store_path: str = Field(default="app/rag/store")

    # RAG tuning
    chunk_size: int = Field(default=800)
    chunk_overlap: int = Field(default=120)
    retrieval_top_k: int = Field(default=5)
    # Minimum cosine similarity for a chunk to count as relevant. The hashing
    # fallback and real semantic models have different score scales, so each has
    # its own tuned threshold; the effective one is chosen by provider below.
    relevance_threshold: float = Field(default=0.28)  # hashing fallback
    # sentence-transformers scores are compressed; keep a permissive floor and
    # let the LLM's grounding prompt reject context that doesn't actually answer.
    local_relevance_threshold: float = Field(default=0.22)
    embedding_dim: int = Field(default=384)

    # API / security
    allowed_origins: str = Field(default="http://localhost:5173,http://127.0.0.1:5173")
    max_question_length: int = Field(default=1000)
    rate_limit: str = Field(default="20/minute")
    llm_timeout_seconds: int = Field(default=30)
    log_level: str = Field(default="INFO")

    @property
    def effective_relevance_threshold(self) -> float:
        """Pick the threshold matching the active embedding provider."""
        if self.embedding_provider.lower() in ("local", "sentence-transformers", "st"):
            return self.local_relevance_threshold
        return self.relevance_threshold

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
