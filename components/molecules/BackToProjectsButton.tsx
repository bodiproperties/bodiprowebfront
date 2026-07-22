'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export function BackToProjectsButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Link
      href="/projects"
      aria-label="Back to projects"
      className={`fixed bottom-1/2 left-8 z-40
        inline-flex items-center gap-3 px-5 py-3 rounded-full
        bg-white/85 hover:bg-white backdrop-blur-md
        text-neutral-900 text-xs tracking-[0.25em] uppercase
        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        border border-neutral-200/60
        transition-all duration-500 ease-out
        ${
          visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
    >
      <ArrowLeft
        size={14}
        className="transition-transform duration-300 group-hover:-translate-x-0.5"
      />
      <span>All Projects</span>
    </Link>
  )
}