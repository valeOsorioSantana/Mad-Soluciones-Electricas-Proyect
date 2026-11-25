import {
  Cable,
  ClipboardList,
  Cpu,
  Lightbulb,
  PlugZap,
  ScanSearch,
  ToggleRight,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

export interface ServiceItem {
  title: string
  description: string
  icon: LucideIcon
}

/** Servicios del documento del cliente. */
export const services: ServiceItem[] = [
  {
    title: 'Instalaciones eléctricas',
    description: 'Instalaciones residenciales y comerciales, hechas con seguridad y orden.',
    icon: Cable,
  },
  {
    title: 'Mantenimiento y reparación',
    description: 'Mantenimiento y reparación de instalaciones eléctricas existentes.',
    icon: Wrench,
  },
  {
    title: 'Luminarias y lámparas',
    description: 'Instalación de luminarias, lámparas e iluminación LED para tus espacios.',
    icon: Lightbulb,
  },
  {
    title: 'Tomacorrientes e interruptores',
    description: 'Instalación y adecuación de tomacorrientes e interruptores.',
    icon: ToggleRight,
  },
  {
    title: 'Tableros eléctricos',
    description: 'Instalación y organización de tableros eléctricos.',
    icon: PlugZap,
  },
  {
    title: 'Diagnóstico de fallas',
    description: 'Detectamos el origen de la falla eléctrica y la solucionamos.',
    icon: ScanSearch,
  },
  {
    title: 'Automatización y control',
    description: 'Automatización y control eléctrico para mayor comodidad y eficiencia.',
    icon: Cpu,
  },
  {
    title: 'Asesoría en proyectos',
    description: 'Te acompañamos y asesoramos en tus proyectos eléctricos.',
    icon: ClipboardList,
  },
]
