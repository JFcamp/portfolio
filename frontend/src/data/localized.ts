import { useTranslation } from 'react-i18next';

export type Lang = 'en' | 'pt';

/** A value that has an English and a Portuguese variant. */
export type Localized<T> = Record<Lang, T>;

/** Resolve the active UI language to a supported data language. */
export function useLang(): Lang {
  const { i18n } = useTranslation();
  return i18n.language?.slice(0, 2) === 'pt' ? 'pt' : 'en';
}

/** Pick the localized variant for the active language (EN fallback). */
export function pick<T>(value: Localized<T>, lang: Lang): T {
  return value[lang] ?? value.en;
}
