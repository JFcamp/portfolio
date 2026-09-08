import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

/**
 * Vertical flow diagram used by the two architecture sections.
 * Nodes fade in on scroll; no looping animation to keep it calm.
 */
export function FlowDiagram({ stages }: { stages: string[] }) {
  return (
    <ol className="mx-auto flex max-w-sm flex-col items-stretch" aria-label="Pipeline stages">
      {stages.map((stage, i) => (
        <li key={stage} className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-center font-mono text-sm text-content-primary"
          >
            {stage}
          </motion.div>
          {i < stages.length - 1 && (
            <ArrowDown size={16} className="my-1.5 text-accent/60" aria-hidden="true" />
          )}
        </li>
      ))}
    </ol>
  );
}
