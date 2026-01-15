import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import {
  getTranslations,
  detectBrowserLanguage,
  getStoredLanguage,
  storeLanguage,
  getNestedValue,
} from '../i18n'
import type { Language } from '../i18n'
import type { TranslationKeys } from '../i18n/locales/sr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  translations: TranslationKeys
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try stored language first, then browser detection, default to Serbian
    return getStoredLanguage() || detectBrowserLanguage()
  })

  const [translations, setTranslations] = useState<TranslationKeys>(() => getTranslations(language))

  useEffect(() => {
    setTranslations(getTranslations(language))
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    storeLanguage(lang)
    // Update HTML lang attribute
    document.documentElement.lang = lang
  }

  const t = (key: string): string => {
    return getNestedValue(translations, key)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
