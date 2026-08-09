import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { canonical, languageAlternates } from '@/lib/site'
import { SobreView } from './SobreView'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about_page' })
  const title = t('meta_title')
  const description = t('meta_description')

  return {
    title,
    description,
    alternates: {
      canonical: canonical(locale, '/sobre'),
      languages: languageAlternates('/sobre'),
    },
    openGraph: { title, description, type: 'website' },
  }
}

export default function SobrePage() {
  return <SobreView />
}
