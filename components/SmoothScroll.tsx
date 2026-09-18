'use client'
// ============================================================================
// components/SmoothScroll.tsx
// Lenis smooth scrolling, correctly married to GSAP ScrollTrigger.
//
//   npm i lenis gsap
//
// NOTE ON GSAP LICENSING: ScrollTrigger is free. SplitText and ScrollSmoother
// are Club GreenSock (paid) — do NOT import them. This project uses its own
// word splitter (components/motion → SplitText) and Lenis instead.
//
// Mount once, inside app/layout.tsx, wrapping {children}.
// ============================================================================

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisSingleton: Lenis | null = null
export const getLenis = () => lenisSingleton

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return   // native scrolling, no smoothing, no pins

    const lenis = new Lenis({
      duration: 1.05,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      syncTouch: false,          // keep native momentum on iOS — smoother there
      touchMultiplier: 1.6,
    })
    lenisSingleton = lenis

    // Drive ScrollTrigger from Lenis, and Lenis from GSAP's ticker.
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Recalculate after webfonts settle, otherwise pins land at wrong offsets.
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisSingleton = null
    }
  }, [])

  // On route change: jump to top and re-measure every trigger.
  useEffect(() => {
    lenisSingleton?.scrollTo(0, { immediate: true })
    ScrollTrigger.getAll().forEach(t => t.kill())
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [pathname])

  return <>{children}</>
}
