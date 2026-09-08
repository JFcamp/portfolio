import type { Profile } from '@/types';
import { useLang, type Localized } from './localized';

/**
 * Central profile configuration (bilingual). Edit here to update the whole site.
 * Values marked TODO_ are still unknown — replace when available.
 */
const profiles: Localized<Profile> = {
  en: {
    name: 'Pedro Henrique Campos Moreira',
    initials: 'PC',
    title: 'Machine Learning Engineer',
    secondaryTitle: 'Conversational & Generative AI Engineer',
    greeting: "Hello, I'm Pedro Campos.",
    tagline:
      'Machine Learning Engineer building intelligent systems across ML, computer vision and generative AI — from prototype to production.',
    specialties: ['Conversational AI', 'RAG', 'LLMs', 'Prompt Engineering', 'NLP', 'AI Automation'],
    location: 'Belo Horizonte, MG — Brazil',
    email: 'pedrocampos6388@gmail.com',
    githubUrl: 'TODO_GITHUB_URL',
    linkedinUrl: 'https://www.linkedin.com/in/pedro-campos-5760a92ab/',
    resumeUrl: '/resume.pdf',
    stats: [
      { label: 'Years in AI', value: '3+' },
      { label: 'Chatbots in Production', value: '14+' },
      { label: 'Award-winning Papers', value: '5' },
      { label: 'Certifications', value: '2' },
    ],
  },
  pt: {
    name: 'Pedro Henrique Campos Moreira',
    initials: 'PC',
    title: 'Engenheiro de Machine Learning',
    secondaryTitle: 'Engenheiro de IA Conversacional e Generativa',
    greeting: 'Olá, sou o Pedro Campos.',
    tagline:
      'Engenheiro de Machine Learning que constrói sistemas inteligentes em ML, visão computacional e IA generativa — do protótipo à produção.',
    specialties: [
      'IA Conversacional',
      'RAG',
      'LLMs',
      'Engenharia de Prompts',
      'PLN',
      'Automação com IA',
    ],
    location: 'Belo Horizonte, MG — Brasil',
    email: 'pedrocampos6388@gmail.com',
    githubUrl: 'TODO_GITHUB_URL',
    linkedinUrl: 'https://www.linkedin.com/in/pedro-campos-5760a92ab/',
    resumeUrl: '/resume.pdf',
    stats: [
      { label: 'Anos em IA', value: '3+' },
      { label: 'Chatbots em Produção', value: '14+' },
      { label: 'Artigos Premiados', value: '5' },
      { label: 'Certificações', value: '2' },
    ],
  },
};

/** Non-hook access (English) for modules that can't use hooks. */
export const profile: Profile = profiles.en;

export function useProfile(): Profile {
  return profiles[useLang()];
}
