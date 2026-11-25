import { NeonCard } from '@/components/common/NeonCard'
import { Reveal } from '@/components/common/Reveal'
import { WhatsAppButton } from '@/components/common/WhatsAppButton'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { DEFAULT_INSPECTION_MESSAGE } from '@/services/whatsapp'
import { steps } from './data'

export function ProcessSection() {
  return (
    <Section id="proceso" traces="right">
      <SectionHeading
        title="Cómo"
        highlight="trabajamos"
        description="Un proceso simple, claro y sin sorpresas."
      />
      <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title}>
            <Reveal delay={i * 0.1} className="h-full">
              <NeonCard tone={i % 2 ? 'blue' : 'yellow'} className="relative h-full p-6 pt-9">
                <span className="absolute -top-5 left-6 grid size-11 place-items-center rounded-full bg-brand font-display text-2xl font-extrabold text-navy-950 shadow-[0_0_18px_rgb(245_197_24/0.5)]">
                  {i + 1}
                </span>
                <h3 className="text-2xl font-bold uppercase text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </NeonCard>
            </Reveal>
          </li>
        ))}
      </ol>
      <Reveal className="mt-10 text-center">
        <WhatsAppButton size="lg" message={DEFAULT_INSPECTION_MESSAGE}>
          Empieza hoy por WhatsApp
        </WhatsAppButton>
      </Reveal>
    </Section>
  )
}
