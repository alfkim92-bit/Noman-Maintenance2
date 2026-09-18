// ============================================================================
// lib/motion.ts — shared Framer Motion vocabulary.
// Install: npm i framer-motion
// (If you install the newer `motion` package instead, change every
//  `from 'framer-motion'` in this project to `from 'motion/react'`.)
// Every variant here is opacity-safe: with reduced motion on, the helpers in
// components/motion collapse them to a plain fade.
// ============================================================================

import type { Variants, Transition } from 'framer-motion'

/* ---------------------------------------------------------------- easing - */
export const EASE = {
  out: [0.22, 1, 0.36, 1] as const,      // expo-out — default for reveals
  inOut: [0.65, 0, 0.35, 1] as const,
  soft: [0.4, 0, 0.2, 1] as const,
} as const

/* Reveals were long enough that fast scrolling outran them and content looked
   like it was still arriving. Shorter and shallower reads as "settled". */
export const DUR = { micro: 0.18, ui: 0.24, reveal: 0.42, hero: 0.8 } as const

export const SPRING: Transition = {
  type: 'spring', stiffness: 260, damping: 30, mass: 0.9,
}

/* Fire once, and early — triggering at 20% visible meant a section could be
   half on screen before it started arriving. */
export const VIEWPORT = { once: true, amount: 0.04, margin: '0px 0px -4% 0px' } as const

/* ------------------------------------------------------------- variants - */

/** Container that staggers its children. Pair with any child variant below. */
export const stagger = (step = 0.05, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
})

/** The workhorse: rise + fade. Short travel — a big slide is what makes a page
    feel unstable while you are reading it. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.reveal, ease: EASE.out } },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -18 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.reveal, ease: EASE.out } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DUR.reveal, ease: EASE.soft } },
}

export const fromLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  show: { opacity: 1, x: 0, transition: { duration: DUR.reveal, ease: EASE.out } },
}

export const fromRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  show: { opacity: 1, x: 0, transition: { duration: DUR.reveal, ease: EASE.out } },
}

/** Image / panel mask wipe — reveals upward behind a clip. */
export const clipUp: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 1 },
  show: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.85, ease: EASE.out },
  },
}

/** Image mask wipe from the left — used on ExplainerFigure. */
export const clipRight: Variants = {
  hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
  show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.9, ease: EASE.out } },
}

/** Cards: no scale — scaling a grid of cards on every scroll is busywork. */
export const popIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: DUR.reveal, ease: EASE.out } },
}

/** Single line of a split headline — the line sits in an overflow-hidden mask. */
export const lineUp: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.8, ease: EASE.out } },
}

/** Word within a split headline. */
export const wordUp: Variants = {
  hidden: { y: '108%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.75, ease: EASE.out } },
}

/** Rule / underline that draws out horizontally. */
export const drawX: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: EASE.out } },
}

/* ------------------------------------------------ interaction presets --- */
export const hoverLift = {
  whileHover: { y: -6, transition: { duration: DUR.ui, ease: EASE.out } },
  whileTap: { scale: 0.985 },
} as const

export const hoverPress = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.97 },
  transition: { duration: DUR.micro, ease: EASE.out },
} as const

/* ------------------------------------------------------ page transition - */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE.out } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.28, ease: EASE.soft } },
}

/* --------------------------------------------------------------- utils --- */
/** Collapse any variant to a pure fade — used when prefers-reduced-motion. */
export const reduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

/** Split a string into words, preserving spaces, for masked word reveals. */
export const toWords = (s: string) => s.split(/(\s+)/).filter(Boolean)
