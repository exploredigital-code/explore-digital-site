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
