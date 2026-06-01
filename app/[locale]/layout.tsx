import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Explore Digital — Agência de Marketing para Hotéis, Pousadas e Real Estate',
  description: 'Agência de marketing turismo especializada em hotéis, pousadas e real estate. Reservas diretas, gestão de redes sociais, tráfego pago e branding. Menos OTA, mais lucro.',
  keywords: 'agência de marketing para hotéis, marketing digital pousada, reservas diretas hotel, gestão de redes sociais hotelaria, tráfego pago hotel, site para pousada, agência marketing turismo',
  openGraph: {
    title: 'Explore Digital — Agência de Marketing para Hotéis e Pousadas',
    description: 'Especialistas em marketing digital para hotelaria, experiências e real estate. Reduzimos a dependência de OTAs e construímos audiências que reservam direto.',
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
