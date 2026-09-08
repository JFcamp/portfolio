import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Play, Loader2, Check, Sparkles } from 'lucide-react';
import { sendChat } from '@/services/api';
import type { ChatResponse } from '@/types';
import { Reveal } from '@/components/Reveal';
import { RagInspector } from '@/components/RagInspector';
import { cn } from '@/utils/cn';

type StepKey = 'embed' | 'search' | 'ground' | 'answer';
const STEP_ORDER: StepKey[] = ['embed', 'search', 'ground', 'answer'];

/**
 * A live, self-contained demonstration of the RAG pipeline. It runs the real
 * backend call and animates the pipeline stages so a visitor can watch the
 * assistant retrieve, ground and answer — with the sources it used.
 */
export function AiDemo() {
  const { t, i18n } = useTranslation();
  const samples = t('aiDemo.samples', { returnObjects: true }) as string[];

  const [input, setInput] = useState('');
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ChatResponse | null>(null);
  const [error, setError] = useState(false);

  const run = async (question: string) => {
    const q = question.trim();
    if (!q || loading) return;
    setLoading(true);
    setError(false);
    setResult(null);
    setActiveStep(0);

    // Animate the first stages while the request is in flight (cosmetic).
    const timers = [
      setTimeout(() => setActiveStep(1), 500),
      setTimeout(() => setActiveStep(2), 1000),
    ];

    try {
      const lang = (i18n.language?.slice(0, 2) === 'pt' ? 'pt' : 'en') as 'en' | 'pt';
      const res = await sendChat({ message: q, lang });
      setActiveStep(3);
      setResult(res);
    } catch {
      setError(true);
      setActiveStep(-1);
    } finally {
      timers.forEach(clearTimeout);
      setLoading(false);
    }
  };

  return (
    <section id="ai-demo" className="section bg-bg-secondary/30">
      <div className="container-content">
        <Reveal>
          <p className="eyebrow mb-3">{t('aiDemo.eyebrow')}</p>
          <h2 className="heading-2 mb-3">{t('aiDemo.title')}</h2>
          <p className="mb-8 max-w-2xl text-content-secondary">{t('aiDemo.subtitle')}</p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          {/* Left: input + pipeline */}
          <Reveal className="card p-6">
            <div className="flex items-end gap-2 rounded-xl border border-border bg-bg p-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    void run(input);
                  }
                }}
                rows={1}
                placeholder={t('chat.placeholder')}
                aria-label={t('aiDemo.title')}
                className="max-h-24 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-content-primary placeholder:text-content-secondary focus:outline-none"
              />
              <button
                type="button"
                onClick={() => void run(input)}
                disabled={!input.trim() || loading}
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-40"
              >
                {loading ? <Loader2 size={15} className="animate-spin" /> : <Play size={15} />}
                {loading ? t('aiDemo.running') : t('aiDemo.run')}
              </button>
            </div>

            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-content-secondary">
              {t('aiDemo.tryThese')}
            </p>
            <div className="mt-2 flex flex-col gap-2">
              {samples.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setInput(s);
                    void run(s);
                  }}
                  disabled={loading}
                  className="rounded-lg border border-border bg-bg px-3 py-2 text-left text-sm text-content-secondary transition-colors hover:border-accent/40 hover:text-content-primary disabled:opacity-50"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Pipeline stages */}
            <ol className="mt-6 space-y-2" aria-label="RAG pipeline">
              {STEP_ORDER.map((key, i) => {
                const done = activeStep > i || (result && i <= 3);
                const current = activeStep === i && loading;
                return (
                  <li key={key} className="flex items-center gap-3 text-sm">
                    <span
                      className={cn(
                        'grid h-6 w-6 shrink-0 place-items-center rounded-full border',
                        done
                          ? 'border-accent bg-accent/15 text-accent'
                          : current
                            ? 'border-accent text-accent'
                            : 'border-border text-content-secondary',
                      )}
                    >
                      {done ? (
                        <Check size={13} />
                      ) : current ? (
                        <Loader2 size={13} className="animate-spin" />
                      ) : (
                        <span className="font-mono text-[11px]">{i + 1}</span>
                      )}
                    </span>
                    <span className={done || current ? 'text-content-primary' : 'text-content-secondary'}>
                      {t(`aiDemo.steps.${key}`)}
                    </span>
                  </li>
                );
              })}
            </ol>
          </Reveal>

          {/* Right: answer + sources + inspector */}
          <Reveal delay={0.05} className="card flex flex-col p-6">
            {!result && !error && (
              <div className="flex flex-1 flex-col items-center justify-center py-10 text-center text-content-secondary">
                <Sparkles size={28} className="mb-3 text-accent/60" />
                <p className="max-w-xs text-sm">{t('aiDemo.subtitle')}</p>
              </div>
            )}

            {error && <p className="text-sm text-content-secondary">{t('chat.error')}</p>}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wide text-content-secondary">
                    {t('aiDemo.answer')}
                  </span>
                  {result.confidence > 0 && (
                    <span className="font-mono text-[11px] text-accent">
                      {Math.round(result.confidence * 100)}% {t('aiDemo.confidence')}
                    </span>
                  )}
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-content-primary">
                  {result.answer}
                </p>

                {result.sources && result.sources.length > 0 && (
                  <div className="mt-4 border-t border-border pt-3">
                    <p className="mb-1.5 text-xs font-medium text-content-secondary">
                      {t('chat.sources')}
                    </p>
                    <ul className="flex flex-wrap gap-1.5">
                      {result.sources.map((s, idx) => (
                        <li
                          key={`${s.source}-${idx}`}
                          className="rounded border border-border bg-bg-secondary px-2 py-0.5 text-xs text-content-secondary"
                        >
                          {s.project || s.source}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.retrieved && result.retrieved.length > 0 && (
                  <RagInspector chunks={result.retrieved} />
                )}
              </motion.div>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 text-xs text-content-secondary">{t('aiDemo.hintOffline')}</p>
        </Reveal>
      </div>
    </section>
  );
}
