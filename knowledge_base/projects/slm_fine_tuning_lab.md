---
source: slm_fine_tuning_lab.md
category: project
project: SLM Fine-tuning Lab
section: llms
date: 2026
---

# SLM Fine-tuning Lab

Category: LLMs. Status: in progress.

## Problem
Running a frontier model like GPT-4o on a repetitive, high-volume task is
expensive and adds unnecessary network latency.

## What was done
QLoRA fine-tuning of a 3–8B model on a Brazilian-Portuguese dataset for a
specific task; 4-bit quantization; serving with vLLM and continuous batching;
and a head-to-head benchmark against GPT-4o and Claude measuring accuracy,
p50/p95 latency and cost per 1,000 requests.

## Technologies
PyTorch, Unsloth/PEFT, vLLM, Hugging Face, Weights & Biases.

## Result
A small specialized model reaching a large share of frontier quality at a
fraction of the cost and latency. Exact numbers: TODO_METRIC.

## Deliverable
Model published on Hugging Face, a reproduction notebook, and a technical post
with the cost-versus-quality chart.
