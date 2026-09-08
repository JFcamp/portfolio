---
source: llm_eval_red_teaming_ptbr.md
category: project
project: Avaliação e Red Teaming de LLM (PT-BR)
section: llms
date: 2026
lang: pt
---

# Avaliação e Red Teaming de LLM (PT-BR)

Categoria: LLMs. Status: em desenvolvimento.

## Problema
Os benchmarks públicos são em inglês; empresas brasileiras não têm como saber
qual modelo é seguro e confiável no contexto delas.

## O que foi feito
Construiu um dataset de avaliação em português cobrindo raciocínio, factualidade
e contexto brasileiro; um detector automático de alucinação por verificação
cruzada; uma bateria de testes adversariais de prompt injection e jailbreak; e
uma comparação sistemática de 4 a 5 modelos com resultados e metodologia abertos.

## Tecnologias
Python, DeepEval, Hugging Face Datasets, Streamlit.

## Resultado
Vulnerabilidades documentadas e variação da taxa de recusa apropriada entre os
modelos. Números exatos: a definir.

## Entregável
Um leaderboard público e um relatório técnico.
