import { NextRequest } from "next/server";
import { anthropic, MODEL, PERSONA } from "@/lib/claude";
import { retrieve, formatContext } from "@/lib/rag";
import { allow } from "@/lib/ratelimit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  if (!allow(ip)) return Response.json({ error: "Muitas perguntas. Tente de novo em alguns minutos." }, { status: 429 });

  const { question } = (await req.json()) as { question?: string };
  if (!question || question.length > 500) return Response.json({ error: "Pergunta inválida." }, { status: 400 });

  const chunks = await retrieve(question, 5);
  const msg = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 400,
    system: PERSONA,
    messages: [{ role: "user", content: `CONTEXTO:\n${formatContext(chunks)}\n\nPERGUNTA: ${question}` }],
  });
  const answer = msg.content.filter((b) => b.type === "text").map((b) => (b as { text: string }).text).join("\n");
  return Response.json({
    answer,
    sources: chunks.map((c, i) => ({ n: i + 1, source: c.source, heading: c.heading, score: +c.score.toFixed(3) })),
  });
}
