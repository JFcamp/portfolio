import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Layers } from 'lucide-react';
import type { RetrievedChunk } from '@/types';
import { cn } from '@/utils/cn';

/**
 * Live RAG Inspector: shows the chunks the pipeline actually retrieved, with
 * similarity scores — turning the assistant into a transparent RAG demo.
 */
export function RagInspector({ chunks }: { chunks: RetrievedChunk[] }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  if (!chunks.length) return null;

  return (
    <div className="mt-3 border-t border-border pt-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-1.5 text-xs font-medium text-content-secondary transition-colors hover:text-content-primary"
      >
        <Layers size={13} className="text-accent" />
        {t('chat.inspector')} · {chunks.length}
        <ChevronDown
          size={13}
          className={cn('ml-auto transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="mt-2 space-y-2">
          <p className="text-[11px] text-content-secondary">{t('chat.inspectorHint')}</p>
          {chunks.map((c) => (
            <div key={c.rank} className="rounded-md border border-border bg-bg-secondary p-2">
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="truncate font-mono text-[11px] text-content-secondary">
                  #{c.rank} {c.project || c.source}
                  {c.section ? ` · ${c.section}` : ''}
                </span>
                <ScoreBadge score={c.score} label={t('chat.match')} />
              </div>
              <p className="text-[11px] leading-relaxed text-content-secondary">{c.preview}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ScoreBadge({ score, label }: { score: number; label: string }) {
  const pct = Math.round(Math.min(1, Math.max(0, score)) * 100);
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded border border-accent/30 bg-accent/10 px-1.5 py-0.5 font-mono text-[10px] text-accent"
      title={`similarity ${score}`}
    >
      {pct}% {label}
    </span>
  );
}
