/**
 * Os destinos que a Explore conhece.
 *
 * Ordem: seguindo a costa, de Jericoacoara até João Pessoa.
 *
 * Não é "de oeste para leste" o caminho inteiro, e por isso o comentário mudou.
 * O trecho do Ceará é mesmo oeste-leste, mas na altura do Cabo de São Roque,
 * perto de Natal, a costa vira e passa a correr para o sul: Pipa fica ao SUL
 * de Natal, e João Pessoa ao sul de Pipa. Descrever a lista como oeste-leste
 * estaria errado da metade em diante.
 *
 * Duas posições que valem registrar, porque são fáceis de errar:
 *
 *  · Icaraí de Amontada fica em Amontada, que é a LESTE de Itarema (Ilha do
 *    Guajirú) e a leste de Acaraú. Entra depois do Guajirú, não antes do Preá.
 *  · Preá fica a leste de Jericoacoara, apesar de as duas serem em Jijoca.
 *
 * A ordem da tela sai daqui e de mais lugar nenhum. O componente percorre este
 * array, então reordenar é editar estas nove linhas.
 *
 * Só `slug`, `nome` e `uf`. Nome de praia não traduz, então mantê-lo neste
 * arquivo evita a terceira cópia que já custa caro em `services.ts` contra
 * `services-content.ts`. A linha de descrição, essa sim, é copy e vive em
 * `messages/*.json` sob `home.destinos_itens`, casada pelo slug.
 *
 * NADA aqui pode virar afirmação sobre cliente. A seção diz o que a gente
 * conhece do litoral, não onde a gente tem contrato: dos nove, só Preá, Pipa e
 * Ilha do Guajirú têm case publicado, e a copy não sugere o contrário.
 */

export interface Destino {
  /** Chave estável. Casa com `home.destinos_itens` e com o slot de mídia. */
  slug: string
  nome: string
  uf: string
}

export const destinos: Destino[] = [
  { slug: 'jericoacoara',       nome: 'Jericoacoara',        uf: 'CE' },
  { slug: 'prea',               nome: 'Preá',                uf: 'CE' },
  { slug: 'ilha-do-guajiru',    nome: 'Ilha do Guajirú',     uf: 'CE' },
  { slug: 'icarai-de-amontada', nome: 'Icaraí de Amontada',  uf: 'CE' },
  { slug: 'taiba',              nome: 'Taíba',               uf: 'CE' },
  { slug: 'cumbuco',            nome: 'Cumbuco',             uf: 'CE' },
  { slug: 'natal',              nome: 'Natal',               uf: 'RN' },
  { slug: 'pipa',               nome: 'Pipa',                uf: 'RN' },
  { slug: 'joao-pessoa',        nome: 'João Pessoa',         uf: 'PB' },
]

/** O id do slot de mídia de um destino, no registro. */
export const slotDoDestino = (slug: string) => `destino-${slug}`
