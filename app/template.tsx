'use client'
// ============================================================================
// app/template.tsx
// Next.js App Router re-mounts template.tsx on every navigation, which makes
// it the right place for enter transitions. Keep it cheap — this runs before
// every page paints.
//
// Optional upgrade: pair with the native View Transitions API for cross-page
// shared-element morphs (hero image → page hero). Guard it behind a
// `document.startViewTransition` feature check.
// ============================================================================

import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/motion'

export default function Template({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: prefersReduced ? 0.15 : 0.45, ease: EASE.out }}
    >
      {children}
    </motion.div>
  )
}
