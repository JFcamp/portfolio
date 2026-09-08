import { useTranslation } from 'react-i18next';
import { useExperiences } from '@/data/experience';
import { useEducation } from '@/data/education';
import { useCertifications } from '@/data/certifications';
import { isTodo } from '@/utils/isTodo';
import { Reveal } from '@/components/Reveal';
import { ExternalLink } from 'lucide-react';

export function Experience() {
  const { t } = useTranslation();
  const experiences = useExperiences();
  const education = useEducation();
  const certifications = useCertifications();

  const eduReal = education.filter((e) => !isTodo(e.degree) || !isTodo(e.institution));
  const certReal = certifications.filter((c) => !isTodo(c.name));

  return (
    <section id="experience" className="section bg-bg-secondary/30">
      <div className="container-content">
        <Reveal>
          <p className="eyebrow mb-3">{t('experience.eyebrow')}</p>
          <h2 className="heading-2 mb-10">{t('experience.title')}</h2>
        </Reveal>

        <ol className="relative border-l border-border pl-6">
          {experiences.map((exp, i) => (
            <Reveal as="li" key={`${exp.company}-${i}`} delay={i * 0.05} className="mb-10 last:mb-0">
              <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg" />
              <div className="font-mono text-sm text-accent">{exp.year}</div>
              <h3 className="mt-1 text-lg font-semibold text-content-primary">{exp.role}</h3>
              <div className="text-sm text-content-secondary">
                {exp.company}
                {!isTodo(exp.period) && <span> · {exp.period}</span>}
              </div>
              {!isTodo(exp.description) && (
                <p className="mt-3 text-sm text-content-secondary">{exp.description}</p>
              )}
              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-content-secondary">
                {t('experience.responsibilities')}
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-content-secondary">
                {exp.responsibilities.map((r, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-2">
                {exp.tech.map((tech) => (
                  <li key={tech} className="tag">
                    {tech}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {eduReal.length > 0 && (
            <Reveal>
              <h3 className="mb-4 text-lg font-semibold text-content-primary">
                {t('education.title')}
              </h3>
              <div className="space-y-4">
                {eduReal.map((e, i) => (
                  <div key={i} className="card p-5">
                    <div className="font-medium text-content-primary">{e.degree}</div>
                    <div className="text-sm text-content-secondary">
                      {e.institution}
                      {!isTodo(e.period) && <span> · {e.period}</span>}
                    </div>
                    {!isTodo(e.details) && (
                      <p className="mt-2 text-sm text-content-secondary">{e.details}</p>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {certReal.length > 0 && (
            <Reveal delay={0.05}>
              <h3 className="mb-4 text-lg font-semibold text-content-primary">
                {t('certifications.title')}
              </h3>
              <div className="space-y-4">
                {certReal.map((c, i) => (
                  <div key={i} className="card flex items-start justify-between gap-3 p-5">
                    <div>
                      <div className="font-medium text-content-primary">{c.name}</div>
                      <div className="text-sm text-content-secondary">
                        {c.issuer}
                        {!isTodo(c.date) && <span> · {c.date}</span>}
                      </div>
                    </div>
                    {c.url && !isTodo(c.url) && (
                      <a href={c.url} target="_blank" rel="noreferrer" className="link-muted mt-1">
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
