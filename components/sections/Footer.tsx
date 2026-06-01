'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')
  const currentYear = new Date().getFullYear()

  const localePrefix = typeof window !== 'undefined'
    ? (window.location.pathname.split('/')[1] || 'pt')
    : 'pt'

  const links = [
    { href: '#portfolio',          label: nav('portfolio') },
    { href: '#services',           label: nav('services') },
    { href: '#about',              label: nav('about') },
    { href: `/${localePrefix}/blog`,      label: 'Blog' },
    { href: '#contact',            label: nav('contact') },
  ]

  return (
    <footer className="bg-[#0F2018] border-t border-white/[0.06]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-16 py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/images/logo.png"
              alt="Explore Digital"
              width={169}
              height={43}
              className="h-[42px] w-auto mb-5 opacity-90"
            />
            <p className="text-[14px] text-white/50 leading-[1.75] max-w-[260px]">
              {t('tagline')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/40 mb-5">
              {t('nav_title')}
            </div>
            <ul className="flex flex-col gap-3">
              {links.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[14px] text-white/40 hover:text-white/80 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Contact */}
          <div>
            <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/40 mb-5">
              {t('social_title')}
            </div>
            <div className="flex flex-col gap-3">
              {[
                {
                  label: 'Instagram',
                  href: 'https://instagram.com/somosexplore',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                    </svg>
                  ),
                },
                {
                  label: 'LinkedIn',
                  href: 'https://linkedin.com/company/explore-digital',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="3"/>
                      <line x1="8" y1="11" x2="8" y2="17"/>
                      <line x1="8" y1="7" x2="8" y2="8"/>
                      <path d="M12 17v-4c0-1.1.9-2 2-2s2 .9 2 2v4"/>
                      <line x1="12" y1="11" x2="12" y2="17"/>
                    </svg>
                  ),
                },
                {
                  label: 'WhatsApp',
                  href: 'https://wa.me/5585991043067',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  ),
                },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-white/40 hover:text-white/80 transition-colors duration-200 flex items-center gap-2.5 group"
                >
                  <span className="text-white/35 group-hover:text-white/75 transition-colors shrink-0">
                    {s.icon}
                  </span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/50">
            &copy; {currentYear} Explore Digital · {t('copyright')}
          </p>
          <p className="text-[12px] text-white/50">
            somosexplore.com
          </p>
        </div>

      </div>
    </footer>
  )
}
