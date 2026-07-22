import type { Metadata } from 'next'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import './globals.css'
import { Navbar } from '@/components/molecules/Navbar'
import { Footer } from '@/components/molecules/Footer'

export const metadata: Metadata = {
  title: 'Bodi Properties LLC - Бодь Пропертийз ХХК',
  description: 'Pioneering minimalist architecture that blends form and function into timeless design.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/images/solologo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/images/solologo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/images/solologo.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased text-foreground">
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
