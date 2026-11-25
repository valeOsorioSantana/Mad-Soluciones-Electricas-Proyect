import { MapPin } from 'lucide-react'
import heroImage from '@/assets/images/hero.webp'
import { CircuitTraces } from '@/components/common/CircuitTraces'
import { NeonCard } from '@/components/common/NeonCard'
import { OptimizedImage } from '@/components/common/OptimizedImage'
import { Reveal } from '@/components/common/Reveal'
import { WhatsAppButton } from '@/components/common/WhatsAppButton'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/Container'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { DEFAULT_INSPECTION_MESSAGE } from '@/services/whatsapp'
import { heroContent, trustBadges } from './data'

export function HeroSection() {
  // En móvil no se muestra (ni se descarga) la foto: el título y los botones quedan primero.
  const showImage = useMediaQuery('(min-width: 768px)')
  return (
    <section id="inicio" className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="circuit-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <CircuitTraces side="left" className="top-16" />
      <CircuitTraces side="right" className="top-40 opacity-70" />
      <div className="neon-line !top-auto bottom-0" aria-hidden="true" />
      <Container className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1.15fr_0.85fr] lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          <Reveal>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-neon/40 bg-navy-800/70 px-4 py-1.5 text-sm text-neon-soft">
              <MapPin className="size-4" /> Medellín y alrededores · A domicilio
            </p>
            <h1 className="text-5xl font-extrabold uppercase leading-[0.95] text-white sm:text-6xl lg:text-7xl">
              {heroContent.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block text-brand drop-shadow-[0_0_18px_rgb(245_197_24/0.35)]">
                {heroContent.highlight}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">{heroContent.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row md:flex-wrap">
              <WhatsAppButton size="lg" message={DEFAULT_INSPECTION_MESSAGE} withIcon={false}>
                Reservar inspección
              </WhatsAppButton>
              <Button asChild variant="outline" size="lg">
                <a href="#servicios">Ver servicios</a>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <ul className="mt-10 grid gap-3 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
              {trustBadges.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-sm text-ink/90">
                  <Icon className="size-5 shrink-0 text-brand" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {showImage && (
          <Reveal from="right" className="mx-auto w-full lg:max-w-none">
            <NeonCard className="relative mx-auto max-w-md overflow-hidden p-2">
              <OptimizedImage
                src={heroImage}
                alt="Técnico de MAD Soluciones Eléctricas realizando una instalación eléctrica"
                width={640}
                height={800}
                priority
                className="aspect-[4/5] w-full rounded-xl object-cover"
              />
              <div className="absolute inset-x-6 bottom-6 hidden rounded-xl lg:block border border-brand/50 bg-navy-950/85 px-4 py-3 backdrop-blur">
                <p className="font-display text-lg font-bold uppercase text-brand">Iluminamos tu vida</p>
                <p className="text-xs text-muted">Instalaciones seguras y soluciones prácticas para tu proyecto.</p>
              </div>
            </NeonCard>
          </Reveal>
        )}
      </Container>
    </section>
  )
}
