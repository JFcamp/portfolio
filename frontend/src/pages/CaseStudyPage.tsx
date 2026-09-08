import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Github, ExternalLink, FileText, Package } from 'lucide-react';
import { getProjectBySlug } from '@/data/projects';
import { useLang } from '@/data/localized';
import { isTodo } from '@/utils/isTodo';
import { EngineeringBadges } from '@/components/ProjectBadges';
import { NotFound } from './NotFound';

function Field({ label, value }: { label: string; value: string }) {
  if (isTodo(value)) return null;
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent">{label}</h2>
      <p className="leading-relaxed text-content-secondary">{value}</p>
    </div>
  );
}

export function CaseStudyPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const lang = useLang();
  const project = slug ? getProjectBySlug(slug, lang) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project || !project.caseStudy) return <NotFound />;
  const cs = project.caseStudy;

  return (
    <main className="container-content pt-28 pb-24">
      <Link to="/#projects" className="link-muted mb-8 inline-flex items-center gap-2 text-sm">
        <ArrowLeft size={16} /> {t('caseStudy.back')}
      </Link>

      <p className="font-mono text-xs uppercase tracking-widest text-accent">{project.category}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-content-primary sm:text-4xl">
        {project.name}
      </h1>

      {project.badges && project.badges.length > 0 && (
        <div className="mt-4">
          <EngineeringBadges badges={project.badges} />
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        {!isTodo(project.githubUrl) && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="link-muted inline-flex items-center gap-1.5">
            <Github size={15} /> {t('caseStudy.repository')}
          </a>
        )}
        {project.demoUrl && !isTodo(project.demoUrl) && (
          <a href={project.demoUrl} target="_blank" rel="noreferrer" className="link-muted inline-flex items-center gap-1.5">
            <ExternalLink size={15} /> {t('caseStudy.demo')}
          </a>
        )}
        {project.paperUrl && !isTodo(project.paperUrl) && (
          <a href={project.paperUrl} target="_blank" rel="noreferrer" className="link-muted inline-flex items-center gap-1.5">
            <FileText size={15} /> {t('caseStudy.paper')}
          </a>
        )}
      </div>

      {project.deliverable && !isTodo(project.deliverable) && (
        <div className="mt-5 flex items-start gap-2 rounded-lg border border-border bg-bg-secondary p-4 text-sm text-content-secondary">
          <Package size={16} className="mt-0.5 shrink-0 text-accent" />
          <span>
            <span className="font-medium text-content-primary">{t('caseStudy.deliverable')}: </span>
            {project.deliverable}
          </span>
        </div>
      )}

      {(() => {
        const metrics = (cs.metrics ?? project.metrics ?? []).filter((m) => !isTodo(m.value));
        return metrics.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="card p-4">
                <div className="font-mono text-xl font-semibold text-accent">{m.value}</div>
                <div className="mt-1 text-xs text-content-secondary">{m.label}</div>
              </div>
            ))}
          </div>
        ) : null;
      })()}

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech} className="tag">
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-12 space-y-8">
        <Field label={t('caseStudy.overview')} value={cs.overview} />
        <Field label={t('caseStudy.problem')} value={cs.problem} />
        <Field label={t('caseStudy.dataset')} value={cs.dataset} />
        <Field label={t('caseStudy.architecture')} value={cs.architecture} />
        <Field label={t('caseStudy.approach')} value={cs.approach} />
        <Field label={t('caseStudy.model')} value={cs.model} />
        <Field label={t('caseStudy.training')} value={cs.training} />
        <Field label={t('caseStudy.evaluation')} value={cs.evaluation} />
        <Field label={t('caseStudy.results')} value={cs.results} />
        <Field label={t('caseStudy.challenges')} value={cs.challenges} />
        <Field label={t('caseStudy.learned')} value={cs.learned} />
      </div>
    </main>
  );
}
