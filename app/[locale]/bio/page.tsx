import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { BioView } from './BioView'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'bio' })

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    // Uma página de links não deve disputar busca com a home.
    robots: { index: false, follow: true },
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      images: ['/images/logo.png'],
      siteName: 'Explore Digital',
      type: 'website',
    },
  }
}

export default function BioPage() {
  return <BioView />
}
