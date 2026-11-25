import { Reveal } from '@/components/common/Reveal'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { ServiceCard } from './ServiceCard'
import { services } from './data'

export function ServicesSection() {
  return (
    <Section id="servicios" traces="both">
      <SectionHeading
        title="Nuestros"
        highlight="servicios"
        description="Soluciones eléctricas completas para tu hogar, local o empresa."
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <li key={service.title}>
            <Reveal delay={(i % 4) * 0.08} className="h-full">
              <ServiceCard {...service} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
