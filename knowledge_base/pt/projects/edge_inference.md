---
source: edge_inference.md
category: project
project: Inferência no Edge
section: edge-ai
date: 2026
lang: pt
---

# Inferência no Edge

Categoria: Edge AI. Status: pesquisa.

## Problema
Um pulverizador na lavoura não tem GPU nem conexão; o modelo precisa caber no
hardware embarcado e responder em tempo real.

## O que foi feito
Exportou o modelo de segmentação para ONNX e compilou com TensorRT; comparou
três níveis de precisão (FP32, FP16 e INT8 com calibração); mediu FPS, uso de
memória e queda de mAP em cada um; e fez deploy em hardware embarcado como Jetson
Nano, Raspberry Pi ou Android.

## Tecnologias
ONNX Runtime, TensorRT, PyTorch, hardware embarcado (Jetson / Raspberry Pi).

## Resultado
Mais frames por segundo e footprint de memória menor com perda mínima de mAP.
Números exatos: a definir.

## Entregável
Um vídeo curto do dispositivo real segmentando em tempo real e uma tabela de
trade-offs.
