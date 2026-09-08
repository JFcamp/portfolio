import { useTranslation } from 'react-i18next';
import { Mail, Linkedin, Github } from 'lucide-react';
import { useProfile } from '@/data/profile';
import { isTodo } from '@/utils/isTodo';

export function Footer() {
  const { t } = useTranslation();
  const profile = useProfile();
  return (
    <footer className="border-t border-border py-10">
      <div className="container-content flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <div className="font-mono text-sm text-content-primary">{profile.name}</div>
          <div className="text-sm text-content-secondary">{profile.title}</div>
        </div>

        <div className="flex items-center gap-5">
          {!isTodo(profile.githubUrl) && (
            <a href={profile.githubUrl} aria-label="GitHub" className="link-muted" target="_blank" rel="noreferrer">
              <Github size={18} />
            </a>
          )}
          {!isTodo(profile.linkedinUrl) && (
            <a href={profile.linkedinUrl} aria-label="LinkedIn" className="link-muted" target="_blank" rel="noreferrer">
              <Linkedin size={18} />
            </a>
          )}
          {!isTodo(profile.email) && (
            <a href={`mailto:${profile.email}`} aria-label="Email" className="link-muted">
              <Mail size={18} />
            </a>
          )}
        </div>

        <div className="font-mono text-xs text-content-secondary">{t('footer.builtWith')}</div>
      </div>
    </footer>
  );
}
