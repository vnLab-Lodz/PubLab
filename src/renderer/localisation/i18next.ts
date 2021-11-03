import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import plTranslation from './locales/pl/translation.json';

export const SUPPORTED_LANGUAGE_CODES = {
  english: 'en',
  polish: 'pl',
} as const;

export type SupportedLangCode =
  typeof SUPPORTED_LANGUAGE_CODES[keyof typeof SUPPORTED_LANGUAGE_CODES];

i18n.use(initReactI18next).init({
  lng: 'en',
  resources: {
    en: { translation: enTranslation },
    pl: { translation: plTranslation },
  },
});

export default i18n;
