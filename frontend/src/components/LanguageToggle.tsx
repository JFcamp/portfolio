import { useTranslation } from 'react-i18next';
import type { Lang } from '@/i18n';
import { cn } from '@/utils/cn';

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const current = (i18n.language?.slice(0, 2) as Lang) || 'en';

  const setLang = (lang: Lang) => {
    void i18n.changeLanguage(lang);
    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* ignore storage errors */
    }
  };

  return (
    <div
      className="flex items-center gap-1 text-xs font-medium text-content-secondary"
      role="group"
      aria-label="Language"
    >
      {(['en', 'pt'] as Lang[]).map((lang, i) => (
        <span key={lang} className="flex items-center">
          {i > 0 && <span className="px-1 text-border">|</span>}
          <button
            type="button"
            onClick={() => setLang(lang)}
            aria-pressed={current === lang}
            className={cn(
              'rounded px-1 transition-colors',
              current === lang ? 'text-accent' : 'hover:text-content-primary',
            )}
          >
            {lang.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
