import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Github, ArrowUpRight, ExternalLink, FileText, Package } from 'lucide-react';
import type { Project } from '@/types';
import { isTodo } from '@/utils/isTodo';
import { cn } from '@/utils/cn';
import { Reveal } from './Reveal';
import { EngineeringBadges } from './ProjectBadges';

interface ProjectCardProps {
  project: Project;
  delay?: number;
  /** "featured" = larger editorial card; "compact" = tighter list card. */
  variant?: 'featured' | 'compact';
}

function ProjectLinks({ project }: { project: Project }) {
  const { t } = useTranslation();
  return (
    <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-border pt-4 text-sm">
      {project.caseStudy && (
        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
        >
          {t('projects.caseStudy')} <ArrowUpRight size={15} />
        </Link>
      )}
      {!isTodo(project.githubUrl) && (
        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="link-muted inline-flex items-center gap-1.5">
          <Github size={15} /> {t('projects.github')}
        </a>
      )}
      {project.demoUrl && !isTodo(project.demoUrl) && (
        <a href={project.demoUrl} target="_blank" rel="noreferrer" className="link-muted inline-flex items-center gap-1.5">
          <ExternalLink size={15} /> {t('projects.viewProject')}
        </a>
      )}
      {project.paperUrl && !isTodo(project.paperUrl) && (
        <a href={project.paperUrl} target="_blank" rel="noreferrer" className="link-muted inline-flex items-center gap-1.5">
          <FileText size={15} /> {t('projects.paper')}
        </a>
      )}
    </div>
  );
}

export function ProjectCard({ project, delay = 0, variant = 'compact' }: ProjectCardProps) {
  const { t } = useTranslation();
  const isFeatured = variant === 'featured';
  const metrics = (project.metrics ?? []).filter((m) => !isTodo(m.value));

  return (
    <Reveal
      as="article"
      delay={delay}
      className={cn(
        'card group flex flex-col p-6 transition-colors hover:border-accent/40',
        isFeatured && 'sm:p-7',
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          {project.category}
        </span>
      </div>

      <h3 className={cn('font-semibold text-content-primary', isFeatured ? 'text-xl' : 'text-lg')}>
        {project.name}
      </h3>

      {isFeatured ? (
        <div className="mt-4 space-y-3 text-sm text-content-secondary">
          <div>
            <span className="font-medium text-content-primary">{t('projects.problem')}: </span>
            {project.problem}
          </div>
          <div>
            <span className="font-medium text-content-primary">{t('projects.solution')}: </span>
            {project.solution}
          </div>
          {!isTodo(project.results) && (
            <div>
              <span className="font-medium text-content-primary">{t('projects.results')}: </span>
              {project.results}
            </div>
          )}
          {project.deliverable && !isTodo(project.deliverable) && (
            <div className="flex items-start gap-2">
              <Package size={15} className="mt-0.5 shrink-0 text-accent" />
              <span>
                <span className="font-medium text-content-primary">{t('projects.deliverable')}: </span>
                {project.deliverable}
              </span>
            </div>
          )}
        </div>
      ) : (
        <p className="mt-3 text-sm text-content-secondary">{project.summary}</p>
      )}

      {metrics.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {metrics.slice(0, 3).map((m) => (
            <div key={m.label} className="rounded-lg border border-border bg-bg-secondary p-2 text-center">
              <div className="font-mono text-sm font-semibold text-accent">{m.value}</div>
              <div className="mt-0.5 text-[10px] leading-tight text-content-secondary">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      {project.badges && project.badges.length > 0 && (
        <div className="mt-4">
          <EngineeringBadges badges={project.badges} />
        </div>
      )}

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.slice(0, isFeatured ? 12 : 6).map((tech) => (
          <li key={tech} className="tag">
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <ProjectLinks project={project} />
      </div>
    </Reveal>
  );
}
