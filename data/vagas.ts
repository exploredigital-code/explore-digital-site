/**
 * Vagas abertas.
 *
 * As quatro vagas do HTML de referência eram placeholder e NÃO foram
 * publicadas: anunciar vaga que não existe queima candidato e queima a marca
 * com quem se candidata. A lista nasce vazia de propósito.
 *
 * Enquanto estiver vazia, /carreiras entra com estado vazio explícito dizendo
 * que não há vaga aberta, e a candidatura espontânea continua funcionando
 * normalmente. É só preencher este array para a listagem voltar.
 */

export interface Vaga {
  slug: string
  /** Chave em `carreiras.areas` — mantém o mesmo vocabulário do formulário. */
  area: string
  titulo: string
  modelo: string
  local: string
  descricao: string
}

export const vagas: Vaga[] = []

export const temVagasAbertas = vagas.length > 0
