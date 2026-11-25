import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import logoMark from '@/assets/images/logo-mark.webp'
import { OptimizedImage } from '@/components/common/OptimizedImage'
import { WhatsAppButton } from '@/components/common/WhatsAppButton'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { navItems, site } from '@/config/site'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { cn } from '@/lib/utils'
import { DEFAULT_QUOTE_MESSAGE } from '@/services/whatsapp'
import { Container } from './Container'

const sectionIds = navItems.map((n) => n.id)

function Brand() {
  return (
    <a href="#inicio" className="flex items-center gap-2" aria-label={`${site.name} - Inicio`}>
      <OptimizedImage src={logoMark} alt="" width={300} height={139} priority className="h-9 w-auto bg-transparent sm:h-11" />
      <span className="hidden whitespace-nowrap font-display text-sm font-semibold uppercase leading-tight tracking-widest text-ink sm:block lg:hidden xl:block">
        Soluciones
        <br />
        Eléctricas
      </span>
    </a>
  )
}

export function Header() {
  const active = useScrollSpy(sectionIds)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-300',
        scrolled ? 'border-b border-neon/20 bg-navy-950/85 backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Brand />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={cn(
                    'whitespace-nowrap rounded-full px-2 py-2 text-sm font-medium transition-colors hover:text-brand xl:px-3',
                    active === item.id ? 'text-brand' : 'text-ink/80',
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppButton size="sm" message={DEFAULT_QUOTE_MESSAGE} className="hidden sm:inline-flex">
            Cotizar
          </WhatsAppButton>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              aria-label="Abrir menú"
              className="grid size-10 place-items-center rounded-full border border-neon/40 text-ink lg:hidden"
            >
              <Menu className="size-5" />
            </DialogTrigger>
            <DialogContent className="inset-y-0 right-0 flex w-[82%] max-w-sm flex-col gap-2 border-l border-neon/30 bg-navy-900 p-6 pt-16">
              <DialogTitle className="sr-only">Menú de navegación</DialogTitle>
              <DialogDescription className="sr-only">Enlaces a las secciones de la página</DialogDescription>
              <nav aria-label="Móvil">
                <ul className="flex flex-col">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'block border-b border-white/5 py-3.5 font-display text-2xl uppercase tracking-wide',
                          active === item.id ? 'text-brand' : 'text-ink',
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <WhatsAppButton message={DEFAULT_QUOTE_MESSAGE} className="mt-6 w-full">
                Cotizar por WhatsApp
              </WhatsAppButton>
            </DialogContent>
          </Dialog>
        </div>
      </Container>
    </header>
  )
}
