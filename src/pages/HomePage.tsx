import { FloatingWhatsApp } from '@/components/common/FloatingWhatsApp'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { AboutSection } from '@/features/about/AboutSection'
import { ContactSection } from '@/features/contact/ContactSection'
import { FaqSection } from '@/features/faq/FaqSection'
import { GallerySection } from '@/features/gallery/GallerySection'
import { HeroSection } from '@/features/hero/HeroSection'
import { ProcessSection } from '@/features/process/ProcessSection'
import { ServicesSection } from '@/features/services/ServicesSection'

/** Página principal: solo compone secciones, sin lógica propia. */
export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <GallerySection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
