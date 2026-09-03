import fs from "node:fs";
import path from "node:path";
import { embed } from "./embeddings";

export type Chunk = { id: string; source: string; heading: string; text: string; vector: number[] };

let cache: Chunk[] | null = null;

export function loadIndex(): Chunk[] {
  if (cache) return cache;
  const file = path.join(process.cwd(), "data", "index.json");
  if (!fs.existsSync(file)) throw new Error("data/index.json não existe. Rode `npm run ingest`.");
  cache = JSON.parse(fs.readFileSync(file, "utf8")) as Chunk[];
  return cache;
}

function cosine(a: number[], b: number[]) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export async function retrieve(query: string, k = 5) {
  const [q] = await embed([query], "query");
  return loadIndex()
    .map((c) => ({ ...c, score: cosine(q, c.vector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

export function formatContext(chunks: (Chunk & { score: number })[]) {
  return chunks
    .map((c, i) => `[${i + 1}] (${c.source} › ${c.heading})\n${c.text}`)
    .join("\n\n");
}
