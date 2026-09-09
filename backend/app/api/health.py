"""Health endpoint."""
from __future__ import annotations

import os

from fastapi import APIRouter, Request

from app.core.config import get_settings
from app.models.schemas import HealthResponse

router = APIRouter(prefix="/api", tags=["health"])


@router.get("/health", response_model=HealthResponse)
def health(request: Request) -> HealthResponse:
    settings = get_settings()
    service = getattr(request.app.state, "chat_service", None)
    size = service.index_size if service is not None else 0
    return HealthResponse(
        status="ok",
        index_loaded=size > 0,
        chunks=size,
        llm_provider=settings.llm_provider,
        embedding_provider=settings.embedding_provider,
        llm_model=settings.llm_model,
        llm_key_set=bool(settings.llm_api_key),
        loaded_from_disk=getattr(service, "loaded_from_disk", False),
        store_backend=getattr(service, "store_backend", ""),
        store_dim=getattr(service, "store_dim", 0),
        embedder_dim=getattr(service, "_embedder", None).dim if service else 0,
        retrieval_top_k=settings.retrieval_top_k,
        git_sha=os.environ.get("RENDER_GIT_COMMIT", "")[:8],
    )
