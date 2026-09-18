'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { LinkEntry } from '@/content/links'
import { EASE } from '@/lib/motion'

export type MegaMenuData = {
  label: string
  href: string
  overview: { title: string; blurb: string; href: string }
  items: readonly LinkEntry[]
}

export default function MegaMenu({
  data,
  open,
  panelId,
  onClose,
  onPointerEnter,
  onPointerLeave,
}: {
  data: MegaMenuData
  open: boolean
  panelId: string
  onClose: () => void
  onPointerEnter?: () => void
  onPointerLeave?: () => void
}) {
  const prefersReduced = useReducedMotion()
  const panel = useRef<HTMLDivElement>(null)

  /* Escape closes; Tab is kept inside the panel while it is open. */
  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel.current) return

      const focusables = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          id={panelId}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 4 }}
          transition={{ duration: prefersReduced ? 0.12 : 0.2, ease: EASE.out }}
          className="absolute left-0 right-0 top-full z-50 border-b border-[var(--border)] bg-white shadow-[var(--sh-lg)]"
        >
          <div className="container-x grid gap-8 py-8 lg:grid-cols-[1fr_300px]">
            <ul className="grid gap-1 sm:grid-cols-2">
              {data.items.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={prefersReduced ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prefersReduced ? 0 : 0.03 * i, duration: 0.24 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group flex flex-col gap-1 rounded-[var(--r-md)] p-3 transition-colors hover:bg-[var(--bg-subtle)]"
                  >
                    <span className="flex items-center gap-2 font-semibold text-[var(--ink-strong)]">
                      {item.title}
                      <span
                        aria-hidden
                        className="text-[var(--accent)] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                      >
                        →
                      </span>
                    </span>
                    <span className="text-sm text-[var(--ink-muted)]">
                      {item.blurb}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Promo tile → the section overview page */}
            <Link
              href={data.overview.href}
              onClick={onClose}
              className="group relative flex flex-col justify-end overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--blue-950)] p-6 text-white"
            >
              <Image
                src="/assets/hero/plant-wide.jpg"
                alt=""
                fill
                sizes="300px"
                className="object-cover opacity-30 transition-transform duration-[600ms] group-hover:scale-105"
              />
              <span className="relative">
                <span aria-hidden className="mb-3 flex gap-[3px]">
                  {[1, 0.45, 0.18].map((o, i) => (
                    <i
                      key={i}
                      style={{ opacity: o }}
                      className="block h-[16px] w-[3px] skew-x-[-18deg] rounded-[1px] bg-[var(--accent)]"
                    />
                  ))}
                </span>
                <span className="block font-[family-name:var(--font-display)] text-lg font-bold">
                  {data.label} overview
                </span>
                <span className="mt-1 block text-sm text-white/75 line-clamp-3">
                  {data.overview.blurb}
                </span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--orange-300)]">
                  See all {data.label.toLowerCase()}
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
