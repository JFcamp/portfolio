"use client";
import { useState } from "react";

type Source = { n: number; source: string; heading: string; score: number };
const anchors: Record<string, string> = { Projetos: "projetos", "Publicações, prêmios e certificações": "publicacoes", "Experiência profissional": "projetos" };

const suggestions = [
  "O que você fez na águilahub?",
  "Quais artigos você já publicou?",
  "Qual sua experiência com RAG?",
  "Você tem experiência com visão computacional?",
];

export default function AskPedro() {
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function ask(question: string) {
    setQ(question); setLoading(true); setError(null); setAnswer(null);
    try {
      const r = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? "Erro ao responder.");
      setAnswer(j.answer); setSources(j.sources);
    } catch (e) { setError((e as Error).message); } finally { setLoading(false); }
  }

  function goTo(s: Source) {
    const id = anchors[s.source];
    const el = id ? document.getElementById(id) : null;
    if (!el) return;
    el.scrollIntoView({ block: "start" });
    el.classList.add("highlight");
    setTimeout(() => el.classList.remove("highlight"), 2500);
  }

  return (
    <div className="mt-10">
      <form onSubmit={(e) => { e.preventDefault(); if (q.trim()) ask(q.trim()); }} className="flex border-b-2 border-ink focus-within:border-mask">
        <input
          value={q} onChange={(e) => setQ(e.target.value)} maxLength={500}
          placeholder="Ex.: você já colocou um sistema de RAG em produção?"
          aria-label="Sua pergunta"
          className="flex-1 bg-transparent py-3 text-lg placeholder:text-ink/40 focus:outline-none"
        />
        <button type="submit" disabled={loading} className="font-display font-medium px-2 text-mask disabled:opacity-40">
          {loading ? "Pensando" : "Perguntar"}
        </button>
      </form>

      <ul className="mt-4 flex flex-wrap gap-2 text-sm">
        {suggestions.map((s) => (
          <li key={s}><button onClick={() => ask(s)} className="border border-haze rounded-full px-3 py-1 hover:border-ink">{s}</button></li>
        ))}
      </ul>

      {error && <p role="alert" className="mt-6 text-mask">{error}</p>}
      {answer && (
        <div className="mt-8 border-l-2 border-mask pl-5">
          <p className="whitespace-pre-line leading-relaxed">{answer}</p>
          {sources.length > 0 && (
            <p className="mt-4 text-sm text-moss">
              Fontes:{" "}
              {sources.map((s) => (
                <button key={s.n} onClick={() => goTo(s)} className="underline mr-3">[{s.n}] {s.heading}</button>
              ))}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
