import { Reveal } from '@/components/motion'
import { fadeUp } from '@/lib/motion'

/** Standard content width. */
export function Container({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`container-x ${className}`}>{children}</div>
}

/** Full-bleed band with the standard vertical rhythm. */
export function Section({
  children,
  className = '',
  tone = 'default',
  id,
}: {
  children: React.ReactNode
  className?: string
  tone?: 'default' | 'subtle' | 'inset' | 'invert'
  id?: string
}) {
  const tones = {
    default: 'bg-[var(--bg)]',
    subtle: 'bg-[var(--bg-subtle)]',
    inset: 'bg-[var(--bg-inset)]',
    invert: 'bg-[var(--bg-invert)] text-[var(--ink-invert)]',
  }
  return (
    <section id={id} className={`section-y ${tones[tone]} ${className}`}>
      {children}
    </section>
  )
}

/**
 * The drawing-callout section header from the design system:
 * spec line + eyebrow, H2, lead.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'left',
  invert = false,
  as: Tag = 'h2',
}: {
  eyebrow?: string
  title: string
  lead?: string
  align?: 'left' | 'center'
  invert?: boolean
  as?: 'h1' | 'h2'
}) {
  return (
    <Reveal variant={fadeUp} className={align === 'center' ? 'text-center' : ''}>
      {eyebrow && (
        <p
          className={`spec-line ${align === 'center' ? 'justify-center' : ''}`}
        >
          <span
            className={`eyebrow ml-3 ${invert ? '!text-[var(--orange-300)]' : ''}`}
          >
            {eyebrow}
          </span>
        </p>
      )}
      <Tag
        className={`mt-4 text-[length:var(--fs-h2)] font-extrabold ${
          invert ? 'text-white' : ''
        }`}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className={`lead mt-4 ${align === 'center' ? 'mx-auto' : ''} ${
            invert ? '!text-white/75' : ''
          }`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  )
}
