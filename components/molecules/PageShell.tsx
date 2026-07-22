'use client'

import type { ReactNode } from 'react'
import { Navbar } from '@/components/molecules/Navbar'
import { Footer } from '@/components/molecules/Footer'

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  )
}
