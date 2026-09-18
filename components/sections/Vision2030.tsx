import Image from 'next/image'
import { Parallax, Reveal } from '@/components/motion'
import { fadeUp } from '@/lib/motion'
import { VISION_2030 } from '@/content/site'

/** The one dark band allowed on a light page (design system §1). */
export default function Vision2030() {
  return (
    <section className="relative overflow-hidden bg-[var(--blue-950)] py-[clamp(3.5rem,6vw,6rem)] text-white">
      <div className="container-x grid items-center gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[1.1fr_1fr]">
        <Reveal variant={fadeUp}>
          <p className="eyebrow !text-[var(--orange-300)]">Vision 2030</p>
          <h2 className="mt-4 text-[length:var(--fs-h2)] font-extrabold text-white">
            Commitment to the Kingdom&rsquo;s future
          </h2>
          <p className="lead mt-5 !text-white/80">{VISION_2030.en}</p>
          <p
            lang="ar"
            dir="rtl"
            className="font-arabic mt-6 text-[1.35rem] leading-relaxed text-[var(--orange-200)]"
          >
            {VISION_2030.ar}
          </p>
        </Reveal>

        <Parallax strength={60} className="relative">
          <div className="relative mx-auto aspect-[16/10] w-full max-w-[520px]">
            <Image
              src="/assets/brand/world-map.webp"
              alt=""
              fill
              sizes="(max-width: 1024px) 90vw, 520px"
              className="object-contain opacity-80 [filter:brightness(0)_invert(1)]"
            />
          </div>
        </Parallax>
      </div>
    </section>
  )
}
