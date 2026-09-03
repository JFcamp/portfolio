// Lê content/*.md, divide por cabeçalho (##) e gera data/index.json com embeddings.
import fs from "node:fs";
import path from "node:path";
import { embed } from "../lib/embeddings";

const contentDir = path.join(process.cwd(), "content");
const out = path.join(process.cwd(), "data", "index.json");

type Raw = { id: string; source: string; heading: string; text: string };

function split(file: string, md: string): Raw[] {
  const title = md.match(/^# (.+)$/m)?.[1] ?? file;
  const parts = md.split(/^## /m);
  const chunks: Raw[] = [];
  parts.forEach((p, i) => {
    const text = p.replace(/^# .+\n/, "").trim();
    if (!text) return;
    const heading = i === 0 ? title : p.split("\n")[0].trim();
    chunks.push({ id: `${file}#${i}`, source: title, heading, text: i === 0 ? text : `${heading}\n${text}` });
  });
  return chunks;
}

async function main() {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));
  const raws = files.flatMap((f) => split(f, fs.readFileSync(path.join(contentDir, f), "utf8")));
  console.log(`${raws.length} chunks de ${files.length} arquivos`);
  const vectors = await embed(raws.map((r) => r.text), "document");
  const index = raws.map((r, i) => ({ ...r, vector: vectors[i] }));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(index));
  console.log(`índice salvo em ${out}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
