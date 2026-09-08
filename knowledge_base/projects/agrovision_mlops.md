---
source: agrovision_mlops.md
category: project
project: AgroVision MLOps
section: mlops
date: 2026
---

# AgroVision MLOps

Category: MLOps. Status: research to production.

## Problem
Research models live in notebooks, do not survive a machine change, and never
reach the field.

## What was done
Turned the weed-segmentation model (YOLO) from Pedro's undergraduate research
into a complete system: data and annotations versioned with DVC, experiments
tracked in MLflow, single-command reproducible training, a FastAPI inference API
packaged in Docker, input-drift monitoring, and automatic retraining when drift
crosses a threshold.

## Technologies
PyTorch, Ultralytics YOLO, DVC, MLflow, FastAPI, Docker, Evidently AI.

## Result
A reproducible commit-to-served pipeline with no manual step. The underlying
research received Best Paper at WVC 2025. Exact metrics: TODO_METRIC.

## Deliverable
Repository, architecture diagram, and a link to the award-winning WVC 2025
paper.
