'use client'

import { useCallback, useRef, useState } from 'react'

/**
 * Máquina de estados de um formulário em etapas.
 *
 * Era código inline do wizard da consultoria. Saiu de lá para o formulário de
 * candidatura de /carreiras usar o mesmo comportamento em vez de nascer um
 * segundo com as mesmas regras: não avança sem escolha, não envia vazio,
 * mostra aviso e devolve o foco para o campo que falta.
 *
 * O que é da consultoria continua na consultoria: os campos, a validação de
 * cada etapa e o que acontece no envio entram por parâmetro.
 */
export function useStepForm<T extends Record<string, string>>({
  initial,
  total,
  validate,
}: {
  initial: T
  total: number
  /** Devolve a mensagem de erro da etapa, ou string vazia se estiver válida. */
  validate: (step: number, form: T) => string
}) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<T>(initial)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  /** Campo que precisa receber o foco quando o aviso aparece. */
  const focoRef = useRef<HTMLElement | null>(null)
  const registrarFoco = useCallback((el: HTMLElement | null) => { focoRef.current = el }, [])

  const set = useCallback((campo: keyof T, valor: string) => {
    setForm(f => ({ ...f, [campo]: valor }))
    // O aviso some assim que a pessoa mexe no campo: manter erro na tela
    // depois de corrigido faz parecer que a correção não valeu.
    setError(prev => (prev ? '' : prev))
  }, [])

  const avisar = useCallback((mensagem: string) => {
    setError(mensagem)
    // Devolve o foco para quem precisa de atenção, senão o leitor de tela
    // anuncia o aviso e deixa a pessoa perdida no fim do formulário.
    focoRef.current?.focus?.()
  }, [])

  const goNext = useCallback(() => {
    const mensagem = validate(step, form)
    if (mensagem) { avisar(mensagem); return false }
    setError('')
    setStep(s => Math.min(s + 1, total))
    return true
  }, [step, form, total, validate, avisar])

  const goBack = useCallback(() => {
    setError('')
    setStep(s => Math.max(s - 1, 1))
  }, [])

  /** Valida a última etapa. Devolve false e avisa se ainda faltar algo. */
  const canSubmit = useCallback(() => {
    const mensagem = validate(total, form)
    if (mensagem) { avisar(mensagem); return false }
    return true
  }, [form, total, validate, avisar])

  return {
    step, total, form, error, sending,
    set, setForm, setSending,
    goNext, goBack, canSubmit,
    registrarFoco,
    isLast: step === total,
  }
}
