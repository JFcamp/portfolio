import { useTranslation } from 'react-i18next';
import { techStack } from '@/data/skills';
import { Reveal } from '@/components/Reveal';

export function TechStrip() {
  const { t } = useTranslation();
  return (
    <section className="border-y border-border bg-bg-secondary/40 py-10">
      <div className="container-content">
        <Reveal>
          <p className="mb-5 text-center font-mono text-xs uppercase tracking-[0.2em] text-content-secondary">
            {t('tech.title')}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {techStack.map((tech) => (
              <li
                key={tech.name}
                className="font-mono text-sm text-content-secondary transition-colors hover:text-accent"
              >
                {tech.name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
