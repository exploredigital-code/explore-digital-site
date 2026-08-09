import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { servicesData, findSubService } from '@/data/services'
import { canonical, languageAlternates } from '@/lib/site'
import { ServiceDetailView } from './ServiceDetailView'
import { RecorrenteDetailView } from './RecorrenteDetailView'

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

  const sub = findSubService(slug)
  if (!sub) return { title: 'Serviço não encontrado' }

  const alvo = sub
  const nome = sub.name
  // Separador de barra, e não travessão: o em-dash está fora em todo o site,
  // e este era o último que sobrava, escondido dentro do title.
  const title = `${nome} · Explore Digital`

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

  const sub = findSubService(slug)
  if (!sub) notFound()

  const parentService = servicesData.find(s => s.pillar === sub.pillar)!

  // Os dois recorrentes têm view própria.
  //
  // Os outros doze vendem uma entrega, com começo e fim: a página responde o
  // que a pessoa recebe. Estes dois vendem uma relação que se repete todo mês,
  // e antes de assinar a pergunta é outra (por quanto tempo, com quem eu falo,
  // como a gente sabe se funcionou). É outra estrutura, não outro texto.
  //
  // O `period` decide, e não uma lista de slugs: um terceiro recorrente entra
  // na página certa só por nascer com `period: 'monthly'` em `services.ts`.
  if (sub.period === 'monthly') {
    return <RecorrenteDetailView sub={sub} parentService={parentService} locale={locale} />
  }

  return <ServiceDetailView sub={sub} parentService={parentService} locale={locale} />
}
