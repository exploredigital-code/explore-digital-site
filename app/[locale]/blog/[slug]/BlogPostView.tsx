'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { notFound } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Navbar } from '@/components/sections/Navbar'
import { SkipLink } from '@/components/ui/SkipLink'
import { Footer } from '@/components/sections/Footer'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { blogContent } from '@/data/blog-content'
import { CapaMidia } from '@/components/ui/SlotMidia'
import { blogPosts, getBlogPost, getRelatedPosts } from '@/data/blog-posts'

const CATEGORY_LABEL_KEY: Record<string, string> = {
  'Web Design': 'cat_web_design',
  'Tráfego Pago': 'cat_trafego_pago',
  'Social Media': 'cat_social_media',
  'Branding': 'cat_branding',
  'Kitesurf & Wingfoil': 'cat_kitesurf',
  'Captações': 'cat_captacoes',
  'Sistemas': 'cat_sistemas',
}

const WA_BASE = 'https://wa.me/+5585991043067?text='

export function BlogPostView() {
  const t = useTranslations('blog')
  const tContact = useTranslations('contact')
  const params = useParams()
  const slug = params.slug as string
  const locale = params.locale as string

  const post = getBlogPost(slug)
  const content = blogContent[slug]

  if (!post || !content) notFound()

  const related = getRelatedPosts(slug, post.category)

  return (
    <>
      <SkipLink />
      <Navbar />

      {/* Hero: foto real com overlay escuro */}
      <div className="relative w-full h-[360px] sm:h-[440px] overflow-hidden">
        <CapaMidia id={`blog-${post.slug}`} />
        <div className="absolute inset-0 bg-g-dark/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-g-dark/80 via-g-dark/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 pb-10">
          <AnimateIn>
            <span className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase text-g-light/80 bg-g-dark/60 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
              {CATEGORY_LABEL_KEY[post.category] ? t(CATEGORY_LABEL_KEY[post.category] as Parameters<typeof t>[0]) : post.category}
            </span>
            <h1 className="font-display text-[clamp(22px,3.8vw,48px)] font-normal leading-[1.1] tracking-[-0.025em] text-white max-w-[820px]">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 mt-4 text-[12px] text-menta-fraca">
              <span>{post.date}</span>
              <span className="text-menta-fraca">·</span>
              <span>{post.readTime} {t('read_time')}</span>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Corpo do artigo */}
      <main id="conteudo" tabIndex={-1} className="bg-white">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-16 lg:py-24 grid lg:grid-cols-[1fr_320px] gap-16 items-start">

          {/* Coluna principal */}
          <article>
            <AnimateIn>
              <p className="text-[18px] text-g-dark/70 leading-[1.85] font-normal mb-10 border-l-4 border-g-mid/40 pl-5">
                {post.excerpt}
              </p>
            </AnimateIn>

            {content.sections.map((section, i) => (
              <AnimateIn key={i} delay={i * 0.08} className="mb-10">
                <h2 className="font-sans text-[20px] sm:text-[22px] font-bold text-g-dark leading-[1.3] tracking-tight mb-4">
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-[16px] text-tinta-70 leading-[1.85] mb-4 font-normal">
                    {p}
                  </p>
                ))}
              </AnimateIn>
            ))}

            {content.pullQuote && (
              <AnimateIn>
                <blockquote className="my-12 px-8 py-6 bg-g-pale rounded-2xl border-l-4 border-g-mid relative overflow-hidden">
                  {/* Aspa de ornamento, marca d'agua atras da citacao. Nao e
                      texto: e `select-none`, nao e lida e nao carrega
                      informacao. Fica `aria-hidden` para o leitor de tela
                      pular e para a varredura de contraste parar de cobrar
                      4,5:1 de uma decoracao que precisa ser fraca. */}
                  <div aria-hidden className="absolute top-4 right-6 text-[64px] leading-none text-verde-medio/10 font-serif select-none">&ldquo;</div>
                  <p className="text-[18px] font-bold text-g-dark leading-[1.5] relative z-10 italic">
                    {content.pullQuote}
                  </p>
                </blockquote>
              </AnimateIn>
            )}

            {/* CTA inline */}
            <AnimateIn>
              <div className="mt-14 rounded-2xl bg-g-dark p-8 lg:p-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_100%_50%,#2D5238,transparent)] opacity-50" />
                <div className="relative z-10">
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-menta-fraca mb-3">Explore Digital</p>
                  <h3 className="font-display text-[clamp(18px,2.2vw,26px)] font-normal text-white leading-tight mb-6 max-w-[480px]">
                    {content.cta.heading}
                  </h3>
                  <Link
                    href={`/${locale}${content.cta.href}`}
                    className="inline-flex items-center gap-2 bg-g-light text-g-dark font-bold px-6 py-3 rounded-full hover:bg-g-pale hover:-translate-y-0.5 transition-all duration-200 text-[14px]"
                  >
                    {content.cta.label}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M2 7h10M8 3l4 4-4 4" />
                    </svg>
                  </Link>
                </div>
              </div>
            </AnimateIn>
          </article>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28">
            <AnimateIn>
              {/* Card serviço */}
              <div className="rounded-2xl border border-g-dark/10 bg-g-pale p-6 mb-6">
                <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-verde-medio mb-3">{t('related_service')}</p>
                <h4 className="font-sans font-bold text-[16px] text-g-dark leading-snug mb-4">{content.cta.heading}</h4>
                <Link
                  href={`/${locale}${content.cta.href}`}
                  className="block text-center bg-g-dark text-white font-bold text-[13px] px-5 py-3 rounded-xl hover:bg-g-mid transition-colors duration-200"
                >
                  {content.cta.label}
                </Link>
              </div>

              {/* WhatsApp */}
              <div className="rounded-2xl border border-g-dark/10 bg-white p-6 mb-6">
                <p className="text-[13px] text-tinta-70 mb-4 leading-[1.6]">
                  {t('whatsapp_text')}
                </p>
                <a
                  href={WA_BASE + encodeURIComponent(tContact('whatsapp_intro'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-sol text-verde font-bold text-[13px] px-5 py-3 rounded-xl hover:brightness-95 transition-all duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  {t('whatsapp_button')}
                </a>
              </div>

              {/* Posts relacionados */}
              {related.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-tinta-70 mb-4">{t('read_also')}</p>
                  <div className="flex flex-col gap-3">
                    {related.map(r => (
                      <Link
                        key={r.slug}
                        href={`/${locale}/blog/${r.slug}`}
                        className="group flex gap-3 items-start"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                          <CapaMidia id={`blog-${r.slug}`} />
                        </div>
                        <span className="text-[13px] font-semibold text-g-dark/70 leading-snug group-hover:text-verde-medio transition-colors line-clamp-2">
                          {r.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </AnimateIn>
          </aside>

        </div>

        {/* Voltar */}
        <div className="border-t border-g-dark/8 py-8">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-[13px] font-bold text-tinta-70 hover:text-g-dark transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 3L5 7l4 4" />
              </svg>
              {t('back')}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
