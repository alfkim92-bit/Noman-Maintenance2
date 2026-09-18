# Noman Maintenance Services — website

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Framer Motion · GSAP ScrollTrigger · Lenis

Rebuild of the company site for **Noman Maintenance Services Company**
(CR 7032690815), replacing the previous 16-page hand-written static site.

---

## Running it

```bash
npm install
npm run dev
```

http://localhost:3000

| Script | What it does |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | production build (runs the placeholder check first) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run placeholders` | regenerate the development placeholder images |
| `npm run check:links` | crawl every route: dead links, forbidden strings, h1 count, metadata |
| `node scripts/check-redirects.mjs` | assert every legacy URL redirects correctly |

The two check scripts need a server running (`npm run dev` in another terminal).

---

## How the content works

**All copy lives in typed data files under `content/` — not in JSX.**

| File | Holds |
|---|---|
| `content/site.ts` | company facts, contact details, Arabic name, stats, Vision 2030 copy |
| `content/services.ts` | the 4 service pages + the service overview |
| `content/solutions.ts` | the 7 solution pages + the solutions overview |
| `content/projects.ts` | the 3 published projects |
| `content/links.ts` | the route registry — nav, footer, cross-links and sitemap all derive from it |

This is what keeps the nav, footer, cards, cross-links and sitemap in sync, and
it is why the old *"the Arabic company name only renders correctly on the home
page"* bug cannot come back: the Arabic string exists **once**, in
`content/site.ts`, and is always rendered through `components/layout/Brand.tsx`
with `lang="ar" dir="rtl"` and the Arabic webfont.

`content/links.ts` exports `resolveLink()`, which **throws at build time** if a
page links to a route that does not exist. That is why there is no `href="#"`
anywhere.

### Encoding

Every file is UTF-8 without BOM, enforced by `.editorconfig` and
`.gitattributes`. This is the permanent fix for the mojibake (`╪┤╪▒┘â╪⌐`,
`Ø´Ø±ÙƒØ©`, `Â©`) that the old `fix_encoding.py` only ever patched one variant of.

---

## Motion

| Library | Owns |
|---|---|
| **Framer Motion** | element-level: scroll reveals, staggered grids, headline splits, hover states, page transitions, hero parallax, counters |
| **GSAP ScrollTrigger** | the one pinned set-piece — the horizontal "How we deliver" rail — plus the mobile logo marquee |
| **Lenis** | smooth scrolling, wired into ScrollTrigger |

Only **ScrollTrigger** is used from GSAP. `SplitText` and `ScrollSmoother` are
paid Club GreenSock plugins and are deliberately not imported — this project
ships its own word splitter in `components/motion`.

### Reduced motion

`prefers-reduced-motion: reduce` is implemented, not just mentioned:

- `SmoothScroll` returns early — no Lenis, native scrolling
- `HowWeDeliver` never pins; the rail renders as a vertical stack
- every `Reveal` / `RevealGroup` variant collapses to a 150 ms opacity fade
- `SplitText` renders plain text, `CountUp` renders its final value immediately
- `Parallax`, `MagneticButton` and the marquee disable
- a CSS block at the end of `globals.css` catches anything JS misses

Test it: DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`, then
walk the site. Nothing should jump and nothing should be stuck invisible.

**Without JavaScript**, a `<noscript>` rule in `app/layout.tsx` forces every
reveal visible, and `CountUp` server-renders its real value — so the stats read
"90M+", never "0M+".

---

## Deployment

Vercel, from this repo. Next.js handles routing, so the old `vercel.json`
(`cleanUrls`) has been deleted — its job is now done by the redirect table in
`next.config.ts`, which maps every legacy `.html` URL to its new route.

Required environment variables for the contact form:

```
RESEND_API_KEY=…      # from resend.com — never commit
CONTACT_TO=info@nomanksa.com
CONTACT_FROM=Noman Website <website@nomanksa.com>
```

Without `RESEND_API_KEY` the form returns an honest error asking the visitor to
call or email. It never fakes success.

---

## Before production

- [ ] [`TODO-CLIENT.md`](TODO-CLIENT.md) — address, working hours, certificates, project details, claims to verify, **and the exposed GitHub token to rotate**
- [ ] [`PLACEHOLDERS.md`](PLACEHOLDERS.md) — 14 development images to replace. `npm run build` fails on Vercel production while any remain.

## Legacy files

The previous static site (`*.html`, `css/`, `js/`, `assets/`,
`fix_encoding.*`, `update.js`, `old_index.html`) is still in the working tree on
this branch so it can be compared against the rebuild. Delete it in one commit
once the new site is signed off.
