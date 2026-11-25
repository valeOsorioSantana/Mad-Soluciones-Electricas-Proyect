import { site } from '@/config/site'

export const DEFAULT_EMAIL_SUBJECT = 'Solicitud de cotización - MAD Soluciones Eléctricas'

/** Enlace que abre la ventana de redacción de Gmail con el destinatario y el asunto listos. */
export function buildGmailComposeUrl(
  subject: string = DEFAULT_EMAIL_SUBJECT,
  to: string = site.email,
): string {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to, su: subject })
  return `https://mail.google.com/mail/?${params.toString()}`
}
