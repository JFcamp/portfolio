---
source: ptbr_llm_benchmark.md
category: project
project: PT-BR LLM Benchmark
section: llms
date: 2026
lang: en
---

# PT-BR LLM Benchmark

Category: LLMs / Evaluation. Status: in progress.

## Problem
Almost every LLM benchmark is in English. Brazilian teams choose a model blindly
for Portuguese, with no data on hallucination, jailbreak or regional bias.

## What was done
An open suite that evaluates LLMs in Brazilian Portuguese: faithfulness and
hallucination, jailbreak resistance, toxicity and regional bias, with a labeled
dataset, a reproducible harness, and a public leaderboard.

## Architecture
Labeled prompts -> multi-model run -> LLM judge with human validation ->
metrics -> public leaderboard.

## Technologies
Python, DeepEval, RAGAS, Hugging Face Datasets, Streamlit, pytest.

## Result
1,200 labeled prompts and 8 models evaluated; hallucination gap of 18% (best
open) versus 9% (best commercial); jailbreak resistance of 76%–94% depending on
the model.

## Deliverable
A dataset on Hugging Face, a public leaderboard, and the harness repository.
