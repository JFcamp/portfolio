import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sendChat } from '@/services/api';
import type { ChatMode, ChatSource, RetrievedChunk } from '@/types';

export type ChatPhase = 'idle' | 'searching' | 'generating';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: ChatSource[];
  confidence?: number;
  retrieved?: RetrievedChunk[];
  error?: boolean;
}

let idCounter = 0;
const nextId = () => `m${Date.now()}-${idCounter++}`;

export function useChat(mode: ChatMode) {
  const { i18n } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [phase, setPhase] = useState<ChatPhase>('idle');
  const abortRef = useRef<AbortController | null>(null);

  const loading = phase !== 'idle';

  const ask = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: ChatMessage = { id: nextId(), role: 'user', content: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setPhase('searching');

      // Visual "searching" → "generating" transition; purely cosmetic.
      const toGenerating = setTimeout(() => setPhase('generating'), 550);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const lang = (i18n.language?.slice(0, 2) === 'pt' ? 'pt' : 'en') as 'en' | 'pt';
        const res = await sendChat({ message: trimmed, mode, lang }, controller.signal);
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: 'assistant',
            content: res.answer,
            sources: res.sources,
            confidence: res.confidence,
            retrieved: res.retrieved,
          },
        ]);
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: 'assistant', content: '', error: true },
        ]);
      } finally {
        clearTimeout(toGenerating);
        setPhase('idle');
      }
    },
    [loading, mode, i18n.language],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setPhase('idle');
  }, []);

  return { messages, phase, loading, ask, reset };
}
