"""Health endpoint."""
from __future__ import annotations

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
    )


@router.get("/diag")
def diag(request: Request) -> dict:
    """Diagnostic: attempts one real LLM call and reports success or the error.

    Helps confirm, from the deployed environment, whether the hosted LLM is
    actually reachable (no secrets are returned).
    """
    from app.rag.generation import build_llm_provider

    settings = get_settings()
    provider = build_llm_provider(settings)
    info = {
        "llm_provider": settings.llm_provider,
        "llm_model": settings.llm_model,
        "llm_key_set": bool(settings.llm_api_key),
        "provider_class": type(provider).__name__,
    }
    try:
        out = provider.generate(
            "[1] source=test\nPedro is a Machine Learning Engineer.",
            "Who is Pedro?",
            False,
            "en",
        )
        info["ok"] = True
        info["sample"] = out[:120]
    except Exception as exc:  # pragma: no cover
        info["ok"] = False
        info["error"] = f"{type(exc).__name__}: {exc}"[:300]
    return info
