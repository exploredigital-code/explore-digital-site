import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'
import { SITE_URL } from '@/lib/site'
import { quanta } from '@/lib/fonts'
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
    <html lang={locale} className={`${quanta.variable} scroll-smooth`}>
      <head>
        {/* Satoshi (corpo) pela Fontshare. Quanta é local, via next/font. */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        {/* Os preconnect do Vimeo saíram. O hero passou a servir mp4 local e
            nenhuma página abre o player no carregamento: o iframe só nasce
            quando o visitante clica no lightbox. Manter o preconnect custava
            DNS e handshake em toda página, inclusive nas que nunca usam vídeo. */}
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
