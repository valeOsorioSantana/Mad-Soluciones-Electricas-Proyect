import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const fieldClass =
  'w-full rounded-lg border border-neon/30 bg-navy-950/70 px-4 py-2.5 text-sm text-ink placeholder:text-muted/70 transition-colors focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 aria-[invalid=true]:border-red-400'

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(fieldClass, 'h-11', className)} {...props} />
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea className={cn(fieldClass, 'min-h-28 resize-y', className)} {...props} />
}

export function Select({ className, ...props }: ComponentProps<'select'>) {
  return <select className={cn(fieldClass, 'h-11', className)} {...props} />
}
