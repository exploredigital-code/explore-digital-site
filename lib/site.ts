/**
 * Fonte única do domínio e dos idiomas do site.
 *
 * Antes o domínio estava escrito à mão em cada `generateMetadata`, o que abriu
 * espaço para o canonical fixo do layout apontar o site inteiro para a home.
 */
export const SITE_URL = 'https://somosexplore.com'

export const LOCALES = ['pt', 'en', 'es'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'pt'

/** URL absoluta de um caminho já com prefixo de idioma. Ex.: canonical('pt', '/solucoes') */
export function canonical(locale: string, path = '') {
  return `${SITE_URL}/${locale}${path}`
}

/**
 * Mapa de hreflang para uma mesma página nos três idiomas — o formato que o
 * `alternates.languages` do Next e o `alternates` do sitemap esperam.
 */
export function languageAlternates(path = '') {
  return Object.fromEntries(
    LOCALES.map(l => [l, `${SITE_URL}/${l}${path}`])
  ) as Record<Locale, string>
}
