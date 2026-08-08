import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { canonical, languageAlternates } from '@/lib/site'
import { CarreirasView } from './CarreirasView'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'vagas' })
  const title = t('meta_title')
  const description = t('meta_description')

  return {
    title,
    description,
    alternates: {
      canonical: canonical(locale, '/carreiras'),
      languages: languageAlternates('/carreiras'),
    },
    openGraph: { title, description, type: 'website' },
  }
}

export default function CarreirasPage() {
  return <CarreirasView />
}
