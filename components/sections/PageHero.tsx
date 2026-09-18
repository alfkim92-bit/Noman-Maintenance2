'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { SplitText } from '@/components/motion'
import { EASE, clipUp, reduced } from '@/lib/motion'
import Breadcrumbs, { type Crumb } from '@/components/layout/Breadcrumbs'

/**
 * Every inner page opens with this. Short (no parallax — inner heroes don't
 * earn it), background wipes up behind a clip mask, title splits word by word.
 */
export default function PageHero({
  eyebrow,
  title,
  h1,
  lead,
  image = '/assets/hero/plant-wide.jpg',
  trail,
}: {
  eyebrow?: string
  /** The uppercase display line. */
  title: string
  /** The real page <h1>. If omitted, `title` becomes the h1. */
  h1?: string
  lead?: string
  image?: string
  trail: Crumb[]
}) {
  const prefersReduced = useReducedMotion()

  return (
    <section className="relative isolate overflow-hidden bg-[var(--blue-950)] text-white">
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20"
        variants={prefersReduced ? reduced : clipUp}
        initial="hidden"
        animate="show"
        style={{ willChange: 'clip-path' }}
      >
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(100deg, rgba(4,20,40,.94) 0%, rgba(4,20,40,.80) 45%, rgba(4,20,40,.46) 100%)',
        }}
      />

      <div className="container-x pb-[clamp(2.5rem,5vw,4rem)] pt-[clamp(8rem,13vw,11rem)]">
        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE.out, delay: 0.1 }}
        >
          <Breadcrumbs trail={trail} invert />
        </motion.div>

        {eyebrow && (
          <motion.p
            className="eyebrow mt-6 !text-[var(--orange-300)]"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE.out, delay: 0.18 }}
          >
            {eyebrow}
          </motion.p>
        )}

        <SplitText
          as={h1 ? 'h2' : 'h1'}
          text={title}
          className="display-2 mt-4 max-w-[18ch] text-white"
          step={0.045}
          delay={0.25}
        />

        {h1 && (
          <motion.h1
            className="mt-4 max-w-[26ch] text-[length:var(--fs-h2)] font-extrabold !text-[var(--orange-200)]"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE.out, delay: 0.45 }}
          >
            {h1}
          </motion.h1>
        )}

        {lead && (
          <motion.p
            className="lead mt-5 max-w-[62ch] !text-white/80"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE.out, delay: 0.55 }}
          >
            {lead}
          </motion.p>
        )}
      </div>

      <span
        aria-hidden
        className="absolute bottom-0 left-0 flex h-[6px] w-full"
      >
        <span className="h-full flex-1 bg-[var(--accent)]" />
        <span className="h-full flex-1 bg-[var(--accent)]/40" />
        <span className="h-full flex-[4] bg-[var(--accent)]/15" />
      </span>
    </section>
  )
}
