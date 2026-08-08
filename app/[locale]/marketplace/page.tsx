import { redirect } from 'next/navigation'

interface Props {
  params: Promise<{ locale: string }>
}

// A antiga aba de Planos virou Soluções. Mantemos a rota viva porque o link
// de /marketplace já foi compartilhado por fora do site.
export default async function MarketplacePage({ params }: Props) {
  const { locale } = await params
  redirect(`/${locale}/solucoes`)
}
