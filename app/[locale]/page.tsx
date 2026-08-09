import { Navbar }       from '@/components/sections/Navbar'
import { SkipLink } from '@/components/ui/SkipLink'
import { Hero }         from '@/components/sections/Hero'
import { TwoDoors }     from '@/components/sections/TwoDoors'
import { Portfolio }    from '@/components/sections/Portfolio'
import { Gargalos }     from '@/components/sections/Gargalos'
import { Destinos }     from '@/components/sections/Destinos'
import { Estudio }      from '@/components/sections/Estudio'
import { Contact }      from '@/components/sections/Contact'
import { Footer }       from '@/components/sections/Footer'
import { canonical, languageAlternates } from '@/lib/site'
import type { Metadata } from 'next'

interface Props { params: Promise<{ locale: string }> }

// A home precisa declarar o próprio canonical: o layout deixou de fazer isso
// porque um canonical de layout vaza para todas as páginas filhas.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    alternates: {
      canonical: canonical(locale),
      languages: languageAlternates(),
    },
  }
}

export default function Home() {
  return (
    <>
      <SkipLink />
      <Navbar />
      {/* Corpo novo, seguindo a referência.
          Saíram Stats, Process, About e Testimonials: os nichos e o "por que a
          Explore" viraram Gargalos e Estúdio, que dizem a mesma coisa pela
          boca do cliente; os depoimentos saíram porque, sem sobrenome, empresa
          nem foto, derrubavam confiança em vez de construir. */}
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <TwoDoors />
        <Portfolio />
        <Gargalos />
        {/* Destinos entrou no lugar do Agora, que migrou para /sobre. */}
        <Destinos />
        <Estudio />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
