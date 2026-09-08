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
    "projects": "projects work chatbots assistants research solutions",
    "project": "projects work chatbots assistants research solutions",
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
}

_ALL = {**_TERM_EXPANSIONS, **_INTENT_EXPANSIONS}
_TOKEN = re.compile(r"[a-z0-9]+")


def expand_query(query: str) -> str:
    tokens = _TOKEN.findall(query.lower())
    extra: list[str] = []
    for tok in tokens:
        if tok in _ALL:
            extra.append(_ALL[tok])
    if not extra:
        return query
    return query + " " + " ".join(extra)
