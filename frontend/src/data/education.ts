import type { Education } from '@/types';
import { useLang, type Localized } from './localized';

const educationByLang: Localized<Education[]> = {
  en: [
    {
      degree: "Bachelor's in Information Systems",
      institution: 'Universidade Federal de Viçosa (UFV)',
      period: '2023 – expected Dec 2026 (final semester)',
      details:
        'Undergraduate researcher and AI teaching assistant, with award-winning deep learning publications.',
    },
  ],
  pt: [
    {
      degree: 'Bacharelado em Sistemas de Informação',
      institution: 'Universidade Federal de Viçosa (UFV)',
      period: '2023 – conclusão prevista dez/2026 (último período)',
      details:
        'Pesquisador de iniciação científica e monitor de IA, com publicações premiadas em deep learning.',
    },
  ],
};

export const education: Education[] = educationByLang.en;

export function useEducation(): Education[] {
  return educationByLang[useLang()];
}
