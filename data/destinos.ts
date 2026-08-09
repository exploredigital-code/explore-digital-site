/**
 * Os destinos que a Explore conhece.
 *
 * Ordem geográfica de verdade, de oeste para leste: sai de Jericoacoara e
 * caminha até João Pessoa. Começar por Jeri também é o começo mais forte,
 * porque é o único nome da lista que qualquer pessoa reconhece.
 *
 * A ordem da tela sai daqui e de mais lugar nenhum. O componente percorre
 * este array, então reordenar é editar estas sete linhas.
 *
 * Só `slug` e `uf` moram aqui, mais o nome. Nome de praia não traduz, então
 * mantê-lo neste arquivo evita a terceira cópia que já custa caro em
 * `services.ts` contra `services-content.ts`. A linha de descrição, essa sim,
 * é copy e vive em `messages/*.json` sob `home.destinos_itens`, casada pelo
 * slug, no mesmo padrão dos produtos.
 *
 * NADA aqui pode virar afirmação sobre cliente. A seção diz o que a gente
 * conhece do litoral, não onde a gente tem contrato: dos sete, só Preá, Pipa
 * e Ilha do Guajirú têm case publicado, e a copy não sugere o contrário.
 */

export interface Destino {
  /** Chave estável. Casa com `home.destinos_itens` e com o slot de mídia. */
  slug: string
  nome: string
  uf: string
}

export const destinos: Destino[] = [
  { slug: 'jericoacoara',    nome: 'Jericoacoara',     uf: 'CE' },
  { slug: 'prea',            nome: 'Preá',             uf: 'CE' },
  { slug: 'ilha-do-guajiru', nome: 'Ilha do Guajirú',  uf: 'CE' },
  { slug: 'taiba',           nome: 'Taíba',            uf: 'CE' },
  { slug: 'cumbuco',         nome: 'Cumbuco',          uf: 'CE' },
  { slug: 'pipa',            nome: 'Pipa',             uf: 'RN' },
  { slug: 'joao-pessoa',     nome: 'João Pessoa',      uf: 'PB' },
]

/** O id do slot de mídia de um destino, no registro. */
export const slotDoDestino = (slug: string) => `destino-${slug}`
