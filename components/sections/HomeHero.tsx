'use client'
// ============================================================================
// components/HomeHero.tsx — the home page hero.
// Fixes the old hero: garbled Arabic CR line, vague "INDUSTRIAL SOLUTIONS"
// headline, no real CTA, no stat anchor.
// ============================================================================

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { SplitText, CountUp, RevealGroup, RevealItem } from '@/components/motion'
import { fadeUp, EASE } from '@/lib/motion'

const STATS = [
  { value: '90M+', label: 'Safe man-hours' },
  { value: '24+',  label: 'Projects completed' },
  { value: '5+',   label: 'Ongoing projects' },
  { value: '4',    label: 'Regional offices' },
]

export default function HomeHero() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Background drifts slower than the page; copy lifts away slightly faster.
  const bgY     = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const copyY   = useTransform(scrollYProgress, [0, 1], [0, -60])
  const fade    = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] max-h-[900px] items-end overflow-hidden"
    >
      {/* ---------------------------------------------------- background -- */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={prefersReduced ? undefined : { y: bgY, scale: bgScale }}
      >
        <Image
          src="/assets/hero/plant-wide.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Scrim: strong at the bottom-left where the copy sits, clear top-right */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(105deg, rgba(4,20,40,.92) 0%, rgba(4,20,40,.74) 38%, rgba(4,20,40,.28) 68%, rgba(4,20,40,.10) 100%)',
        }}
      />

      {/* Chevron rule anchored to the left edge — the brand motif */}
      <motion.div
        aria-hidden
        className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 lg:block"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE.out, delay: 0.25 }}
      >
        <div className="flex flex-col gap-2">
          {[1, 0.45, 0.18].map((o, i) => (
            <span
              key={i}
              style={{ opacity: o }}
              className="block h-[6px] w-[clamp(48px,7vw,104px)] skew-x-[-18deg] bg-[var(--accent)]"
            />
          ))}
        </div>
      </motion.div>

      {/* --------------------------------------------------------- copy -- */}
      <motion.div
        className="container-x relative z-20 pb-[clamp(2.5rem,6vw,5rem)] pt-[clamp(7rem,14vw,10rem)]"
        style={prefersReduced ? undefined : { y: copyY, opacity: fade }}
      >
        <motion.p
          className="eyebrow !text-[var(--orange-300)]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE.out, delay: 0.15 }}
        >
          Jubail · Riyadh · Dubai · Manama
        </motion.p>

        <SplitText
          as="h1"
          text="Engineered. Erected. Maintained."
          className="display-1 mt-5 max-w-[16ch] text-white"
          step={0.055}
          delay={0.3}
        />

        <motion.p
          className="lead mt-6 max-w-[58ch] !text-white/85"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7, ease: EASE.out, delay: 0.75 }}
        >
          Noman Maintenance Services Company delivers mechanical, electrical &amp;
          instrumentation, civil and scaffolding works to the plants, refineries and
          power projects of Saudi Arabia and the Gulf — on schedule, and without a
          safety compromise.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center gap-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE.out, delay: 0.9 }}
        >
          <Link href="/services" className="btn btn-primary">
            Explore our services
          </Link>
          <Link href="/contact" className="btn btn-invert">
            Talk to our team
          </Link>
        </motion.div>

        {/* ------------------------------------------------- stat strip -- */}
        <RevealGroup
          step={0.09}
          delay={1.05}
          className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-2 gap-x-6 gap-y-7 border-t border-white/15 pt-8 sm:grid-cols-4"
        >
          {STATS.map(s => (
            <RevealItem key={s.label} variant={fadeUp}>
              <div className="stat-num text-[clamp(1.75rem,1rem+2.4vw,2.75rem)] !text-[var(--orange-400)]">
                <CountUp value={s.value} />
              </div>
              <div className="mt-1 text-sm text-white/70">{s.label}</div>
            </RevealItem>
          ))}
        </RevealGroup>
      </motion.div>

      {/* ---------------------------------------------------- scroll cue -- */}
      <motion.div
        aria-hidden
        className="absolute bottom-6 right-[var(--gutter)] z-20 hidden items-center gap-3 text-xs uppercase tracking-[.2em] text-white/60 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        Scroll
        <motion.span
          className="block h-10 w-px bg-white/40"
          animate={prefersReduced ? undefined : { scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
