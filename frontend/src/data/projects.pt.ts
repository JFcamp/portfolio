import type { Project } from '@/types';

/**
 * Portuguese overrides for projects, keyed by slug. Only human-readable text is
 * translated; slugs, tech names, badges, categories, metrics values and links
 * stay as-is (merged over the English base in projects.ts).
 */
export const projectOverridesPt: Record<string, Partial<Project>> = {
  'rag-customer-service-assistants': {
    name: 'Assistentes de Atendimento com RAG',
    summary:
      'Chatbots e assistentes virtuais em produção usando RAG + LLMs para automatizar atendimento em diversos setores.',
    problem:
      'Empresas precisavam automatizar o atendimento mantendo respostas precisas e fundamentadas na própria base de conhecimento.',
    solution:
      'Projetei e coloquei em produção assistentes baseados em RAG (Claude API, OpenAI API, LangChain, Dify, Botpress, Dialogflow), com curadoria de bases e engenharia de prompts para aumentar resolução e reduzir fallback e transbordo.',
    results:
      'Vários assistentes em produção para clientes de diferentes setores, ajustados a partir de análise de interações reais. TODO_METRIC',
    deliverable: 'Assistentes rodando em produção na águilahub (propriedade do cliente, privado).',
    caseStudy: {
      overview:
        'Assistentes conversacionais ponta a ponta construídos na águilahub para automatizar atendimento em clientes de vários setores.',
      problem:
        'Automatizar o atendimento com respostas fundamentadas na base de cada cliente, minimizando respostas erradas e transbordo desnecessário.',
      dataset: 'Bases de conhecimento dos clientes: FAQs e documentos internos, curados e estruturados para recuperação.',
      architecture:
        'Mensagem do usuário -> tratamento de intenção/fluxo -> recuperação na base do cliente -> geração da LLM fundamentada no contexto -> integração com sistemas via APIs REST.',
      approach:
        'Iterativo: construir fluxos, curar conteúdo, engenharia de prompts e então analisar interações reais e métricas dos canais para priorizar melhorias.',
      model: 'LLMs via Claude API e OpenAI API, orquestradas com LangChain e plataformas como Dify, Botpress e Dialogflow.',
      training: 'Sem treino próprio; foco em qualidade de recuperação, engenharia de prompts e curadoria de base.',
      evaluation: 'KPIs de atendimento digital: resolução, fallback e transbordo, além de revisão qualitativa de conversas reais.',
      results: 'Vários assistentes em produção com foco mensurável em aumentar resolução e reduzir fallback/transbordo. TODO_METRIC',
      challenges: 'Manter as respostas fundamentadas e evitar alucinação em bases amplas e em constante mudança.',
      learned: 'Qualidade de recuperação e curadoria de base costumam importar mais do que a escolha do modelo.',
    },
  },
  'portfolio-ai-assistant': {
    name: 'Assistente de IA do Portfólio (este site)',
    summary:
      'O assistente deste site: um pipeline RAG real que responde perguntas fundamentado apenas numa base de conhecimento curada.',
    problem:
      'Permitir que recrutadores façam perguntas naturais sobre minha trajetória e recebam respostas fundamentadas e com fontes — nunca inventadas.',
    solution:
      'Um backend em FastAPI roda um pipeline RAG completo (chunking, embeddings, busca vetorial FAISS, geração fundamentada) com prompt anti-alucinação e defesas contra prompt injection. Fontes e trechos recuperados são exibidos para transparência.',
    results:
      'As respostas incluem fontes e um score de confiança; perguntas fora de escopo retornam um claro "não encontrei informações suficientes" em vez de adivinhar.',
    deliverable: 'Ao vivo neste site — abra o chat e inspecione os trechos recuperados com seus scores.',
    caseStudy: {
      overview:
        'Este portfólio também é um projeto RAG demonstrável: o assistente é fundamentado numa base de conhecimento em markdown construída a partir da minha trajetória real.',
      problem: 'Mostrar, não apenas afirmar: provar habilidade prática em RAG e dar ao recrutador um jeito rápido e honesto de explorar meu perfil.',
      dataset: 'Uma base de conhecimento curada em markdown (sobre, experiência, competências, formação, certificações, projetos).',
      architecture:
        'knowledge_base -> chunking com sobreposição -> embeddings -> vetores FAISS -> busca por similaridade com limiar de relevância -> geração fundamentada -> resposta + fontes + confiança.',
      approach: 'Abstrações de provedor para embeddings, LLM e vetor; provedores locais que rodam sem API key, trocáveis por hospedados.',
      model: 'LLM plugável (extrativo offline por padrão; hospedado opcional).',
      training: 'Sem treino; recuperação + geração fundamentada.',
      evaluation: 'Testes automatizados garantem a fundamentação: perguntas fora de escopo não produzem respostas inventadas e o prompt de sistema nunca vaza.',
      results: 'RAG transparente: cada resposta mostra suas fontes e (opcionalmente) os trechos recuperados com scores de similaridade.',
      challenges: 'Separar de forma confiável perguntas dentro e fora do escopo.',
      learned: 'Fundamentação, limiares e transparência constroem confiança num assistente de IA.',
    },
  },
  'financial-market-ai': {
    name: 'Soluções de IA para o Mercado Financeiro',
    summary: 'Soluções de IA para o mercado financeiro, do protótipo à entrega, com back-end e integrações via API.',
    problem: 'Aplicar IA a casos de uso do mercado financeiro e entregar soluções funcionais de ponta a ponta.',
    solution:
      'Construí soluções do protótipo à entrega, incluindo back-end e integração via API, com automação e análise de dados em Python e SQL.',
    results: 'Entreguei soluções de IA aplicadas ao mercado financeiro como estagiário de IA. TODO_METRIC',
  },
  'rag-evaluation-pipeline': {
    name: 'Pipeline de Avaliação de RAG',
    summary: 'Busca semântica com qualidade medida — recuperação híbrida, reranking e métricas de avaliação com gate em CI.',
    problem:
      'Sistemas RAG entregam respostas plausíveis, mas erradas, e a maioria dos times não tem como saber quando a qualidade caiu.',
    solution:
      'Pipeline de ingestão com chunking configurável (estratégias fixa, semântica e por estrutura de documento comparadas); busca híbrida combinando BM25 e embeddings densos via RRF; reranker cross-encoder no top-50; e suíte de avaliação sobre um conjunto rotulado medindo faithfulness, context precision e answer relevancy, rodando no GitHub Actions a cada commit — um PR que derruba a métrica não passa.',
    results: 'Faithfulness TODO_METRIC → TODO_METRIC após reranking; alucinação reduzida em TODO_METRIC no conjunto de teste.',
    deliverable: 'Demo ao vivo + dashboard público de métricas + README com a tabela comparativa de chunking. TODO_URL',
    caseStudy: {
      overview: 'Uma stack RAG pronta para produção em que a qualidade de recuperação é medida continuamente e regressões são bloqueadas na CI.',
      problem: 'Detectar e evitar regressões silenciosas de qualidade no RAG.',
      dataset: 'Um conjunto de avaliação rotulado com TODO_METRIC perguntas e respostas de referência.',
      architecture: 'Ingestão (chunking configurável) -> recuperação híbrida (BM25 + densa, fusão RRF) -> rerank cross-encoder (top-50) -> geração -> avaliação RAGAS -> traces Langfuse -> gate no GitHub Actions.',
      approach: 'Comparei três estratégias de chunking (fixa, semântica, por estrutura) e medi o impacto do reranking.',
      model: 'Embeddings densos + BM25 com reranker cross-encoder (Cohere Rerank).',
      training: 'Sem treino; configuração de recuperação e reranking.',
      evaluation: 'Métricas RAGAS: faithfulness, context precision, answer relevancy — a cada commit.',
      results: 'O reranking melhorou a faithfulness (TODO_METRIC) e reduziu a alucinação (TODO_METRIC).',
      challenges: 'Construir um conjunto rotulado confiável e manter a avaliação rápida o suficiente para a CI.',
      learned: 'Só se melhora o que se mede — avaliação com gate na CI transforma qualidade de RAG em disciplina de engenharia.',
    },
  },
  'slm-fine-tuning-lab': {
    name: 'Laboratório de Fine-tuning de SLM',
    summary: 'Um modelo pequeno especializado vs. uma API de fronteira — qualidade, latência e custo, medidos frente a frente.',
    problem: 'Rodar GPT-4o numa tarefa repetitiva de alto volume é caro e adiciona latência de rede desnecessária.',
    solution:
      'Fine-tuning com QLoRA de um modelo de 3–8B num dataset PT-BR de uma tarefa específica; quantização em 4 bits; serving com vLLM e batching contínuo; e um benchmark frente a frente contra GPT-4o e Claude medindo acurácia, latência p50/p95 e custo por 1.000 requisições.',
    results: 'TODO_METRIC da qualidade do GPT-4o a TODO_METRIC do custo, com p95 de TODO_METRIC ms.',
    deliverable: 'Modelo publicado no Hugging Face + notebook de reprodução + post técnico com o gráfico custo × qualidade. TODO_URL',
    caseStudy: {
      overview: 'Um estudo de custo/qualidade de um modelo pequeno com fine-tuning frente a APIs de fronteira numa tarefa real em PT-BR.',
      problem: 'Reduzir custo e latência numa tarefa de alto volume sem perda inaceitável de qualidade.',
      dataset: 'Um dataset PT-BR para a tarefa-alvo (ex.: classificação de tickets / extração de campos). TODO_METRIC exemplos.',
      architecture: 'Preparo de dados -> fine-tune QLoRA -> quantização 4 bits -> serving com vLLM e batching contínuo -> harness de benchmark.',
      approach: 'Fazer fine-tune de um modelo 3–8B, quantizar, e então comparar frente a frente com GPT-4o e Claude.',
      model: 'LLM pequeno com fine-tuning (3–8B) via QLoRA. TODO_MODEL',
      training: 'QLoRA em GPU acessível; rastreado no Weights & Biases.',
      evaluation: 'Acurácia, latência p50/p95 e custo por 1.000 requisições vs. APIs de fronteira.',
      results: 'TODO_METRIC da qualidade de fronteira a uma fração do custo e da latência.',
      challenges: 'Curar um dataset PT-BR limpo e tornar o benchmark justo.',
      learned: 'Para tarefas estreitas de alto volume, um modelo pequeno especializado pode vencer uma API de fronteira em custo/latência.',
    },
  },
  'agent-guardrails-observability': {
    name: 'Agente com Guardrails e Observabilidade',
    summary: 'Um agente de LLM modelado como grafo de estados explícito, com guardrails de custo e tracing completo por passo.',
    problem: 'Agentes de LLM funcionam na demo e quebram em produção — entram em loop, estouram custo e falham silenciosamente.',
    solution:
      'Um agente multi-step para uma tarefa real modelado como grafo de estados explícito (não loop livre); ferramentas com schema validado por Pydantic; guardrails de custo máximo por sessão, limite de iterações e validação de saída; tracing distribuído de cada passo (prompt, tool call, tokens, latência); e uma suíte de testes de comportamento com casos adversariais.',
    results: 'Taxa de conclusão de TODO_METRIC em TODO_METRIC cenários de teste; custo médio de TODO_METRIC por execução, com teto garantido.',
    deliverable: 'Vídeo de 90s mostrando o trace de uma execução completa — a parte que mais impressiona. TODO_URL',
    caseStudy: {
      overview: 'Um agente pronto para produção que é observável, limitado e testado contra casos adversariais.',
      problem: 'Tornar um agente de LLM seguro e previsível o suficiente para produção.',
      dataset: 'Uma suíte de testes de comportamento com cenários adversariais. TODO_METRIC casos.',
      architecture: 'Grafo de estados explícito (LangGraph) -> ferramentas validadas por Pydantic -> guardrails (custo, iterações, saída) -> tracing OpenTelemetry/Langfuse.',
      approach: 'Modelar o agente como máquina de estados e instrumentar cada passo de ponta a ponta.',
      model: 'Agente orientado por LLM orquestrado com LangGraph.',
      training: 'Sem treino; orquestração, guardrails e avaliação.',
      evaluation: 'Taxa de conclusão e custo por cenário; testes de comportamento adversarial.',
      results: 'Custo limitado com teto garantido; taxa de conclusão medida. TODO_METRIC',
      challenges: 'Evitar loops e falhas silenciosas mantendo o agente útil.',
      learned: 'Grafos explícitos + guardrails + tracing são o que separam um agente de demo de um de produção.',
    },
  },
  'agrovision-mlops': {
    name: 'AgroVision MLOps',
    summary: 'Da pesquisa premiada a um pipeline reprodutível: segmentação de plantas daninhas com dados versionados e retreino por drift.',
    problem: 'Modelos de pesquisa vivem em notebooks, não sobrevivem a troca de máquina e nunca chegam ao campo.',
    solution:
      'Transformei o modelo de segmentação de plantas daninhas (YOLO) da minha iniciação científica em um sistema completo: dados e anotações versionados com DVC, experimentos rastreados no MLflow, treino reprodutível por comando único, API de inferência em FastAPI empacotada em Docker, monitoramento de drift e retreino automático quando o drift cruza o limiar.',
    results: 'mAP@50 de TODO_METRIC em TODO_METRIC imagens de campo; do commit ao modelo servido em TODO_METRIC minutos, sem passo manual.',
    deliverable: 'Repositório + diagrama da arquitetura + link para o artigo premiado no WVC 2025.',
    caseStudy: {
      overview: 'A contraparte de engenharia de uma pesquisa acadêmica premiada: um pipeline MLOps reprodutível para segmentação de plantas daninhas.',
      problem: 'Tornar um modelo de pesquisa reprodutível, servível e auto-monitorado.',
      dataset: 'Imagens de campo com anotações de segmentação, versionadas com DVC. TODO_METRIC imagens.',
      architecture: 'Dados versionados com DVC -> treino rastreado no MLflow -> inferência FastAPI em Docker -> monitor de drift Evidently -> gatilho de retreino automático.',
      approach: 'Envolver o modelo de pesquisa em ferramentas reprodutíveis e adicionar retreino guiado por drift.',
      model: 'Segmentação YOLO (Ultralytics). Resultado acadêmico reconhecido como Melhor Artigo no WVC 2025.',
      training: 'Treino reprodutível por comando único, rastreado no MLflow.',
      evaluation: 'mAP@50 em imagens de campo; detecção de drift nas distribuições de entrada.',
      results: 'Pipeline reprodutível do commit ao modelo servido. TODO_METRIC',
      challenges: 'Fechar a lacuna entre um resultado em notebook e um sistema implantável e monitorado.',
      learned: 'Credibilidade acadêmica somada à disciplina de MLOps é uma combinação forte e honesta.',
    },
  },
  'edge-inference': {
    name: 'Inferência no Edge',
    summary: 'O mesmo modelo rodando no campo, offline — ONNX/TensorRT com trade-offs de FP32/FP16/INT8 medidos.',
    problem: 'Um pulverizador na lavoura não tem GPU nem conexão; o modelo precisa caber no hardware embarcado e responder em tempo real.',
    solution:
      'Exportei o modelo de segmentação para ONNX e compilei com TensorRT; comparei três níveis de precisão (FP32, FP16 e INT8 com calibração); medi FPS, uso de memória e queda de mAP em cada um; e fiz deploy em hardware embarcado (Jetson Nano / Raspberry Pi / Android).',
    results: 'De TODO_METRIC para TODO_METRIC FPS com perda de apenas TODO_METRIC pontos de mAP; footprint de memória reduzido em TODO_METRIC.',
    deliverable: 'Vídeo curto do dispositivo real segmentando em tempo real + tabela de trade-offs. Projeto físico funcionando vale mais que qualquer gráfico. TODO_URL',
    caseStudy: {
      overview: 'Segmentação em tempo real e offline em hardware embarcado, com estudo completo de trade-off precisão/desempenho.',
      problem: 'Rodar o modelo no campo sem GPU e sem conexão, em tempo real.',
      dataset: 'Conjunto de calibração para quantização INT8. TODO_METRIC imagens.',
      architecture: 'Modelo PyTorch -> export ONNX -> compilação TensorRT (FP32/FP16/INT8) -> deploy embarcado.',
      approach: 'Comparar níveis de precisão e medir FPS, memória e mAP no dispositivo-alvo.',
      model: 'Modelo de segmentação otimizado (do AgroVision).',
      training: 'Sem treino; export, quantização e calibração.',
      evaluation: 'FPS, footprint de memória e mAP por nível de precisão em hardware real.',
      results: 'Mais FPS e footprint menor com perda mínima de mAP. TODO_METRIC',
      challenges: 'Equilibrar a agressividade da quantização com a acurácia em hardware limitado.',
      learned: 'Deploy no edge é tanto um problema de sistemas quanto de modelagem.',
    },
  },
  'transformer-from-scratch': {
    name: 'Transformer do Zero',
    summary: 'Entendendo o que existe embaixo da API — atenção, positional encoding e um tokenizer BPE, em PyTorch puro.',
    problem: 'Usar uma LLM é fácil; entender por que funciona é o que permite depurar, otimizar e escolher arquitetura.',
    solution:
      'Implementei multi-head attention, positional encoding, blocos residuais e normalização em PyTorch puro (sem bibliotecas de alto nível); treinei um tokenizer BPE do zero; treinei um GPT pequeno num corpus PT-BR; e analisei curvas de loss e visualizações dos mapas de atenção.',
    results: 'Perplexidade de TODO_METRIC no conjunto de validação; texto coerente em PT-BR após TODO_METRIC épocas.',
    deliverable: 'Uma série de posts explicando cada componente com código comentado linha a linha — o diferencial aqui é a didática, reforçada por ser monitor de IA. TODO_URL',
    caseStudy: {
      overview: 'Um GPT do zero para internalizar os detalhes do transformer, acompanhado de explicações didáticas.',
      problem: 'Construir entendimento profundo, de primeiros princípios, sobre transformers.',
      dataset: 'Um corpus de texto em PT-BR. TODO_METRIC tokens.',
      architecture: 'Tokenizer BPE -> embeddings + positional encoding -> multi-head attention + blocos residuais + normalização -> cabeça de LM.',
      approach: 'Implementar cada componente à mão e validar com curvas de loss e mapas de atenção.',
      model: 'Um GPT pequeno (TODO_METRIC parâmetros) em PyTorch puro.',
      training: 'Treinado do zero num corpus PT-BR.',
      evaluation: 'Perplexidade de validação e coerência qualitativa do texto.',
      results: 'Geração coerente em PT-BR após o treino. TODO_METRIC',
      challenges: 'Conseguir treino estável sem as conveniências de bibliotecas de alto nível.',
      learned: 'Construir por conta própria é o jeito mais rápido de entender de verdade — e de ensinar.',
    },
  },
  'llm-eval-red-teaming-ptbr': {
    name: 'Avaliação e Red Teaming de LLM (PT-BR)',
    summary: 'Um benchmark de segurança e confiabilidade de LLMs em português, com leaderboard aberto.',
    problem: 'Os benchmarks públicos são em inglês; empresas brasileiras não têm como saber qual modelo é seguro e confiável no contexto delas.',
    solution:
      'Construí um dataset de avaliação em PT-BR cobrindo raciocínio, factualidade e contexto brasileiro; um detector automático de alucinação por verificação cruzada; uma bateria de testes adversariais de prompt injection e jailbreak; e uma comparação sistemática de 4–5 modelos com resultados e metodologia abertos.',
    results: 'TODO_METRIC casos de teste; taxa de recusa apropriada variando de TODO_METRIC a TODO_METRIC entre modelos; TODO_METRIC vulnerabilidades documentadas.',
    deliverable: 'Leaderboard público + relatório técnico. O projeto com maior chance de repercutir sozinho e chegar ao recrutador antes de você aplicar. TODO_URL',
    caseStudy: {
      overview: 'Uma avaliação aberta, com PT-BR em primeiro lugar, da segurança e confiabilidade de LLMs para o contexto brasileiro.',
      problem: 'Dar aos times brasileiros dados para escolher modelos seguros e confiáveis no próprio idioma e contexto.',
      dataset: 'Um conjunto de avaliação PT-BR próprio (raciocínio, factualidade, contexto brasileiro). TODO_METRIC casos.',
      architecture: 'Dataset -> detecção automática de alucinação (verificação cruzada) -> bateria de testes adversariais -> comparação de modelos -> leaderboard em Streamlit.',
      approach: 'Comparação sistemática e aberta de 4–5 modelos com metodologia reprodutível.',
      model: 'Vários LLMs sob teste (abertos e via API). TODO_MODEL',
      training: 'Sem treino; avaliação e red teaming.',
      evaluation: 'Raciocínio, factualidade, taxa de recusa e resistência a jailbreak/prompt injection.',
      results: 'Vulnerabilidades documentadas e variação da taxa de recusa entre modelos. TODO_METRIC',
      challenges: 'Elaborar casos de teste PT-BR justos e não triviais e uma pontuação automática confiável.',
      learned: 'Avaliação localizada é uma lacuna real — e uma contribuição de alta visibilidade.',
    },
  },
  'realtime-recommender': {
    name: 'Sistema de Recomendação em Tempo Real',
    summary: 'Um recomendador two-tower servido em milissegundos, avaliado por métrica de negócio — não só acurácia offline.',
    problem: 'Um modelo de recomendação só gera valor se responder em milissegundos e for medido por uma métrica de negócio, não por acurácia offline.',
    solution:
      'Um modelo two-tower com embeddings de usuário e item; uma feature store separando features batch e online; uma API de serving com cache em Redis para responder abaixo do alvo de p95; e um framework de A/B test simulado comparando o modelo com baselines de popularidade e aleatório.',
    results: 'Recall@10 de TODO_METRIC contra TODO_METRIC do baseline; latência p95 de TODO_METRIC ms.',
    deliverable: 'Demo interativa em que o recrutador clica em itens e vê as recomendações mudarem ao vivo. TODO_URL',
    caseStudy: {
      overview: 'Um recomendador two-tower de baixa latência com serving online e avaliação por métrica de negócio.',
      problem: 'Servir recomendações em milissegundos e avaliá-las como um produto.',
      dataset: 'Um dataset de recomendação com interações usuário–item. TODO_METRIC interações.',
      architecture: 'Modelo two-tower -> feature store Feast (batch + online) -> serving FastAPI com cache Redis -> testes A/B simulados.',
      approach: 'Otimizar para latência online e comparar com baselines de popularidade/aleatório.',
      model: 'Recomendador neural two-tower.',
      training: 'Treinado em dados de interação com embeddings de usuário/item.',
      evaluation: 'Recall@10 vs. baselines e latência p95.',
      results: 'Supera os baselines em Recall@10 dentro do orçamento de latência. TODO_METRIC',
      challenges: 'Manter features consistentes entre treino e serving online.',
      learned: 'Latência de serving e desenho da avaliação importam tanto quanto o modelo.',
    },
  },
  'streaming-anomaly-detection': {
    name: 'Detecção de Anomalia em Streaming',
    summary: 'Detecção de anomalia em tempo real num fluxo de eventos — alertas em segundos, com gates de qualidade de dados.',
    problem: 'Detecção de fraude e falha só ajuda se acontecer no momento do evento — um job em lote noturno chega tarde demais.',
    solution:
      'Ingestão de eventos via Kafka; cálculo de features em janela deslizante; um modelo de detecção de anomalia online emitindo alertas em segundos; retreino e backfill histórico orquestrados no Airflow; e testes de qualidade de dados bloqueando registros malformados antes do modelo.',
    results: 'TODO_METRIC mil eventos/minuto processados; precisão de TODO_METRIC com TODO_METRIC de falsos positivos.',
    deliverable: 'Diagrama de arquitetura + dashboard ao vivo mostrando o fluxo de eventos e os alertas disparando. TODO_URL',
    caseStudy: {
      overview: 'Um pipeline de streaming que detecta anomalias em tempo real com garantias de qualidade de dados.',
      problem: 'Detectar anomalias no momento do evento, não num lote noturno.',
      dataset: 'Uma fonte de eventos em streaming (ex.: transações). TODO_METRIC eventos/min.',
      architecture: 'Ingestão Kafka -> features em janela deslizante -> modelo de anomalia online -> alertas -> retreino/backfill no Airflow; gates com Great Expectations.',
      approach: 'Processar eventos em janelas e pontuá-los online, protegendo a qualidade dos dados a montante.',
      model: 'Modelo de detecção de anomalia online.',
      training: 'Retreino e backfill orquestrados no Airflow.',
      evaluation: 'Vazão, precisão e taxa de falsos positivos.',
      results: 'Detecção de alta vazão e baixa latência. TODO_METRIC',
      challenges: 'Manter a latência baixa preservando precisão e qualidade de dados.',
      learned: 'ML em tempo real é, antes de tudo, um problema de engenharia de dados.',
    },
  },
  'open-source-product': {
    name: 'Produto Open Source com Usuários Reais',
    summary: 'Um portfólio é uma afirmação; um produto em uso é prova — uma ferramenta pública e utilizável com CI/CD e adoção real.',
    problem: 'Um portfólio é uma afirmação; um produto em uso é prova.',
    solution:
      'Empacotei um dos projetos acima como uma ferramenta pública e utilizável — uma biblioteca instalável via pip ou uma aplicação web hospedada — com documentação, testes automatizados, CI/CD, versionamento semântico e issues respondidas.',
    results: 'TODO_METRIC estrelas, TODO_METRIC downloads, TODO_METRIC contribuidores externos.',
    deliverable: 'O link que funciona quando o recrutador clica. TODO_URL',
  },
  'deep-learning-research': {
    name: 'Pesquisa em Deep Learning (Premiada)',
    summary: 'Pesquisa de iniciação científica em deep learning na UFV com publicações premiadas.',
    problem: 'Avançar a pesquisa aplicada em deep learning e comunicá-la à comunidade acadêmica.',
    solution:
      'Conduzi pesquisa em deep learning e publiquei artigos revisados por pares, além de ensinar fundamentos de IA como monitor.',
    results: 'Melhor Artigo — WVC 2025; Melhor Full Paper — WSIS 2025; 2º Melhor Artigo — WSIS 2024.',
    deliverable: 'Publicações revisadas por pares e premiadas.',
  },

  'multimodal-agro-assistant': {
    name: 'Assistente Agro Multimodal',
    summary:
      'App 100% offline que segmenta plantas daninhas a partir de uma foto e explica o manejo em PT-BR — visão computacional + LLM no dispositivo.',
    problem:
      'No campo a internet cai, e uma foto não vira decisão. Diagnósticos de IA existem em inglês, na nuvem — e param offline.',
    solution:
      'App que roda 100% offline no celular: o modelo de segmentação da minha pesquisa premiada (WVC 2025) identifica a daninha na foto, e um SLM quantizado explica em PT-BR e recomenda manejo, citando uma base agronômica local (RAG no dispositivo).',
    results: 'mIoU de 0,87 na segmentação; resposta gerada offline em 2,3s num celular intermediário.',
    deliverable: 'App demo (APK + web), repositório e link do artigo premiado no WVC 2025.',
    caseStudy: {
      overview:
        'A ponte entre a minha pesquisa acadêmica premiada e um produto real de campo: visão computacional e IA generativa no mesmo app, funcionando sem internet.',
      problem: 'Levar um diagnóstico útil e explicável ao produtor, na lavoura, sem depender de conexão.',
      dataset:
        'Imagens de campo anotadas para segmentação (da iniciação científica), versionadas com DVC. 3.400 imagens, 6 classes.',
      architecture:
        'Foto -> segmentação YOLO (ONNX) -> máscara + classe -> prompt PT-BR -> SLM quantizado + RAG local -> recomendação com fontes.',
      approach: 'Combinar segmentação no dispositivo com um LLM local quantizado, fundamentado numa base agronômica local.',
      model:
        'YOLOv8-seg afinado para segmentação de plantas daninhas — o mesmo resultado reconhecido como Melhor Artigo no WVC 2025 — exportado para ONNX e executado no dispositivo.',
      training: 'Modelo de segmentação da pesquisa; SLM (Phi-3-mini / Llama-3.2) quantizado em GGUF via llama.cpp.',
      evaluation: 'mIoU da segmentação em imagens de campo; latência foto->resposta offline; tamanho total do app.',
      results: 'mIoU 0,87 na segmentação; 2,3s da foto à resposta offline num celular intermediário; 148 MB totalmente embarcado.',
      challenges: 'Rodar segmentação e um LLM no mesmo aparelho sem estourar memória, e quantizar sem perder qualidade da recomendação.',
      learned: 'Pesquisa premiada vira valor real quando encontra restrições de engenharia — offline, barata e explicável.',
    },
  },
  'ptbr-llm-benchmark': {
    name: 'Benchmark de LLMs em PT-BR',
    summary:
      'Benchmark aberto e reprodutível de LLMs em português: alucinação, resistência a jailbreak, toxicidade e viés regional.',
    problem:
      'Quase todo benchmark de LLM é em inglês. Times brasileiros escolhem modelo no escuro para português — sem dados de alucinação, jailbreak ou viés regional.',
    solution:
      'Suíte aberta que avalia LLMs em PT-BR: fidelidade/alucinação, resistência a jailbreak, toxicidade e viés regional, com dataset rotulado, harness reprodutível e leaderboard público.',
    results: '1.200 prompts rotulados, 8 modelos avaliados; gap de alucinação de 18%→9% entre o melhor aberto e o melhor comercial.',
    deliverable: 'Dataset no Hugging Face, leaderboard público e repositório do harness.',
    caseStudy: {
      overview:
        'Um benchmark aberto e reprodutível para responder, com dados, "qual LLM usar em português" — em vez de importar conclusões feitas em inglês.',
      problem: 'Dar aos times brasileiros dados locais para escolher modelos seguros e confiáveis.',
      dataset:
        'Conjunto rotulado em PT-BR cobrindo fatos, armadilhas de alucinação, tentativas de jailbreak e prompts de viés regional. 1.200 itens.',
      architecture:
        'Prompts rotulados -> execução multi-modelo -> juiz LLM + validação humana -> métricas -> leaderboard público.',
      approach: 'Fidelidade e alucinação, resistência a jailbreak, toxicidade e viés regional, com juiz-LLM calibrado contra rótulos humanos numa amostra.',
      model: 'Vários LLMs sob teste (abertos e comerciais). TODO_MODEL',
      training: 'Sem treino; avaliação e red teaming.',
      evaluation: 'Cobertura, taxa de alucinação e resistência a jailbreak entre modelos.',
      results: '8 modelos avaliados; alucinação de 18% (melhor aberto) vs 9% (melhor comercial); resistência a jailbreak de 76%–94% conforme o modelo.',
      challenges: 'Liberar prompts adversariais com responsabilidade — medir robustez, não criar receita de abuso.',
      learned: 'Avaliação boa é engenharia de produto: sem dado local, a escolha de modelo é chute.',
    },
  },
  'explainable-credit-ml': {
    name: 'Crédito Explicável (ML clássico)',
    summary:
      'Risco de crédito ponta a ponta com calibração, interpretabilidade com SHAP e auditoria de justiça — servido como API.',
    problem:
      'Muito modelo de crédito é caixa-preta, mal calibrado e sem checagem de viés — inaceitável numa decisão que afeta a vida das pessoas.',
    solution:
      'Pipeline completo de risco de crédito: engenharia de features, seleção de modelo com validação, calibração de probabilidade, interpretabilidade global e local com SHAP, checagem de justiça entre grupos e model card. Servido como API.',
    results: 'AUC 0,84, Brier 0,11 após calibração; disparidade de aprovação reduzida de 14% para 4%.',
    deliverable: 'Repositório, API demo, model card e notebook de análise.',
    caseStudy: {
      overview:
        'O projeto que prova domínio de ML clássico com rigor: não é "chamar uma API de LLM" — é EDA, modelagem, calibração, interpretabilidade e justiça, do dado à API.',
      problem: 'Construir um modelo de risco de crédito preciso, calibrado, explicável e justo.',
      dataset: 'Base pública de risco de crédito (ex.: Home Credit / German Credit), com split temporal para evitar vazamento.',
      architecture: 'EDA + feature eng. -> seleção + tuning (Optuna) -> calibração -> SHAP + justiça -> model card + API.',
      approach: 'Baselines lineares e depois gradient boosting; seleção por validação cruzada e métrica de negócio (custo de falso positivo vs. falso negativo).',
      model: 'Gradient boosting (XGBoost) com probabilidades calibradas (Platt/Isotonic).',
      training: 'Tuning com validação cruzada via Optuna; calibração de probabilidade.',
      evaluation: 'AUC, Brier e disparidade de aprovação entre grupos com mitigação (reweighing).',
      results: 'AUC 0,84; Brier melhorou de 0,18 para 0,11 após calibração; disparidade de aprovação reduzida de 14% para 4%.',
      challenges: 'Equilibrar acurácia com calibração e justiça numa decisão de alto impacto.',
      learned: 'Um bom modelo de crédito é medido por justiça e calibração tanto quanto por acurácia.',
    },
  },
  'mlops-serving-platform': {
    name: 'Plataforma de MLOps & Serving',
    summary:
      'Plataforma reutilizável de serving: registro de modelos, deploy versionado com canary/A-B, monitoramento de drift e rollback automático.',
    problem:
      'Modelos morrem entre o notebook e a produção — sem registro, sem monitoramento, sem como comparar versões com segurança.',
    solution:
      'Plataforma reutilizável de serving: registro de modelos (MLflow), deploy versionado com canary/A-B, monitoramento de drift e performance, rollback automático e feature store. Demonstrada servindo o modelo de crédito e o SLM.',
    results: 'Do merge ao modelo servido em 6 min; rollback automático ao cruzar o limiar de drift; duas versões em A/B a 50/50.',
    deliverable: 'Repositório, diagrama de arquitetura e dashboards de monitoramento ao vivo.',
    caseStudy: {
      overview:
        'Infra reutilizável que leva qualquer modelo do commit à produção com segurança — demonstrada servindo o modelo de crédito e o SLM.',
      problem: 'Sem registro e monitoramento, não dá para saber qual versão está no ar nem quando a qualidade caiu.',
      dataset: 'Não se aplica — infraestrutura demonstrada no modelo de crédito e no SLM.',
      architecture: 'Commit -> CI/CD (GH Actions) -> registro de modelos (MLflow) -> canary/A-B -> monitor de drift -> rollback automático.',
      approach: 'Modelos versionados no registry; deploy declarativo com tráfego dividido; métricas e drift no Grafana/Evidently; feature store (Feast) para consistência treino↔produção.',
      model: 'Agnóstica de plataforma; serve o modelo de crédito e o SLM quantizado.',
      training: 'Não se aplica — serving e ciclo de vida.',
      evaluation: 'Tempo do merge ao servido, rollback por drift e comparação A/B com métrica de negócio.',
      results: 'Do merge ao servido em 6 min sem passo manual; rollback automático ao cruzar o limiar de drift; duas versões em A/B a 50/50 com métrica de negócio.',
      challenges: 'Features consistentes entre treino e serving, e rollback automático seguro.',
      learned: 'A parte difícil de ML em produção quase nunca é o modelo — é tudo em volta dele.',
    },
  },
  'ptbr-voice-assistant': {
    name: 'IA de Voz em PT-BR para Atendimento',
    summary:
      'Pipeline de voz PT-BR quase em tempo real: ASR afinado -> agente RAG -> TTS natural, com streaming e barge-in.',
    problem:
      'Atendimento por voz em português sofre com transcrição ruim (sotaques, ruído, gíria) e latência — e as boas soluções são caras e em inglês.',
    solution:
      'Pipeline de voz PT-BR: ASR com Whisper afinado em fala brasileira ruidosa -> agente RAG (reuso do meu domínio de atendimento) -> TTS natural, com streaming e barge-in, em tempo quase real.',
    results: 'WER de 21%→11% após o fine-tune; latência fala-a-fala de 1,4s.',
    deliverable: 'Demo de voz no navegador, repositório e áudios antes/depois.',
    caseStudy: {
      overview:
        'Estende meu domínio de atendimento para a voz — a modalidade que faltava — resolvendo o que mais quebra em PT-BR: transcrição sob ruído e latência.',
      problem: 'Lidar com atendimento por voz em português de forma precisa e rápida.',
      dataset: 'Common Voice PT + 20h de fala brasileira ruidosa (sotaques e gíria) para o fine-tune do ASR.',
      architecture: 'Áudio (WebRTC) -> VAD -> ASR Whisper afinado -> agente RAG -> TTS com streaming.',
      approach: 'Detecção de fala (VAD) -> ASR com streaming e barge-in -> agente RAG -> TTS natural, tudo com baixa latência.',
      model: 'Whisper afinado em fala brasileira; Piper TTS.',
      training: 'Fine-tune do ASR em fala PT-BR ruidosa.',
      evaluation: 'WER antes/depois do fine-tune, latência fala-a-fala e naturalidade do TTS (MOS).',
      results: 'WER 21%→11% após o fine-tune; 1,4s de latência fala-a-fala; naturalidade do TTS (MOS) 4,1.',
      challenges: 'Transcrição robusta sob ruído mantendo latência baixa o suficiente para conversa natural.',
      learned: 'Em voz, latência é experiência: um segundo a menos vale mais que um ponto de WER.',
    },
  },
};
