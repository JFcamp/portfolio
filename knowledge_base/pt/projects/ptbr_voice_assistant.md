---
source: ptbr_voice_assistant.md
category: project
project: IA de Voz em PT-BR para Atendimento
section: generative-ai
date: 2026
lang: pt
---

# IA de Voz em PT-BR para Atendimento

Categoria: Voz / IA Generativa. Status: em desenvolvimento.

## Problema
Atendimento por voz em português sofre com transcrição ruim (sotaques, ruído,
gíria) e latência, e as boas soluções são caras e em inglês.

## O que foi feito
Um pipeline de voz em português: ASR com Whisper afinado em fala brasileira
ruidosa, um agente RAG que reaproveita o domínio de atendimento, e TTS natural,
com streaming e barge-in, em tempo quase real.

## Arquitetura
Áudio (WebRTC) -> detecção de fala (VAD) -> ASR Whisper afinado -> agente RAG ->
TTS com streaming.

## Tecnologias
Whisper (afinado), faster-whisper, Piper TTS, VAD, WebRTC, LangChain.

## Resultado
WER reduzido de 21% para 11% após o fine-tune; latência fala-a-fala de 1,4
segundos; naturalidade do TTS (MOS) de 4,1.

## Entregável
Uma demo de voz no navegador, o repositório e áudios antes/depois.
