"use client";
import { useState } from "react";

type Report = { score: number; summary: string; matches: { requirement: string; evidence: string; source: string }[]; gaps: string[] };

export default function RecruiterMode() {
  const [job, setJob] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setLoading(true); setError(null); setReport(null);
    try {
      const r = await fetch("/api/fit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ job }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? "Erro ao gerar relatório.");
      setReport(j);
    } catch (e) { setError((e as Error).message); } finally { setLoading(false); }
  }

  return (
    <section id="recrutador" className="rule py-16 scroll-mt-8">
      <h2 className="text-3xl font-bold">Modo recrutador</h2>
      <p className="mt-3 max-w-prose leading-relaxed">
        Cole a descrição da vaga. O assistente compara cada requisito com o que está documentado
        neste site e diz onde eu encaixo e onde não encaixo.
      </p>
      <textarea
        value={job} onChange={(e) => setJob(e.target.value)} rows={7} maxLength={6000}
        placeholder="Requisitos da vaga…" aria-label="Descrição da vaga"
        className="mt-6 w-full bg-white/60 border border-haze p-4 focus:outline-none focus:border-ink"
      />
      <button onClick={run} disabled={loading || job.trim().length < 40} className="mt-3 bg-ink text-paper px-5 py-2 font-display font-medium disabled:opacity-40">
        {loading ? "Analisando" : "Gerar relatório de aderência"}
      </button>
      {error && <p role="alert" className="mt-4 text-mask">{error}</p>}
      {report && (
        <div className="mt-8 border-l-2 border-mask pl-5">
          <p className="text-5xl font-display font-bold">{report.score}<span className="text-lg font-medium">/100</span></p>
          <p className="mt-2 leading-relaxed">{report.summary}</p>
          <ul className="mt-5 grid gap-3">
            {report.matches.map((m, i) => (
              <li key={i} className="text-[15px]"><span className="text-moss">{m.requirement}</span> — {m.evidence}</li>
            ))}
          </ul>
          {report.gaps.length > 0 && (
            <p className="mt-5 text-[15px]"><span className="text-mask">Sem evidência no site:</span> {report.gaps.join("; ")}</p>
          )}
        </div>
      )}
    </section>
  );
}
