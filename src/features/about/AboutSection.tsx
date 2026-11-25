import { CheckCircle2 } from 'lucide-react'
import aboutImage from '@/assets/images/about.webp'
import { NeonCard } from '@/components/common/NeonCard'
import { OptimizedImage } from '@/components/common/OptimizedImage'
import { Reveal } from '@/components/common/Reveal'
import { WhatsAppButton } from '@/components/common/WhatsAppButton'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { site } from '@/config/site'
import { DEFAULT_QUOTE_MESSAGE } from '@/services/whatsapp'
import { audiences, differentiators } from './data'

export function AboutSection() {
  return (
    <Section id="nosotros" traces="both" containerClassName="max-w-6xl">
      <SectionHeading title="¿Quiénes" highlight="somos?" />
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal from="left">
          <NeonCard tone="yellow" className="mx-auto max-w-md p-2">
            <OptimizedImage
              src={aboutImage}
              alt="Técnico de MAD Soluciones Eléctricas junto a la canalización de una obra"
              width={560}
              height={560}
              className="aspect-square w-full rounded-xl object-cover"
            />
          </NeonCard>
        </Reveal>

        <Reveal from="right">
          <NeonCard tone="yellow" className="p-5 sm:p-8">
            <h3 className="text-3xl font-bold uppercase text-white">
              Conoce a <span className="text-brand">{site.shortName}</span>
            </h3>
            <p className="mt-1 text-sm text-neon-soft">{site.contactPerson} · {site.name}</p>
            <p className="mt-4 text-muted">{site.mission}</p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {differentiators.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-ink/90">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
                  {d}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2" aria-label="Atendemos a">
              {audiences.map((a) => (
                <span key={a} className="rounded-full border border-neon/40 bg-navy-900/70 px-3 py-1 text-xs text-neon-soft">
                  {a}
                </span>
              ))}
            </div>

            <WhatsAppButton className="mt-7" message={DEFAULT_QUOTE_MESSAGE} withIcon={false}>
              Reservar inspección
            </WhatsAppButton>
          </NeonCard>
        </Reveal>
      </div>
    </Section>
  )
}
