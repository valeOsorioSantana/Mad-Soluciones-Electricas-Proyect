import { site } from '@/config/site'
import { buildWhatsAppUrl } from './whatsapp'

export interface ContactFormValues {
  name: string
  phone: string
  service: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

export const emptyContactForm: ContactFormValues = { name: '', phone: '', service: '', message: '' }

/** Teléfono: 7 a 15 dígitos, admite espacios, guiones, paréntesis y "+" inicial. */
const PHONE_RE = /^\+?[\d\s\-()]{7,20}$/

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}
  const name = values.name.trim()
  const digits = values.phone.replace(/\D/g, '')
  const message = values.message.trim()

  if (name.length < 2) errors.name = 'Escribe tu nombre.'
  if (!PHONE_RE.test(values.phone.trim()) || digits.length < 7 || digits.length > 15) {
    errors.phone = 'Escribe un teléfono válido.'
  }
  if (message.length < 10) errors.message = 'Cuéntanos un poco más (mínimo 10 caracteres).'
  return errors
}

/** Convierte el formulario en un enlace de WhatsApp hacia MAD. */
export function contactFormToWhatsAppUrl(values: ContactFormValues): string {
  const lines = [
    `Hola ${site.name}, soy ${values.name.trim()}.`,
    values.service ? `Servicio de interés: ${values.service}.` : null,
    `Mensaje: ${values.message.trim()}`,
    `Mi teléfono: ${values.phone.trim()}`,
  ].filter(Boolean)
  return buildWhatsAppUrl(lines.join('\n'))
}
