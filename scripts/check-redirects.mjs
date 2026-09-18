/**
 * Asserts every legacy URL from the old static site issues a permanent
 * redirect to its new route, and that an unknown path still 404s.
 *
 *   node scripts/check-redirects.mjs [baseUrl]
 */

const BASE = process.argv[2] ?? 'http://localhost:3000'

const EXPECT = {
  '/epc-lstk': '/services',
  '/epc-lstk.html': '/services',
  '/acoustic-pyrometers': '/solutions',
  '/acoustic-pyrometers.html': '/solutions',
  '/about-us': '/about',
  '/about-us.html': '/about',
  '/index.html': '/',
  '/contact.html': '/contact',
  '/projects.html': '/projects',
  '/certificates.html': '/certificates',
  '/engineering-design': '/services/engineering-design',
  '/construction-infrastructure': '/services/construction-infrastructure',
  '/mechanical-works': '/services/mechanical-works',
  '/electrical-instrumentation': '/services/electrical-instrumentation',
  '/engineering-simulation': '/solutions/engineering-simulation',
  '/industrial-water-treatment': '/solutions/industrial-water-treatment',
  '/modular-floating-cover': '/solutions/modular-floating-cover',
  '/modular-floating-cover.html': '/solutions/modular-floating-cover',
  '/process-heat-transfer': '/solutions/process-heat-transfer',
  '/venturi-steam-traps': '/solutions/venturi-steam-traps',
  '/old_index.html': '/',
}

let bad = 0

for (const [from, to] of Object.entries(EXPECT)) {
  const res = await fetch(BASE + from, { redirect: 'manual' })
  const loc = res.headers.get('location') ?? ''
  const dest = loc.replace(BASE, '') || loc
  const ok = (res.status === 308 || res.status === 301) && dest === to
  if (!ok) bad++
  console.log(
    `${ok ? 'pass' : 'FAIL'}  ${from.padEnd(34)} ${res.status} -> ${dest || '(none)'}`
  )
}

const missing = await fetch(`${BASE}/definitely-not-a-page`, { redirect: 'manual' })
const ok404 = missing.status === 404
if (!ok404) bad++
console.log(`${ok404 ? 'pass' : 'FAIL'}  ${'/definitely-not-a-page'.padEnd(34)} ${missing.status} (expected 404)`)

console.log(bad ? `\n✖ ${bad} redirect problem(s)\n` : '\n✓ all legacy redirects OK\n')
process.exit(bad ? 1 : 0)
