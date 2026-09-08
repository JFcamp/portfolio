"""Shared fixtures. Builds a small in-memory index over the real knowledge base."""
from __future__ import annotations

import pytest
from fastapi.testclient import TestClient

from app.core.config import get_settings
from app.main import app
from app.services.chat_service import ChatService


@pytest.fixture(scope="session")
def settings():
    return get_settings()


@pytest.fixture(scope="session")
def service(settings) -> ChatService:
    return ChatService(settings)


@pytest.fixture()
def client(service) -> TestClient:
    # Ensure the app has a chat service without relying on lifespan events.
    app.state.chat_service = service
    return TestClient(app)
