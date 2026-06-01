'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/sections/Navbar'
import { Footer } from '@/components/sections/Footer'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { blogPosts, type BlogPostMeta } from '@/data/blog-posts'

const CATEGORIES = ['Todos', 'Web Design', 'Tráfego Pago', 'Social Media', 'Branding', 'Kitesurf & Wingfoil', 'Captações', 'Sistemas']
const PER_PAGE = 12
type Post = BlogPostMeta

/* ── Card do post em destaque ── */
function FeaturedCard({ post }: { post: Post }) {
  const locale = useLocale()
  const t = useTranslations('blog')
  return (
    <AnimateIn>
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="group block overflow-hidden rounded-2xl bg-g-dark border border-white/[0.08] hover:border-g-mid/40 transition-colors duration-300"
      >
        <div className="grid md:grid-cols-2">
          {/* Imagem */}
          <div className="relative h-56 md:h-auto min-h-[240px] overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-g-dark/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-g-dark/60 hidden md:block" />
            <div className="absolute top-5 left-5">
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/90 bg-g-dark/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
                {post.category}
              </span>
            </div>
          </div>
          {/* Conteúdo */}
          <div className="p-8 lg:p-10 flex flex-col justify-between font-sans">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[11px] text-g-light/40">{post.date}</span>
                <span className="text-g-light/20">·</span>
                <span className="text-[11px] text-g-light/40">{post.readTime} {t('read_time')}</span>
              </div>
              <h2 className="font-sans text-[clamp(20px,2.5vw,28px)] font-semibold text-white leading-[1.3] tracking-tight mb-4 group-hover:text-g-light transition-colors">
                {post.title}
              </h2>
              <p className="text-[15px] font-normal text-white/55 leading-[1.8]">{post.excerpt}</p>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 text-[13px] font-bold text-g-mid/60 group-hover:text-g-light transition-colors">
              {t('read_article')}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </AnimateIn>
  )
}

/* ── Card de post normal ── */
function PostCard({ post }: { post: Post }) {
  const locale = useLocale()
  const t = useTranslations('blog')
  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-g-dark/8 hover:border-g-mid/35 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
    >
      {/* Foto com overlay */}
      <div className="relative h-48 overflow-hidden shrink-0">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-g-dark/20" />
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-white bg-g-dark/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      {/* Texto */}
      <div className="p-6 flex flex-col flex-1 font-sans">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] text-g-dark/50">{post.date}</span>
          <span className="text-g-dark/30">·</span>
          <span className="text-[11px] text-g-dark/50">{post.readTime} {t('read_time')}</span>
        </div>
        <h3 className="font-sans text-[16px] font-semibold text-g-dark leading-[1.4] tracking-tight mb-3 flex-1 group-hover:text-g-mid transition-colors">
          {post.title}
        </h3>
        <p className="text-[13px] font-normal text-g-dark/55 leading-[1.7] line-clamp-3 mb-5">{post.excerpt}</p>
        <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-g-mid/70 group-hover:text-g-mid transition-colors mt-auto">
          {t('read_article')}
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 7h10M8 3l4 4-4 4" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

/* ── Paginação numerada ── */
function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  const t = useTranslations('blog')
  if (total <= 1) return null
  const pages = Array.from({ length: total }, (_, i) => i + 1)
  return (
    <div className="flex items-center justify-center gap-2 mt-14">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="w-9 h-9 rounded-lg border border-g-dark/15 flex items-center justify-center text-g-dark/50 hover:border-g-mid/40 hover:text-g-dark disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label={t('prev_page')}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M9 3L5 7l4 4" />
        </svg>
      </button>
      {pages.map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={cn(
            'w-9 h-9 rounded-lg text-[13px] font-bold transition-all',
            p === current
              ? 'bg-g-dark text-white'
              : 'border border-g-dark/15 text-g-dark/60 hover:border-g-mid/40 hover:text-g-dark'
          )}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="w-9 h-9 rounded-lg border border-g-dark/15 flex items-center justify-center text-g-dark/50 hover:border-g-mid/40 hover:text-g-dark disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label={t('next_page')}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M5 3l4 4-4 4" />
        </svg>
      </button>
    </div>
  )
}

/* ── Página principal do Blog ── */
export default function BlogPage() {
  const t = useTranslations('blog')
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [currentPage, setCurrentPage] = useState(1)

  const featured = blogPosts.find(p => p.featured)
  const filtered = blogPosts
    .filter(p => !p.featured)
    .filter(p => activeCategory === 'Todos' || p.category === activeCategory)

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  useEffect(() => { setCurrentPage(1) }, [activeCategory])

  const handlePageChange = (p: number) => {
    setCurrentPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />

      <section className="page-hero pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-20%,#2D5238,transparent_70%)] opacity-45 pointer-events-none" />
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <AnimateIn>
            <SectionEyebrow>{t('eyebrow')}</SectionEyebrow>
            <h1 className="font-display text-[clamp(36px,5.5vw,72px)] font-normal leading-[0.95] tracking-[-0.03em] text-white mt-2 mb-5 max-w-[640px]">
              {t('title')}
            </h1>
            <p className="text-g-light/55 text-[16px] leading-[1.75] max-w-[480px]">
              {t('subtitle')}
            </p>
          </AnimateIn>
        </div>
      </section>

      <main className="bg-g-pale">
        {featured && (
          <section className="py-16 lg:py-20 border-b border-g-dark/8">
            <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
              <FeaturedCard post={featured} />
            </div>
          </section>
        )}

        {/* Filtros sticky */}
        <div className="sticky top-[68px] z-30 bg-white border-b border-g-dark/8">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 overflow-x-auto">
            <div className="flex gap-0 min-w-max">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-5 py-4 text-[13px] font-bold whitespace-nowrap transition-colors duration-200 border-b-2 -mb-px',
                    activeCategory === cat
                      ? 'text-g-dark border-g-mid'
                      : 'text-g-dark/50 border-transparent hover:text-g-dark/65'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid paginado */}
        <section className="py-16 lg:py-24 min-h-[400px]">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${currentPage}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {paginated.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {paginated.map(post => <PostCard key={post.slug} post={post} />)}
                    </div>
                    <Pagination current={currentPage} total={totalPages} onChange={handlePageChange} />
                  </>
                ) : (
                  <div className="text-center py-20 text-g-dark/30">
                    <div className="text-[40px] mb-4">✦</div>
                    <p className="text-[15px]">{t('empty_state_prefix')} {activeCategory}.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="border-t border-g-dark/8 py-16 lg:py-20">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16">
            <AnimateIn>
              <div className="bg-g-dark rounded-2xl p-10 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_0%_50%,#2D5238,transparent)] opacity-40" />
                <div className="relative z-10">
                  <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-g-light/35 mb-3">{t('cta_eyebrow')}</div>
                  <h3 className="font-display text-[clamp(20px,2.5vw,30px)] font-normal text-white max-w-[420px] leading-tight">
                    {t('cta_title')}
                  </h3>
                </div>
                <a
                  href="https://wa.me/5585991043067?text=Ol%C3%A1!%20Quero%20receber%20conte%C3%BAdo%20da%20Explore%20Digital."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 shrink-0 inline-flex items-center gap-2 bg-g-light text-g-dark font-bold px-7 py-3.5 rounded-full hover:bg-g-pale hover:-translate-y-0.5 transition-all duration-200 text-[14px]"
                >
                  {t('cta_button')}
                </a>
              </div>
            </AnimateIn>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
