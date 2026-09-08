---
source: mlops_serving_platform.md
category: project
project: Plataforma de MLOps e Serving
section: mlops
date: 2026
lang: pt
---

# Plataforma de MLOps e Serving

Categoria: MLOps. Status: em desenvolvimento.

## Problema
Modelos morrem entre o notebook e a produção, sem registro, sem monitoramento e
sem como comparar versões com segurança.

## O que foi feito
Uma plataforma reutilizável de serving: registro de modelos (MLflow), deploy
versionado com canary/A-B, monitoramento de drift e performance, rollback
automático e feature store. Demonstrada servindo o modelo de crédito e o pequeno
modelo de linguagem.

## Arquitetura
Commit -> CI/CD (GitHub Actions) -> registro de modelos (MLflow) -> canary/A-B
-> monitor de drift -> rollback automático.

## Tecnologias
MLflow, BentoML, Docker, GitHub Actions, Prometheus, Grafana, Feast.

## Resultado
Do merge ao servido em 6 minutos sem passo manual; rollback automático ao cruzar
o limiar de drift; duas versões rodando em A/B a 50/50 com uma métrica de
negócio.

## Entregável
Um repositório, um diagrama de arquitetura e dashboards de monitoramento ao vivo.
