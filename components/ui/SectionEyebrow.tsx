import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  light?: boolean
}

export function SectionEyebrow({ children, className, light = false }: Props) {
  return (
    <div className={cn('flex items-center gap-3 mb-4', className)}>
      <div className={cn('w-5 h-px flex-shrink-0', light ? 'bg-g-mid' : 'bg-g-light')} aria-hidden />
      <span
        className={cn(
          'text-[11px] font-bold tracking-[0.2em] uppercase leading-none',
          light ? 'text-verde-medio' : 'text-g-light'
        )}
      >
        {children}
      </span>
    </div>
  )
}
