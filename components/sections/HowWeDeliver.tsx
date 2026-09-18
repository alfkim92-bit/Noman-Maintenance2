// ============================================================================
// components/sections/HowWeDeliver.tsx
//
// Five delivery stages as a numbered track.
//
// This was a GSAP-pinned horizontal rail. Pinning hijacks the scroll — the page
// stops moving while a strip slides sideways — which is the single most common
// cause of a site "feeling broken", and it was part of what the client called
// glitchy. It is now a plain, static, readable layout: nothing pins, nothing
// scrubs, and the whole section is legible in one glance on desktop and reads
// as an ordinary list on a phone.
// ============================================================================

import { Reveal } from '@/components/motion'
import { fadeUp } from '@/lib/motion'

const STAGES = [
  {
    n: '01',
    title: 'Scope & feasibility',
    body: 'Site survey, constructability review and a scope of work you can price against — before anyone mobilises.',
  },
  {
    n: '02',
    title: 'Engineering & design',
    body: 'Basic and detailed engineering, FEED, static calculations and as-built packages, stamped and reviewed.',
  },
  {
    n: '03',
    title: 'Procurement & supply',
    body: 'Sourcing, expediting and supply-chain coordination against the approved vendor list and project schedule.',
  },
  {
    n: '04',
    title: 'Construction & erection',
    body: 'Civil, mechanical, E&I and scaffolding crews under one integrated site management and QA/QC regime.',
  },
  {
    n: '05',
    title: 'Commissioning & handover',
    body: 'Testing, loop checks, punch-list closeout, documentation and a clean handover to operations.',
  },
]

export default function HowWeDeliver() {
  return (
    <section className="band-dark section-y">
      <div className="container-x">
        <Reveal variant={fadeUp}>
          <p className="eyebrow !text-[var(--orange-300)]">How we deliver</p>
          <h2 className="mt-4 max-w-[20ch] text-[length:var(--fs-h2)] font-extrabold">
            One contractor, from first survey to final handover
          </h2>
          <p className="lead mt-4 !text-white/70">
            Five stages, one accountable team. Nothing is subcontracted across
            the seam where projects usually fail.
          </p>
        </Reveal>

        <ol className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-px overflow-hidden rounded-[var(--r-lg)] border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-5">
          {STAGES.map((s, i) => (
            <Reveal
              key={s.n}
              variant={fadeUp}
              delay={i * 0.05}
              as="li"
              className="flex flex-col bg-[#071B36] p-6 transition-colors duration-300 hover:bg-[#0C2951]"
            >
              <span
                aria-hidden
                className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-none text-white/18"
              >
                {s.n}
              </span>
              <span aria-hidden className="mt-4 block h-[3px] w-8 bg-[var(--accent)]" />
              <h3 className="mt-4 text-[1.0625rem] font-bold text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-[1.65] text-white/65">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
