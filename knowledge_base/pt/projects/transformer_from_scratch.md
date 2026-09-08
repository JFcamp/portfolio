---
source: transformer_from_scratch.md
category: project
project: Transformer do Zero
section: research
date: 2026
lang: pt
---

# Transformer do Zero

Categoria: Pesquisa. Status: em desenvolvimento.

## Problema
Usar uma LLM é fácil; entender por que ela funciona é o que permite depurar,
otimizar e escolher arquitetura.

## O que foi feito
Implementou multi-head attention, positional encoding, blocos residuais e
normalização em PyTorch puro (sem bibliotecas de alto nível); treinou um
tokenizer BPE do zero; treinou um GPT pequeno num corpus em português; e analisou
curvas de loss e visualizações dos mapas de atenção.

## Tecnologias
PyTorch, NumPy.

## Resultado
Geração de texto coerente em português após o treino, com perplexidade de
validação medida. Números exatos: a definir.

## Entregável
Uma série de posts explicando cada componente com o código comentado linha a
linha, reforçada pela atuação do Pedro como monitor de IA.
