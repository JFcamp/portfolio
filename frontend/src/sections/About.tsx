import { useTranslation } from 'react-i18next';
import { useProfile } from '@/data/profile';
import { isTodo } from '@/utils/isTodo';
import { Reveal } from '@/components/Reveal';

export function About() {
  const { t } = useTranslation();
  const profile = useProfile();
  const stats = profile.stats.filter((s) => !isTodo(s.value));

  return (
    <section id="about" className="section">
      <div className="container-content">
        <Reveal>
          <p className="eyebrow mb-3">{t('about.eyebrow')}</p>
          <h2 className="heading-2 mb-8">{t('about.title')}</h2>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="space-y-4 text-content-secondary leading-relaxed">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </Reveal>

          {stats.length > 0 && (
            <Reveal delay={0.1} className="grid grid-cols-2 gap-4 self-start">
              {stats.map((stat) => (
                <div key={stat.label} className="card p-5">
                  <div className="font-mono text-2xl font-semibold text-accent">{stat.value}</div>
                  <div className="mt-1 text-sm text-content-secondary">{stat.label}</div>
                </div>
              ))}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
