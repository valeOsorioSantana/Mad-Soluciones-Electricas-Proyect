import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description

interface DialogContentProps extends ComponentProps<typeof DialogPrimitive.Content> {
  /** Oculta el botón de cierre por defecto. */
  hideClose?: boolean
}

export function DialogContent({ className, children, hideClose, ...props }: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-sm data-[state=open]:animate-[fade-in_0.2s_ease-out]" />
      <DialogPrimitive.Content
        className={cn(
          'fixed z-50 outline-none data-[state=open]:animate-[fade-in_0.2s_ease-out]',
          className,
        )}
        {...props}
      >
        {children}
        {!hideClose && (
          <DialogPrimitive.Close
            aria-label="Cerrar"
            className="absolute right-3 top-3 rounded-full bg-navy-950/80 p-2 text-ink transition hover:bg-brand hover:text-navy-950"
          >
            <X className="size-5" />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
