# Deployment (free, runs 24/7)

Two independent deploys: a static frontend and a small backend API. This is the
setup for a portfolio that "runs by itself" and that anyone can open from your
LinkedIn.

```
Visitor ──▶ Frontend (Vercel, static)  ──HTTPS──▶  Backend RAG API (Render)
                                                     ├─ embeddings (local/offline)
                                                     └─ LLM (Groq free tier)
```

## 1. Backend — Render (free)

1. Push this repo to GitHub.
2. On https://render.com → New → Web Service → point to the repo.
   Render reads `render.yaml` automatically (Blueprint).
3. Set environment variables:
   - `ALLOWED_ORIGINS` = your frontend URL (e.g. `https://pedro.vercel.app`)
   - `LLM_PROVIDER` = `groq` and `LLM_API_KEY` = your free Groq key
     (get one at https://console.groq.com — free tier, no card).
   - `EMBEDDING_PROVIDER` = `offline` on the free instance (fits 512MB),
     or `local` on a larger instance for better retrieval.
4. Deploy. Health check: `GET /api/health`.

### Free-tier honesty
- The free Render instance **sleeps** after inactivity; the first request after
  a nap takes ~30–60s to wake. Fine for a portfolio.
- `local` (sentence-transformers) needs more RAM than the free instance offers
  because of torch. Use `offline` on free, or upgrade the instance for `local`.
- Groq's free tier is generous and gives fully written answers.

## 2. Frontend — Vercel (free)

1. On https://vercel.com → New Project → import the repo.
2. Root directory: `frontend`. Framework preset: Vite. `vercel.json` handles
   the SPA rewrite.
3. Environment variable:
   - `VITE_API_URL` = your Render backend URL (e.g. `https://portfolio-rag-api.onrender.com`)
4. Deploy. Put the resulting URL in your LinkedIn.

## 3. Before going live
- Add `frontend/public/resume.pdf` and `og-image.png`.
- Replace `TODO_DOMAIN` in `index.html`, `robots.txt`, `sitemap.xml`.
- Replace remaining `TODO_GITHUB_URL` / `TODO_METRIC` in the data files once real.

## Local run (for reference)
```
# backend
cd backend && uvicorn app.main:app --reload --port 8000
# frontend
cd frontend && npm run dev
```
