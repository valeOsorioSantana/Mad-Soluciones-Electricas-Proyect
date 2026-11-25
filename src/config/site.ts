/** Única fuente de verdad de datos de marca y contacto (tomados del documento del cliente). */
export const site = {
  name: 'MAD Soluciones Eléctricas',
  shortName: 'MAD',
  slogan: 'Soluciones eléctricas que dan luz a tu vida',
  contactPerson: 'Miguel Ángel Duque',
  phoneDisplay: '310 405 5697',
  /** Formato internacional (Colombia) para wa.me y tel: */
  phoneIntl: '573104055697',
  email: 'gelo25@outlook.com',
  area: 'Medellín y sus alrededores',
  mission:
    'Brindar soluciones eléctricas confiables, seguras y de calidad, satisfaciendo las necesidades de nuestros clientes mediante un servicio responsable, profesional y eficiente, buscando siempre la seguridad, la satisfacción y el bienestar de cada persona.',
} as const

export interface NavItem {
  label: string
  href: string
  /** id de la sección a la que apunta (para scroll-spy). */
  id: string
}

export const navItems: readonly NavItem[] = [
  { label: 'Inicio', href: '#inicio', id: 'inicio' },
  { label: 'Quiénes somos', href: '#nosotros', id: 'nosotros' },
  { label: 'Servicios', href: '#servicios', id: 'servicios' },
  { label: 'Cómo trabajamos', href: '#proceso', id: 'proceso' },
  { label: 'Trabajos', href: '#trabajos', id: 'trabajos' },
  { label: 'Preguntas', href: '#preguntas', id: 'preguntas' },
  { label: 'Contacto', href: '#contacto', id: 'contacto' },
]
