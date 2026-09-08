---
source: realtime_recommender.md
category: project
project: Real-time Recommender System
section: machine-learning
date: 2026
---

# Real-time Recommender System

Category: Machine Learning. Status: in progress.

## Problem
A recommendation model only creates value if it responds in milliseconds and is
measured by a business metric, not offline accuracy alone.

## What was done
A two-tower model with user and item embeddings; a feature store separating
batch and online features; a serving API with Redis caching to stay under the
p95 latency target; and a simulated A/B framework comparing the model against
popularity and random baselines.

## Technologies
PyTorch, Feast, Redis, FastAPI, Docker.

## Result
Beats the baselines on Recall@10 within the latency budget. Exact numbers:
TODO_METRIC.

## Deliverable
An interactive demo where the visitor clicks items and sees recommendations
change live.
