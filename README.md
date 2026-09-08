# Pedro Campos — ML Engineer Portfolio + AI Assistant (RAG)

[![CI](https://github.com/JFcamp/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/JFcamp/portfolio/actions/workflows/ci.yml)

A professional portfolio for a Machine Learning / AI Engineer. The portfolio
itself is a technical demonstration: its centerpiece is an **AI Portfolio
Assistant** powered by a real Retrieval-Augmented Generation (RAG) pipeline that
answers questions about the profile using **only** a curated knowledge base — and
says so clearly when it doesn't have enough information.

> The assistant never invents experiences, technologies, projects, certifications,
> or education. Retrieved documents are treated as data, not instructions.

---

## Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [AI Assistant & RAG architecture](#ai-assistant--rag-architecture)
- [Project structure](#project-structure)
- [Installation](#installation)
- [Environment variables](#environment-variables)
- [Running locally](#running-locally)
- [RAG ingestion](#rag-ingestion)
- [Testing](#testing)
- [Deployment](#deployment)
- [Filling in your data](#filling-in-your-data)

---

## Overview

- **Frontend**: single-page React app (Vite + TypeScript + Tailwind + Framer
  Motion), dark, minimal, responsive, i18n (EN default, PT), accessible.
- **Backend**: FastAPI service exposing `POST /api/chat` and `GET /api/health`.
- **RAG**: markdown knowledge base → chunking → embeddings → FAISS vector store →
  similarity search → grounded generation with sources.
- **Runs with no API key** thanks to offline embedding + LLM providers. Plug in
  OpenAI later by changing environment variables only.

## Architecture

```
┌─────────────────────────────┐        ┌──────────────────────────────────┐
│   FRONTEND (SPA)             │  HTTPS │   BACKEND (RAG API)               │
│   React + TS + Vite          │───────▶│   FastAPI + Python                │
│   Tailwind + Framer Motion   │  /api  │                                   │
│   - Floating chat widget     │◀───────│   embed → search → context → LLM  │
│   - Recruiter Mode           │  JSON  │   → grounded answer + sources     │
│   - Centralized data files   │        │            │                      │
└─────────────────────────────┘        │            ▼                      │
                                        │   FAISS vector store              │
                                        │   ← ingest.py ← knowledge_base/   │
                                        └──────────────────────────────────┘
```

The browser never calls the LLM directly and never sees API keys. See
[`docs/architecture.md`](docs/architecture.md) for the full diagram.

## Tech stack

| Layer      | Choices                                                        |
|------------|----------------------------------------------------------------|
| Frontend   | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, i18next |
| Backend    | Python 3.12, FastAPI, Pydantic v2, slowapi, structlog          |
| RAG        | FAISS (default), NumPy fallback, pluggable embedding/LLM providers |
| Testing    | Vitest + Testing Library (frontend), pytest (backend)          |
| Deploy     | Docker + docker-compose, or host frontend/backend separately   |

## AI Assistant & RAG architecture

**Ingestion** (offline, `scripts/ingest.py`):
`knowledge_base/*.md` → load + clean → section-aware chunking with overlap →
`EmbeddingProvider.embed()` → `VectorStore.add()` (vectors + metadata:
`source, category, project, section, date`).

**Runtime** (`POST /api/chat`):
question → validate (length/sanitize) → normalize/expand → embed →
`VectorStore.search(top_k)` → relevance-threshold filter → build context
(chunks as **data**) → `LLMProvider.generate(system_prompt + context)` →
answer + `sources[]` + `confidence`.

**Grounding & safety**
- System prompt forbids fabrication and prompt-prompt leaking.
- Below-threshold retrieval → standard "not enough information" reply.
- `TODO_` placeholders are stripped from context so they never surface as facts.
- Input validation, request size limits, rate limiting, restricted CORS,
  timeouts, and logging without message content.

**Providers are swappable via env** (`offline` default, `openai` optional):
`EmbeddingProvider`, `LLMProvider`, and `VectorStore` are all interfaces.

## Project structure

```
portfolio/
├─ frontend/           React app (src/{components,sections,pages,hooks,services,types,utils,data,i18n})
├─ backend/            FastAPI app (app/{api,core,rag,models,services}) + tests
├─ knowledge_base/     Markdown source of truth for the RAG assistant
├─ scripts/ingest.py   Build/persist the vector index
├─ docs/               Architecture notes
├─ docker-compose.yml
└─ README.md
```

## Installation

Prerequisites: Node.js 20+, Python 3.11+.

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
python -m venv .venv
# Windows: .\.venv\Scripts\activate    macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
```

## Environment variables

Copy the examples and adjust as needed:

```bash
cp .env.example backend/.env
cp frontend/.env.example frontend/.env
```

Backend (`backend/.env`):

| Variable              | Default                         | Notes                                   |
|-----------------------|---------------------------------|-----------------------------------------|
| `LLM_PROVIDER`        | `offline`                       | `offline` or `openai`                   |
| `EMBEDDING_PROVIDER`  | `offline`                       | `offline` or `openai`                   |
| `LLM_API_KEY`         | *(empty)*                       | required only for `openai`              |
| `VECTOR_DB`           | `faiss`                         | vector store backend                    |
| `RELEVANCE_THRESHOLD` | `0.25`                          | min similarity to count as relevant     |
| `ALLOWED_ORIGINS`     | `http://localhost:5173,...`     | CORS allowlist                          |
| `RATE_LIMIT`          | `20/minute`                     | per-client chat limit                   |

Frontend (`frontend/.env`): `VITE_API_URL=http://localhost:8000`

## Running locally

```bash
# 1) Build the RAG index (from backend/, with the venv active)
python ../scripts/ingest.py

# 2) Start the backend
uvicorn app.main:app --reload --port 8000

# 3) Start the frontend (separate terminal)
cd ../frontend
npm run dev        # http://localhost:5173
```

> Run dev servers in your own terminal (they are long-running).

## RAG ingestion

`scripts/ingest.py` locates documents, cleans text, chunks section-aware with
overlap, embeds, and persists vectors + metadata to `backend/app/rag/store/`.
Re-run it whenever you edit the knowledge base. If no index exists at startup,
the backend builds one in memory automatically.

## Testing

```bash
# Backend
cd backend
python -m pytest -q          # 17 tests, incl. anti-hallucination guarantees

# Frontend
cd ../frontend
npm test                     # component, filtering, and chat-state tests
```

Key backend tests assert the assistant returns the "not enough information"
response for off-topic questions and does not leak the system prompt.

## Deployment

Frontend and backend deploy independently — no hardcoded URLs.

- **Docker (both):** `docker compose up --build` → frontend on `:8080`,
  backend on `:8000`.
- **Separately:** build the frontend (`npm run build`) and host `dist/` on any
  static host; deploy the backend anywhere that runs Python/uvicorn. Set
  `VITE_API_URL` (frontend) and `ALLOWED_ORIGINS` (backend) accordingly.

## Filling in your data

All personal content is centralized and marked with `TODO_` where real values
are needed. Nothing is invented.

- **Site content:** `frontend/src/data/*.ts` (profile, projects, experience,
  skills, education, certifications).
- **Assistant knowledge:** `knowledge_base/*.md` (+ `projects/*.md`). Re-run
  `scripts/ingest.py` after edits.
- **Static assets:** add `frontend/public/resume.pdf` and `og-image.png`, and
  replace `TODO_DOMAIN` in `index.html`, `robots.txt`, and `sitemap.xml`.

Search the repo for `TODO_` to find every placeholder.

---

Built with React + Python + AI.
