/**
 * Os destinos que a Explore conhece.
 *
 * Ordem definida pelo cliente, começando na Paraíba e caminhando para o oeste
 * do Ceará. Ela é de tela, não de mapa: Jericoacoara fica a oeste da Ilha do
 * Guajirú, e mesmo assim vem antes. Se um dia a ordem tiver de ser geográfica
 * de verdade, é aqui que se troca, e o componente acompanha sozinho.
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
  { slug: 'joao-pessoa',     nome: 'João Pessoa',      uf: 'PB' },
  { slug: 'pipa',            nome: 'Pipa',             uf: 'RN' },
  { slug: 'cumbuco',         nome: 'Cumbuco',          uf: 'CE' },
  { slug: 'taiba',           nome: 'Taíba',            uf: 'CE' },
  { slug: 'prea',            nome: 'Preá',             uf: 'CE' },
  { slug: 'jericoacoara',    nome: 'Jericoacoara',     uf: 'CE' },
  { slug: 'ilha-do-guajiru', nome: 'Ilha do Guajirú',  uf: 'CE' },
]

/** O id do slot de mídia de um destino, no registro. */
export const slotDoDestino = (slug: string) => `destino-${slug}`
