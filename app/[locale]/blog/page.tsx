import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { canonical } from '@/lib/site'
import { BlogView } from './BlogView'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  const title = t('meta_title')
  const description = t('meta_description')

  return {
    title,
    description,
    alternates: { canonical: canonical(locale, '/blog') },
    // Os posts existem só em português — ver o comentário em /blog/[slug].
    robots: { index: locale === 'pt', follow: true },
    openGraph: { title, description, type: 'website' },
  }
}

export default function BlogPage() {
  return <BlogView />
}
