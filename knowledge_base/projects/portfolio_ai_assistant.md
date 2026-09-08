---
source: portfolio_ai_assistant.md
category: project
project: Portfolio AI Assistant
section: rag
date: 2026
---

# Portfolio AI Assistant (this site)

Category: RAG / Generative AI

## Problem
Let recruiters ask natural questions about Pedro's background and get grounded,
source-backed answers, never fabricated.

## Solution
A FastAPI backend runs a full RAG pipeline: chunking, embeddings, FAISS vector
search, and grounded generation, with an anti-hallucination system prompt and
prompt-injection defenses. Answers include their sources and a confidence score,
and the retrieved chunks can be inspected for transparency.

## Architecture
Knowledge base -> chunking with overlap -> embeddings -> FAISS vector store ->
similarity search with a relevance threshold -> grounded LLM generation ->
answer + sources + confidence.

## Technologies
Python, FastAPI, FAISS, embeddings, RAG, React, TypeScript.

## Results
Transparent RAG: off-topic questions return a clear "not enough information"
response instead of guessing, and every answer shows its sources.
