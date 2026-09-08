import type { Certification } from '@/types';
import { useLang, type Localized } from './localized';

const certificationsByLang: Localized<Certification[]> = {
  en: [
    {
      name: "CS50's Introduction to Artificial Intelligence with Python (CS50 AI)",
      issuer: 'Harvard University (HarvardX)',
      date: '2025',
      url: 'TODO_CREDENTIAL_URL',
    },
    {
      name: 'Introduction to Generative AI',
      issuer: 'Google Cloud Skills Boost',
      date: '2026',
      url: 'TODO_CREDENTIAL_URL',
    },
  ],
  pt: [
    {
      name: "CS50's Introduction to Artificial Intelligence with Python (CS50 AI)",
      issuer: 'Harvard University (HarvardX)',
      date: '2025',
      url: 'TODO_CREDENTIAL_URL',
    },
    {
      name: 'Introduction to Generative AI',
      issuer: 'Google Cloud Skills Boost',
      date: '2026',
      url: 'TODO_CREDENTIAL_URL',
    },
  ],
};

export const certifications: Certification[] = certificationsByLang.en;

export function useCertifications(): Certification[] {
  return certificationsByLang[useLang()];
}
