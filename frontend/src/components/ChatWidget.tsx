import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, FileText, Loader2 } from 'lucide-react';
import { useChat, type ChatPhase } from '@/hooks/useChat';
import type { ChatMode } from '@/types';
import { cn } from '@/utils/cn';
import { RagInspector } from './RagInspector';

const SUMMARY_PROMPT = 'Generate a candidate summary of Pedro for a recruiter.';

function PhaseIndicator({ phase }: { phase: ChatPhase }) {
  const { t } = useTranslation();
  if (phase === 'idle') return null;
  return (
    <div className="flex items-center gap-2 px-1 py-2 text-sm text-content-secondary">
      <Loader2 size={15} className="animate-spin text-accent" />
      {phase === 'searching' ? t('chat.searching') : t('chat.generating')}
    </div>
  );
}

interface ChatWidgetProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  pendingQuery?: string | null;
  onPendingConsumed?: () => void;
}

export function ChatWidget({ open, setOpen, pendingQuery, onPendingConsumed }: ChatWidgetProps) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<ChatMode>('default');
  const { messages, phase, loading, ask } = useChat(mode);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // When the command palette pushes a question, send it once the widget opens.
  useEffect(() => {
    if (open && pendingQuery && pendingQuery.trim()) {
      void ask(pendingQuery);
      onPendingConsumed?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, pendingQuery]);

  const suggestions = t(
    mode === 'recruiter' ? 'chat.recruiterSuggestions' : 'chat.suggestions',
    { returnObjects: true },
  ) as string[];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, phase]);

  const submit = () => {
    if (!input.trim() || loading) return;
    void ask(input);
    setInput('');
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={t('chat.openLabel')}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-medium text-bg shadow-lg shadow-accent/20 transition-transform hover:-translate-y-0.5"
      >
        {open ? <X size={18} /> : <MessageSquare size={18} />}
        <span className="hidden sm:inline">{t('chat.openLabel')}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label={t('chat.title')}
            className="fixed bottom-24 right-4 z-50 flex h-[min(640px,80vh)] w-[min(420px,92vw)] flex-col overflow-hidden rounded-2xl border border-border bg-bg-secondary shadow-2xl"
          >
            {/* Header */}
            <div className="border-b border-border p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-accent/15 text-accent">
                  <Sparkles size={16} />
                </span>
                <div>
                  <div className="text-sm font-semibold text-content-primary">{t('chat.title')}</div>
                </div>
              </div>
              <p className="mt-2 text-xs text-content-secondary">{t('chat.subtitle')}</p>

              <div className="mt-3 flex items-center gap-2">
                <label className="flex cursor-pointer items-center gap-2 text-xs text-content-secondary">
                  <input
                    type="checkbox"
                    checked={mode === 'recruiter'}
                    onChange={(e) => setMode(e.target.checked ? 'recruiter' : 'default')}
                    className="accent-accent"
                  />
                  {t('chat.recruiterMode')}
                </label>
                <button
                  type="button"
                  onClick={() => void ask(SUMMARY_PROMPT)}
                  disabled={loading}
                  className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs text-content-secondary transition-colors hover:text-content-primary disabled:opacity-50"
                >
                  <FileText size={13} /> {t('chat.generateSummary')}
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.length === 0 && (
                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-wide text-content-secondary">
                    {t('chat.tryAsking')}
                  </p>
                  <div className="flex flex-col gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => void ask(s)}
                        className="rounded-lg border border-border bg-bg-card px-3 py-2 text-left text-sm text-content-secondary transition-colors hover:border-accent/40 hover:text-content-primary"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm',
                      m.role === 'user'
                        ? 'bg-accent text-bg'
                        : 'border border-border bg-bg-card text-content-primary',
                    )}
                  >
                    {m.error ? (
                      <span className="text-content-secondary">{t('chat.error')}</span>
                    ) : (
                      <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                    )}

                    {m.role === 'assistant' && m.sources && m.sources.length > 0 && (
                      <div className="mt-3 border-t border-border pt-2">
                        <p className="mb-1.5 text-xs font-medium text-content-secondary">
                          {t('chat.sources')}
                        </p>
                        <ul className="flex flex-wrap gap-1.5">
                          {m.sources.map((s, i) => (
                            <li
                              key={`${s.source}-${i}`}
                              className="rounded border border-border bg-bg-secondary px-2 py-0.5 text-xs text-content-secondary"
                            >
                              {s.project || s.source}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {m.role === 'assistant' && m.retrieved && m.retrieved.length > 0 && (
                      <RagInspector chunks={m.retrieved} />
                    )}
                  </div>
                </div>
              ))}

              <PhaseIndicator phase={phase} />
            </div>

            {/* Composer */}
            <div className="border-t border-border p-3">
              <div className="flex items-end gap-2 rounded-xl border border-border bg-bg-card p-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  rows={1}
                  maxLength={1000}
                  placeholder={t('chat.placeholder')}
                  aria-label={t('chat.placeholder')}
                  className="max-h-28 flex-1 resize-none bg-transparent px-1 py-1 text-sm text-content-primary placeholder:text-content-secondary focus:outline-none"
                />
                <button
                  type="button"
                  onClick={submit}
                  disabled={!input.trim() || loading}
                  aria-label={t('chat.send')}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-bg transition-opacity disabled:opacity-40"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
