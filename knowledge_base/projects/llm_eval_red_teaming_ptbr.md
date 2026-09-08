---
source: llm_eval_red_teaming_ptbr.md
category: project
project: LLM Evaluation and Red Teaming (PT-BR)
section: llms
date: 2026
---

# LLM Evaluation and Red Teaming (PT-BR)

Category: LLMs. Status: in progress.

## Problem
Public benchmarks are in English; Brazilian companies have no way to know which
model is safe and reliable in their context.

## What was done
Built a Brazilian-Portuguese evaluation dataset covering reasoning, factuality
and Brazilian context; an automatic hallucination detector via cross
verification; a battery of adversarial prompt-injection and jailbreak tests; and
a systematic comparison of four to five models with open results and
methodology.

## Technologies
Python, DeepEval, Hugging Face Datasets, Streamlit.

## Result
Documented vulnerabilities and a refusal-rate spread across models. Exact
numbers: TODO_METRIC.

## Deliverable
A public leaderboard and a technical report.
