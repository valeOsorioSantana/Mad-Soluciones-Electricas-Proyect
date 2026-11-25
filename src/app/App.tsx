import { domAnimation, LazyMotion } from 'motion/react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { routes } from './routes'

const router = createBrowserRouter(routes)

export function App() {
  // LazyMotion + componentes `m`: carga solo las funciones de animación necesarias (bundle más liviano).
  return (
    <LazyMotion features={domAnimation} strict>
      <RouterProvider router={router} />
    </LazyMotion>
  )
}
