import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { canonical, languageAlternates } from '@/lib/site'
import { PlanoView } from './PlanoView'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'plano' })

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    alternates: {
      canonical: canonical(locale, '/plano-de-acao'),
      languages: languageAlternates('/plano-de-acao'),
    },
    openGraph: { title: t('og_title'), description: t('og_description'), type: 'website' },
  }
}

export default function PlanoDeAcaoPage() {
  return <PlanoView />
}
