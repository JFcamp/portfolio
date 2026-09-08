import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function NotFound() {
  const { t } = useTranslation();
  return (
    <main className="container-content flex min-h-screen flex-col items-center justify-center text-center">
      <p className="font-mono text-6xl font-semibold text-accent">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-content-primary">{t('notFound.title')}</h1>
      <Link
        to="/"
        className="mt-6 rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg"
      >
        {t('notFound.back')}
      </Link>
    </main>
  );
}
