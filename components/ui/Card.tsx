import Image from 'next/image'
import Link from 'next/link'

/**
 * The one card. Everything else (service, solution, project, next-up) is this
 * with different props, so hover, radius, border and image behaviour stay
 * identical across the site.
 */
export default function Card({
  href,
  title,
  blurb,
  image,
  imageAlt = '',
  kicker,
  index,
  cta = 'Discover',
  priority = false,
}: {
  href: string
  title: string
  blurb?: string
  image?: string
  imageAlt?: string
  kicker?: string
  index?: string
  cta?: string
  priority?: boolean
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-[var(--r-lg)] border border-[var(--border)] bg-[var(--surface)] shadow-[var(--sh-sm)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--border-strong)] hover:shadow-[var(--sh-lg)]"
    >
      {image && (
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-inset)]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
          />
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--blue-950)]/20 to-transparent"
          />
        </div>
      )}

      <div className="relative flex flex-1 flex-col p-6">
        {index && (
          <span
            aria-hidden
            className="pointer-events-none absolute right-4 top-3 font-[family-name:var(--font-display)] text-[3.5rem] font-extrabold leading-none text-[var(--steel-200)] transition-colors duration-300 group-hover:text-[var(--orange-200)]"
          >
            {index}
          </span>
        )}

        {kicker && (
          <span className="text-[.7rem] font-bold uppercase tracking-[.18em] text-[var(--ink-subtle)]">
            {kicker}
          </span>
        )}

        <h3 className="mt-2 max-w-[22ch] text-[length:var(--fs-h3)] font-bold">
          {title}
        </h3>

        {blurb && (
          <p className="mt-2 flex-1 text-sm text-[var(--ink-muted)]">{blurb}</p>
        )}

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
          {cta}
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  )
}
