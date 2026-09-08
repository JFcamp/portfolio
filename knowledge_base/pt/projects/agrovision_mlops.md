---
source: agrovision_mlops.md
category: project
project: AgroVision MLOps
section: mlops
date: 2026
lang: pt
---

# AgroVision MLOps

Categoria: MLOps. Status: da pesquisa à produção.

## Problema
Modelos de pesquisa vivem em notebooks, não sobrevivem a uma troca de máquina e
nunca chegam ao campo.

## O que foi feito
Transformou o modelo de segmentação de plantas daninhas (YOLO) da iniciação
científica do Pedro em um sistema completo: dados e anotações versionados com
DVC, experimentos rastreados no MLflow, treino reprodutível por comando único,
API de inferência em FastAPI empacotada em Docker, monitoramento de drift de
entrada e retreino automático quando o drift cruza um limiar.

## Tecnologias
PyTorch, Ultralytics YOLO, DVC, MLflow, FastAPI, Docker, Evidently AI.

## Resultado
Um pipeline reprodutível do commit ao modelo servido, sem passo manual. A
pesquisa de base recebeu o Melhor Artigo no WVC 2025. Métricas exatas: a definir.

## Entregável
Repositório, diagrama de arquitetura e link para o artigo premiado no WVC 2025.
