import { cn } from '@/lib/utils'

type Variant = 'primary' | 'outline' | 'ghost' | 'whatsapp'
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
  primary: cn(
    'bg-g-light text-g-dark font-bold',
    'hover:bg-g-pale hover:-translate-y-0.5',
    'hover:shadow-[0_8px_28px_rgba(193,213,189,0.25)]',
    'active:translate-y-0 active:shadow-none'
  ),
  outline: cn(
    'bg-transparent text-white font-bold',
    'border border-white/35',
    'hover:border-white hover:bg-white/5 hover:-translate-y-0.5',
    'active:translate-y-0'
  ),
  ghost: cn(
    'bg-transparent text-white/60 font-semibold',
    'hover:text-white hover:bg-white/[0.06]'
  ),
  whatsapp: cn(
    'bg-[#25D366] text-white font-bold',
    'hover:bg-[#1FAD54] hover:-translate-y-0.5',
    'hover:shadow-[0_8px_24px_rgba(37,211,102,0.3)]',
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
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-g-mid',
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
