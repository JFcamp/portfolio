import type { SkillGroup, TechItem } from '@/types';
import { useLang, type Localized } from './localized';

/**
 * Skills grouped by category — no percentages, no progress bars (intentional).
 * Sourced from Pedro's resume. Category names are localized; tool names are not.
 */
const skillGroupsByLang: Localized<SkillGroup[]> = {
  en: [
    {
      category: 'Conversational & Generative AI',
      items: ['RAG', 'LLMs', 'Prompt Engineering', 'Claude API', 'OpenAI API', 'LangChain', 'Dify', 'Botpress', 'Dialogflow'],
    },
    { category: 'Data & Metrics', items: ['SQL', 'Python', 'Pandas', 'Interaction Analysis', 'Digital Service KPIs'] },
    { category: 'Machine Learning', items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Deep Learning', 'NLP'] },
    { category: 'Engineering', items: ['REST APIs', 'Docker', 'Git', 'MLOps'] },
    {
      category: 'Content & Experience',
      items: ['Knowledge Base Curation', 'Conversational Flow Design', 'Technical Writing for Non-technical Audiences'],
    },
    { category: 'Languages', items: ['Portuguese (native)', 'English (intermediate/advanced)'] },
  ],
  pt: [
    {
      category: 'IA Conversacional e Generativa',
      items: ['RAG', 'LLMs', 'Engenharia de Prompts', 'Claude API', 'OpenAI API', 'LangChain', 'Dify', 'Botpress', 'Dialogflow'],
    },
    { category: 'Dados e Métricas', items: ['SQL', 'Python', 'Pandas', 'Análise de Interações', 'KPIs de Atendimento Digital'] },
    { category: 'Machine Learning', items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Deep Learning', 'PLN'] },
    { category: 'Engenharia', items: ['APIs REST', 'Docker', 'Git', 'MLOps'] },
    {
      category: 'Conteúdo e Experiência',
      items: ['Curadoria de Bases de Conhecimento', 'Desenho de Fluxos Conversacionais', 'Escrita Técnica para Público Não Técnico'],
    },
    { category: 'Idiomas', items: ['Português (nativo)', 'Inglês (intermediário/avançado)'] },
  ],
};

/** Compact tech strip shown under the hero (language-independent). */
export const techStack: TechItem[] = [
  { name: 'Python' },
  { name: 'RAG' },
  { name: 'LLMs' },
  { name: 'LangChain' },
  { name: 'OpenAI API' },
  { name: 'Claude API' },
  { name: 'Dify' },
  { name: 'Botpress' },
  { name: 'Dialogflow' },
  { name: 'PyTorch' },
  { name: 'TensorFlow' },
  { name: 'Scikit-learn' },
  { name: 'SQL' },
  { name: 'Docker' },
  { name: 'Git' },
];

export const skillGroups: SkillGroup[] = skillGroupsByLang.en;

export function useSkillGroups(): SkillGroup[] {
  return skillGroupsByLang[useLang()];
}
