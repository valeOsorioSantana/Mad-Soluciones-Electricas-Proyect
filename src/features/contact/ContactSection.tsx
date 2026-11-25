import { NeonCard } from '@/components/common/NeonCard'
import { Reveal } from '@/components/common/Reveal'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { ContactForm } from './ContactForm'
import { ContactInfo } from './ContactInfo'

export function ContactSection() {
  return (
    <Section id="contacto" traces="both">
      <SectionHeading
        title="Contáctanos"
        description="Cuéntanos qué necesitas y te respondemos por WhatsApp para coordinar tu inspección."
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal from="left">
          <NeonCard tone="yellow" className="p-5 sm:p-8">
            <ContactForm />
          </NeonCard>
        </Reveal>
        <Reveal from="right">
          <NeonCard className="h-full p-5 sm:p-8">
            <ContactInfo />
          </NeonCard>
        </Reveal>
      </div>
    </Section>
  )
}
