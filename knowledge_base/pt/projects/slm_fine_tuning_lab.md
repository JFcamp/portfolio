---
source: slm_fine_tuning_lab.md
category: project
project: Laboratório de Fine-tuning de SLM
section: llms
date: 2026
lang: pt
---

# Laboratório de Fine-tuning de SLM

Categoria: LLMs. Status: em desenvolvimento.

## Problema
Rodar um modelo de fronteira como o GPT-4o numa tarefa repetitiva de alto volume
é caro e adiciona latência de rede desnecessária.

## O que foi feito
Fine-tuning com QLoRA de um modelo de 3–8B num dataset em português para uma
tarefa específica; quantização em 4 bits; serving com vLLM e batching contínuo;
e um benchmark frente a frente contra GPT-4o e Claude medindo acurácia, latência
p50/p95 e custo por 1.000 requisições.

## Tecnologias
PyTorch, Unsloth/PEFT, vLLM, Hugging Face, Weights & Biases.

## Resultado
Um modelo pequeno especializado alcançando boa parte da qualidade de fronteira a
uma fração do custo e da latência. Números exatos: a definir.

## Entregável
Modelo publicado no Hugging Face, notebook de reprodução e um post técnico com o
gráfico custo × qualidade.
