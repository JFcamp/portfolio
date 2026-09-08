---
source: realtime_recommender.md
category: project
project: Sistema de Recomendação em Tempo Real
section: machine-learning
date: 2026
lang: pt
---

# Sistema de Recomendação em Tempo Real

Categoria: Machine Learning. Status: em desenvolvimento.

## Problema
Um modelo de recomendação só gera valor se responder em milissegundos e for
medido por uma métrica de negócio, não apenas por acurácia offline.

## O que foi feito
Um modelo two-tower com embeddings de usuário e item; uma feature store separando
features batch e online; uma API de serving com cache em Redis para responder
abaixo do alvo de p95; e um framework de A/B test simulado comparando o modelo
com baselines de popularidade e aleatório.

## Tecnologias
PyTorch, Feast, Redis, FastAPI, Docker.

## Resultado
Supera os baselines em Recall@10 dentro do orçamento de latência. Números
exatos: a definir.

## Entregável
Uma demo interativa em que o visitante clica em itens e vê as recomendações
mudarem ao vivo.
