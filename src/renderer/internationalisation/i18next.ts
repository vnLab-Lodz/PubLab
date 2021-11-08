import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import plTranslation from './locales/pl/translation.json';

export const resources = {
  en: { translation: enTranslation },
  pl: { translation: plTranslation },
};

export type SupportedLangCode = keyof typeof resources;
export const supportedLocales = Object.keys(resources) as SupportedLangCode[];

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  resources,
});

export default i18n;
