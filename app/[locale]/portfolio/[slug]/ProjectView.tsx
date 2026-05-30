'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import type { Project } from '@/data/portfolio'
import { Navbar }  from '@/components/sections/Navbar'
import { Footer }  from '@/components/sections/Footer'
import { AnimateIn, AnimateStagger, itemVariants } from '@/components/ui/AnimateIn'

const WHATSAPP = 'https://wa.me/5585910430670?text=Ol%C3%A1!%20Vi%20o%20portfolio%20no%20site%20e%20quero%20conversar%20sobre%20o%20meu%20projeto.'

function VideoSlot({ videoId, index, clientName }: { videoId: string; index: number; clientName: string }) {
  if (videoId) {
    return (
      <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-xl">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={`${clientName} — Vídeo ${index + 1}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }
  return (
    <div className="group relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-white border border-g-dark/8 flex flex-col items-center justify-center gap-4 hover:border-g-mid/25 hover:shadow-md transition-all duration-300">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(27,48,37,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(27,48,37,0.05) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="relative z-10 flex flex-col items-center gap-3 text-center px-4">
        <div className="w-14 h-14 rounded-full border-2 border-g-dark/12 flex items-center justify-center group-hover:border-g-mid/35 group-hover:bg-g-pale transition-all duration-300">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-g-dark/40 translate-x-0.5 group-hover:text-g-mid transition-colors"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div>
          <div className="text-[13px] font-bold text-g-dark/50 group-hover:text-g-dark/55 transition-colors">Vídeo {index + 1}</div>
          <div className="text-[10px] text-g-dark/30 mt-1 tracking-wide">9:16 · Vertical</div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 text-[11px] font-bold tracking-widest text-g-dark/12">{String(index + 1).padStart(2, '0')}</div>
    </div>
  )
}

interface Props { project: Project; next: Project; prev: Project }

export function ProjectView({ project, next, prev }: Props) {
  const locale = useLocale()
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <>
      {/* Reading progress bar */}
      <motion.div className="fixed top-0 left-0 h-[2px] bg-g-light z-[60]" style={{ width: progressWidth }} />

      <Navbar />

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <div className={cn('absolute inset-0 bg-gradient-to-br', project.gradient)} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_30%_20%,rgba(255,255,255,0.04),transparent)]" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-[#0D1A12] to-transparent" />

        <div className="relative z-10 max-w-screen-xl mx-auto w-full px-6 sm:px-10 lg:px-16 pt-36 pb-20">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-12">
            <Link href={`/${locale}#portfolio`} className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-white/45 hover:text-white/70 transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 7H2M6 3L2 7l4 4"/></svg>
              Portfolio
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-6">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-light/45">
              · {project.sector} · {project.year}
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.28, ease: [0.33, 1, 0.68, 1] }}
            className="text-[clamp(56px,9vw,130px)] leading-[0.88] tracking-[-0.04em] text-white mb-8">
            {project.client}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[18px] text-white/50 leading-[1.7] max-w-[520px]">
            {project.tagline}
          </motion.p>
        </div>
      </section>

      {/* ══ OVERVIEW STRIP — white ══ */}
      <section className="bg-white border-b border-g-dark/8">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-g-dark/8">
            {[
              { label: 'Cliente',    value: project.client },
              { label: 'Setor',     value: project.sector },
              { label: 'Ano',       value: project.year },
              { label: 'Resultado', value: project.result },
            ].map((item, i) => (
              <AnimateIn key={i} delay={i * 0.07}>
                <div className="py-8 px-6 lg:px-10">
                  <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-g-dark/45 mb-2">{item.label}</div>
                  <div className="text-[15px] font-bold text-g-dark leading-snug">{item.value}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT — g-pale ══ */}
      <section className="bg-g-pale py-24 lg:py-32">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7">
              <AnimateIn>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-g-mid" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-mid">Sobre o Projeto</span>
                </div>
                <p className="text-[19px] text-g-dark/65 leading-[1.85]">{project.description}</p>
              </AnimateIn>
            </div>
            <div className="lg:col-span-5">
              <AnimateIn delay={0.1}>
                <div className="bg-white rounded-2xl p-8 border border-g-dark/8 shadow-sm">
                  <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-g-dark/45 mb-6">Serviços realizados</div>
                  <div className="flex flex-col divide-y divide-g-dark/6">
                    {project.services.map((s, i) => (
                      <div key={i} className="flex items-center justify-between py-4">
                        <span className="text-[15px] text-g-dark/65">{s}</span>
                        <span className="text-[11px] font-bold text-g-dark/30 tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-g-dark/6">
                    <div className="text-[10px] font-bold tracking-[0.18em] uppercase text-g-dark/45 mb-2">Localização</div>
                    <div className="text-[14px] text-g-dark/60">{project.location}</div>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* ══ VIDEOS — white, 6 vertical ══ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateIn className="mb-12">
            <div className="flex items-center gap-3 mb-3"><div className="w-5 h-px bg-g-mid" /><span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-mid">Vídeos</span></div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-[clamp(28px,4vw,48px)] text-g-dark tracking-tight">A marca em movimento</h2>
              <span className="text-[11px] font-bold tracking-widest text-g-dark/40 uppercase shrink-0">6 vídeos · 9:16</span>
            </div>
          </AnimateIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <AnimateIn key={i} delay={i * 0.06}>
                <VideoSlot videoId={project.videoIds[i] ?? ''} index={i} clientName={project.client} />
              </AnimateIn>
            ))}
          </div>
          <p className="text-[10px] text-g-dark/30 tracking-widest mt-6 text-center uppercase">
            Adicione os IDs do YouTube em <code className="text-g-dark/45">data/portfolio.ts → videoIds</code>
          </p>
        </div>
      </section>

      {/* ══ RESULT — g-dark ══ */}
      <section className="bg-g-dark py-20">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
          <AnimateIn>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-g-light/45 mb-3">Resultado principal</div>
                <div className="text-[clamp(32px,5vw,64px)] font-semibold text-g-light leading-none tracking-tight">{project.result}</div>
              </div>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-g-light text-g-dark font-bold px-8 py-4 rounded-full hover:bg-g-pale hover:-translate-y-0.5 transition-all duration-200 shrink-0 self-start lg:self-auto">
                Quero um resultado assim →
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ══ NEXT / PREV — full-bleed gradient cards ══ */}
      <section className="bg-[#0D1A12]">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-6">
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/35 mb-6">Mais projetos</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Prev */}
          <Link
            href={`/${locale}/portfolio/${prev.slug}`}
            className="group relative overflow-hidden h-64 lg:h-80 block"
          >
            <div className={cn('absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-105', prev.gradient)} />
            <div className="absolute inset-0 bg-[#0D1A12]/55 group-hover:bg-[#0D1A12]/30 transition-colors duration-500" />
            {/* Right border divider */}
            <div className="absolute right-0 top-0 bottom-0 w-px bg-white/[0.06] hidden md:block" />
            <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col justify-between">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] uppercase text-white/50 group-hover:text-g-light/70 transition-colors">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 7H2M6 3L2 7l4 4"/></svg>
                Anterior
              </div>
              <div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-white/45 mb-3">{prev.sector} · {prev.year}</div>
                <div className="text-[clamp(24px,3.5vw,44px)] font-semibold text-white group-hover:text-g-light transition-colors leading-tight">
                  {prev.client}
                </div>
              </div>
            </div>
          </Link>

          {/* Next */}
          <Link
            href={`/${locale}/portfolio/${next.slug}`}
            className="group relative overflow-hidden h-64 lg:h-80 block"
          >
            <div className={cn('absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-105', next.gradient)} />
            <div className="absolute inset-0 bg-[#0D1A12]/55 group-hover:bg-[#0D1A12]/30 transition-colors duration-500" />
            <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col justify-between items-end text-right">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] uppercase text-white/50 group-hover:text-g-light/70 transition-colors">
                Próximo
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
              </div>
              <div>
                <div className="text-[11px] font-bold tracking-widest uppercase text-white/45 mb-3">{next.sector} · {next.year}</div>
                <div className="text-[clamp(24px,3.5vw,44px)] font-semibold text-white group-hover:text-g-light transition-colors leading-tight">
                  {next.client}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ══ CTA — very dark ══ */}
      <section className="bg-[#0D1A12] py-28 lg:py-36 border-t border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_100%_50%,#2D5238,transparent_70%)] opacity-20 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <AnimateIn>
            <div className="flex items-center gap-3 mb-8"><div className="w-5 h-px bg-g-light/22" /><span className="text-[11px] font-bold tracking-[0.2em] uppercase text-g-light/22">Vamos trabalhar juntos</span></div>
            <h2 className="text-[clamp(40px,7vw,90px)] leading-[0.9] tracking-[-0.04em] text-white mb-10 max-w-[700px]">
              Quer um projeto assim para a sua marca?
            </h2>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-g-light text-g-dark font-bold px-9 py-5 rounded-full text-[16px] hover:bg-g-pale hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(193,213,189,0.18)] transition-all duration-200">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Falar com a Explore
            </a>
          </AnimateIn>
        </div>
      </section>

      <Footer />
    </>
  )
}
