---
source: explainable_credit_ml.md
category: project
project: Crédito Explicável
section: machine-learning
date: 2026
lang: pt
---

# Crédito Explicável (ML clássico)

Categoria: Machine Learning. Status: em desenvolvimento.

## Problema
Muito modelo de crédito é caixa-preta, mal calibrado e sem checagem de viés, o
que é inaceitável numa decisão que afeta a vida das pessoas.

## O que foi feito
Um pipeline completo de risco de crédito: engenharia de features, seleção de
modelo com validação, calibração de probabilidade, interpretabilidade global e
local com SHAP, checagem de justiça entre grupos e um model card. Servido como
API.

## Arquitetura
EDA e engenharia de features -> seleção e tuning (Optuna) -> calibração ->
SHAP e justiça -> model card e API.

## Tecnologias
scikit-learn, XGBoost, SHAP, Optuna, FastAPI, Docker, Evidently.

## Resultado
AUC de 0,84 e Brier melhorado de 0,18 para 0,11 após calibração; disparidade de
aprovação entre grupos reduzida de 14% para 4%.

## Entregável
Um repositório, uma API demo, um model card e um notebook de análise.
