'use client'

import Image from 'next/image'
import { useLang } from '@/lib/language-context'

export function HeroSection() {
  const { t } = useLang()
  const lines = t.hero.heading.split('\n')

  return (
    <section className="relative w-full h-screen" aria-label="Hero">
      <Image
        src="/images/11.jpg"
        alt="Modern concrete building with geometric facade"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative h-full flex flex-col justify-center px-8 max-w-[1400px] mx-auto">
        <p className="text-xs text-[#F58220] tracking-[0.2em] mb-8">{t.hero.tagline}</p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] max-w-4xl">
          {lines.map((line: string, i: number) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </h1>
        <div className="absolute bottom-12 left-8 flex items-center gap-4">
          <div className="w-12 h-px bg-neutral-400" />
          <span className="text-xs text-neutral-400 tracking-[0.2em]">{t.hero.scroll}</span>
        </div>
      </div>
    </section>
  )
}
