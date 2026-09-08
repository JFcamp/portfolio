---
source: portfolio_ai_assistant.md
category: project
project: Assistente de IA do Portfólio
section: rag
date: 2026
lang: pt
---

# Assistente de IA do Portfólio (este site)

Categoria: RAG / IA Generativa

## Problema
Permitir que recrutadores façam perguntas naturais sobre a trajetória do Pedro e
recebam respostas fundamentadas e com fontes — nunca inventadas.

## Solução
Um backend em FastAPI roda um pipeline RAG completo: chunking, embeddings, busca
vetorial com FAISS e geração fundamentada, com um prompt de sistema
anti-alucinação e defesas contra prompt injection. As respostas incluem as
fontes e um score de confiança, e os trechos recuperados podem ser inspecionados
para transparência.

## Arquitetura
Base de conhecimento -> chunking com sobreposição -> embeddings -> vetores FAISS
-> busca por similaridade com limiar de relevância -> geração fundamentada ->
resposta + fontes + confiança.

## Tecnologias
Python, FastAPI, FAISS, embeddings, RAG, React, TypeScript.

## Resultados
RAG transparente: perguntas fora de escopo retornam uma resposta clara de "não
encontrei informações suficientes" em vez de adivinhar, e cada resposta mostra
suas fontes.
