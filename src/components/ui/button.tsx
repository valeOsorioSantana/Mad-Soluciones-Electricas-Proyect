import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-brand text-navy-950 shadow-[0_0_20px_rgb(245_197_24/0.35)] hover:bg-brand-strong hover:shadow-[0_0_28px_rgb(245_197_24/0.55)]',
        outline:
          'border border-neon/70 bg-navy-900/60 text-ink shadow-neon hover:bg-navy-800 hover:text-white',
        ghost: 'text-ink hover:bg-white/10',
        whatsapp: 'bg-whatsapp text-navy-950 hover:brightness-110',
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-sm sm:text-base',
        lg: 'h-12 px-8 text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  /** Renderiza el hijo (p. ej. un <a>) con los estilos del botón. */
  asChild?: boolean
}

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
