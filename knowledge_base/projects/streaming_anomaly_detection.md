---
source: streaming_anomaly_detection.md
category: project
project: Streaming Anomaly Detection
section: data-engineering
date: 2026
---

# Streaming Anomaly Detection

Category: Data Engineering. Status: in progress.

## Problem
Fraud and failure detection only helps if it happens at the moment of the event;
a nightly batch job arrives too late.

## What was done
Event ingestion via Kafka; sliding-window feature computation; an online
anomaly-detection model emitting alerts within seconds of an event; retraining
and historical backfill orchestrated in Airflow; and data-quality tests blocking
malformed records before the model.

## Technologies
Kafka, Spark Streaming or Flink, Airflow, Great Expectations, Docker Compose.

## Result
High-throughput, low-latency detection with measured precision and
false-positive rate. Exact numbers: TODO_METRIC.

## Deliverable
An architecture diagram and a live dashboard showing the event flow and alerts
firing.
