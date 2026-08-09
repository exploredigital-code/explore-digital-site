import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { ObrigadoView } from './ObrigadoView'

interface Props {
  params: Promise<{ locale: string }>
}

/**
 * Tela pos-envio: nao entra no indice.
 *
 * Indexar uma pagina de obrigado significa que alguem pode cair nela pela
 * busca sem ter enviado nada, lendo que a auditoria dele esta rodando quando
 * nao esta.  porque os links daqui continuam valendo.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'consultoria' })

  return {
    title: t('ty_title'),
    description: t('ty_desc'),
    robots: { index: false, follow: true },
  }
}

export default function ConsultoriaObrigadoPage() {
  return <ObrigadoView />
}
