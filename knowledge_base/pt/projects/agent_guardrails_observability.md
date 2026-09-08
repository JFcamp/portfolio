---
source: agent_guardrails_observability.md
category: project
project: Agente com Guardrails e Observabilidade
section: agents
date: 2026
lang: pt
---

# Agente com Guardrails e Observabilidade

Categoria: Agentes. Status: em desenvolvimento.

## Problema
Agentes de LLM funcionam na demo e quebram em produção: entram em loop, estouram
custo e falham silenciosamente.

## O que foi feito
Um agente multi-step para uma tarefa real modelado como grafo de estados
explícito (não loop livre); ferramentas com schema validado por Pydantic;
guardrails de custo máximo por sessão, limite de iterações e validação de saída;
tracing distribuído de cada passo (prompt, tool call, tokens, latência); e uma
suíte de testes de comportamento com casos adversariais.

## Tecnologias
LangGraph, Pydantic AI, OpenTelemetry, Langfuse, FastAPI.

## Resultado
Taxa de conclusão medida entre cenários de teste e custo médio por execução com
teto garantido. Números exatos: a definir.

## Entregável
Um vídeo de 90 segundos mostrando o trace de uma execução completa do agente.
