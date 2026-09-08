import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import pt from './pt.json';

export const SUPPORTED_LANGS = ['en', 'pt'] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

const stored = (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) as Lang | null;

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
  },
  lng: stored ?? 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnObjects: true,
});

export default i18n;
