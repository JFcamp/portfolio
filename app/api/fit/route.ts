import { NextRequest } from "next/server";
import { anthropic, MODEL } from "@/lib/claude";
import { retrieve, formatContext } from "@/lib/rag";
import { allow } from "@/lib/ratelimit";

export const runtime = "nodejs";

const SYSTEM = `Você avalia a aderência de Pedro Henrique Campos Moreira a uma vaga, usando SOMENTE o contexto.
Responda apenas com JSON válido, sem markdown, no formato:
{"score":0-100,"summary":"2 frases","matches":[{"requirement":"...","evidence":"...","source":"..."}],"gaps":["..."]}
Seja honesto: requisitos sem evidência no contexto vão em "gaps". Idioma: o mesmo da vaga.`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  if (!allow(ip, 5)) return Response.json({ error: "Limite atingido. Tente mais tarde." }, { status: 429 });

  const { job } = (await req.json()) as { job?: string };
  if (!job || job.length > 6000) return Response.json({ error: "Descrição inválida (máx. 6000 caracteres)." }, { status: 400 });

  const chunks = await retrieve(job.slice(0, 2000), 8);
  const msg = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 900,
    system: SYSTEM,
    messages: [{ role: "user", content: `CONTEXTO:\n${formatContext(chunks)}\n\nVAGA:\n${job}` }],
  });
  const raw = msg.content.filter((b) => b.type === "text").map((b) => (b as { text: string }).text).join("");
  try {
    return Response.json(JSON.parse(raw.replace(/```json|```/g, "").trim()));
  } catch {
    return Response.json({ error: "Não consegui estruturar o relatório. Tente novamente." }, { status: 502 });
  }
}
