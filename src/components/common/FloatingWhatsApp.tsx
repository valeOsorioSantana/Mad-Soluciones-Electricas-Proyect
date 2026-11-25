import { m, useReducedMotion } from 'motion/react'
import { DEFAULT_QUOTE_MESSAGE, buildWhatsAppUrl } from '@/services/whatsapp'
import { WhatsAppIcon } from './WhatsAppIcon'

/** Botón flotante de contacto rápido (siempre visible). */
export function FloatingWhatsApp() {
  const reduce = useReducedMotion()
  return (
    <m.a
      href={buildWhatsAppUrl(DEFAULT_QUOTE_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      initial={reduce ? false : { scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={reduce ? undefined : { scale: 1.08 }}
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-navy-950 shadow-[0_0_24px_rgb(37_211_102/0.55)] sm:size-16"
    >
      <WhatsAppIcon className="size-8" />
    </m.a>
  )
}
