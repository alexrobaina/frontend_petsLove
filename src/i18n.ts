// src/i18n.ts
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector' // Import the language detector
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(HttpBackend)
  .use(LanguageDetector) // Add the language detector to detect the browser's language
  .use(initReactI18next)
  .init({
    ns: [
      'common',
      'dashboard',
      'community',
      'profilePet',
      'settings',
      'login',
      'vaccine',
      'appointments',
    ],
    defaultNS: 'common',
    supportedLngs: ['en', 'es', 'fr'],
    debug: true,
    fallbackLng: 'en',
    detection: {
      order: ['queryString', 'cookie'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
