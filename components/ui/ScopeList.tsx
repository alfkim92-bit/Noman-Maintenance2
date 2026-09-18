'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { stagger, fadeUp, drawX, reduced, VIEWPORT } from '@/lib/motion'

/**
 * Scope / bullet list with chevron bullets that draw in as each line arrives.
 * `columns` switches to two columns on desktop for the long E&I list.
 */
export default function ScopeList({
  items,
  columns = 1,
}: {
  items: string[]
  columns?: 1 | 2
}) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.ul
      variants={stagger(prefersReduced ? 0 : 0.05)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={`mt-6 grid gap-x-8 gap-y-3 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}
    >
      {items.map(item => (
        <motion.li
          key={item}
          variants={prefersReduced ? reduced : fadeUp}
          className="flex items-start gap-3 text-[1.0625rem] text-[var(--ink)]"
        >
          <motion.span
            aria-hidden
            variants={prefersReduced ? undefined : drawX}
            className="mt-[.6em] flex flex-none gap-[2px]"
          >
            <i className="block h-[10px] w-[2px] skew-x-[-18deg] rounded-[1px] bg-[var(--accent)]" />
            <i className="block h-[10px] w-[2px] skew-x-[-18deg] rounded-[1px] bg-[var(--accent)] opacity-40" />
          </motion.span>
          <span>{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  )
}
