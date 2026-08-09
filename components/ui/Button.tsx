import { cn } from '@/lib/utils'

/**
 * Variantes conforme o SPEC seção 2.
 *
 * `primary` é o botão cheio de seção ESCURA (laranja com texto verde).
 * `solid-light` é o botão cheio de seção CLARA (verde com texto branco).
 * `outline` e `outline-light` são os secundários de cada fundo.
 *
 * Um botão cheio por dobra. Os demais são de linha. A exceção legítima é uma
 * lista de ações equivalentes, como a lista de vagas.
 *
 * `whatsapp` deixou de ser uma cor: virou só o ícone. O #25D366 saiu do site
 * porque, com o laranja como acento, ele virava o segundo elemento mais
 * saturado da tela e disputava atenção com o CTA principal.
 */
type Variant = 'primary' | 'solid-light' | 'outline' | 'outline-light' | 'ghost' | 'whatsapp'
type Size = 'sm' | 'md' | 'lg'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  asChild?: boolean
  href?: string
  target?: string
  rel?: string
}

const variants: Record<Variant, string> = {
  // Cheio sobre fundo escuro. Texto verde, não branco: branco sobre #E2762F
  // dá 2,87 de contraste e reprova. Verde escuro dá 4,59.
  primary: cn(
    'bg-sol text-verde font-medium',
    // o hover CLAREIA — como o texto é escuro, escurecer o fundo derrubaria
    // o contraste em vez de reforçá-lo
    'hover:bg-sol-forte hover:-translate-y-0.5',
    'active:translate-y-0'
  ),
  // Cheio sobre fundo claro.
  'solid-light': cn(
    'bg-verde text-menta font-medium',
    'hover:bg-[#254032] hover:-translate-y-0.5',
    'active:translate-y-0'
  ),
  outline: cn(
    'bg-transparent text-menta font-medium',
    'border border-verde-borda',
    'hover:border-menta hover:-translate-y-0.5',
    'active:translate-y-0'
  ),
  'outline-light': cn(
    'bg-transparent text-verde font-medium',
    'border border-tinta-16',
    'hover:border-verde hover:-translate-y-0.5',
    'active:translate-y-0'
  ),
  ghost: cn(
    'bg-transparent text-menta-fraca font-medium',
    'hover:text-menta hover:bg-white/[0.06]'
  ),
  // O WhatsApp é reconhecido pela FORMA do ícone, não pela cor. Usa o acento
  // como qualquer outra ação.
  whatsapp: cn(
    'bg-sol text-verde font-medium',
    'hover:bg-sol-forte hover:-translate-y-0.5',
    'active:translate-y-0'
  ),
}

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-[13px] rounded-full',
  md: 'px-7 py-3.5 text-[14px] rounded-full',
  lg: 'px-8 py-4 text-[15px] rounded-full',
}

export function Button({ variant = 'primary', size = 'md', className, href, target, rel, children, ...props }: Props) {
  const base = cn(
    'inline-flex items-center justify-center gap-2',
    'transition-all duration-200 cursor-pointer select-none',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sol',
    // O estado desabilitado morava no <button> de cada tela. Sobe para cá
    // porque é comportamento do componente, não decisão de página, e o
    // `translate-y-0` cancela o `-translate-y-0.5` do hover das variantes.
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0',
    variants[variant],
    sizes[size],
    className
  )

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={base}>
        {children}
      </a>
    )
  }

  return (
    <button className={base} {...props}>
      {children}
    </button>
  )
}
