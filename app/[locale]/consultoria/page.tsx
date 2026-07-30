import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ConsultoriaView } from './ConsultoriaView'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'consultoria' })

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    openGraph: {
      title: t('og_title'),
      description: t('og_description'),
      images: ['/images/logo.png'],
      siteName: 'Explore Digital',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
    alternates: { canonical: `https://somosexplore.com/${locale}/consultoria` },
  }
}

export default function ConsultoriaPage() {
  return <ConsultoriaView />
}
