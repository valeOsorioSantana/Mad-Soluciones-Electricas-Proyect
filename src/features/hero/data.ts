import { BadgeCheck, Clock3, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const heroContent = {
  titleLines: ['Soluciones', 'eléctricas'],
  highlight: 'profesionales',
  description:
    'Instalaciones, mantenimiento y diagnóstico de fallas para hogares, locales y pymes en Medellín y sus alrededores. Servicio a domicilio, seguro y con atención personalizada.',
}

export interface TrustBadge {
  icon: LucideIcon
  label: string
}

/** Diferenciadores del documento del cliente. */
export const trustBadges: TrustBadge[] = [
  { icon: ShieldCheck, label: 'Seguridad en cada instalación' },
  { icon: BadgeCheck, label: 'Calidad en nuestros trabajos' },
  { icon: Clock3, label: 'Responsabilidad y cumplimiento' },
]
