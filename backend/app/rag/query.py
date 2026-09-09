"""Lightweight query normalization / expansion for the offline embedder.

Short natural-language questions ("Where has Pedro worked?") share few literal
words with the source documents, which a hashing embedder struggles to match.
Expanding domain terms and intent words with the vocabulary actually used in the
knowledge base greatly improves recall. This only affects the vector used for
search — never the text shown to the user or the LLM.
"""
from __future__ import annotations

import re

# Domain acronyms / tools -> spelled-out or related vocabulary.
_TERM_EXPANSIONS = {
    "rag": "retrieval augmented generation embeddings vector database grounded",
    "llm": "large language model generative ai",
    "llms": "large language models generative ai",
    "nlp": "natural language processing text classification",
    "cv": "computer vision",
    "ml": "machine learning",
    "api": "api rest integration",
    "apis": "apis rest integration",
    "aws": "aws cloud",
    "kpi": "kpis metrics resolution fallback handoff satisfaction",
    "kpis": "kpis metrics resolution fallback handoff satisfaction",
    "aguilahub": "aguilahub machine learning engineer consultancy chatbots assistants",
    "garza": "garza fintech financial market intern",
    "itau": "itau bank customer service support",
    "ufv": "universidade federal vicosa research teaching",
}

# Intent words in questions -> vocabulary used across the knowledge base, so a
# question like "where has he worked" reaches the experience documents.
_INTENT_EXPANSIONS = {
    "worked": "experience work company role job employer",
    "work": "experience work company role job employer",
    "job": "experience work company role employer",
    "jobs": "experience work company role employer",
    "company": "experience company employer role",
    "companies": "experience company employer role",
    "experience": "experience work company role responsibilities",
    "career": "experience work company role history",
    "awards": "award best paper wvc wsis research recognition",
    "award": "award best paper wvc wsis research recognition",
    "prize": "award best paper research recognition",
    "prizes": "award best paper research recognition",
    "education": "education degree university bachelor information systems ufv",
    "study": "education degree university bachelor ufv",
    "studied": "education degree university bachelor ufv",
    "degree": "education degree university bachelor ufv",
    "university": "education university ufv bachelor degree",
    "graduate": "education degree university graduation ufv",
    "certifications": "certifications certificate harvard cs50 google generative ai",
    "certification": "certifications certificate harvard cs50 google generative ai",
    "certificate": "certifications certificate harvard cs50 google generative ai",
    "skills": "skills technologies tools competencies",
    "skill": "skills technologies tools competencies",
    "technologies": "technologies tools skills stack",
    "technology": "technologies tools skills stack",
    "stack": "technologies tools skills stack",
    "projects": "projects full list overview all projects work computer vision mlops research solutions",
    "project": "projects full list overview all projects work solutions",
    "chatbot": "chatbot assistant conversational rag customer service",
    "chatbots": "chatbots assistants conversational rag customer service",
    "assistant": "assistant chatbot conversational rag",
    "assistants": "assistants chatbots conversational rag",
    "research": "research deep learning paper award ufv",
    "recruiter": "summary profile experience skills technologies projects",
    "summary": "summary profile experience skills technologies projects",
    "summarize": "summary profile experience skills technologies projects",
    "profile": "summary profile experience skills technologies",
    "background": "experience education profile summary skills",
    "finance": "financial market fintech garza",
    "financial": "financial market fintech garza",
    "banking": "bank itau customer service",
    "bank": "bank itau customer service",
    "teaching": "teaching assistant ufv mini-course students research",
    "teach": "teaching assistant ufv mini-course students",
    "hire": "experience skills technologies projects recruiter fit",
    "fit": "experience skills technologies projects recruiter",
    # Portuguese intent words -> knowledge-base vocabulary.
    "quem": "pedro campos machine learning engineer perfil sobre resumo",
    "sobre": "pedro campos perfil sobre resumo machine learning engineer",
    "perfil": "pedro campos perfil resumo sobre experiencia competencias",
    "trabalhou": "experiencia trabalho empresa cargo aguilahub garza itau",
    "trabalha": "experiencia trabalho empresa cargo aguilahub garza",
    "trabalho": "experiencia trabalho empresa cargo",
    "empresa": "experiencia empresa cargo aguilahub garza itau",
    "empresas": "experiencia empresa cargo aguilahub garza itau",
    "experiencia": "experiencia trabalho empresa cargo responsabilidades",
    "profissional": "experiencia profissional trabalho empresa cargo",
    "formacao": "educacao formacao universidade bacharelado sistemas informacao ufv",
    "educacao": "educacao formacao universidade bacharelado ufv",
    "estudou": "educacao formacao universidade bacharelado ufv",
    "premios": "premio melhor artigo wvc wsis pesquisa reconhecimento",
    "premio": "premio melhor artigo wvc wsis pesquisa reconhecimento",
    "artigos": "premio artigo wvc wsis pesquisa publicacao",
    "artigo": "premio artigo wvc wsis pesquisa publicacao",
    "tecnologias": "tecnologias ferramentas competencias stack",
    "tecnologia": "tecnologias ferramentas competencias stack",
    "competencias": "competencias tecnologias habilidades skills",
    "habilidades": "competencias tecnologias habilidades skills",
    "projetos": "projetos lista completa todos os projetos overview trabalhos chatbots assistentes visao computacional mlops pesquisa",
    "projeto": "projetos lista completa todos os projetos overview trabalhos solucoes",
    "todos": "todos os projetos lista completa overview projetos",
    "lista": "lista completa todos os projetos overview projetos",
    "liste": "lista completa todos os projetos overview projetos",
    "all": "all projects full list overview projects",
    "list": "all projects full list overview projects",
    "certificacoes": "certificacoes certificado harvard cs50 google",
    "certificacao": "certificacoes certificado harvard cs50 google",
    "resumo": "resumo perfil experiencia competencias tecnologias projetos",
    "resuma": "resumo perfil experiencia competencias tecnologias projetos",
    "pesquisa": "pesquisa deep learning artigo premio ufv",
    "pedro": "pedro campos machine learning engineer perfil",
    "campos": "pedro campos machine learning engineer perfil",
    # Computer vision (PT + EN) -> the CV/agro/edge projects.
    "visao": "visao computacional imagem segmentacao yolo agro edge inference",
    "computacional": "visao computacional imagem segmentacao yolo agro",
    "imagem": "visao computacional imagem segmentacao yolo",
    "imagens": "visao computacional imagem segmentacao yolo",
    "vision": "computer vision image segmentation yolo agro edge",
    "yolo": "yolo segmentation computer vision agro weed detection",
    "segmentacao": "segmentacao yolo visao computacional agro",
    "agro": "agro agrovision yolo segmentacao daninhas edge",
    "edge": "edge inference onnx tensorrt embedded offline",
    "mlops": "mlops mlflow deploy monitoramento drift serving pipeline",
    "voz": "voz asr whisper tts atendimento fala",
    "voice": "voice asr whisper tts speech",
    "recomendacao": "recomendacao two-tower recall recommender",
    "credito": "credito risco explicavel calibracao shap justica",
}

# When a question is about Pedro in general (identity/bio) or expansion found
# nothing, we inject the profile vocabulary so the about/resume docs are reached.
_IDENTITY_HINT = (
    "pedro campos machine learning engineer perfil sobre resumo experiencia "
    "profile about summary experience"
)
_IDENTITY_TRIGGERS = {"quem", "who", "pedro", "campos", "sobre", "about", "perfil", "profile"}

_ALL = {**_TERM_EXPANSIONS, **_INTENT_EXPANSIONS}
_TOKEN = re.compile(r"[a-z0-9]+")


def expand_query(query: str) -> str:
    tokens = _TOKEN.findall(query.lower())
    extra: list[str] = []
    for tok in tokens:
        if tok in _ALL:
            extra.append(_ALL[tok])

    # Identity/bio questions, or queries with no strong signal, get the profile
    # vocabulary so retrieval reliably reaches the "about"/"resume" documents.
    if any(t in _IDENTITY_TRIGGERS for t in tokens) or not extra:
        extra.append(_IDENTITY_HINT)

    return query + " " + " ".join(extra) if extra else query
