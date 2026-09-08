---
source: rag_evaluation_pipeline.md
category: project
project: RAG Evaluation Pipeline
section: rag
date: 2026
---

# RAG Evaluation Pipeline

Category: RAG. Status: in progress.

## Problem
RAG systems return plausible but wrong answers, and most teams have no way to
know when quality drops.

## What was done
Ingestion pipeline with configurable chunking (fixed, semantic, and
document-structure strategies compared); hybrid search fusing BM25 and dense
embeddings via Reciprocal Rank Fusion (RRF); a cross-encoder reranker over the
top-50; and an evaluation suite over a labeled question set measuring
faithfulness, context precision and answer relevancy, running in GitHub Actions
on every commit. A pull request that drops a metric fails CI.

## Technologies
Python, LangChain, Qdrant, Cohere Rerank, RAGAS, Langfuse, GitHub Actions.

## Result
Faithfulness improved after reranking and hallucination was reduced on the test
set. Exact numbers: TODO_METRIC.

## Deliverable
Live demo, a public metrics dashboard, and a README with the chunking-strategy
comparison table.
