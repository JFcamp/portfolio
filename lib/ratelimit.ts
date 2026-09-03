// Rate limit simples em memória (por IP). Para produção multi-instância use Upstash/Redis.
const hits = new Map<string, number[]>();
export function allow(ip: string, limit = 20, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) return false;
  arr.push(now);
  hits.set(ip, arr);
  return true;
}
