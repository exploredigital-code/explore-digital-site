import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'
import { SITE_URL } from '@/lib/site'
import '../globals.css'

interface Props {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    // metadataBase resolve as URLs relativas de OG/canonical das páginas filhas.
    metadataBase: new URL(SITE_URL),
    title: t('site_title'),
    description: t('description'),
    openGraph: {
      title: t('og_title'),
      description: t('og_description'),
      images: ['/images/logo.png'],
      siteName: 'Explore Digital',
      locale,
    },
    twitter: { card: 'summary_large_image' },
    // ATENÇÃO: não declarar `alternates.canonical` aqui. Metadata de layout é
    // herdada por toda página filha que não sobrescreve — um canonical fixo
    // fazia os 60 posts do blog, os 13 serviços e os cases se declararem
    // duplicatas da home, pedindo ao Google que não os indexasse.
    // Cada página define o seu próprio; quem não define, se auto-canonicaliza.
  }
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
