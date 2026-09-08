---
source: rag_customer_service.md
category: project
project: Assistentes de Atendimento com RAG
section: ia-conversacional
date: 2026
lang: pt
---

# Assistentes de Atendimento com RAG

Categoria: RAG / IA Conversacional (na águilahub)

## Problema
As empresas precisavam automatizar o atendimento mantendo respostas precisas e
fundamentadas na própria base de conhecimento, minimizando respostas erradas e
transbordo desnecessário para humanos.

## Solução
Projetou e colocou em produção diversos chatbots e assistentes virtuais baseados
em RAG. Curou bases de conhecimento dos clientes, fez engenharia de prompts e
construiu e otimizou fluxos conversacionais para aumentar a resolução e reduzir
fallback e transbordo.

## Arquitetura
Mensagem do usuário -> tratamento de intenção/fluxo -> recuperação na base de
conhecimento do cliente -> geração da LLM fundamentada no contexto recuperado ->
integração com os sistemas do cliente via APIs REST.

## Tecnologias
RAG, LLMs, Claude API, OpenAI API, LangChain, Dify, Botpress, Dialogflow, APIs REST.

## Avaliação
Acompanhou KPIs de atendimento digital: taxa de resolução, taxa de fallback e
transbordo, além de revisão qualitativa de conversas reais para priorizar
melhorias.

## Resultados
Vários assistentes em produção para clientes de diversos setores, ajustados a
partir da análise de interações reais.
