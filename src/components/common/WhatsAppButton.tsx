import type { ReactNode } from 'react'
import { Button, type ButtonProps } from '@/components/ui/button'
import { buildWhatsAppUrl } from '@/services/whatsapp'
import { WhatsAppIcon } from './WhatsAppIcon'

interface WhatsAppButtonProps extends Pick<ButtonProps, 'variant' | 'size' | 'className'> {
  /** Mensaje precargado en la conversación. */
  message?: string
  children?: ReactNode
  /** Muestra el icono de WhatsApp. */
  withIcon?: boolean
}

/** Enlace con apariencia de botón que abre una conversación de WhatsApp. */
export function WhatsAppButton({
  message,
  children = 'Escríbenos por WhatsApp',
  withIcon = true,
  variant = 'primary',
  ...props
}: WhatsAppButtonProps) {
  return (
    <Button asChild variant={variant} {...props}>
      <a href={buildWhatsAppUrl(message)} target="_blank" rel="noopener noreferrer">
        {withIcon && <WhatsAppIcon />}
        {children}
      </a>
    </Button>
  )
}
