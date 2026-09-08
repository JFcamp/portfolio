import { useTranslation } from 'react-i18next';
import { Reveal } from '@/components/Reveal';
import { FlowDiagram } from '@/components/FlowDiagram';

const BUILD_FLOW = [
  'DATA SOURCES',
  'DATA PIPELINE',
  'MODEL / LLM',
  'API',
  'APPLICATION',
  'MONITORING',
];

const AI_FLOW = [
  'USER QUESTION',
  'EMBEDDING',
  'VECTOR SEARCH',
  'PORTFOLIO KNOWLEDGE',
  'CONTEXT',
  'LLM',
  'GROUNDED ANSWER',
];

export function Architecture() {
  const { t } = useTranslation();
  return (
    <section className="section">
      <div className="container-content grid gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="eyebrow mb-3">{t('architecture.buildEyebrow')}</p>
            <h2 className="heading-2 mb-8">{t('architecture.buildTitle')}</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <FlowDiagram stages={BUILD_FLOW} />
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow mb-3">{t('architecture.aiEyebrow')}</p>
            <h2 className="heading-2 mb-8">{t('architecture.aiTitle')}</h2>
          </Reveal>
          <Reveal delay={0.05}>
            <FlowDiagram stages={AI_FLOW} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
