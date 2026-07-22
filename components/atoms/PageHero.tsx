'use client'

import { useLang } from '@/lib/language-context'

interface Props {
  eyebrow: string
  title: string
  intro?: string
  /** zero-based index shown as a faint number, e.g. "01" */
  index?: string
}

export function PageHero({ eyebrow, title, intro, index }: Props) {
  return (
    <section className="relative bg-neutral-950 text-white pt-40 pb-20 px-8 overflow-hidden">
      {index && (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-10 right-4 md:right-16 text-[28vw] md:text-[20vw] font-medium leading-none text-white/[0.04] select-none"
        >
          {index}
        </span>
      )}
      <div className="max-w-[1400px] mx-auto relative">
        <p className="text-xs tracking-[0.25em] text-neutral-500 mb-8 voss-stagger" style={{ animationDelay: '0.05s' }}>
          {eyebrow}
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.95] text-balance whitespace-pre-line voss-stagger" style={{ animationDelay: '0.15s' }}>
          {title}
        </h1>
        {intro && (
          <p className="mt-10 max-w-2xl text-base md:text-lg text-neutral-400 leading-relaxed voss-stagger" style={{ animationDelay: '0.3s' }}>
            {intro}
          </p>
        )}
      </div>
    </section>
  )
}
