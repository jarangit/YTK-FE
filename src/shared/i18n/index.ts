import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import th from './th';

const savedLang = typeof localStorage !== 'undefined'
  ? localStorage.getItem('youtive_lang')
  : null;

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    th: { translation: th },
  },
  lng: savedLang || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  returnObjects: true,
});

export function setLanguage(lang: 'en' | 'th') {
  localStorage.setItem('youtive_lang', lang);
  void i18n.changeLanguage(lang);
}

export default i18n;
