---
source: streaming_anomaly_detection.md
category: project
project: Detecção de Anomalia em Streaming
section: data-engineering
date: 2026
lang: pt
---

# Detecção de Anomalia em Streaming

Categoria: Engenharia de Dados. Status: em desenvolvimento.

## Problema
Detecção de fraude e falha só ajuda se acontecer no momento do evento; um job em
lote noturno chega tarde demais.

## O que foi feito
Ingestão de eventos via Kafka; cálculo de features em janela deslizante; um
modelo de detecção de anomalia online emitindo alertas em segundos após o evento;
retreino e backfill histórico orquestrados no Airflow; e testes de qualidade de
dados bloqueando registros malformados antes do modelo.

## Tecnologias
Kafka, Spark Streaming ou Flink, Airflow, Great Expectations, Docker Compose.

## Resultado
Detecção de alta vazão e baixa latência com precisão medida e taxa de falsos
positivos. Números exatos: a definir.

## Entregável
Um diagrama de arquitetura e um dashboard ao vivo mostrando o fluxo de eventos e
os alertas disparando.
