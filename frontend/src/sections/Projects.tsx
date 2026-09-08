import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useProjects, projectCategories } from '@/data/projects';
import type { ProjectCategory } from '@/types';
import { ProjectCard } from '@/components/ProjectCard';
import { Reveal } from '@/components/Reveal';
import { cn } from '@/utils/cn';

type Filter = 'All' | ProjectCategory;

export function Projects() {
  const { t } = useTranslation();
  const projects = useProjects();
  const [filter, setFilter] = useState<Filter>('All');

  // Only show filters that actually have projects.
  const availableFilters = useMemo(
    () => projectCategories.filter((c) => c === 'All' || projects.some((p) => p.category === c)),
    [projects],
  );

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
  );

  // Editorial split: featured projects get large cards, the rest a compact grid.
  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);

  return (
    <section id="projects" className="section">
      <div className="container-content">
        <Reveal>
          <p className="eyebrow mb-3">{t('projects.eyebrow')}</p>
          <h2 className="heading-2 mb-8">{t('projects.title')}</h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Project filters">
            {availableFilters.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={filter === cat}
                onClick={() => setFilter(cat as Filter)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                  filter === cat
                    ? 'border-accent/40 bg-accent/10 text-accent'
                    : 'border-border text-content-secondary hover:text-content-primary',
                )}
              >
                {cat === 'All' ? t('projects.filterAll') : cat}
              </button>
            ))}
          </div>
        </Reveal>

        {featured.length > 0 && (
          <div className="mb-14">
            <Reveal>
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-content-secondary">
                {t('projects.featured')}
              </p>
            </Reveal>
            <div className="grid gap-6 lg:grid-cols-2">
              {featured.map((project, i) => (
                <ProjectCard key={project.slug} project={project} variant="featured" delay={i * 0.05} />
              ))}
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div>
            {featured.length > 0 && (
              <Reveal>
                <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-content-secondary">
                  {t('projects.more')}
                </p>
              </Reveal>
            )}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((project, i) => (
                <ProjectCard key={project.slug} project={project} variant="compact" delay={i * 0.04} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
