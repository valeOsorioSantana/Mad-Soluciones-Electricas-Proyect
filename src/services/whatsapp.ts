import { site } from '@/config/site'

/** Construye un enlace wa.me con el mensaje precargado. */
export function buildWhatsAppUrl(message?: string, phone: string = site.phoneIntl): string {
  const base = `https://wa.me/${phone}`
  const text = message?.trim()
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}

export const DEFAULT_INSPECTION_MESSAGE =
  'Hola MAD Soluciones Eléctricas, quiero reservar una inspección. ¿Me pueden ayudar?'
export const DEFAULT_QUOTE_MESSAGE =
  'Hola MAD Soluciones Eléctricas, quiero solicitar una cotización.'
