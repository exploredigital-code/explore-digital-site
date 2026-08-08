import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { canonical, languageAlternates } from '@/lib/site'
import { PortfolioView } from './PortfolioView'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'portfolio' })
  const title = t('page_meta_title')
  const description = t('page_meta_description')

  return {
    title,
    description,
    alternates: {
      canonical: canonical(locale, '/portfolio'),
      languages: languageAlternates('/portfolio'),
    },
    openGraph: { title, description, type: 'website' },
  }
}

export default function PortfolioPage() {
  return <PortfolioView />
}
