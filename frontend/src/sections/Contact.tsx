import { useTranslation } from 'react-i18next';
import { Mail, Linkedin, Github } from 'lucide-react';
import { profile } from '@/data/profile';
import { isTodo } from '@/utils/isTodo';
import { Reveal } from '@/components/Reveal';

export function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="section">
      <div className="container-content max-w-3xl text-center">
        <Reveal>
          <p className="eyebrow mb-3">{t('contact.eyebrow')}</p>
          <h2 className="text-3xl font-semibold tracking-tight text-content-primary sm:text-4xl">
            {t('contact.title')}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-content-secondary">{t('contact.text')}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {!isTodo(profile.email) && (
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
              >
                <Mail size={16} /> {t('contact.email')}
              </a>
            )}
            {!isTodo(profile.linkedinUrl) && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-card px-4 py-2.5 text-sm font-medium text-content-primary transition-colors hover:border-accent/40"
              >
                <Linkedin size={16} /> {t('contact.linkedin')}
              </a>
            )}
            {!isTodo(profile.githubUrl) && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-bg-card px-4 py-2.5 text-sm font-medium text-content-primary transition-colors hover:border-accent/40"
              >
                <Github size={16} /> {t('contact.github')}
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
