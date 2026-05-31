import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Explore Digital — Agência de Marketing | Hotelaria · Experiências · Real Estate',
  description: 'Transformamos marcas de hotelaria, experiências e real estate em referências digitais. Branding, web design, social media e performance.',
  openGraph: {
    title: 'Explore Digital',
    description: 'Agência criativa especializada em hotelaria, experiências e real estate.',
    images: ['/images/logo.png'],
    siteName: 'Explore Digital',
  },
  twitter: { card: 'summary_large_image' },
}

interface Props {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Vimeo preconnect — reduz latência inicial do player */}
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://f.vimeocdn.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://i.vimeocdn.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vimeo.com" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
          <WhatsAppFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
