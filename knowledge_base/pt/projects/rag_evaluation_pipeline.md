---
source: rag_evaluation_pipeline.md
category: project
project: Pipeline de Avaliação de RAG
section: rag
date: 2026
lang: pt
---

# Pipeline de Avaliação de RAG

Categoria: RAG. Status: em desenvolvimento.

## Problema
Sistemas RAG entregam respostas plausíveis, mas erradas, e a maioria dos times
não tem como saber quando a qualidade caiu.

## O que foi feito
Pipeline de ingestão com chunking configurável (estratégias fixa, semântica e
por estrutura de documento comparadas); busca híbrida combinando BM25 e
embeddings densos via RRF; reranker cross-encoder no top-50; e suíte de
avaliação sobre um conjunto rotulado medindo faithfulness, context precision e
answer relevancy, rodando no GitHub Actions a cada commit. Um PR que derruba a
métrica não passa.

## Tecnologias
Python, LangChain, Qdrant, Cohere Rerank, RAGAS, Langfuse, GitHub Actions.

## Resultado
A faithfulness melhorou após o reranking e a alucinação foi reduzida no conjunto
de teste. Números exatos: a definir.

## Entregável
Demo ao vivo, dashboard público de métricas e um README com a tabela comparativa
das estratégias de chunking.
