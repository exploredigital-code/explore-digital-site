import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { canonical, languageAlternates } from '@/lib/site'
import { VagasView } from './VagasView'

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
      canonical: canonical(locale, '/vagas'),
      languages: languageAlternates('/vagas'),
    },
    openGraph: { title, description, type: 'website' },
  }
}

export default function VagasPage() {
  return <VagasView />
}
