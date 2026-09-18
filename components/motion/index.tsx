'use client'
// ============================================================================
// components/motion/index.tsx
// The reusable motion primitives. Every one respects prefers-reduced-motion.
// ============================================================================

import {
  motion, useInView, useReducedMotion, useScroll, useTransform,
  useSpring, useMotionValue, animate, type Variants,
} from 'framer-motion'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  EASE, DUR, VIEWPORT, stagger, fadeUp, popIn, wordUp, clipUp, reduced, toWords,
} from '@/lib/motion'

/** useLayoutEffect on the client, useEffect on the server (no SSR warning). */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

/* ============================================================== <Reveal> ==
   Drop-in scroll reveal. Replaces the old IntersectionObserver + .visible CSS.
   <Reveal><h2>…</h2></Reveal>
   <Reveal variant={clipUp} delay={.1} as="figure">…</Reveal>
   ========================================================================= */
type RevealProps = {
  children: React.ReactNode
  variant?: Variants
  delay?: number
  className?: string
  as?: keyof typeof motion
}
export function Reveal({
  children, variant = fadeUp, delay = 0, className, as = 'div',
}: RevealProps) {
  const prefersReduced = useReducedMotion()
  const Tag = motion[as] as typeof motion.div
  return (
    <Tag
      className={className}
      variants={prefersReduced ? reduced : variant}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ delay: prefersReduced ? 0 : delay }}
    >
      {children}
    </Tag>
  )
}

/* ========================================================== <RevealGroup> ==
   Staggers direct children. Children must be <RevealItem> (or any element
   with variants={fadeUp|popIn}).
   ========================================================================= */
export function RevealGroup({
  children, step = 0.07, delay = 0, className,
}: { children: React.ReactNode; step?: number; delay?: number; className?: string }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={stagger(prefersReduced ? 0 : step, delay)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children, variant = popIn, className,
}: { children: React.ReactNode; variant?: Variants; className?: string }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div className={className} variants={prefersReduced ? reduced : variant}>
      {children}
    </motion.div>
  )
}

/* =========================================================== <SplitText> ==
   Word-by-word masked headline reveal. Renders real text (one <span> per
   word) so it stays selectable, searchable and screen-reader friendly — the
   whole string is also exposed via aria-label with the pieces aria-hidden.
   ========================================================================= */
export function SplitText({
  text, className, as: Tag = 'h1', step = 0.045, delay = 0, once = true,
}: {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  step?: number
  delay?: number
  once?: boolean
}) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once, amount: 0.3 })
  const words = toWords(text)

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      <motion.span
        aria-hidden
        style={{ display: 'inline' }}
        variants={stagger(step, delay)}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {words.map((w, i) =>
          /\s+/.test(w) ? (
            <span key={i}> </span>
          ) : (
            <span
              key={i}
              style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
            >
              <motion.span style={{ display: 'inline-block' }} variants={wordUp}>
                {w}
              </motion.span>
            </span>
          )
        )}
      </motion.span>
    </Tag>
  )
}

/* ============================================================= <CountUp> ==
   Animated stat numeral. Parses "90M+", "24+", "100 m" into number + suffix.
   Replaces the old animateValue() in main.js.
   ========================================================================= */
export function CountUp({
  value, duration = 1.8, className,
}: { value: string; duration?: number; className?: string }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const match = value.match(/^([\d.,]+)(.*)$/)
  const target = match ? parseFloat(match[1].replace(/,/g, '')) : 0
  const suffix = match ? match[2] : value

  /* Start at the REAL value so server-rendered HTML, search engines and any
     visitor without working JS see "90M+", never "0M+". The count is reset to
     zero in a layout effect, which runs before the browser paints, so the
     animation still starts from 0 with no visible flash. */
  const [shown, setShown] = useState(target)

  useIsomorphicLayoutEffect(() => {
    if (prefersReduced || !match) return
    setShown(0)
  }, [prefersReduced, match])

  useEffect(() => {
    if (!inView || prefersReduced || !match) return
    const controls = animate(0, target, {
      duration,
      ease: EASE.out,
      onUpdate: v => setShown(Number.isInteger(target) ? Math.round(v) : Number(v.toFixed(1))),
    })
    return () => controls.stop()
  }, [inView, prefersReduced, target, duration, match])

  return (
    <span ref={ref} className={className}>
      {match ? shown.toLocaleString('en-US') : ''}{suffix}
    </span>
  )
}

/* ============================================================ <Parallax> ==
   Vertical parallax tied to the element's own scroll progress.
   strength: px of travel across the full pass (negative = moves up).
   ========================================================================= */
export function Parallax({
  children, strength = 80, className,
}: { children: React.ReactNode; strength?: number; className?: string }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const raw = useTransform(scrollYProgress, [0, 1], [strength * -0.5, strength * 0.5])
  const y = useSpring(raw, { stiffness: 120, damping: 24, mass: 0.4 })

  return (
    <div ref={ref} className={className}>
      <motion.div className="parallax" style={{ y: prefersReduced ? 0 : y }}>
        {children}
      </motion.div>
    </div>
  )
}

/* ====================================================== <MagneticButton> ==
   Cursor-attracted CTA. Pointer-fine only; disabled on touch + reduced motion.
   ========================================================================= */
export function MagneticButton({
  children, className, strength = 0.28, ...rest
}: React.ComponentProps<typeof motion.button> & { strength?: number }) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.35 })
  const enabled =
    !prefersReduced &&
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches

  return (
    <motion.button
      ref={ref}
      className={className}
      style={{ x: enabled ? sx : 0, y: enabled ? sy : 0 }}
      onPointerMove={e => {
        if (!enabled || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * strength)
        y.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}
      whileTap={{ scale: 0.97 }}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

/* ====================================================== <ScrollProgress> ==
   2px orange bar under the navbar showing read progress. Home + long pages.
   ========================================================================= */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: '0 50%' }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-[var(--accent)]"
    />
  )
}

/* ========================================================= <MaskedImage> ==
   Image that wipes up into view behind a clip mask. Use for feature photos
   and ExplainerFigure screenshots.
   ========================================================================= */
export function MaskedImage({
  children, className, delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={prefersReduced ? reduced : clipUp}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ delay }}
      style={{ willChange: 'clip-path' }}
    >
      {children}
    </motion.div>
  )
}

export { DUR, EASE }
