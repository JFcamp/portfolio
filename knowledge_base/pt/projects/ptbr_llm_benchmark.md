---
source: ptbr_llm_benchmark.md
category: project
project: Benchmark de LLMs em PT-BR
section: llms
date: 2026
lang: pt
---

# Benchmark de LLMs em PT-BR

Categoria: LLMs / Avaliação. Status: em desenvolvimento.

## Problema
Quase todo benchmark de LLM é em inglês. Times brasileiros escolhem modelo no
escuro para português, sem dados de alucinação, jailbreak ou viés regional.

## O que foi feito
Uma suíte aberta que avalia LLMs em português: fidelidade e alucinação,
resistência a jailbreak, toxicidade e viés regional, com dataset rotulado,
harness reprodutível e leaderboard público.

## Arquitetura
Prompts rotulados -> execução multi-modelo -> juiz LLM com validação humana ->
métricas -> leaderboard público.

## Tecnologias
Python, DeepEval, RAGAS, Hugging Face Datasets, Streamlit, pytest.

## Resultado
1.200 prompts rotulados e 8 modelos avaliados; gap de alucinação de 18% (melhor
aberto) contra 9% (melhor comercial); resistência a jailbreak de 76%–94%
conforme o modelo.

## Entregável
Um dataset no Hugging Face, um leaderboard público e o repositório do harness.
