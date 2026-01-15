import { sr } from './locales/sr'
import type { TranslationKeys } from './locales/sr'
import { en } from './locales/en'

export type Language = 'sr' | 'en' | 'hr' | 'bs' | 'sl' | 'mk' | 'bg' | 'de' | 'fr' | 'it' | 'es'

export interface LanguageInfo {
  code: Language
  name: string
  nativeName: string
  flag: string
}

export const languages: LanguageInfo[] = [
  { code: 'sr', name: 'Serbian', nativeName: 'Srpski', flag: '🇷🇸' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷' },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', flag: '🇧🇦' },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenscina', flag: '🇸🇮' },
  { code: 'mk', name: 'Macedonian', nativeName: 'Makedonski', flag: '🇲🇰' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Bulgarski', flag: '🇧🇬' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'French', nativeName: 'Francais', flag: '🇫🇷' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'es', name: 'Spanish', nativeName: 'Espanol', flag: '🇪🇸' },
]

const translations: Record<Language, TranslationKeys> = {
  sr,
  en,
  // For MVP, other languages fallback to Serbian (similar languages) or English
  hr: sr, // Croatian - very similar to Serbian
  bs: sr, // Bosnian - very similar to Serbian
  sl: sr, // Slovenian - fallback to Serbian for now
  mk: sr, // Macedonian - similar to Serbian
  bg: sr, // Bulgarian - fallback to Serbian for now
  de: en, // German - fallback to English
  fr: en, // French - fallback to English
  it: en, // Italian - fallback to English
  es: en, // Spanish - fallback to English
}

export function getTranslations(lang: Language): TranslationKeys {
  return translations[lang] || translations.sr
}

export function detectBrowserLanguage(): Language {
  const browserLang = navigator.language.split('-')[0]
  const supported = languages.find(l => l.code === browserLang)
  return supported ? supported.code : 'sr'
}

export function getStoredLanguage(): Language | null {
  const stored = localStorage.getItem('language')
  if (stored && languages.some(l => l.code === stored)) {
    return stored as Language
  }
  return null
}

export function storeLanguage(lang: Language): void {
  localStorage.setItem('language', lang)
}

// Type-safe translation getter
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never
    }[keyof T]
  : never

export type TranslationKey = NestedKeyOf<TranslationKeys>

export function getNestedValue(obj: unknown, path: string): string {
  const keys = path.split('.')
  let current: unknown = obj

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key]
    } else {
      return path // Return the key as fallback
    }
  }

  return typeof current === 'string' ? current : path
}
