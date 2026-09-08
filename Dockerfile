# Root-level Dockerfile so a Docker-based deploy of the BACKEND also works.
# (Render's native Python runtime via render.yaml is preferred, but this is a
# safety net in case the service is configured to build from a Dockerfile.)
#
# Build context is the repo root, so knowledge_base/ and scripts/ are available.
FROM python:3.12-slim

WORKDIR /app

# Install backend dependencies first (better layer caching).
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy the pieces the backend needs at runtime.
COPY backend/ ./backend/
COPY knowledge_base/ ./knowledge_base/
COPY scripts/ ./scripts/

WORKDIR /app/backend

ENV EMBEDDING_PROVIDER=offline \
    LLM_PROVIDER=groq \
    LLM_MODEL=openai/gpt-oss-20b \
    RETRIEVAL_TOP_K=10

EXPOSE 8000

# Build the vector index at start, then serve. Render provides $PORT.
CMD ["sh", "-c", "python ../scripts/ingest.py && uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
