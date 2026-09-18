/**
 * Production safety net. Runs as "prebuild".
 *
 * Development placeholders live in public/assets/_placeholder/. While any
 * remain, a PRODUCTION build fails loudly. Preview and local builds pass with
 * a warning, so the client can still review the site with stand-ins in place.
 *
 * Override for a deliberate placeholder preview on production:
 *   ALLOW_PLACEHOLDERS=1 npm run build
 */

import { existsSync, readdirSync } from 'node:fs'

const DIR = 'public/assets/_placeholder'

const files = existsSync(DIR)
  ? readdirSync(DIR).filter(f => f.startsWith('PLACEHOLDER__'))
  : []

if (files.length === 0) {
  console.log('✓ check-placeholders: no placeholder images remain.')
  process.exit(0)
}

const isProd = process.env.VERCEL_ENV === 'production'
const allowed = process.env.ALLOW_PLACEHOLDERS === '1'

const list = files.map(f => `   ${f}`).join('\n')

if (isProd && !allowed) {
  console.error(
    `\n✖ check-placeholders: ${files.length} placeholder image(s) still present:\n${list}\n\n` +
      `Replace them with licensed imagery before deploying to production.\n` +
      `See PLACEHOLDERS.md. To ship anyway (not recommended): ALLOW_PLACEHOLDERS=1\n`
  )
  process.exit(1)
}

console.warn(
  `\n⚠ check-placeholders: ${files.length} development placeholder(s) in this build:\n${list}\n` +
    `  Fine for preview. A production deploy will fail until these are replaced.\n`
)
