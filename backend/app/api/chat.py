"""Chat endpoint."""
# NOTE: no `from __future__ import annotations` here — the slowapi decorator
# wraps the route, and FastAPI must resolve the real ChatRequest type object
# at decoration time rather than a string forward-ref.
from typing import Optional

from fastapi import APIRouter, HTTPException, Request

from app.core.config import get_settings
from app.core.limiter import limiter
from app.core.logging import get_logger
from app.models.schemas import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter(prefix="/api", tags=["chat"])
logger = get_logger("api.chat")
_settings = get_settings()


def get_chat_service(request: Request) -> ChatService:
    service: Optional[ChatService] = getattr(request.app.state, "chat_service", None)
    if service is None:  # pragma: no cover - defensive
        raise HTTPException(status_code=503, detail="Service not ready.")
    return service


@router.post("/chat", response_model=ChatResponse)
@limiter.limit(_settings.rate_limit)
def chat(request: Request, body: ChatRequest) -> ChatResponse:
    service = get_chat_service(request)
    try:
        return service.answer(body.message, body.mode, body.lang)
    except ValueError as exc:
        # Validation errors (empty / too long) -> 400.
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception:  # pragma: no cover - safety net, no sensitive data logged
        logger.error("chat_failed")
        raise HTTPException(status_code=500, detail="Failed to generate an answer.")
