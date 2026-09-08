"""FastAPI application entrypoint."""
from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.api import chat, health
from app.core.config import get_settings
from app.core.limiter import limiter
from app.core.logging import configure_logging, get_logger
from app.services.chat_service import ChatService

logger = get_logger("main")
settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    configure_logging()
    logger.info(
        "startup",
        llm_provider=settings.llm_provider,
        embedding_provider=settings.embedding_provider,
    )
    app.state.chat_service = ChatService(settings)
    logger.info("index_ready", chunks=app.state.chat_service.index_size)
    yield


app = FastAPI(
    title="Pedro Campos Portfolio — RAG API",
    version="1.0.0",
    description="Retrieval-Augmented Generation assistant for the portfolio.",
    lifespan=lifespan,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

app.include_router(health.router)
app.include_router(chat.router)


@app.exception_handler(Exception)
async def unhandled_exception_handler(_: Request, __: Exception) -> JSONResponse:  # pragma: no cover
    logger.error("unhandled_exception")
    return JSONResponse(status_code=500, content={"detail": "Internal server error."})


@app.get("/")
def root() -> dict[str, str]:
    return {"service": "portfolio-rag-api", "docs": "/docs", "health": "/api/health"}
