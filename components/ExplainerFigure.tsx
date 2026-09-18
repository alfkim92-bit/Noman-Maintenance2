'use client'
// ============================================================================
// components/ExplainerFigure.tsx
// "Screenshots inside the site that explain things."
// An annotated image: numbered orange hotspots over the photo/screenshot, a
// synced caption list underneath, technical corner brackets and a blueprint
// backing plate. Hovering a hotspot highlights its caption and vice-versa.
//
// Use it on: suspended scaffolds (suspension points), construction scaffolds
// (frame + decking + diagonal), water treatment (process flow), floating
// covers (panel + anchor), heat transfer (loop), E&I (panel layout).
// ============================================================================

import Image from 'next/image'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MaskedImage } from '@/components/motion'
import { EASE } from '@/lib/motion'

export type Hotspot = {
  n: number
  x: number        // 0–100, % from left
  y: number        // 0–100, % from top
  label: string
  detail?: string
}

export default function ExplainerFigure({
  src, alt, caption, hotspots, priority = false,
}: {
  src: string
  alt: string
  caption?: string
  hotspots: Hotspot[]
  priority?: boolean
}) {
  const prefersReduced = useReducedMotion()
  const [active, setActive] = useState<number | null>(null)

  return (
    <figure className="relative">
      {/* blueprint backing plate, offset down-right */}
      <div
        aria-hidden
        className="blueprint pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-[var(--r-lg)] bg-[var(--bg-inset)]"
      />

      <MaskedImage className="brackets relative overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-white">
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />

          {hotspots.map((h, i) => (
            <motion.button
              key={h.n}
              type="button"
              aria-label={`${h.n}. ${h.label}`}
              aria-pressed={active === h.n}
              onMouseEnter={() => setActive(h.n)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(h.n)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(a => (a === h.n ? null : h.n))}
              className="absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center
                         rounded-full bg-[var(--accent)] text-[13px] font-bold text-[var(--steel-950)]
                         shadow-[0_2px_10px_rgba(12,21,36,.35)] ring-0 ring-[var(--orange-200)]
                         transition-[box-shadow,transform] hover:scale-110"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
              whileInView={prefersReduced ? undefined : { scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, ease: EASE.out, delay: 0.55 + i * 0.09 }}
            >
              {h.n}
              {/* pulse ring only while active — not an idle loop */}
              {active === h.n && !prefersReduced && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full border-2 border-[var(--accent)]"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1.9, opacity: 0 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </MaskedImage>

      {/* caption list */}
      <figcaption className="mt-6">
        {caption && <p className="text-sm text-[var(--ink-muted)]">{caption}</p>}
        <ol className="mt-4 grid gap-2 sm:grid-cols-2">
          {hotspots.map(h => (
            <li
              key={h.n}
              onMouseEnter={() => setActive(h.n)}
              onMouseLeave={() => setActive(null)}
              className={`flex gap-3 rounded-[var(--r-sm)] px-3 py-2 text-sm transition-colors ${
                active === h.n ? 'bg-[var(--accent-soft)]' : 'bg-transparent'
              }`}
            >
              <span className="font-[family-name:var(--font-display)] font-extrabold text-[var(--accent)]">
                {String(h.n).padStart(2, '0')}
              </span>
              <span>
                <span className="font-semibold text-[var(--ink-strong)]">{h.label}</span>
                {h.detail && <span className="text-[var(--ink-muted)]"> — {h.detail}</span>}
              </span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  )
}
