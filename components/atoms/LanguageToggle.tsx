'use client'

import { useLang } from '@/lib/language-context'

interface Props {
  scrolled: boolean
}

export function LanguageToggle({ scrolled }: Props) {
  const { lang, toggle } = useLang()
  const base = scrolled ? 'text-neutral-900' : 'text-white'
  const inactive = scrolled ? 'text-neutral-400' : 'text-neutral-500'

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="flex items-center gap-1 text-xs tracking-[0.15em] transition-colors"
    >
      <span className={lang === 'EN' ? base : inactive}>EN</span>
      <span className={scrolled ? 'text-neutral-300' : 'text-neutral-600'}>/</span>
      <span className={lang === 'MN' ? base : inactive}>MN</span>
    </button>
  )
}
