'use client'

import { cn } from '@/lib/utils'

/**
 * Grupo de opções de escolha única.
 *
 * Semanticamente é um `radiogroup` com `aria-checked`, não um punhado de
 * botões com `aria-pressed`: `aria-pressed` descreve um botão que liga e
 * desliga sozinho, enquanto aqui escolher uma opção desmarca as outras. Leitor
 * de tela anuncia "1 de 4" e a seta navega entre as opções.
 *
 * Extraído do wizard da consultoria para o formulário de candidatura usar o
 * mesmo controle, em vez de nascer um segundo com o mesmo comportamento.
 */
export function OptionGroup({
  options,
  value,
  onSelect,
  columns = 2,
  label,
  name,
}: {
  options: string[]
  value: string
  onSelect: (v: string) => void
  columns?: 1 | 2 | 3
  /** Rótulo acessível do grupo, para o leitor de tela saber o que se escolhe. */
  label: string
  name: string
}) {
  const mover = (i: number, delta: number) => {
    const proximo = (i + delta + options.length) % options.length
    onSelect(options[proximo])
    document.getElementById(`${name}-${proximo}`)?.focus()
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        'grid gap-2',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-2',
        columns === 3 && 'grid-cols-3'
      )}
    >
      {options.map((opt, i) => {
        const marcado = value === opt
        return (
          <button
            key={opt}
            id={`${name}-${i}`}
            type="button"
            role="radio"
            aria-checked={marcado}
            // Só a opção marcada fica na ordem de tabulação. Sem opção
            // escolhida, a primeira recebe o foco, que é o comportamento
            // esperado de um radiogroup.
            tabIndex={marcado || (!value && i === 0) ? 0 : -1}
            onClick={() => onSelect(opt)}
            onKeyDown={e => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); mover(i, 1) }
              if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); mover(i, -1) }
            }}
            className={cn(
              'text-left px-3.5 py-3 rounded-xl border text-[13px] leading-snug transition-all duration-200',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-verde-medio',
              marcado
                ? 'bg-verde border-verde text-menta font-semibold'
                : 'bg-white border-tinta-16 text-tinta-70 hover:border-verde-medio/50 hover:bg-menta-clara/40'
            )}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
