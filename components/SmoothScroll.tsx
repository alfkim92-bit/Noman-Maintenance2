'use client'
// ============================================================================
// components/SmoothScroll.tsx
//
// Deliberately NOT smooth-scrolling any more.
//
// This originally wired Lenis into GSAP ScrollTrigger. In practice the
// interpolated scroll felt laggy and detached from the wheel/trackpad — the
// "glitchy" feel the client reported — and it is a common accessibility
// complaint besides. Native scrolling is instant, matches the OS, never fights
// the compositor, and cannot desync from ScrollTrigger.
//
// What remains is the part that was actually load-bearing: recalculating
// ScrollTrigger once webfonts have settled, and after each route change.
// ============================================================================

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  useEffect(() => {
    // Pin offsets computed against fallback-font layout land wrong once the
    // real fonts swap in.
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  useEffect(() => {
    // New route, new element heights.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return <>{children}</>
}
