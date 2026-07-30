'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

const LOCALES = ['PT', 'EN', 'ES']

function getLocaleFromPath(path: string) {
  const seg = path.split('/')[1]?.toUpperCase()
  return LOCALES.includes(seg) ? seg : 'PT'
}

function getLocalePrefix(path: string) {
  const seg = path.split('/')[1]?.toLowerCase()
  return LOCALES.map(l => l.toLowerCase()).includes(seg) ? seg : 'pt'
}

export function Navbar() {
  const t = useTranslations('nav')
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const currentLocale = getLocaleFromPath(pathname)
  const localePrefix = getLocalePrefix(pathname)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isHome = pathname === `/${localePrefix}` || pathname === `/${localePrefix}/`
  const homeHref = (anchor: string) => isHome ? anchor : `/${localePrefix}${anchor}`

  const navLinks = [
    { href: `/${localePrefix}`,             label: t('home') },
    { href: homeHref('#portfolio'),         label: t('portfolio') },
    { href: `/${localePrefix}/marketplace`, label: t('marketplace') },
    { href: `/${localePrefix}/sobre`,       label: t('about') },
    { href: `/${localePrefix}/blog`,        label: t('blog') },
    { href: `/${localePrefix}/vagas`,       label: t('work') },
    { href: homeHref('#contact'),           label: t('contact') },
  ]

  const switchLocale = (loc: string) => {
    const locLower = loc.toLowerCase()
    const newPath = pathname.replace(/^\/(pt|en|es)/, `/${locLower}`)
    window.location.href = newPath === pathname ? `/${locLower}` : newPath
    setLangOpen(false)
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          'flex items-center justify-between px-6 lg:px-14 h-[68px]',
          scrolled
            ? 'bg-g-dark/95 backdrop-blur-md border-b border-white/[0.06]'
            : 'bg-transparent'
        )}
      >
        {/* Logo */}
        <Link href={`/${localePrefix}`} className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/logo.png"
            alt="Explore Digital"
            width={182}
            height={46}
            className="h-[42px] w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-[14px] text-white/65 hover:text-white transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: lang switcher + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-[12px] font-bold tracking-widest text-white/45 hover:text-white transition-colors uppercase"
            >
              {currentLocale}
              <span className={cn('text-[10px] transition-transform duration-200', langOpen && 'rotate-180')}>▾</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 bg-s2 border border-white/10 rounded-xl overflow-hidden shadow-2xl min-w-[80px]"
                >
                  {LOCALES.filter(l => l !== currentLocale).map(loc => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className="block w-full text-left px-4 py-3 text-[12px] font-bold tracking-widest text-white/55 hover:text-white hover:bg-white/5 transition-colors uppercase"
                    >
                      {loc}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button href={`/${localePrefix}/consultoria`} size="sm">
            {t('consultoria')}
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col gap-[5px] p-2 -mr-1"
          aria-label={menuOpen ? t('menu_close') : t('menu_open')}
        >
          <span className={cn('w-6 h-0.5 bg-white transition-all duration-300', menuOpen && 'rotate-45 translate-y-[7px]')} />
          <span className={cn('w-6 h-0.5 bg-white transition-all duration-300', menuOpen && 'opacity-0')} />
          <span className={cn('w-6 h-0.5 bg-white transition-all duration-300', menuOpen && '-rotate-45 -translate-y-[7px]')} />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0D1A12] flex flex-col items-center justify-center gap-2 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 + 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-[26px] font-bold text-white hover:text-g-light transition-colors py-1.5 text-center"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-6"
            >
              <Button href={`/${localePrefix}/consultoria`} size="lg" onClick={() => setMenuOpen(false)}>
                {t('consultoria')}
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex gap-5 mt-8"
            >
              {LOCALES.map(loc => (
                <button
                  key={loc}
                  onClick={() => { switchLocale(loc); setMenuOpen(false) }}
                  className={cn(
                    'text-[13px] font-bold tracking-widest uppercase transition-colors',
                    currentLocale === loc ? 'text-g-light' : 'text-white/45 hover:text-white/70'
                  )}
                >
                  {loc}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
