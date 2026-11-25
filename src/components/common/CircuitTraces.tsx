import { cn } from '@/lib/utils'

export type TraceSide = 'left' | 'right'

interface CircuitTracesProps {
  side: TraceSide
  className?: string
}

/** Trazos principales (visten el borde de la sección). */
const TRACES = [
  'M0 70 H70 L100 100 V240 L130 270 H196',
  'M0 190 H34 L58 214 V430 L88 460 H150',
  'M0 540 H104 L134 570 V690 L164 720 H224',
  'M0 360 H18 L40 382 V400',
]
/** Nodos (puntos luminosos) en los extremos de los trazos. */
const NODES: [number, number][] = [
  [196, 270],
  [100, 100],
  [150, 460],
  [58, 214],
  [224, 720],
  [40, 400],
  [134, 570],
]

/**
 * Trazos de circuito luminosos en el borde de una sección (como en el boceto).
 * Decorativo: oculto para lectores de pantalla y en móviles pequeños.
 */
export function CircuitTraces({ side, className }: CircuitTracesProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 800"
      preserveAspectRatio="xMinYMid slice"
      className={cn(
        'pointer-events-none absolute inset-y-0 hidden w-48 text-neon md:block lg:w-60',
        '[mask-image:linear-gradient(to_right,black_35%,transparent)]',
        side === 'left' ? 'left-0' : 'right-0 -scale-x-100',
        className,
      )}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-60 [filter:drop-shadow(0_0_4px_currentColor)]"
      >
        {TRACES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {/* Pulso de energía que recorre los trazos */}
      <g
        fill="none"
        stroke="#ffd84a"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
        className="motion-reduce:hidden [filter:drop-shadow(0_0_5px_#f5c518)]"
      >
        {TRACES.slice(0, 3).map((d, i) => (
          <path
            key={d}
            d={d}
            pathLength={1}
            strokeDasharray="0.04 0.96"
            className="animate-[circuit-flow_6s_linear_infinite]"
            style={{ animationDelay: `${i * -2}s` }}
          />
        ))}
      </g>
      <g fill="currentColor" className="[filter:drop-shadow(0_0_5px_currentColor)]">
        {NODES.map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" />
        ))}
      </g>
    </svg>
  )
}
