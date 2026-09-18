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
import { EASE, DUR } from '@/lib/motion'

/** useLayoutEffect on the client, useEffect on the server (no SSR warning). */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

/* ======================================================== reveal machinery ==
   Scroll reveals are CSS transitions triggered by an IntersectionObserver, not
   JavaScript-driven animation.

   Why: a JS animation that starts at opacity:0 leaves the element invisible
   whenever the animation does not run — JS disabled, a hydration error, a
   throttled background tab, a device dropping frames. Blank sections on scroll
   is the worst failure a marketing site can have.

   Here the element is visible by default. `html.js` (set below, on mount) is
   what hides it, so hiding only ever happens when JS is demonstrably alive, and
   the observer that un-hides it is already running.
   ========================================================================= */

/** One observer for the whole page rather than one per element. */
let sharedObserver: IntersectionObserver | null = null
const getObserver = () => {
  if (typeof window === 'undefined') return null
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          sharedObserver?.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -4% 0px', threshold: 0.01 }
    )
  }
  return sharedObserver
}

function useReveal<T extends HTMLElement>(index = 0) {
  const ref = useRef<T>(null)

  useIsomorphicLayoutEffect(() => {
    // Only now — with JS provably running — is it safe to hide things.
    document.documentElement.classList.add('js')

    const el = ref.current
    if (!el) return
    if (index) el.style.setProperty('--reveal-i', String(index))

    // Already on screen at mount (above the fold): show immediately, so the
    // first viewport never waits on a scroll event that may never come.
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      requestAnimationFrame(() => el.classList.add('is-in'))
      // rAF may be throttled; guarantee it regardless.
      const t = setTimeout(() => el.classList.add('is-in'), 200)
      return () => clearTimeout(t)
    }

    const observer = getObserver()
    observer?.observe(el)
    return () => observer?.unobserve(el)
  }, [index])

  return ref
}

type RevealProps = {
  children: React.ReactNode
  /** Kept for call-site compatibility; the CSS transition is the same for all. */
  variant?: Variants
  /** Stagger index — multiplied by 55ms of transition-delay. */
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'figure' | 'section' | 'article'
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: RevealProps) {
  const ref = useReveal<HTMLDivElement>(Math.round(delay * 18))
  return (
    <Tag ref={ref as never} className={`reveal ${className}`}>
      {children}
    </Tag>
  )
}

/** Staggers its children by giving each one an increasing --reveal-i. */
export function RevealGroup({
  children,
  className = '',
}: {
  children: React.ReactNode
  step?: number
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    document.documentElement.classList.add('js')
    const el = ref.current
    if (!el) return

    const items = Array.from(el.children) as HTMLElement[]
    items.forEach((child, i) => child.style.setProperty('--reveal-i', String(i)))

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const show = () => items.forEach(c => c.classList.add('is-in'))
      requestAnimationFrame(show)
      const t = setTimeout(show, 200)
      return () => clearTimeout(t)
    }

    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0]?.isIntersecting) return
        items.forEach(c => c.classList.add('is-in'))
        observer.disconnect()
      },
      { rootMargin: '0px 0px -4% 0px', threshold: 0.01 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export function RevealItem({
  children,
  className = '',
}: {
  children: React.ReactNode
  variant?: Variants
  className?: string
}) {
  return <div className={`reveal ${className}`}>{children}</div>
}

/* SplitText (word-by-word masked headline reveal) was removed deliberately.
   Each word sat in an overflow:hidden mask, translated out of view, and only
   JavaScript brought it back — so a throttled tab or a dropped frame left the
   headline blank. Headlines now use a plain CSS entrance (.anim-rise). */

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
   Was a clip-path wipe driven by Framer. A half-finished clip-path leaves the
   image sliced in half, so it now uses the same fail-visible reveal as
   everything else.
   ========================================================================= */
export function MaskedImage({
  children, className = '', delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal<HTMLDivElement>(Math.round(delay * 18))
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

export { DUR, EASE }
