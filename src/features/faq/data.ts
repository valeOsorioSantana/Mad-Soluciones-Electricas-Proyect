import { site } from '@/config/site'

export interface FaqItem {
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    question: '¿En qué zonas prestan el servicio?',
    answer: `Atendemos a domicilio en ${site.area}. Escríbenos y coordinamos la visita.`,
  },
  {
    question: '¿Atienden hogares y negocios?',
    answer:
      'Sí. Trabajamos con hogares y viviendas, locales comerciales, pequeñas y medianas empresas, propietarios y arrendatarios.',
  },
  {
    question: '¿Qué servicios eléctricos ofrecen?',
    answer:
      'Instalaciones residenciales y comerciales, mantenimiento y reparación, luminarias y lámparas, tomacorrientes e interruptores, tableros eléctricos, diagnóstico de fallas, automatización y control, y asesoría en proyectos eléctricos.',
  },
  {
    question: '¿Cómo puedo solicitar una inspección o cotización?',
    answer: `Escríbenos por WhatsApp al ${site.phoneDisplay} o por correo a ${site.email}. También puedes usar el formulario de contacto de esta página: se abrirá WhatsApp con tu mensaje listo.`,
  },
  {
    question: '¿Pueden encontrar el origen de una falla eléctrica?',
    answer:
      'Sí. Realizamos el diagnóstico y la solución de fallas eléctricas, siempre priorizando la seguridad de las personas y de la instalación.',
  },
  {
    question: '¿Hacen automatización y control eléctrico?',
    answer:
      'Sí, ofrecemos automatización y control eléctrico, además de asesoría para planear tu proyecto de forma práctica y eficiente.',
  },
]
