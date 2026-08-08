import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { servicesData, findDiscipline, findSubService } from '@/data/services'
import { canonical, languageAlternates } from '@/lib/site'
import { ServiceDetailView } from './ServiceDetailView'
import { DisciplineView } from './DisciplineView'

interface Props {
  params: Promise<{ slug: string; locale: string }>
}

/**
 * A rota serve dois tipos de página.
 *
 * Disciplina primeiro (`/servicos/branding`), sub-serviço depois
 * (`/servicos/identidade-visual`). Os slugs não colidem: disciplina é o slug
 * do pilar, sub-serviço é o slug da entrega.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params

  const disciplina = findDiscipline(slug)
  const sub = disciplina ? undefined : findSubService(slug)
  const alvo = disciplina ?? sub
  if (!alvo) return { title: 'Serviço não encontrado' }

  const nome = disciplina ? disciplina.title : sub!.name
  const title = `${nome} — Explore Digital`

  return {
    title,
    description: alvo.tagline,
    alternates: {
      canonical: canonical(locale, `/servicos/${slug}`),
      languages: languageAlternates(`/servicos/${slug}`),
    },
    openGraph: { title, description: alvo.tagline, type: 'website' },
  }
}

export const dynamic = 'force-dynamic'

export default async function ServicoPage({ params }: Props) {
  const { slug, locale } = await params

  const disciplina = findDiscipline(slug)
  if (disciplina) return <DisciplineView discipline={disciplina} />

  const sub = findSubService(slug)
  if (!sub) notFound()

  const parentService = servicesData.find(s => s.pillar === sub.pillar)!
  return <ServiceDetailView sub={sub} parentService={parentService} locale={locale} />
}
