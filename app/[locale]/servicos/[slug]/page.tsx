import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { servicesData, findSubService } from '@/data/services'
import { canonical, languageAlternates } from '@/lib/site'
import { ServiceDetailView } from './ServiceDetailView'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const sub = findSubService(slug)
  if (!sub) return { title: 'Serviço não encontrado' }
  return {
    title: `${sub.name} — Explore Digital`,
    description: sub.tagline,
    alternates: {
      canonical: canonical(locale, `/servicos/${slug}`),
      languages: languageAlternates(`/servicos/${slug}`),
    },
    openGraph: { title: `${sub.name} — Explore Digital`, description: sub.tagline, type: 'website' },
  }
}

export const dynamic = 'force-dynamic'

export default async function ServicoPage({ params }: Props) {
  const { slug, locale } = await params
  const sub = findSubService(slug)
  if (!sub) notFound()

  const parentService = servicesData.find(s => s.pillar === sub.pillar)!

  return <ServiceDetailView sub={sub} parentService={parentService} locale={locale} />
}
