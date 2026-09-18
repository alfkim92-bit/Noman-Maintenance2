'use client'

import Image from 'next/image'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const LOGOS = [1, 2, 3, 4, 5].map(n => `/assets/clients/client-${n}.svg`)

/**
 * Client logo row. Static grid on desktop; a slow GSAP marquee on narrow
 * screens where five logos will not fit. The marquee is killed entirely under
 * prefers-reduced-motion (motion spec §3).
 */
export default function ClientLogos() {
  const track = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          isNarrow: '(max-width: 767px)',
          noPref: '(prefers-reduced-motion: no-preference)',
        },
        c => {
          const { isNarrow, noPref } = c.conditions as Record<string, boolean>
          if (!isNarrow || !noPref || !track.current) return

          const tween = gsap.to(track.current, {
            xPercent: -50,
            duration: 28,
            ease: 'none',
            repeat: -1,
          })
          const el = track.current
          const pause = () => tween.pause()
          const play = () => tween.play()
          el.addEventListener('pointerenter', pause)
          el.addEventListener('pointerleave', play)
          return () => {
            el.removeEventListener('pointerenter', pause)
            el.removeEventListener('pointerleave', play)
          }
        }
      )
    }, track)
    return () => ctx.revert()
  }, [])

  return (
    <section className="border-y border-[var(--border)] bg-[var(--bg-subtle)] py-12">
      <div className="container-x">
        <h2 className="text-center text-[.7rem] font-bold uppercase tracking-[.18em] text-[var(--ink-subtle)]">
          Our clients
        </h2>

        <div className="mt-8 overflow-hidden">
          <div
            ref={track}
            className="flex w-max items-center gap-12 md:w-full md:justify-center md:gap-[clamp(2rem,5vw,4rem)]"
          >
            {/* duplicated once so the marquee can loop seamlessly on mobile */}
            {[...LOGOS, ...LOGOS].map((src, i) => (
              <span
                key={`${src}-${i}`}
                className={`relative h-10 w-[120px] flex-none opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 ${
                  i >= LOGOS.length ? 'md:hidden' : ''
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
