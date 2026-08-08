import { Navbar }       from '@/components/sections/Navbar'
import { Hero }         from '@/components/sections/Hero'
import { Marquee }      from '@/components/sections/Marquee'
import { Stats }        from '@/components/sections/Stats'
import { Portfolio }    from '@/components/sections/Portfolio'
import { Services }     from '@/components/sections/Services'
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
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Portfolio />
        <Services />
        <Process />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
