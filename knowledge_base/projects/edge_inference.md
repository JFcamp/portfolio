---
source: edge_inference.md
category: project
project: Edge Inference
section: edge-ai
date: 2026
---

# Edge Inference

Category: Edge AI. Status: research.

## Problem
A sprayer in a field has no GPU and no connection; the model must fit the
embedded hardware and respond in real time.

## What was done
Exported the segmentation model to ONNX and compiled it with TensorRT; compared
three precision levels (FP32, FP16, and INT8 with calibration); measured frames
per second, memory use and mAP drop for each; and deployed to embedded hardware
such as Jetson Nano, Raspberry Pi or Android.

## Technologies
ONNX Runtime, TensorRT, PyTorch, embedded hardware (Jetson / Raspberry Pi).

## Result
Higher frames per second and a smaller memory footprint with minimal loss of
mAP. Exact numbers: TODO_METRIC.

## Deliverable
A short video of the real device segmenting in real time and a trade-off table.
