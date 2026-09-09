import type { ChatRequest, ChatResponse } from '@/types';

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:8000';

export class ApiError extends Error {}

export async function sendChat(req: ChatRequest, signal?: AbortSignal): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
    signal,
  });

  if (!res.ok) {
    let detail = `Request failed (${res.status})`;
    try {
      const body = (await res.json()) as { detail?: string };
      if (body?.detail) detail = body.detail;
    } catch {
      /* ignore parse errors */
    }
    throw new ApiError(detail);
  }

  return (await res.json()) as ChatResponse;
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/api/health`);
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Keep the free-tier backend warm while a visitor has the site open.
 *
 * Render's free instance sleeps after ~15 min idle, so the first chat request
 * would otherwise take ~50s (cold start). We ping /api/health on load (warming
 * it up before the user even asks) and every 10 min while the tab is open.
 * Returns a cleanup function to stop the interval.
 */
export function keepBackendWarm(intervalMs = 10 * 60 * 1000): () => void {
  const ping = () => {
    // Fire-and-forget; ignore failures (a missed ping is harmless).
    void fetch(`${API_URL}/api/health`).catch(() => {});
  };
  ping(); // warm up immediately on page load
  const id = window.setInterval(ping, intervalMs);
  return () => window.clearInterval(id);
}
