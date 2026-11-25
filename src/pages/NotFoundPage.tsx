import { Link } from 'react-router'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <main className="grid min-h-dvh place-items-center">
      <Container className="text-center">
        <p className="font-display text-8xl font-extrabold text-brand">404</p>
        <h1 className="mt-2 text-3xl font-bold uppercase text-white">Página no encontrada</h1>
        <p className="mt-2 text-muted">La página que buscas no existe o fue movida.</p>
        <Button asChild className="mt-6">
          <Link to="/">Volver al inicio</Link>
        </Button>
      </Container>
    </main>
  )
}
