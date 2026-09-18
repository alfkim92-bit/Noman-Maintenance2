import Link from 'next/link'
import { NextUpGrid } from '@/components/CheckThis'
import { resolveLinks } from '@/content/links'

export default function NotFound() {
  return (
    <>
      <section className="blueprint bg-[var(--bg-subtle)] pb-[clamp(3rem,6vw,5rem)] pt-[clamp(9rem,14vw,12rem)]">
        <div className="container-x">
          <span aria-hidden className="chevron-rule">
            <i />
            <i />
            <i />
          </span>
          <p className="stat-num mt-6 text-[clamp(3rem,10vw,6rem)] leading-none">
            404
          </p>
          <h1 className="mt-4 text-[length:var(--fs-h2)] font-extrabold">
            That page isn&rsquo;t here
          </h1>
          <p className="lead mt-4">
            The link may be out of date. Everything below is a good place to
            pick the thread back up.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-primary">
              Back to home
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Talk to our team
            </Link>
          </div>
        </div>
      </section>

      <NextUpGrid
        heading="Try one of these"
        items={resolveLinks(['/services', '/solutions', '/projects']).map(l => ({
          href: l.href,
          title: l.title,
          blurb: l.blurb,
          kicker: l.kicker,
          image: l.image,
        }))}
      />
    </>
  )
}
