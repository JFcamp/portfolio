---
source: transformer_from_scratch.md
category: project
project: Transformer from Scratch
section: research
date: 2026
---

# Transformer from Scratch

Category: Research. Status: in progress.

## Problem
Using an LLM is easy; understanding why it works is what lets you debug,
optimize and choose architecture.

## What was done
Implemented multi-head attention, positional encoding, residual blocks and
normalization in pure PyTorch (no high-level libraries); trained a BPE tokenizer
from scratch; trained a small GPT on a Brazilian-Portuguese corpus; and analyzed
loss curves and attention-map visualizations.

## Technologies
PyTorch, NumPy.

## Result
Coherent Brazilian-Portuguese generation after training, with a measured
validation perplexity. Exact numbers: TODO_METRIC.

## Deliverable
A post series explaining each component with line-by-line commented code,
reinforced by Pedro's role as an AI teaching assistant.
