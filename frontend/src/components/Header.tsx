import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Menu, X, FileDown } from 'lucide-react';
import { profile } from '@/data/profile';
import { useScrolled } from '@/hooks/useScrolled';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { isTodo } from '@/utils/isTodo';
import { cn } from '@/utils/cn';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';

const SECTION_IDS = ['home', 'about', 'experience', 'projects', 'skills', 'ai-demo', 'contact'];

export function Header() {
  const { t } = useTranslation();
  const scrolled = useScrolled();
  const active = useScrollSpy(SECTION_IDS);
  const [open, setOpen] = useState(false);

  const navItems: { id: string; label: string; action?: () => void }[] = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'ai-demo', label: t('nav.assistant') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const go = (item: { id: string; action?: () => void }) => {
    setOpen(false);
    if (item.action) return item.action();
    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-bg/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="container-content flex h-16 items-center justify-between" aria-label="Main">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            go({ id: 'home' });
          }}
          className="flex items-center gap-2 font-mono text-sm font-medium text-content-primary"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md border border-border bg-bg-card text-accent">
            {profile.initials}
          </span>
          <span className="hidden sm:inline text-content-secondary">/ ML Engineer</span>
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(item)}
                className={cn(
                  'text-sm transition-colors',
                  active === item.id && !item.action
                    ? 'text-content-primary'
                    : 'text-content-secondary hover:text-content-primary',
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <LanguageToggle />
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
          <a
            href={profile.resumeUrl}
            className="inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
            download
          >
            <FileDown size={15} />
            {t('nav.resume')}
          </a>
        </div>

        <button
          type="button"
          className="md:hidden text-content-primary"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-bg/95 backdrop-blur-md md:hidden">
          <ul className="container-content flex flex-col py-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => go(item)}
                  className="w-full py-2 text-left text-content-secondary hover:text-content-primary"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <LanguageToggle />
              </div>
              <a href={profile.resumeUrl} className="text-sm font-medium text-accent" download>
                {t('nav.resume')}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
