import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const Accordion = AccordionPrimitive.Root

export function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn('overflow-hidden rounded-xl border border-neon/30 bg-navy-800/60', className)}
      {...props}
    />
  )
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'group flex flex-1 items-center font-sans justify-between gap-4 bg-brand px-5 py-4 text-left text-base font-semibold text-navy-950 transition-colors hover:bg-brand-strong',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="size-5 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden text-sm text-muted data-[state=closed]:animate-[acc-up_0.2s_ease-out] data-[state=open]:animate-[acc-down_0.25s_ease-out]"
      {...props}
    >
      <div className={cn('px-5 py-4 leading-relaxed', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
