"""API endpoint tests."""
from __future__ import annotations


def test_health(client):
    resp = client.get("/api/health")
    assert resp.status_code == 200
    body = resp.json()
    assert body["status"] == "ok"
    assert body["index_loaded"] is True
    assert body["chunks"] > 0


def test_chat_happy_path(client):
    resp = client.post("/api/chat", json={"message": "What technologies does Pedro use?"})
    assert resp.status_code == 200
    body = resp.json()
    assert "answer" in body
    assert isinstance(body["sources"], list)
    assert 0.0 <= body["confidence"] <= 1.0


def test_chat_empty_message_returns_422_or_400(client):
    # Pydantic min_length=1 -> 422; whitespace-only -> our 400 handler.
    resp = client.post("/api/chat", json={"message": ""})
    assert resp.status_code in (400, 422)


def test_chat_whitespace_message_returns_400(client):
    resp = client.post("/api/chat", json={"message": "    "})
    assert resp.status_code == 400


def test_chat_recruiter_mode(client):
    resp = client.post(
        "/api/chat",
        json={"message": "Summarize Pedro's profile for a recruiter", "mode": "recruiter"},
    )
    assert resp.status_code == 200
    assert resp.json()["answer"]


def test_chat_unknown_topic_no_sources(client):
    resp = client.post(
        "/api/chat", json={"message": "What is Pedro's favorite pizza topping?"}
    )
    assert resp.status_code == 200
    body = resp.json()
    assert body["sources"] == []
    assert body["confidence"] == 0.0


def test_chat_accepts_portuguese_lang(client):
    resp = client.post(
        "/api/chat",
        json={"message": "Quais tecnologias o Pedro usa?", "lang": "pt"},
    )
    assert resp.status_code == 200
    body = resp.json()
    assert "answer" in body
    assert isinstance(body["sources"], list)


def test_chat_rejects_invalid_lang(client):
    resp = client.post("/api/chat", json={"message": "hi", "lang": "fr"})
    assert resp.status_code == 422
