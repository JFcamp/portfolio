import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, MessageSquare, FileDown } from 'lucide-react';
import { useProfile } from '@/data/profile';
import { isTodo } from '@/utils/isTodo';
import { PipelineViz } from '@/components/PipelineViz';

export function Hero({ onOpenChat }: { onOpenChat: () => void }) {
  const { t } = useTranslation();
  const profile = useProfile();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative overflow-hidden bg-bg pt-32 pb-20 sm:pt-40">
      {/* subtle background glow (kept above the section bg, below content) */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(600px circle at 75% 20%, rgb(var(--accent) / 0.08), transparent 60%)',
        }}
      />
      <div className="container-content relative z-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-content-secondary"
          >
            {profile.greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl font-semibold tracking-tight text-content-primary sm:text-5xl lg:text-6xl"
          >
            {profile.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-xl text-lg text-content-secondary"
          >
            {profile.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 font-mono text-sm text-content-secondary"
          >
            {profile.specialties.join('  •  ')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              {t('hero.viewProjects')}
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={onOpenChat}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-card px-4 py-2.5 text-sm font-medium text-content-primary transition-colors hover:border-accent/40"
            >
              <MessageSquare size={16} />
              {t('hero.askAi')}
            </button>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium text-content-secondary transition-colors hover:text-content-primary"
            >
              <FileDown size={16} />
              {t('hero.resume')}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mt-8 flex items-center gap-4"
          >
            {!isTodo(profile.githubUrl) && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="link-muted inline-flex items-center gap-1.5 text-sm"
              >
                <Github size={16} /> GitHub
              </a>
            )}
            {!isTodo(profile.linkedinUrl) && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="link-muted inline-flex items-center gap-1.5 text-sm"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <PipelineViz />
        </motion.div>
      </div>
    </section>
  );
}
