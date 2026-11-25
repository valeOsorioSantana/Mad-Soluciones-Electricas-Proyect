import type { RouteObject } from 'react-router'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'

/** Tabla de rutas. Para agregar una página: crear el componente en src/pages y registrarlo aquí. */
export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '*', element: <NotFoundPage /> },
]
