import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /bio é o link-in-bio do Instagram: já é noindex e não deve competir
      // com a home. /obrigado são páginas de confirmação pós-formulário.
      disallow: ['/pt/bio', '/en/bio', '/es/bio', '/*/obrigado'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
