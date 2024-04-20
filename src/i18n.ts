// src/i18n.ts
import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    ns: ['common', 'dashboard', 'community', 'profilePet', 'settings', 'login', 'vaccine'],
    defaultNS: 'common',
    supportedLngs: ['en', 'es'],
    fallbackLng: 'en',
    debug: false,
    detection: {
      order: ['queryString', 'cookie'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
