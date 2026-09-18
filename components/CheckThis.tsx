'use client'
// ============================================================================
// components/CheckThis.tsx
// The cross-page connective tissue the brief asks for:
//   • <CheckThis>  — an inline "CHECK THIS → Solutions overview" pill, dropped
//                    inside body copy at least once per content page.
//   • <NextUpGrid> — the 2–3 card "where to go next" block that closes EVERY
//                    page, so no page is a dead end.
// ============================================================================

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion'
import { fadeUp, popIn, EASE } from '@/lib/motion'

/* ---------------------------------------------------------- <CheckThis> -- */
export function CheckThis({
  href, label, kicker = 'Check this',
}: { href: string; label: string; kicker?: string }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.span
      className="my-6 inline-flex w-full sm:w-auto"
      whileHover={prefersReduced ? undefined : 'hover'}
      initial="rest"
      animate="rest"
    >
      <Link
        href={href}
        className="group inline-flex w-full items-center gap-3 rounded-[var(--r-pill)]
                   border border-[var(--border)] bg-[var(--bg-subtle)] px-5 py-3
                   transition-colors hover:border-[var(--brand)] hover:bg-white sm:w-auto"
      >
        {/* chevron rule — bars stagger on hover */}
        <span aria-hidden className="flex flex-none gap-[3px]">
          {[0, 1, 2].map(i => (
            <motion.i
              key={i}
              className="block h-[18px] w-[3px] skew-x-[-18deg] rounded-[1px] bg-[var(--accent)]"
              style={{ opacity: [1, 0.45, 0.18][i] }}
              variants={{ rest: { x: 0 }, hover: { x: [0, 4, 0] } }}
              transition={{ duration: 0.45, ease: EASE.out, delay: i * 0.04 }}
            />
          ))}
        </span>

        <span className="text-[.75rem] font-bold uppercase tracking-[.18em] text-[var(--ink-subtle)]">
          {kicker}
        </span>
        <span className="font-semibold text-[var(--ink-strong)]">{label}</span>

        <motion.span
          aria-hidden
          className="ml-auto text-[var(--accent)]"
          variants={{ rest: { x: 0 }, hover: { x: 6 } }}
          transition={{ duration: 0.28, ease: EASE.out }}
        >
          →
        </motion.span>
      </Link>
    </motion.span>
  )
}

/* -------------------------------------------------------- <NextUpGrid> --- */
export type NextUpItem = {
  href: string
  title: string
  blurb: string
  image?: string      // /assets/... — optional
  kicker?: string     // e.g. "Solution", "Service"
}

export function NextUpGrid({
  items, heading = 'Where to next',
}: { items: NextUpItem[]; heading?: string }) {
  return (
    <section className="section-y border-t border-[var(--border)] bg-[var(--bg-subtle)]">
      <div className="container-x">
        <Reveal variant={fadeUp}>
          <p className="spec-line"><span className="eyebrow ml-3">Keep exploring</span></p>
          <h2 className="mt-4 text-[length:var(--fs-h2)] font-extrabold">{heading}</h2>
        </Reveal>

        <RevealGroup
          step={0.08}
          className="mt-10 grid gap-[clamp(1rem,.5rem+1.5vw,2rem)] sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map(item => (
            <RevealItem key={item.href} variant={popIn}>
              <Link
                href={item.href}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--r-lg)]
                           border border-[var(--border)] bg-white shadow-[var(--sh-sm)]
                           transition-all duration-300 hover:-translate-y-1.5
                           hover:border-[var(--border-strong)] hover:shadow-[var(--sh-lg)]"
              >
                {item.image && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  {item.kicker && (
                    <span className="text-[.7rem] font-bold uppercase tracking-[.18em] text-[var(--ink-subtle)]">
                      {item.kicker}
                    </span>
                  )}
                  <h3 className="mt-2 text-[length:var(--fs-h3)] font-bold">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-[var(--ink-muted)]">{item.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-semibold text-[var(--brand)]">
                    Check this
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
