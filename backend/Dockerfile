FROM python:3.12-slim

WORKDIR /app

# System deps kept minimal. faiss-cpu ships as a wheel.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# App code and knowledge base (knowledge_base lives one level up in the repo,
# so build with the repo root as context: `docker build -f backend/Dockerfile .`)
COPY backend/app ./app
COPY knowledge_base ../knowledge_base
COPY scripts ../scripts

EXPOSE 8000

# Build the index at container start, then serve.
CMD ["sh", "-c", "python ../scripts/ingest.py && uvicorn app.main:app --host 0.0.0.0 --port 8000"]
