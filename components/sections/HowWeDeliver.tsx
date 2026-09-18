'use client'
// ============================================================================
// components/HowWeDeliver.tsx
// The one GSAP ScrollTrigger set-piece on the site: a pinned horizontal rail
// of delivery stages. Desktop pins and scrubs; ≤1023px and reduced-motion
// fall back to a plain vertical stack (no pin, no horizontal scroll).
// ============================================================================

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STAGES = [
  { n: '01', title: 'Scope & feasibility',   body: 'Site survey, constructability review and a scope of work you can price against — before anyone mobilises.' },
  { n: '02', title: 'Engineering & design',  body: 'Basic and detailed engineering, FEED, static calculations and as-built packages, stamped and reviewed.' },
  { n: '03', title: 'Procurement & supply',  body: 'Sourcing, expediting and supply-chain coordination against the approved vendor list and project schedule.' },
  { n: '04', title: 'Construction & erection', body: 'Civil, mechanical, E&I and scaffolding crews under one integrated site management and QA/QC regime.' },
  { n: '05', title: 'Commissioning & handover', body: 'Testing, loop checks, punch-list closeout, documentation and a clean handover to operations.' },
]

export default function HowWeDeliver() {
  const root = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // Desktop only, and only when the visitor hasn't asked for less motion.
      mm.add(
        { isDesktop: '(min-width: 1024px)', noPref: '(prefers-reduced-motion: no-preference)' },
        ctx2 => {
          const { isDesktop, noPref } = ctx2.conditions as Record<string, boolean>
          if (!isDesktop || !noPref) return

          const track = rail.current!
          const distance = track.scrollWidth - window.innerWidth
          if (distance <= 0) return   // rail already fits — nothing to pin

          // The horizontal tween. Keep the reference: cards below are triggered
          // against it via containerAnimation, which is how ScrollTrigger maps
          // horizontal positions inside a pinned, x-translated container.
          const railTween = gsap.to(track, {
            x: -distance,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: () => `+=${distance + window.innerHeight * 0.6}`,
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          // Each card lifts as it scrolls into view horizontally.
          gsap.utils.toArray<HTMLElement>('[data-stage]').forEach(card => {
            gsap.from(card, {
              y: 48, opacity: 0, duration: 0.6, ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: railTween,
                start: 'left 92%',
                toggleActions: 'play none none reverse',
              },
            })
          })

          // Progress bar tied to the same scroll range.
          gsap.to('[data-rail-progress]', {
            scaleX: 1, ease: 'none', transformOrigin: '0 50%',
            scrollTrigger: {
              trigger: root.current, start: 'top top',
              end: () => `+=${distance + window.innerHeight * 0.6}`, scrub: true,
            },
          })
        }
      )
    }, root)

    return () => ctx.revert()   // kills pins, triggers and inline styles
  }, [])

  return (
    <section ref={root} className="relative overflow-hidden bg-[var(--bg-subtle)] blueprint">
      <div className="container-x pt-[var(--section-y)]">
        <p className="spec-line"><span className="eyebrow ml-3">How we deliver</span></p>
        <h2 className="mt-4 text-[length:var(--fs-h2)] font-extrabold">
          One contractor, from first survey to final handover
        </h2>
        <p className="lead mt-4">
          Five stages, one accountable team. Nothing is subcontracted across the seam
          where projects usually fail.
        </p>

        {/* progress rail (desktop) */}
        <div aria-hidden className="mt-10 hidden h-[2px] w-full bg-[var(--border)] lg:block">
          <div data-rail-progress className="h-full w-full scale-x-0 bg-[var(--accent)]" />
        </div>
      </div>

      {/* The rail: horizontal on desktop, stacked everywhere else. */}
      <div
        ref={rail}
        className="container-x flex flex-col gap-6 py-[clamp(2.5rem,5vw,4rem)]
                   lg:w-max lg:flex-row lg:gap-8 lg:pr-[20vw]"
      >
        {STAGES.map(s => (
          <article
            key={s.n}
            data-stage
            className="relative rounded-[var(--r-lg)] border border-[var(--border)] bg-white p-7
                       shadow-[var(--sh-sm)] transition-shadow hover:shadow-[var(--sh-lg)]
                       lg:w-[min(30rem,70vw)] lg:shrink-0"
          >
            <span className="font-[family-name:var(--font-display)] text-5xl font-extrabold text-[var(--steel-200)]">
              {s.n}
            </span>
            <h3 className="mt-3 text-[length:var(--fs-h3)] font-bold">{s.title}</h3>
            <p className="mt-3 text-[var(--ink-muted)]">{s.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
