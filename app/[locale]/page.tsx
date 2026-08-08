import { Navbar }       from '@/components/sections/Navbar'
import { Hero }         from '@/components/sections/Hero'
import { TwoDoors }     from '@/components/sections/TwoDoors'
import { Stats }        from '@/components/sections/Stats'
import { Portfolio }    from '@/components/sections/Portfolio'
import { Process }      from '@/components/sections/Process'
import { About }        from '@/components/sections/About'
import { Testimonials } from '@/components/sections/Testimonials'
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
      <Navbar />
      {/* Marquee de texto e o accordion de Serviços saíram: o primeiro não
          provava nada e o segundo repetia na home o catálogo inteiro de
          /solucoes. TwoDoors ocupa o lugar dos dois — só roteia. */}
      <main>
        <Hero />
        <TwoDoors />
        <Stats />
        <Portfolio />
        <Process />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
