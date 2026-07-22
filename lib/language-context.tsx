'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations, type Language, type Translations } from './i18n'
import { pagesContent, type PagesContent } from './pages-content'

interface LanguageContextType {
  lang: Language
  t: Translations
  p: PagesContent
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('EN')
  const [mounted, setMounted] = useState(false)

  // LOAD saved language
  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language | null
    if (saved === 'EN' || saved === 'MN') {
      setLang(saved)
    }
    setMounted(true)
  }, [])

  // SAVE language
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('lang', lang)
    }
  }, [lang, mounted])

  const toggle = () => {
    setLang(prev => (prev === 'EN' ? 'MN' : 'EN'))
  }

  return (
    <LanguageContext.Provider
      value={{
        lang,
        t: translations[lang],
        p: pagesContent[lang],
        toggle,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}