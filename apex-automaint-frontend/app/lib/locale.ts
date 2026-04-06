import type { Language } from '../translations';

export function getLocale(language: Language) {
  if (language === 'ru') return 'ru-RU';
  if (language === 'ar') return 'ar-AE';
  return 'en-US';
}

