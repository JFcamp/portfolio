---
source: ptbr_voice_assistant.md
category: project
project: PT-BR Voice AI for Customer Service
section: generative-ai
date: 2026
lang: en
---

# PT-BR Voice AI for Customer Service

Category: Voice AI / Generative AI. Status: in progress.

## Problem
Voice customer service in Portuguese suffers from poor transcription (accents,
noise, slang) and latency, and good solutions are expensive and English-first.

## What was done
A Brazilian-Portuguese voice pipeline: ASR with Whisper fine-tuned on noisy
Brazilian speech, a RAG agent that reuses the customer-service domain, and
natural TTS, with streaming and barge-in, in near real time.

## Architecture
Audio (WebRTC) -> voice activity detection (VAD) -> fine-tuned Whisper ASR ->
RAG agent -> streaming TTS.

## Technologies
Whisper (fine-tuned), faster-whisper, Piper TTS, VAD, WebRTC, LangChain.

## Result
Word error rate reduced from 21% to 11% after fine-tuning; speech-to-speech
latency of 1.4 seconds; TTS naturalness (MOS) of 4.1.

## Deliverable
An in-browser voice demo, the repository, and before/after audio samples.
