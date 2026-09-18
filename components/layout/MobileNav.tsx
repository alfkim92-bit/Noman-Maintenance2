'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { NAV, NAV_SIMPLE } from '@/content/links'
import { SITE } from '@/content/site'
import Brand from './Brand'
import { EASE } from '@/lib/motion'

export default function MobileNav({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const prefersReduced = useReducedMotion()
  const pathname = usePathname()
  const [openSection, setOpenSection] = useState<string | null>(null)
  const sheet = useRef<HTMLDivElement>(null)

  /* Lock body scroll and trap focus while the sheet is open. */
  useEffect(() => {
    if (!open) return

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !sheet.current) return
      const f = sheet.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      )
      if (!f.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-[var(--steel-950)]/45 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            ref={sheet}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-y-0 right-0 z-[80] flex w-full max-w-[420px] flex-col bg-white shadow-[var(--sh-xl)] lg:hidden"
            initial={prefersReduced ? { opacity: 0 } : { x: '100%' }}
            animate={prefersReduced ? { opacity: 1 } : { x: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: prefersReduced ? 0.15 : 0.38, ease: EASE.out }}
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] px-[var(--gutter)] py-4">
              <Brand size="sm" showCr={false} />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-[var(--r-sm)] border border-[var(--border)] text-xl leading-none text-[var(--ink)] transition-colors hover:bg-[var(--bg-subtle)]"
              >
                ✕
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-[var(--gutter)] py-6">
              <ul className="flex flex-col gap-1">
                <MobileItem
                  href="/"
                  label="Home"
                  active={pathname === '/'}
                  onClose={onClose}
                  index={0}
                  reduced={!!prefersReduced}
                />

                {NAV.map((section, si) => {
                  const expanded = openSection === section.label
                  return (
                    <motion.li
                      key={section.label}
                      initial={prefersReduced ? false : { opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: prefersReduced ? 0 : 0.04 * (si + 1),
                        duration: 0.3,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenSection(expanded ? null : section.label)
                        }
                        aria-expanded={expanded}
                        className={`flex min-h-[48px] w-full items-center justify-between rounded-[var(--r-md)] px-3 py-3 text-left font-semibold transition-colors hover:bg-[var(--bg-subtle)] ${
                          isActive(section.href)
                            ? 'text-[var(--brand)]'
                            : 'text-[var(--ink-strong)]'
                        }`}
                      >
                        {section.label}
                        <span
                          aria-hidden
                          className="text-[var(--accent)] transition-transform duration-200"
                          style={{
                            transform: expanded ? 'rotate(180deg)' : 'none',
                          }}
                        >
                          ▾
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: EASE.out }}
                            className="overflow-hidden pl-3"
                          >
                            <li>
                              <Link
                                href={section.overview.href}
                                onClick={onClose}
                                className="flex min-h-[44px] items-center rounded-[var(--r-sm)] px-3 py-2 text-sm font-semibold text-[var(--brand)] hover:bg-[var(--bg-subtle)]"
                              >
                                {section.label} overview
                              </Link>
                            </li>
                            {section.items.map(item => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  onClick={onClose}
                                  className="flex min-h-[44px] items-center rounded-[var(--r-sm)] px-3 py-2 text-sm text-[var(--ink-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--ink-strong)]"
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  )
                })}

                {NAV_SIMPLE.map((item, i) => (
                  <MobileItem
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    active={isActive(item.href)}
                    onClose={onClose}
                    index={i + 3}
                    reduced={!!prefersReduced}
                  />
                ))}
              </ul>

              <div className="mt-8 border-t border-[var(--border)] pt-6">
                <Link href="/contact" onClick={onClose} className="btn btn-primary w-full">
                  Talk to our team
                </Link>
                <div className="mt-5 flex flex-col gap-1 text-sm text-[var(--ink-muted)]">
                  <span className="font-semibold text-[var(--ink-strong)]">
                    {SITE.contactName}
                  </span>
                  <a href={SITE.phoneHref} className="hover:text-[var(--brand)]">
                    {SITE.phoneLocal}
                  </a>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="hover:text-[var(--brand)]"
                  >
                    {SITE.email}
                  </a>
                </div>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function MobileItem({
  href,
  label,
  active,
  onClose,
  index,
  reduced,
}: {
  href: string
  label: string
  active: boolean
  onClose: () => void
  index: number
  reduced: boolean
}) {
  return (
    <motion.li
      initial={reduced ? false : { opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: reduced ? 0 : 0.04 * index, duration: 0.3 }}
    >
      <Link
        href={href}
        onClick={onClose}
        aria-current={active ? 'page' : undefined}
        className={`flex min-h-[48px] items-center rounded-[var(--r-md)] px-3 py-3 font-semibold transition-colors hover:bg-[var(--bg-subtle)] ${
          active ? 'text-[var(--brand)]' : 'text-[var(--ink-strong)]'
        }`}
      >
        {label}
      </Link>
    </motion.li>
  )
}
