---
source: agent_guardrails_observability.md
category: project
project: Agent with Guardrails and Observability
section: agents
date: 2026
---

# Agent with Guardrails and Observability

Category: Agents. Status: in progress.

## Problem
LLM agents work in the demo and break in production: they loop, blow up cost,
and fail silently.

## What was done
A multi-step agent for a real task modeled as an explicit state graph (not a
free loop); tools with Pydantic-validated schemas; guardrails for maximum cost
per session, iteration limits and output validation; distributed tracing of
every step (prompt, tool call, tokens, latency); and a behavior test suite with
adversarial cases.

## Technologies
LangGraph, Pydantic AI, OpenTelemetry, Langfuse, FastAPI.

## Result
A measured completion rate across test scenarios and a bounded average cost per
run with a guaranteed ceiling. Exact numbers: TODO_METRIC.

## Deliverable
A 90-second video showing the trace of a full agent run.
