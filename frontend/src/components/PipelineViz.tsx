import { motion } from 'framer-motion';

const STAGES = ['DATA', 'MODEL', 'EMBEDDINGS', 'VECTOR DB', 'LLM', 'RESPONSE'];

/**
 * Discreet AI-pipeline visualization for the hero.
 * Subtle node pulses + a flowing connector; honors reduced-motion.
 */
export function PipelineViz() {
  return (
    <div
      className="relative mx-auto w-full max-w-md rounded-xl border border-border bg-bg-secondary/60 p-6 backdrop-blur-sm"
      aria-hidden="true"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        <span className="font-mono text-xs uppercase tracking-widest text-content-secondary">
          ai pipeline
        </span>
      </div>

      <ol className="relative space-y-0">
        {STAGES.map((stage, i) => (
          <li key={stage} className="relative flex items-center gap-4 py-2.5">
            {/* connector */}
            {i < STAGES.length - 1 && (
              <span className="absolute left-[7px] top-[34px] h-[calc(100%-12px)] w-px overflow-hidden">
                <span className="block h-full w-full bg-gradient-to-b from-accent/50 to-accent/5" />
              </span>
            )}
            <motion.span
              className="relative z-10 grid h-4 w-4 place-items-center"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                delay: i * 0.35,
                ease: 'easeInOut',
              }}
            >
              <span className="absolute h-4 w-4 rounded-full bg-accent/20" />
              <span className="h-2 w-2 rounded-full bg-accent" />
            </motion.span>
            <span className="font-mono text-sm text-content-primary">{stage}</span>
          </li>
        ))}
      </ol>

      <div className="mt-5 border-t border-border pt-4 font-mono text-[11px] leading-relaxed text-content-secondary">
        <span className="text-accent">retriever</span>.search(query) →{' '}
        <span className="text-accent">context</span> → llm.generate()
      </div>
    </div>
  );
}
