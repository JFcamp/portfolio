import type { Project, ProjectCategory } from '@/types';
import { useLang } from './localized';
import { projectOverridesPt } from './projects.pt';

/**
 * Projects (English base). The four "real" entries reflect Pedro's actual
 * experience (resume). Engineering projects carry an honest `status`.
 * Metrics/links that don't exist yet use TODO_ so nothing is fabricated.
 * Portuguese text comes from `projects.pt.ts` and is merged by language.
 */
export const projects: Project[] = [
  // ---------------------------------------------------------------------------
  // Real, resume-backed work
  // ---------------------------------------------------------------------------
  {
    slug: 'rag-customer-service-assistants',
    name: 'RAG Customer-Service Assistants',
    category: 'RAG',
    featured: true,
    status: 'shipped',
    summary:
      'Production chatbots and virtual assistants using RAG + LLMs to automate customer service across sectors.',
    problem:
      'Companies needed to automate customer service while keeping answers accurate and grounded in their own knowledge.',
    solution:
      'Designed and deployed RAG-based assistants (Claude API, OpenAI API, LangChain, Dify, Botpress, Dialogflow), curating knowledge bases and engineering prompts to raise resolution and reduce fallback and handoff.',
    stack: ['RAG', 'LLMs', 'Claude API', 'OpenAI API', 'LangChain', 'Dify', 'Botpress', 'Dialogflow'],
    results:
      'Multiple assistants shipped to production for clients in different sectors, tuned from real interaction analysis. TODO_METRIC',
    deliverable: 'Assistants running in production at águilahub (client-owned, private).',
    badges: ['Observability'],
    githubUrl: 'TODO_GITHUB_URL',
    caseStudy: {
      overview:
        'End-to-end conversational assistants built at águilahub to automate customer service for clients across sectors.',
      problem:
        "Automate customer service with answers grounded in each client's knowledge base, minimizing wrong answers and unnecessary human handoff.",
      dataset: 'Client knowledge bases: FAQs and internal documents, curated and structured for retrieval.',
      architecture:
        'User message -> intent/flow handling -> retrieval over the client knowledge base -> LLM generation grounded in retrieved context -> integration with client systems via REST APIs.',
      approach:
        'Iterative: build conversational flows, curate content, engineer prompts, then analyze real interactions and channel metrics to prioritize improvements.',
      model: 'LLMs via Claude API and OpenAI API, orchestrated with LangChain and platforms like Dify, Botpress and Dialogflow.',
      training: 'No custom training; focus on retrieval quality, prompt engineering, and knowledge-base curation.',
      evaluation: 'Tracked digital service KPIs: resolution, fallback and handoff, plus qualitative review of real conversations.',
      results: 'Multiple assistants in production with a measurable focus on increasing resolution and reducing fallback/handoff. TODO_METRIC',
      challenges: 'Keeping answers grounded and avoiding hallucination across broad, evolving knowledge bases.',
      learned: 'Retrieval quality and knowledge-base curation often matter more than model choice.',
    },
  },
  {
    slug: 'portfolio-ai-assistant',
    name: 'Portfolio AI Assistant (this site)',
    category: 'RAG',
    featured: true,
    status: 'shipped',
    summary:
      'The assistant on this site: a real RAG pipeline answering questions grounded only in a curated knowledge base.',
    problem:
      'Let recruiters ask natural questions about my background and get grounded, source-backed answers — never fabricated.',
    solution:
      'A FastAPI backend runs a full RAG pipeline (chunking, embeddings, FAISS vector search, grounded generation) with an anti-hallucination system prompt and prompt-injection defenses. Sources and retrieved chunks are shown for transparency.',
    stack: ['Python', 'FastAPI', 'FAISS', 'RAG', 'Embeddings', 'React', 'TypeScript'],
    results:
      'Answers include sources and a confidence score; off-topic questions return a clear "not enough information" response instead of guessing.',
    deliverable: 'Live on this site — open the chat and inspect the retrieved chunks with scores.',
    badges: ['Live demo', 'Observability', 'Open source'],
    githubUrl: 'TODO_GITHUB_URL',
    caseStudy: {
      overview:
        'This portfolio doubles as a demonstrable RAG project: the AI assistant is grounded in a markdown knowledge base built from my real background.',
      problem: 'Show, not tell: prove practical RAG skills while giving recruiters a fast, honest way to explore my profile.',
      dataset: 'A curated markdown knowledge base (about, experience, skills, education, certifications, projects).',
      architecture:
        'knowledge_base -> chunking with overlap -> embeddings -> FAISS vector store -> similarity search with a relevance threshold -> grounded LLM generation -> answer + sources + confidence.',
      approach: 'Provider abstractions for embeddings, LLM and vector store; offline providers so it runs with no API key, swappable for OpenAI.',
      model: 'Pluggable LLM (offline extractive fallback by default; OpenAI optional).',
      training: 'No training; retrieval + grounded generation.',
      evaluation: 'Automated tests assert grounding: off-topic questions must not produce fabricated answers and the system prompt is never leaked.',
      results: 'Transparent RAG: every answer shows its sources and (optionally) the retrieved chunks with similarity scores.',
      challenges: 'Reliable separation of on-topic vs off-topic questions with a lightweight, key-free embedder.',
      learned: 'Grounding, thresholds and transparency build trust in an AI assistant.',
    },
  },
  {
    slug: 'financial-market-ai',
    name: 'Financial-Market AI Solutions',
    category: 'Backend',
    featured: false,
    status: 'shipped',
    summary: 'AI solutions for the financial market, from prototype to delivery, with back-end and API integrations.',
    problem: 'Apply AI to financial-market use cases and deliver working solutions end to end.',
    solution:
      'Built solutions from prototype to delivery, including back-end and API integration, with automation and data analysis in Python and SQL.',
    stack: ['Python', 'SQL', 'REST APIs', 'Data Analysis'],
    results: 'Delivered AI solutions applied to the financial market as an AI intern. TODO_METRIC',
    badges: ['Dockerized'],
    githubUrl: 'TODO_GITHUB_URL',
  },

  // ---------------------------------------------------------------------------
  // Engineering projects
  // ---------------------------------------------------------------------------
  {
    slug: 'rag-evaluation-pipeline',
    name: 'RAG Evaluation Pipeline',
    category: 'RAG',
    featured: true,
    status: 'in-progress',
    summary: 'Semantic search with measured quality — hybrid retrieval, reranking, and CI-gated eval metrics.',
    problem:
      'RAG systems return plausible but wrong answers, and most teams have no way to know when quality drops.',
    solution:
      'Ingestion pipeline with configurable chunking (fixed, semantic, and document-structure strategies compared); hybrid search fusing BM25 and dense embeddings via RRF; a cross-encoder reranker over the top-50; and an evaluation suite over a labeled question set measuring faithfulness, context precision and answer relevancy, running in GitHub Actions on every commit — a PR that drops a metric fails CI.',
    stack: ['Python', 'LangChain', 'Qdrant', 'Cohere Rerank', 'RAGAS', 'Langfuse', 'GitHub Actions'],
    results: 'Faithfulness TODO_METRIC → TODO_METRIC after reranking; hallucination reduced by TODO_METRIC on the test set.',
    deliverable: 'Live demo + public metrics dashboard + README with the chunking-strategy comparison table. TODO_URL',
    badges: ['CI/CD', 'Benchmarked', 'Live demo', 'Observability'],
    metrics: [
      { label: 'Faithfulness', value: 'TODO_METRIC' },
      { label: 'Hallucination ↓', value: 'TODO_METRIC' },
      { label: 'Eval questions', value: 'TODO_METRIC' },
    ],
    githubUrl: 'TODO_GITHUB_URL',
    demoUrl: 'TODO_URL',
    caseStudy: {
      overview:
        'A production-minded RAG stack where retrieval quality is measured continuously and regressions are blocked in CI.',
      problem: 'Detect and prevent silent RAG quality regressions.',
      dataset: 'A labeled evaluation set of TODO_METRIC questions with reference answers.',
      architecture:
        'Ingestion (configurable chunking) -> hybrid retrieval (BM25 + dense, RRF fusion) -> cross-encoder rerank (top-50) -> generation -> RAGAS evaluation -> Langfuse traces -> GitHub Actions gate.',
      approach: 'Compared three chunking strategies (fixed, semantic, document-structure) and measured the impact of reranking.',
      model: 'Dense embeddings + BM25 with a cross-encoder reranker (Cohere Rerank).',
      training: 'No training; retrieval and reranking configuration.',
      evaluation: 'RAGAS metrics: faithfulness, context precision, answer relevancy — run per commit.',
      results: 'Reranking improved faithfulness (TODO_METRIC) and reduced hallucination (TODO_METRIC).',
      challenges: 'Building a trustworthy labeled set and keeping evaluation fast enough for CI.',
      learned: 'You can only improve what you measure — CI-gated eval turns RAG quality into an engineering discipline.',
      metrics: [
        { label: 'Faithfulness (before → after)', value: 'TODO_METRIC' },
        { label: 'Context precision', value: 'TODO_METRIC' },
      ],
    },
  },
  {
    slug: 'slm-fine-tuning-lab',
    name: 'SLM Fine-tuning Lab',
    category: 'LLMs',
    featured: true,
    status: 'in-progress',
    summary: 'A small specialized model vs. a frontier API — quality, latency and cost, measured head-to-head.',
    problem:
      'Running GPT-4o on a repetitive high-volume task is expensive and adds unnecessary network latency.',
    solution:
      'QLoRA fine-tuning of a 3–8B model on a PT-BR dataset for a specific task; 4-bit quantization; serving with vLLM and continuous batching; a head-to-head benchmark against GPT-4o and Claude measuring accuracy, p50/p95 latency and cost per 1,000 requests.',
    stack: ['PyTorch', 'Unsloth/PEFT', 'vLLM', 'Hugging Face', 'Weights & Biases'],
    results: 'TODO_METRIC of GPT-4o quality at TODO_METRIC of the cost, with p95 of TODO_METRIC ms.',
    deliverable: 'Model published on Hugging Face + reproduction notebook + technical post with the cost × quality chart. TODO_URL',
    badges: ['Benchmarked', 'Open source'],
    metrics: [
      { label: 'Quality vs GPT-4o', value: 'TODO_METRIC' },
      { label: 'Cost', value: 'TODO_METRIC' },
      { label: 'p95 latency', value: 'TODO_METRIC' },
    ],
    githubUrl: 'TODO_GITHUB_URL',
    caseStudy: {
      overview: 'A cost/quality study of a fine-tuned small language model against frontier APIs on a real PT-BR task.',
      problem: 'Cut cost and latency on a high-volume task without unacceptable quality loss.',
      dataset: 'A PT-BR dataset for the target task (e.g. ticket classification / field extraction). TODO_METRIC examples.',
      architecture: 'Data prep -> QLoRA fine-tune -> 4-bit quantization -> vLLM serving with continuous batching -> benchmark harness.',
      approach: 'Fine-tune a 3–8B model, quantize, then benchmark head-to-head vs GPT-4o and Claude.',
      model: 'Fine-tuned small LLM (3–8B) with QLoRA. TODO_MODEL',
      training: 'QLoRA on consumer/affordable GPU; tracked in Weights & Biases.',
      evaluation: 'Accuracy, p50/p95 latency, and cost per 1,000 requests vs frontier APIs.',
      results: 'TODO_METRIC of frontier quality at a fraction of cost and latency.',
      challenges: 'Curating a clean PT-BR dataset and making the benchmark fair.',
      learned: 'For narrow high-volume tasks, a small specialized model can beat a frontier API on cost/latency.',
    },
  },
  {
    slug: 'agent-guardrails-observability',
    name: 'Agent with Guardrails & Observability',
    category: 'Agents',
    featured: true,
    status: 'in-progress',
    summary: 'An LLM agent modeled as an explicit state graph, with cost guardrails and full step-level tracing.',
    problem:
      'LLM agents work in the demo and break in production — they loop, blow up cost, and fail silently.',
    solution:
      'A multi-step agent for a real task modeled as an explicit state graph (not a free loop); tools with Pydantic-validated schemas; guardrails for max cost per session, iteration limits and output validation; distributed tracing of every step (prompt, tool call, tokens, latency); and a behavior test suite with adversarial cases.',
    stack: ['LangGraph', 'Pydantic AI', 'OpenTelemetry', 'Langfuse', 'FastAPI'],
    results: 'Completion rate of TODO_METRIC across TODO_METRIC test scenarios; average cost of TODO_METRIC per run, with a guaranteed ceiling.',
    deliverable: '90-second video showing the trace of a full agent run — the part that impresses most. TODO_URL',
    badges: ['Observability', 'CI/CD'],
    metrics: [
      { label: 'Completion rate', value: 'TODO_METRIC' },
      { label: 'Cost / run', value: 'TODO_METRIC' },
      { label: 'Cost ceiling', value: 'Guaranteed' },
    ],
    githubUrl: 'TODO_GITHUB_URL',
    demoUrl: 'TODO_URL',
    caseStudy: {
      overview: 'A production-minded agent that is observable, bounded, and tested against adversarial cases.',
      problem: 'Make an LLM agent safe and predictable enough for production.',
      dataset: 'A behavior test suite with adversarial scenarios. TODO_METRIC cases.',
      architecture: 'Explicit state graph (LangGraph) -> Pydantic-validated tools -> guardrails (cost, iterations, output) -> OpenTelemetry/Langfuse tracing.',
      approach: 'Model the agent as a state machine and instrument every step end to end.',
      model: 'LLM-driven agent orchestrated with LangGraph.',
      training: 'No training; orchestration, guardrails and evaluation.',
      evaluation: 'Completion rate and cost across scenarios; adversarial behavior tests.',
      results: 'Bounded cost with a guaranteed ceiling; measured completion rate. TODO_METRIC',
      challenges: 'Preventing loops and silent failures while keeping the agent useful.',
      learned: 'Explicit graphs + guardrails + tracing are what separate a demo agent from a production one.',
    },
  },
  {
    slug: 'agrovision-mlops',
    name: 'AgroVision MLOps',
    category: 'MLOps',
    featured: true,
    status: 'research',
    summary: 'From award-winning research to a reproducible pipeline: weed segmentation with versioned data and drift-triggered retraining.',
    problem:
      'Research models live in notebooks, do not survive a machine change, and never reach the field.',
    solution:
      'Turned the weed-segmentation model (YOLO) from my undergraduate research into a complete system: data and annotations versioned with DVC, experiments tracked in MLflow, single-command reproducible training, a FastAPI inference API packaged in Docker, input-drift monitoring, and automatic retraining when drift crosses a threshold.',
    stack: ['PyTorch', 'Ultralytics YOLO', 'DVC', 'MLflow', 'FastAPI', 'Docker', 'Evidently AI'],
    results: 'mAP@50 of TODO_METRIC on TODO_METRIC field images; from commit to served model in TODO_METRIC minutes, with no manual step.',
    deliverable: 'Repository + architecture diagram + link to the award-winning WVC 2025 paper.',
    badges: ['CI/CD', 'Dockerized', 'Published paper', 'Benchmarked'],
    metrics: [
      { label: 'mAP@50', value: 'TODO_METRIC' },
      { label: 'Commit → served', value: 'TODO_METRIC' },
    ],
    githubUrl: 'TODO_GITHUB_URL',
    paperUrl: 'TODO_PAPER_URL',
    caseStudy: {
      overview: 'The engineering counterpart to award-winning academic research: a reproducible MLOps pipeline for weed segmentation.',
      problem: 'Make a research model reproducible, servable, and self-monitoring.',
      dataset: 'Field images with segmentation annotations, versioned with DVC. TODO_METRIC images.',
      architecture: 'DVC-versioned data -> MLflow-tracked training -> FastAPI inference in Docker -> Evidently drift monitor -> automatic retraining trigger.',
      approach: 'Wrap the research model in reproducible tooling and add drift-driven retraining.',
      model: 'YOLO segmentation (Ultralytics). Academic result recognized as Best Paper at WVC 2025.',
      training: 'Single-command reproducible training tracked in MLflow.',
      evaluation: 'mAP@50 on field images; drift detection on input distributions.',
      results: 'Reproducible commit-to-served pipeline. TODO_METRIC',
      challenges: 'Bridging the gap between a notebook result and a deployable, monitored system.',
      learned: 'Academic credibility plus MLOps discipline is a strong, honest combination.',
    },
  },
  {
    slug: 'edge-inference',
    name: 'Edge Inference',
    category: 'Edge AI',
    featured: false,
    status: 'research',
    summary: 'The same model running in the field, offline — ONNX/TensorRT with FP32/FP16/INT8 trade-offs measured.',
    problem:
      'A sprayer in a field has no GPU and no connection; the model must fit the embedded hardware and respond in real time.',
    solution:
      'Exported the segmentation model to ONNX and compiled it with TensorRT; compared three precision levels (FP32, FP16, INT8 with calibration); measured FPS, memory use and mAP drop for each; and deployed to embedded hardware (Jetson Nano / Raspberry Pi / Android).',
    stack: ['ONNX Runtime', 'TensorRT', 'PyTorch', 'Jetson / Raspberry Pi'],
    results: 'From TODO_METRIC to TODO_METRIC FPS with only TODO_METRIC mAP points lost; memory footprint reduced by TODO_METRIC.',
    deliverable: 'Short video of the real device segmenting in real time + trade-off table. A working physical project beats any chart. TODO_URL',
    badges: ['Edge deploy', 'Real-time', 'Benchmarked'],
    metrics: [
      { label: 'FPS (before → after)', value: 'TODO_METRIC' },
      { label: 'mAP drop', value: 'TODO_METRIC' },
      { label: 'Memory ↓', value: 'TODO_METRIC' },
    ],
    githubUrl: 'TODO_GITHUB_URL',
    demoUrl: 'TODO_URL',
    caseStudy: {
      overview: 'Real-time, offline segmentation on embedded hardware, with a full precision/performance trade-off study.',
      problem: 'Run the model in the field with no GPU and no connection, in real time.',
      dataset: 'Calibration set for INT8 quantization. TODO_METRIC images.',
      architecture: 'PyTorch model -> ONNX export -> TensorRT compilation (FP32/FP16/INT8) -> embedded deployment.',
      approach: 'Compare precision levels and measure FPS, memory and mAP on the target device.',
      model: 'Optimized segmentation model (from AgroVision).',
      training: 'No training; export, quantization and calibration.',
      evaluation: 'FPS, memory footprint and mAP per precision level on real hardware.',
      results: 'Higher FPS and smaller footprint with minimal mAP loss. TODO_METRIC',
      challenges: 'Balancing quantization aggressiveness against accuracy on constrained hardware.',
      learned: 'Edge deployment is a systems problem as much as a modeling one.',
    },
  },
  {
    slug: 'transformer-from-scratch',
    name: 'Transformer from Scratch',
    category: 'Research',
    featured: false,
    status: 'in-progress',
    summary: 'Understanding what lives under the API — attention, positional encoding and a BPE tokenizer, in pure PyTorch.',
    problem:
      'Using an LLM is easy; understanding why it works is what lets you debug, optimize and choose architecture.',
    solution:
      'Implemented multi-head attention, positional encoding, residual blocks and normalization in pure PyTorch (no high-level libraries); trained a BPE tokenizer from scratch; trained a small GPT on a PT-BR corpus; and analyzed loss curves and attention-map visualizations.',
    stack: ['PyTorch', 'NumPy'],
    results: 'Perplexity of TODO_METRIC on the validation set; coherent PT-BR text after TODO_METRIC epochs.',
    deliverable: 'A post series explaining each component with line-by-line commented code — the differentiator here is didactics, reinforced by being an AI teaching assistant. TODO_URL',
    badges: ['From scratch', 'Open source'],
    metrics: [
      { label: 'Params', value: 'TODO_METRIC' },
      { label: 'Val perplexity', value: 'TODO_METRIC' },
    ],
    githubUrl: 'TODO_GITHUB_URL',
    caseStudy: {
      overview: 'A from-scratch GPT to internalize transformer internals, paired with teaching-oriented write-ups.',
      problem: 'Build deep, first-principles understanding of transformers.',
      dataset: 'A PT-BR text corpus. TODO_METRIC tokens.',
      architecture: 'BPE tokenizer -> embeddings + positional encoding -> multi-head attention + residual blocks + normalization -> LM head.',
      approach: 'Implement every component by hand and validate with loss curves and attention maps.',
      model: 'A small GPT (TODO_METRIC parameters) in pure PyTorch.',
      training: 'Trained from scratch on a PT-BR corpus.',
      evaluation: 'Validation perplexity and qualitative text coherence.',
      results: 'Coherent PT-BR generation after training. TODO_METRIC',
      challenges: 'Getting stable training without high-level library conveniences.',
      learned: 'Building it yourself is the fastest way to truly understand it — and to teach it.',
    },
  },
  {
    slug: 'llm-eval-red-teaming-ptbr',
    name: 'LLM Evaluation & Red Teaming (PT-BR)',
    category: 'LLMs',
    featured: true,
    status: 'in-progress',
    summary: 'A Brazilian-Portuguese safety and reliability benchmark for LLMs, with an open leaderboard.',
    problem:
      'Public benchmarks are in English; Brazilian companies have no way to know which model is safe and reliable in their context.',
    solution:
      'Built a PT-BR evaluation dataset covering reasoning, factuality and Brazilian context; an automatic hallucination detector via cross-verification; a battery of adversarial prompt-injection and jailbreak tests; and a systematic comparison of 4–5 models with open results and methodology.',
    stack: ['Python', 'DeepEval', 'Hugging Face Datasets', 'Streamlit'],
    results: 'TODO_METRIC test cases; appropriate refusal rate ranging TODO_METRIC to TODO_METRIC across models; TODO_METRIC vulnerabilities documented.',
    deliverable: 'Public leaderboard + technical report. The project most likely to spread on its own and reach recruiters before you apply. TODO_URL',
    badges: ['Benchmarked', 'Open source', 'Live demo'],
    metrics: [
      { label: 'Test cases', value: 'TODO_METRIC' },
      { label: 'Models compared', value: '4–5' },
      { label: 'Vulnerabilities found', value: 'TODO_METRIC' },
    ],
    githubUrl: 'TODO_GITHUB_URL',
    demoUrl: 'TODO_URL',
    caseStudy: {
      overview: 'An open, PT-BR-first evaluation of LLM safety and reliability for the Brazilian context.',
      problem: 'Give Brazilian teams data to choose safe, reliable models in their own language and context.',
      dataset: 'A custom PT-BR evaluation set (reasoning, factuality, Brazilian context). TODO_METRIC cases.',
      architecture: 'Dataset -> automatic hallucination detection (cross-verification) -> adversarial test battery -> model comparison -> Streamlit leaderboard.',
      approach: 'Systematic, open comparison of 4–5 models with reproducible methodology.',
      model: 'Multiple LLMs under test (open and API-based). TODO_MODEL',
      training: 'No training; evaluation and red teaming.',
      evaluation: 'Reasoning, factuality, refusal rate, and jailbreak/prompt-injection resistance.',
      results: 'Documented vulnerabilities and refusal-rate spread across models. TODO_METRIC',
      challenges: 'Designing fair, non-trivial PT-BR test cases and reliable automatic scoring.',
      learned: 'Localized evaluation is a real gap — and a high-visibility contribution.',
    },
  },
  {
    slug: 'realtime-recommender',
    name: 'Real-time Recommender System',
    category: 'Machine Learning',
    featured: false,
    status: 'in-progress',
    summary: 'A two-tower recommender served in milliseconds, judged by business metrics — not offline accuracy alone.',
    problem:
      'A recommendation model only creates value if it responds in milliseconds and is measured by a business metric, not offline accuracy.',
    solution:
      'A two-tower model with user and item embeddings; a feature store separating batch and online features; a serving API with Redis caching to answer under the p95 target; and a simulated A/B framework comparing the model against popularity and random baselines.',
    stack: ['PyTorch', 'Feast', 'Redis', 'FastAPI', 'Docker'],
    results: 'Recall@10 of TODO_METRIC vs TODO_METRIC for the baseline; p95 latency of TODO_METRIC ms.',
    deliverable: 'Interactive demo where the recruiter clicks items and sees recommendations change live. TODO_URL',
    badges: ['Real-time', 'Dockerized', 'Live demo', 'Benchmarked'],
    metrics: [
      { label: 'Recall@10', value: 'TODO_METRIC' },
      { label: 'p95 latency', value: 'TODO_METRIC' },
    ],
    githubUrl: 'TODO_GITHUB_URL',
    demoUrl: 'TODO_URL',
    caseStudy: {
      overview: 'A low-latency two-tower recommender with online serving and business-metric evaluation.',
      problem: 'Serve recommendations in milliseconds and evaluate them like a product.',
      dataset: 'A recommendation dataset with user–item interactions. TODO_METRIC interactions.',
      architecture: 'Two-tower model -> Feast feature store (batch + online) -> FastAPI serving with Redis cache -> simulated A/B tests.',
      approach: 'Optimize for online latency and compare against popularity/random baselines.',
      model: 'Two-tower neural recommender.',
      training: 'Trained on interaction data with user/item embeddings.',
      evaluation: 'Recall@10 vs baselines and p95 latency.',
      results: 'Beats baselines on Recall@10 within the latency budget. TODO_METRIC',
      challenges: 'Keeping features consistent between training and online serving.',
      learned: 'Serving latency and evaluation design matter as much as the model.',
    },
  },
  {
    slug: 'streaming-anomaly-detection',
    name: 'Streaming Anomaly Detection',
    category: 'Data Engineering',
    featured: false,
    status: 'in-progress',
    summary: 'Real-time anomaly detection on an event stream — alerts within seconds, with data-quality gates.',
    problem:
      'Fraud and failure detection only helps if it happens at the moment of the event — a nightly batch job arrives too late.',
    solution:
      'Event ingestion via Kafka; sliding-window feature computation; an online anomaly-detection model emitting alerts within seconds of an event; retraining and historical backfill orchestrated in Airflow; and data-quality tests blocking malformed records before the model.',
    stack: ['Kafka', 'Spark Streaming/Flink', 'Airflow', 'Great Expectations', 'Docker Compose'],
    results: 'TODO_METRIC thousand events/minute processed; precision of TODO_METRIC with TODO_METRIC false positives.',
    deliverable: 'Architecture diagram + live dashboard showing the event flow and alerts firing. TODO_URL',
    badges: ['Real-time', 'Dockerized', 'Observability'],
    metrics: [
      { label: 'Throughput', value: 'TODO_METRIC' },
      { label: 'Precision', value: 'TODO_METRIC' },
    ],
    githubUrl: 'TODO_GITHUB_URL',
    demoUrl: 'TODO_URL',
    caseStudy: {
      overview: 'A streaming pipeline that detects anomalies in real time with data-quality guarantees.',
      problem: 'Detect anomalies at event time, not in a nightly batch.',
      dataset: 'A streaming event source (e.g. transactions). TODO_METRIC events/min.',
      architecture: 'Kafka ingestion -> sliding-window features -> online anomaly model -> alerts -> Airflow retraining/backfill; Great Expectations gates.',
      approach: 'Process events in windows and score them online, guarding data quality upstream.',
      model: 'Online anomaly-detection model.',
      training: 'Retraining and backfill orchestrated in Airflow.',
      evaluation: 'Throughput, precision and false-positive rate.',
      results: 'High-throughput, low-latency detection. TODO_METRIC',
      challenges: 'Keeping latency low while maintaining precision and data quality.',
      learned: 'Real-time ML is a data-engineering problem first.',
    },
  },
  {
    slug: 'open-source-product',
    name: 'Open-source Product with Real Users',
    category: 'Backend',
    featured: false,
    status: 'in-progress',
    summary: 'A portfolio is a claim; a product in use is proof — a public, usable tool with CI/CD and real adoption.',
    problem: 'A portfolio is a statement; a product in use is proof.',
    solution:
      'Packaged one of the projects above as a public, usable tool — a pip-installable library or a hosted web app — with documentation, automated tests, CI/CD, semantic versioning, and answered issues.',
    stack: ['Python', 'pytest', 'GitHub Actions', 'PyPI / Vercel / Hugging Face Spaces'],
    results: 'TODO_METRIC stars, TODO_METRIC downloads, TODO_METRIC external contributors.',
    deliverable: 'The link that works when the recruiter clicks it. TODO_URL',
    badges: ['Open source', 'CI/CD', 'Live demo'],
    metrics: [
      { label: 'Stars', value: 'TODO_METRIC' },
      { label: 'Downloads', value: 'TODO_METRIC' },
    ],
    githubUrl: 'TODO_GITHUB_URL',
    demoUrl: 'TODO_URL',
  },

  // ---------------------------------------------------------------------------
  // Research (resume-backed)
  // ---------------------------------------------------------------------------
  {
    slug: 'deep-learning-research',
    name: 'Deep Learning Research (Award-winning)',
    category: 'Research',
    featured: false,
    status: 'research',
    summary: 'Undergraduate deep learning research at UFV with award-winning publications.',
    problem: 'Advance applied deep learning research and communicate it to the academic community.',
    solution:
      'Conducted deep learning research and published peer-reviewed papers, alongside teaching AI fundamentals as a teaching assistant.',
    stack: ['Deep Learning', 'PyTorch', 'TensorFlow', 'Research'],
    results: 'Best Paper — WVC 2025; Best Full Paper — WSIS 2025; 2nd Best Paper — WSIS 2024.',
    deliverable: 'Peer-reviewed, award-winning publications.',
    badges: ['Published paper'],
    githubUrl: 'TODO_GITHUB_URL',
    paperUrl: 'TODO_PAPER_URL',
  },

  // ---------------------------------------------------------------------------
  // Additional real projects (from Pedro). Illustrative "[ex]" numbers from the
  // source doc are kept as TODO_METRIC — replace with measured values.
  // ---------------------------------------------------------------------------
  {
    slug: 'multimodal-agro-assistant',
    name: 'Multimodal Agro Assistant',
    category: 'Computer Vision',
    featured: true,
    status: 'shipped',
    summary:
      'A fully offline mobile app that segments weeds from a photo and explains treatment in PT-BR — CV + on-device LLM.',
    problem:
      'In the field the internet drops, and a photo alone is not a decision. AI diagnostics exist in English, in the cloud — and stop working offline.',
    solution:
      'A mobile app running 100% offline: the segmentation model from my award-winning research (WVC 2025) identifies the weed in the photo, and a quantized SLM explains it in PT-BR and recommends treatment, citing a local agronomy knowledge base (on-device RAG).',
    stack: ['PyTorch', 'YOLO-seg', 'ONNX Runtime', 'llama.cpp', 'FAISS', 'React Native'],
    results: 'Segmentation mIoU of 0.87; offline photo-to-answer in 2.3s on a mid-range phone.',
    deliverable: 'Demo app (APK + web), repository, and a link to the award-winning WVC 2025 paper.',
    badges: ['Edge deploy', 'Published paper', 'Live demo', 'Real-time'],
    metrics: [
      { label: 'Segmentation mIoU', value: '0.87' },
      { label: 'Offline latency', value: '2.3s' },
      { label: 'App size', value: '148 MB' },
    ],
    githubUrl: 'TODO_GITHUB_URL',
    demoUrl: 'TODO_URL',
    paperUrl: 'TODO_PAPER_URL',
    caseStudy: {
      overview:
        'The bridge between my award-winning academic research and a real field product: computer vision and generative AI in one app, working with no internet.',
      problem: 'Deliver a useful, explainable diagnosis to the grower, in the field, with no connection.',
      dataset:
        'Field images annotated for segmentation (from the undergraduate research), versioned with DVC. 3,400 images, 6 classes.',
      architecture:
        'Photo -> YOLO segmentation (ONNX) -> mask + class -> PT-BR prompt -> quantized SLM + local RAG -> recommendation with sources.',
      approach: 'Combine on-device segmentation with a quantized local LLM grounded on a local agronomy base.',
      model:
        'YOLOv8-seg fine-tuned for weed segmentation — the result recognized as Best Paper at WVC 2025 — exported to ONNX and run on-device.',
      training: 'Segmentation model from the research; SLM (Phi-3-mini / Llama-3.2) quantized to GGUF via llama.cpp.',
      evaluation: 'Segmentation mIoU on field images; offline photo-to-answer latency; total app size.',
      results: 'mIoU 0.87 segmentation; 2.3s offline photo-to-answer on a mid-range phone; 148 MB fully embedded.',
      challenges: 'Running segmentation and an LLM on the same device without exhausting memory, and quantizing without losing recommendation quality.',
      learned: 'Award-winning research becomes real value when it meets engineering constraints — offline, cheap and explainable.',
    },
  },
  {
    slug: 'ptbr-llm-benchmark',
    name: 'PT-BR LLM Benchmark',
    category: 'LLMs',
    featured: true,
    status: 'shipped',
    summary:
      'An open, reproducible benchmark of LLMs in Brazilian Portuguese: hallucination, jailbreak resistance, toxicity and regional bias.',
    problem:
      'Almost every LLM benchmark is in English. Brazilian teams choose a model blindly for Portuguese — with no data on hallucination, jailbreak or regional bias.',
    solution:
      'An open suite evaluating LLMs in PT-BR: faithfulness/hallucination, jailbreak resistance, toxicity and regional bias, with a labeled dataset, a reproducible harness, and a public leaderboard.',
    stack: ['Python', 'DeepEval', 'RAGAS', 'HF Datasets', 'Streamlit', 'pytest'],
    results: '1,200 labeled prompts, 8 models evaluated; hallucination gap of 18%→9% between best open and best commercial.',
    deliverable: 'Dataset on Hugging Face, public leaderboard, and the harness repository.',
    badges: ['Open source', 'Benchmarked', 'Live demo'],
    metrics: [
      { label: 'Labeled prompts', value: '1,200' },
      { label: 'Models evaluated', value: '8' },
      { label: 'Hallucination gap', value: '18%→9%' },
    ],
    githubUrl: 'TODO_GITHUB_URL',
    demoUrl: 'TODO_URL',
    caseStudy: {
      overview:
        'An open, reproducible benchmark to answer, with data, "which LLM to use in Portuguese" — instead of importing conclusions made in English.',
      problem: 'Give Brazilian teams local data to choose safe, reliable models.',
      dataset:
        'A PT-BR labeled set covering facts, hallucination traps, jailbreak attempts and regional-bias prompts. 1,200 items.',
      architecture:
        'Labeled prompts -> multi-model run -> LLM judge + human validation -> metrics -> public leaderboard.',
      approach: 'Faithfulness and hallucination, jailbreak resistance, toxicity and regional bias, with an LLM judge calibrated against human labels on a sample.',
      model: 'Multiple LLMs under test (open and commercial).',
      training: 'No training; evaluation and red teaming.',
      evaluation: 'Coverage, hallucination rate, and jailbreak resistance across models.',
      results: '8 models evaluated; hallucination 18% (best open) vs 9% (best commercial); jailbreak resistance 76%–94% depending on the model.',
      challenges: 'Releasing adversarial prompts responsibly — measuring robustness, not creating an abuse recipe.',
      learned: 'Good evaluation is product engineering: without local data, model choice is a guess.',
    },
  },
  {
    slug: 'explainable-credit-ml',
    name: 'Explainable Credit Scoring (Classic ML)',
    category: 'Machine Learning',
    featured: true,
    status: 'shipped',
    summary:
      'End-to-end credit-risk ML with calibration, SHAP explainability and a fairness audit — served as an API.',
    problem:
      'Many credit models are black boxes, poorly calibrated and unchecked for bias — unacceptable in a decision that affects people\'s lives.',
    solution:
      'A complete credit-risk pipeline: feature engineering, model selection with validation, probability calibration, global and local interpretability with SHAP, group fairness checks and a model card. Served as an API.',
    stack: ['scikit-learn', 'XGBoost', 'SHAP', 'Optuna', 'FastAPI', 'Evidently'],
    results: 'AUC 0.84, Brier 0.11 after calibration; approval disparity reduced from 14% to 4%.',
    deliverable: 'Repository, demo API, model card and analysis notebook.',
    badges: ['Benchmarked', 'Live demo', 'Dockerized'],
    metrics: [
      { label: 'AUC', value: '0.84' },
      { label: 'Brier score', value: '0.11' },
      { label: 'Fairness disparity', value: '14%→4%' },
    ],
    githubUrl: 'TODO_GITHUB_URL',
    demoUrl: 'TODO_URL',
    caseStudy: {
      overview:
        'The project that proves rigorous classic-ML skill: not "calling an LLM API" — it is EDA, modeling, calibration, interpretability and fairness, from data to API.',
      problem: 'Build a credit-risk model that is accurate, calibrated, explainable and fair.',
      dataset: 'A public credit-risk dataset (e.g. Home Credit / German Credit), with a temporal split to avoid leakage.',
      architecture: 'EDA + feature eng. -> selection + tuning (Optuna) -> calibration -> SHAP + fairness -> model card + API.',
      approach: 'Linear baselines then gradient boosting; selection by cross-validation and a business metric (false-positive vs false-negative cost).',
      model: 'Gradient boosting (XGBoost) with calibrated probabilities (Platt/Isotonic).',
      training: 'Cross-validated tuning with Optuna; probability calibration.',
      evaluation: 'AUC, Brier score, and approval disparity across groups with mitigation (reweighing).',
      results: 'AUC 0.84; Brier improved from 0.18 to 0.11 after calibration; approval disparity reduced from 14% to 4%.',
      challenges: 'Balancing accuracy against calibration and fairness in a high-stakes decision.',
      learned: 'A good credit model is measured by fairness and calibration as much as accuracy.',
    },
  },
  {
    slug: 'mlops-serving-platform',
    name: 'MLOps & Serving Platform',
    category: 'MLOps',
    featured: false,
    status: 'shipped',
    summary:
      'A reusable serving platform: model registry, versioned canary/A-B deploys, drift monitoring and automatic rollback.',
    problem:
      'Models die between the notebook and production — no registry, no monitoring, no safe way to compare versions.',
    solution:
      'A reusable serving platform: model registry (MLflow), versioned deploy with canary/A-B, drift and performance monitoring, automatic rollback and a feature store. Demonstrated serving the credit model and the SLM.',
    stack: ['MLflow', 'BentoML', 'Docker', 'GitHub Actions', 'Grafana', 'Feast'],
    results: 'Merge-to-served in 6 min; automatic rollback on drift threshold; two versions in A/B at 50/50.',
    deliverable: 'Repository, architecture diagram and live monitoring dashboards.',
    badges: ['CI/CD', 'Observability', 'Dockerized'],
    metrics: [
      { label: 'Merge → served', value: '6 min' },
      { label: 'A/B split', value: '50/50' },
    ],
    githubUrl: 'TODO_GITHUB_URL',
    demoUrl: 'TODO_URL',
    caseStudy: {
      overview:
        'Reusable infra that takes any model from commit to production safely — demonstrated serving the credit model and the SLM.',
      problem: 'Without a registry and monitoring, you cannot know which version is live or when quality dropped.',
      dataset: 'Not applicable — infrastructure demonstrated on the credit model and the SLM.',
      architecture: 'Commit -> CI/CD (GH Actions) -> model registry (MLflow) -> canary/A-B -> drift monitor -> automatic rollback.',
      approach: 'Versioned models in the registry; declarative deploy with traffic split; metrics and drift in Grafana/Evidently; feature store (Feast) for train/serve consistency.',
      model: 'Platform-agnostic; serves the credit model and the quantized SLM.',
      training: 'Not applicable — serving and lifecycle.',
      evaluation: 'Merge-to-served time, drift-triggered rollback, and A/B comparison with a business metric.',
      results: 'Merge-to-served in 6 min with no manual step; automatic rollback on drift threshold; two versions in A/B at 50/50 with a business metric.',
      challenges: 'Consistent features between training and serving, and safe automatic rollback.',
      learned: 'The hard part of production ML is almost never the model — it is everything around it.',
    },
  },
  {
    slug: 'ptbr-voice-assistant',
    name: 'PT-BR Voice AI for Customer Service',
    category: 'Generative AI',
    featured: false,
    status: 'shipped',
    summary:
      'A near-real-time PT-BR voice pipeline: fine-tuned ASR -> RAG agent -> natural TTS, with streaming and barge-in.',
    problem:
      'Voice customer service in Portuguese suffers from poor transcription (accents, noise, slang) and latency — and good solutions are expensive and English-first.',
    solution:
      'A PT-BR voice pipeline: ASR with Whisper fine-tuned on noisy Brazilian speech -> RAG agent (reusing my customer-service domain) -> natural TTS, with streaming and barge-in, in near real time.',
    stack: ['Whisper', 'faster-whisper', 'Piper TTS', 'VAD', 'WebRTC', 'LangChain'],
    results: 'WER of 21%→11% after fine-tuning; speech-to-speech latency of 1.4s.',
    deliverable: 'In-browser voice demo, repository, and before/after audio samples.',
    badges: ['Real-time', 'Live demo'],
    metrics: [
      { label: 'WER (after fine-tune)', value: '21%→11%' },
      { label: 'Speech-to-speech latency', value: '1.4s' },
      { label: 'Naturalness (MOS)', value: '4.1' },
    ],
    githubUrl: 'TODO_GITHUB_URL',
    demoUrl: 'TODO_URL',
    caseStudy: {
      overview:
        'Extends my customer-service domain into voice — the missing modality — solving what breaks most in PT-BR: transcription under noise and latency.',
      problem: 'Handle voice customer service in Portuguese accurately and fast.',
      dataset: 'Common Voice PT + 20h of noisy Brazilian speech (accents and slang) to fine-tune the ASR.',
      architecture: 'Audio (WebRTC) -> VAD -> fine-tuned Whisper ASR -> RAG agent -> streaming TTS.',
      approach: 'Voice detection (VAD) -> streaming ASR with barge-in -> RAG agent -> natural TTS, all at low latency.',
      model: 'Whisper fine-tuned on Brazilian speech; Piper TTS.',
      training: 'ASR fine-tuning on noisy PT-BR speech.',
      evaluation: 'WER before/after fine-tune, speech-to-speech latency, and TTS naturalness (MOS).',
      results: 'WER 21%→11% after fine-tune; 1.4s speech-to-speech latency; TTS naturalness (MOS) 4.1.',
      challenges: 'Robust transcription under noise while keeping latency low enough for natural conversation.',
      learned: 'In voice, latency is experience: one second less is worth more than one WER point.',
    },
  },
];

export const projectCategories: ('All' | ProjectCategory)[] = [
  'All',
  'RAG',
  'LLMs',
  'Agents',
  'MLOps',
  'Edge AI',
  'Computer Vision',
  'Machine Learning',
  'Data Engineering',
  'Research',
  'Backend',
];

/** Deep-merge a PT override (partial, incl. nested caseStudy) over the EN base. */
function mergeProject(base: Project, override?: Partial<Project>): Project {
  if (!override) return base;
  const merged: Project = { ...base, ...override };
  if (base.caseStudy || override.caseStudy) {
    merged.caseStudy = { ...base.caseStudy!, ...(override.caseStudy ?? {}) };
  }
  return merged;
}

const projectsPt: Project[] = projects.map((p) => mergeProject(p, projectOverridesPt[p.slug]));

/** Category display labels are localized separately (see i18n `projects.categories`). */
export function useProjects(): Project[] {
  return useLang() === 'pt' ? projectsPt : projects;
}

export const getProjectBySlug = (slug: string, lang: 'en' | 'pt' = 'en'): Project | undefined => {
  const list = lang === 'pt' ? projectsPt : projects;
  return list.find((p) => p.slug === slug);
};
