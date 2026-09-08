---
source: multimodal_agro_assistant.md
category: project
project: Assistente Agro Multimodal
section: computer-vision
date: 2026
lang: pt
---

# Assistente Agro Multimodal

Categoria: Visão Computacional + LLM (multimodal). Status: entregue.

## Problema
No campo a internet cai, e uma foto não vira decisão. Diagnósticos de IA existem
em inglês, na nuvem, e param de funcionar offline.

## O que foi feito
Um app de celular que roda 100% offline: o modelo de segmentação da pesquisa
premiada do Pedro (Melhor Artigo, WVC 2025) identifica a planta daninha na foto,
e um pequeno modelo de linguagem quantizado explica em português e recomenda o
manejo, citando uma base agronômica local (RAG no dispositivo).

## Arquitetura
Foto -> segmentação YOLO (ONNX) -> máscara e classe -> prompt em português ->
SLM quantizado com RAG local -> recomendação com fontes.

## Tecnologias
PyTorch, Ultralytics YOLO-seg, ONNX Runtime, llama.cpp (GGUF), FAISS,
React Native.

## Resultado
mIoU de 0,87 na segmentação; resposta gerada offline em 2,3 segundos num celular
intermediário; app de 148 MB totalmente embarcado (tudo roda no dispositivo).

## Entregável
Um app demo (APK e web), o repositório e o link do artigo premiado no WVC 2025.
