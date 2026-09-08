---
source: multimodal_agro_assistant.md
category: project
project: Multimodal Agro Assistant
section: computer-vision
date: 2026
lang: en
---

# Multimodal Agro Assistant

Category: Computer Vision + LLM (multimodal). Status: shipped.

## Problem
In the field the internet drops, and a photo alone is not a decision. AI
diagnostics exist in English, in the cloud, and stop working offline.

## What was done
A mobile app running 100% offline: the segmentation model from Pedro's
award-winning research (Best Paper, WVC 2025) identifies the weed in a photo,
and a quantized small language model explains it in Brazilian Portuguese and
recommends treatment, citing a local agronomy knowledge base (on-device RAG).

## Architecture
Photo -> YOLO segmentation (ONNX) -> mask and class -> Portuguese prompt ->
quantized SLM with local RAG -> recommendation with sources.

## Technologies
PyTorch, Ultralytics YOLO-seg, ONNX Runtime, llama.cpp (GGUF), FAISS,
React Native.

## Result
Segmentation mIoU of 0.87; offline photo-to-answer in 2.3 seconds on a mid-range
phone; 148 MB app fully embedded (everything runs on-device).

## Deliverable
A demo app (APK and web), the repository, and a link to the award-winning
WVC 2025 paper.
