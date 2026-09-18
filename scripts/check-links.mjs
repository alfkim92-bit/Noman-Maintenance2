/**
 * Acceptance crawler. Fetches every route from a running server and asserts
 * the things the brief actually cares about, against RENDERED HTML rather than
 * source (so comments and identifiers can't produce false positives).
 *
 *   npm run dev            # in another terminal
 *   node scripts/check-links.mjs [baseUrl]
 */

const BASE = process.argv[2] ?? 'http://localhost:3000'

const ROUTES = [
  '/',
  '/services',
  '/services/engineering-design',
  '/services/construction-infrastructure',
  '/services/mechanical-works',
  '/services/electrical-instrumentation',
  '/solutions',
  '/solutions/construction-scaffolds',
  '/solutions/suspended-scaffolds',
  '/solutions/industrial-water-treatment',
  '/solutions/modular-floating-cover',
  '/solutions/process-heat-transfer',
  '/solutions/venturi-steam-traps',
  '/solutions/engineering-simulation',
  '/projects',
  '/certificates',
  '/about',
  '/contact',
]

/** Strings that must never appear in rendered output. */
const FORBIDDEN = [
  { re: /harisco/i, why: "another company's name/address" },
  { re: /nomanmaintenance\.com/i, why: 'old email domain' },
  { re: /535\s?484852/, why: 'old phone number' },
  { re: /\+966 XX/i, why: 'placeholder phone number' },
  { re: /FRAMESCAFF|SUPER 65|SUPER 100|RINGSCAFF/, why: 'Scafom-rux trademark' },
  { re: /Stronger\. Together/i, why: 'Scafom-rux slogan' },
  { re: /Â©|Ã˜|â•ª|Ø´Ø±ÙƒØ©/, why: 'mojibake' },
  { re: /Content Placeholder/i, why: 'old placeholder box' },
  { re: /up to 100\s?m\b|100 metres/i, why: 'unverified height claim' },
  { re: /50% faster/i, why: 'unverified speed claim' },
  { re: /lorem ipsum/i, why: 'filler copy' },
]

/** Contact details that MUST be present wherever contact info is shown. */
const REQUIRED_GLOBAL = [
  { re: /info@nomanksa\.com/, what: 'new email' },
  { re: /059 106 3827/, what: 'new phone' },
  { re: /7032690815/, what: 'CR number' },
  { re: /شركة نومان مينتينانس سيرفيسز/, what: 'Arabic company name' },
]

let failures = 0
const fail = (route, msg) => {
  failures++
  console.error(`  ✖ ${route}  ${msg}`)
}

const internalLinks = new Set()

for (const route of ROUTES) {
  const url = `${BASE}${route}`
  let res
  try {
    res = await fetch(url)
  } catch (err) {
    fail(route, `could not fetch — is the server running? (${err.message})`)
    continue
  }

  if (!res.ok) {
    fail(route, `HTTP ${res.status}`)
    continue
  }

  const html = await res.text()

  for (const { re, why } of FORBIDDEN) {
    if (re.test(html)) fail(route, `contains ${why} (/${re.source}/)`)
  }

  for (const { re, what } of REQUIRED_GLOBAL) {
    if (!re.test(html)) fail(route, `missing ${what}`)
  }

  // exactly one <h1>
  const h1s = html.match(/<h1[\s>]/g)?.length ?? 0
  if (h1s !== 1) fail(route, `expected exactly 1 <h1>, found ${h1s}`)

  // no dead anchors
  const hashHrefs = html.match(/href="#"/g)?.length ?? 0
  if (hashHrefs) fail(route, `${hashHrefs} × href="#"`)

  // title + description
  if (!/<title>/.test(html)) fail(route, 'no <title>')
  if (!/name="description"/.test(html)) fail(route, 'no meta description')

  // collect internal links for the resolve check
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    internalLinks.add(m[1].replace(/\/$/, '') || '/')
  }
}

/* Every internal link must point at a route that exists. */
const known = new Set(ROUTES)
const ignorable = /^\/(assets|_next|api|sitemap|robots|icon|apple-icon|opengraph-image)/
for (const link of [...internalLinks].sort()) {
  if (known.has(link) || ignorable.test(link)) continue
  fail('(link graph)', `links to "${link}" which is not a known route`)
}

console.log(
  failures === 0
    ? `\n✓ check-links: ${ROUTES.length} routes, ${internalLinks.size} internal links — all clean.\n`
    : `\n✖ check-links: ${failures} problem(s).\n`
)
process.exit(failures ? 1 : 0)
