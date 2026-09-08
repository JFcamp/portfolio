---
source: explainable_credit_ml.md
category: project
project: Explainable Credit Scoring
section: machine-learning
date: 2026
lang: en
---

# Explainable Credit Scoring (Classic ML)

Category: Machine Learning. Status: in progress.

## Problem
Many credit models are black boxes, poorly calibrated and unchecked for bias,
which is unacceptable in a decision that affects people's lives.

## What was done
A complete credit-risk pipeline: feature engineering, model selection with
validation, probability calibration, global and local interpretability with
SHAP, group fairness checks, and a model card. Served as an API.

## Architecture
EDA and feature engineering -> selection and tuning (Optuna) -> calibration ->
SHAP and fairness -> model card and API.

## Technologies
scikit-learn, XGBoost, SHAP, Optuna, FastAPI, Docker, Evidently.

## Result
AUC of 0.84 and Brier score improved from 0.18 to 0.11 after calibration;
approval disparity between groups reduced from 14% to 4%.

## Deliverable
A repository, a demo API, a model card, and an analysis notebook.
