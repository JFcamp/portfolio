import { useTranslation } from 'react-i18next';
import { useSkillGroups } from '@/data/skills';
import { Reveal } from '@/components/Reveal';

export function Skills() {
  const { t } = useTranslation();
  const skillGroups = useSkillGroups();
  return (
    <section id="skills" className="section bg-bg-secondary/30">
      <div className="container-content">
        <Reveal>
          <p className="eyebrow mb-3">{t('skills.eyebrow')}</p>
          <h2 className="heading-2 mb-10">{t('skills.title')}</h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.05} className="card p-5">
              <h3 className="mb-3 text-sm font-semibold text-content-primary">{group.category}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="tag">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
