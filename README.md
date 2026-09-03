# Portfólio — Pedro Campos

Site Next.js com assistente RAG ("Pergunte ao Pedro") e Modo Recrutador.

## Rodar local
1. `npm install`
2. Copie `.env.example` para `.env.local` e preencha `ANTHROPIC_API_KEY` e `VOYAGE_API_KEY`.
3. Edite os arquivos em `content/` (a base de conhecimento). Procure por `[PREENCHER]`.
4. `npm run ingest` → gera `data/index.json` (o `npm run build` também roda o ingest automaticamente).
5. `npm run dev` → http://localhost:3000

## Deploy (Vercel)
1. Repo: https://github.com/JFcamp/portfolio
2. Importe na Vercel e configure `ANTHROPIC_API_KEY` e `VOYAGE_API_KEY` (o build gera o índice sozinho).
3. Aponte o domínio próprio.

## Como funciona o RAG
- `scripts/ingest.ts`: divide os `.md` por `##`, gera embeddings (Voyage `voyage-3-lite`) e salva em JSON.
- `lib/rag.ts`: embedda a pergunta, calcula similaridade de cosseno, devolve top-k.
- `app/api/chat/route.ts`: monta o contexto numerado e pede ao Claude uma resposta com citações `[n]`.
- `app/api/fit/route.ts`: mesmo pipeline, mas devolve JSON de aderência à vaga.
- `lib/ratelimit.ts`: limite por IP em memória (troque por Upstash em produção).

## Próximos passos sugeridos
- Substituir `#` pelos links reais de GitHub, LinkedIn e PDFs dos artigos.
- Adicionar 2–3 posts curtos em `content/blog-*.md` (entram no RAG automaticamente).
- Streaming da resposta (`anthropic.messages.stream`) para sensação de velocidade.
- Demo do YOLO no navegador (ONNX Runtime Web) como quarta seção.
