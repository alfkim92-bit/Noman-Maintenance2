import Image from 'next/image'
import Link from 'next/link'
import { SITE } from '@/content/site'

/**
 * The single brand lockup, rendered identically in the navbar, the mobile
 * sheet and the footer. This component is the structural fix for the old
 * site's "Arabic only renders correctly on the home page" bug: the Arabic
 * string exists in exactly one place (content/site.ts), is always wrapped with
 * lang/dir, and always uses the Arabic webfont.
 */
export default function Brand({
  size = 'md',
  invert = false,
  showCr = true,
}: {
  size?: 'sm' | 'md'
  invert?: boolean
  showCr?: boolean
}) {
  const small = size === 'sm'

  return (
    <Link
      href="/"
      className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
      aria-label={`${SITE.name} — home`}
    >
      <span
        className={`relative flex-none overflow-hidden rounded-[var(--r-sm)] bg-white ${
          small ? 'h-9 w-[54px]' : 'h-9 w-[54px] sm:h-11 sm:w-[66px]'
        }`}
      >
        <Image
          src="/assets/brand/logo.jpeg"
          alt=""
          fill
          sizes="80px"
          className="object-contain"
          priority
        />
      </span>

      <span className="flex min-w-0 flex-col leading-tight">
        <span
          className={`truncate font-[family-name:var(--font-display)] font-bold ${
            small ? 'text-[13px]' : 'text-[13px] sm:text-[15px]'
          } ${invert ? 'text-white' : 'text-[var(--brand)]'}`}
        >
          {SITE.shortName}
        </span>

        <span
          lang="ar"
          dir="rtl"
          className={`font-arabic truncate text-[11px] sm:text-[13px] ${
            invert ? 'text-white/70' : 'text-[var(--ink-muted)]'
          }`}
        >
          {SITE.nameAr}
        </span>

        {showCr && (
          <span
            className={`mt-1 hidden w-fit rounded-[var(--r-sm)] px-1.5 py-0.5 text-[11px] font-medium tabular-nums sm:inline-flex ${
              invert
                ? 'bg-white/10 text-white/70'
                : 'bg-[var(--bg-inset)] text-[var(--ink-subtle)]'
            }`}
          >
            CR {SITE.cr}
          </span>
        )}
      </span>
    </Link>
  )
}
