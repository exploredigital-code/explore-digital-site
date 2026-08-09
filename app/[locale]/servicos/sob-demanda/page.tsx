import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { canonical, languageAlternates } from '@/lib/site'
import { SobDemandaView } from './SobDemandaView'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'servicos' })
  const title = t('od_meta_title')
  const description = t('od_meta_description')

  return {
    title,
    description,
    alternates: {
      canonical: canonical(locale, '/servicos/sob-demanda'),
      languages: languageAlternates('/servicos/sob-demanda'),
    },
    openGraph: { title, description, type: 'website' },
  }
}

export default function SobDemandaPage() {
  return <SobDemandaView />
}
