---
source: mlops_serving_platform.md
category: project
project: MLOps and Serving Platform
section: mlops
date: 2026
lang: en
---

# MLOps and Serving Platform

Category: MLOps. Status: in progress.

## Problem
Models die between the notebook and production, with no registry, no monitoring,
and no safe way to compare versions.

## What was done
A reusable serving platform: model registry (MLflow), versioned deploy with
canary/A-B, drift and performance monitoring, automatic rollback, and a feature
store. Demonstrated serving the credit model and the small language model.

## Architecture
Commit -> CI/CD (GitHub Actions) -> model registry (MLflow) -> canary/A-B ->
drift monitor -> automatic rollback.

## Technologies
MLflow, BentoML, Docker, GitHub Actions, Prometheus, Grafana, Feast.

## Result
Merge-to-served in 6 minutes with no manual step; automatic rollback when the
drift threshold is crossed; two versions running in A/B at 50/50 with a business
metric.

## Deliverable
A repository, an architecture diagram, and live monitoring dashboards.
