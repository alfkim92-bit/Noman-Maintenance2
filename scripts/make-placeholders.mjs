/**
 * Generates every development placeholder image as an ORIGINAL schematic
 * drawing. Nothing here is traced from, or derived from, a third party's
 * photography — which is the whole point: the reference site's images are
 * licensed to them and must never reach this repo, let alone production.
 *
 *   node scripts/make-placeholders.mjs
 *
 * Output: public/assets/_placeholder/PLACEHOLDER__<slot>.png
 * These are blocked from a production build by scripts/check-placeholders.mjs.
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT = 'public/assets/_placeholder'
const W = 1600
const H = 1000

const C = {
  bg: '#EEF2F7',
  grid: '#CBD6E3',
  ink: '#17233A',
  muted: '#52647D',
  steel: '#9AAABF',
  accent: '#FF7E00',
  brand: '#0B3D91',
  white: '#FFFFFF',
}

/** SVG is XML — every injected string has to be escaped or the parse fails. */
const esc = s =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const grid = (step = 40) => `
  <defs>
    <pattern id="g" width="${step}" height="${step}" patternUnits="userSpaceOnUse">
      <path d="M ${step} 0 L 0 0 0 ${step}" fill="none" stroke="${C.grid}" stroke-width="1"/>
    </pattern>
    <pattern id="g5" width="${step * 5}" height="${step * 5}" patternUnits="userSpaceOnUse">
      <rect width="${step * 5}" height="${step * 5}" fill="url(#g)"/>
      <path d="M ${step * 5} 0 L 0 0 0 ${step * 5}" fill="none" stroke="${C.steel}" stroke-width="1.4"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  <rect width="${W}" height="${H}" fill="url(#g5)"/>`

/** The stamp that makes it unmistakable in a screenshot or a file listing. */
const stamp = (slot, note) => `
  <g>
    <rect x="40" y="${H - 132}" width="${Math.max(520, slot.length * 15 + 260)}" height="92"
          rx="8" fill="${C.ink}" opacity=".93"/>
    <text x="64" y="${H - 96}" font-family="Segoe UI, Arial, sans-serif" font-size="21"
          font-weight="700" fill="${C.accent}" letter-spacing="3">PLACEHOLDER — NOT FOR PRODUCTION</text>
    <text x="64" y="${H - 64}" font-family="Consolas, monospace" font-size="19"
          fill="${C.white}">${esc(slot)}</text>
  </g>
  ${note ? `<text x="40" y="64" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700" fill="${C.muted}">${esc(note)}</text>` : ''}`

const svg = (inner, slot, note) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    ${grid()}${inner}${stamp(slot, note)}
  </svg>`

/* ---------------------------------------------------------------- scenes - */

/** Facade frame scaffold — geometry matches the hotspot coordinates. */
const frameScaffold = `
  <rect x="820" y="90" width="700" height="800" fill="${C.steel}" opacity=".30"/>
  <rect x="860" y="150" width="120" height="150" fill="${C.white}" opacity=".55"/>
  <rect x="1040" y="150" width="120" height="150" fill="${C.white}" opacity=".55"/>
  <rect x="860" y="380" width="120" height="150" fill="${C.white}" opacity=".55"/>
  <rect x="1040" y="380" width="120" height="150" fill="${C.white}" opacity=".55"/>
  <g stroke="${C.brand}" stroke-width="9" fill="none" stroke-linecap="square">
    <line x1="280" y1="180" x2="280" y2="880"/>
    <line x1="560" y1="180" x2="560" y2="880"/>
    <line x1="840" y1="180" x2="840" y2="880"/>
    <line x1="280" y1="180" x2="840" y2="180"/>
    <line x1="280" y1="400" x2="840" y2="400"/>
    <line x1="280" y1="620" x2="840" y2="620"/>
    <line x1="280" y1="860" x2="840" y2="860"/>
  </g>
  <g stroke="${C.accent}" stroke-width="7" fill="none">
    <line x1="280" y1="620" x2="560" y2="400"/>
    <line x1="560" y1="860" x2="840" y2="620"/>
  </g>
  <g fill="${C.brand}" opacity=".82">
    <rect x="286" y="386" width="548" height="18"/>
    <rect x="286" y="606" width="548" height="18"/>
  </g>
  <g stroke="${C.ink}" stroke-width="6">
    <line x1="280" y1="300" x2="840" y2="300"/>
    <line x1="280" y1="330" x2="840" y2="330"/>
  </g>
  <g stroke="${C.ink}" stroke-width="7">
    <line x1="840" y1="330" x2="1000" y2="330"/>
    <circle cx="1010" cy="330" r="16" fill="${C.accent}" stroke="none"/>
  </g>
  <g fill="${C.ink}">
    <rect x="250" y="880" width="60" height="26"/>
    <rect x="530" y="880" width="60" height="26"/>
    <rect x="810" y="880" width="60" height="26"/>
  </g>`

/** Suspended deck under a bridge soffit. */
const suspendedScaffold = `
  <rect x="80" y="100" width="1440" height="90" fill="${C.steel}" opacity=".55"/>
  <rect x="80" y="190" width="1440" height="26" fill="${C.ink}" opacity=".35"/>
  <g stroke="${C.ink}" stroke-width="10">
    <line x1="480" y1="216" x2="480" y2="620"/>
    <line x1="1120" y1="216" x2="1120" y2="620"/>
  </g>
  <g fill="${C.accent}">
    <rect x="452" y="150" width="56" height="56" rx="6"/>
    <rect x="1092" y="150" width="56" height="56" rx="6"/>
  </g>
  <g stroke="${C.brand}" stroke-width="12" fill="none">
    <line x1="420" y1="620" x2="1180" y2="620"/>
  </g>
  <g stroke="${C.brand}" stroke-width="7">
    <line x1="560" y1="620" x2="560" y2="700"/>
    <line x1="720" y1="620" x2="720" y2="700"/>
    <line x1="880" y1="620" x2="880" y2="700"/>
    <line x1="1040" y1="620" x2="1040" y2="700"/>
  </g>
  <rect x="420" y="700" width="760" height="26" fill="${C.brand}" opacity=".85"/>
  <g stroke="${C.accent}" stroke-width="8" fill="none">
    <line x1="420" y1="700" x2="420" y2="560"/>
    <line x1="1180" y1="700" x2="1180" y2="560"/>
    <line x1="420" y1="560" x2="1180" y2="560"/>
    <line x1="420" y1="630" x2="1180" y2="630"/>
  </g>
  <g stroke="${C.steel}" stroke-width="4" stroke-dasharray="14 12">
    <line x1="120" y1="860" x2="1480" y2="860"/>
  </g>`

/** Left-to-right treatment train. */
const waterTreatment = `
  <g stroke="${C.brand}" stroke-width="10" fill="none">
    <line x1="120" y1="500" x2="1480" y2="500"/>
  </g>
  ${[
    [160, 'IN'],
    [432, 'DOSE'],
    [688, 'MBR'],
    [960, 'UF'],
    [1216, 'RO'],
    [1456, 'OUT'],
  ]
    .map(
      ([x], i) => `
    <rect x="${x - 78}" y="${i % 2 ? 300 : 420}" width="156" height="180" rx="10"
          fill="${C.white}" stroke="${C.brand}" stroke-width="6"/>
    <rect x="${x - 78}" y="${i % 2 ? 300 : 420}" width="156" height="40" rx="10" fill="${C.brand}" opacity=".12"/>
    <line x1="${x}" y1="${i % 2 ? 480 : 420}" x2="${x}" y2="500" stroke="${C.brand}" stroke-width="8"/>`
    )
    .join('')}
  <g fill="${C.accent}">
    ${[300, 560, 820, 1080, 1340].map(x => `<circle cx="${x}" cy="500" r="13"/>`).join('')}
  </g>`

/** Switchgear / control panel elevation. */
const eiPanel = `
  <g>
    <rect x="130" y="240" width="300" height="520" rx="8" fill="${C.white}" stroke="${C.ink}" stroke-width="7"/>
    <rect x="470" y="300" width="240" height="460" rx="8" fill="${C.white}" stroke="${C.ink}" stroke-width="7"/>
    <rect x="750" y="240" width="300" height="520" rx="8" fill="${C.white}" stroke="${C.ink}" stroke-width="7"/>
    <rect x="1090" y="300" width="380" height="460" rx="8" fill="${C.white}" stroke="${C.ink}" stroke-width="7"/>
  </g>
  <g fill="${C.brand}" opacity=".18">
    <rect x="150" y="260" width="260" height="90"/>
    <rect x="770" y="260" width="260" height="90"/>
    <rect x="1110" y="320" width="340" height="90"/>
  </g>
  <g stroke="${C.accent}" stroke-width="8">
    <line x1="430" y1="420" x2="470" y2="420"/>
    <line x1="710" y1="480" x2="750" y2="480"/>
    <line x1="1050" y1="420" x2="1090" y2="420"/>
  </g>
  <g fill="${C.steel}">
    ${Array.from({ length: 12 }, (_, i) => `<rect x="${1120 + (i % 6) * 56}" y="${470 + Math.floor(i / 6) * 70}" width="40" height="46" rx="4"/>`).join('')}
  </g>
  <g stroke="${C.ink}" stroke-width="5" stroke-dasharray="12 10">
    <line x1="280" y1="760" x2="280" y2="880"/>
    <line x1="900" y1="760" x2="900" y2="880"/>
    <line x1="1280" y1="760" x2="1280" y2="880"/>
    <line x1="200" y1="880" x2="1380" y2="880"/>
  </g>`

/** Generic subject tile — a labelled technical silhouette. */
const genericScene = (label, shape) => `
  ${shape}
  <text x="${W / 2}" y="${H / 2 + 200}" text-anchor="middle"
        font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="800"
        fill="${C.muted}" letter-spacing="2">${esc(label)}</text>`

const tank = `
  <g fill="${C.white}" stroke="${C.brand}" stroke-width="8">
    <rect x="560" y="300" width="480" height="330" rx="18"/>
  </g>
  <rect x="560" y="300" width="480" height="90" fill="${C.brand}" opacity=".14"/>
  <g stroke="${C.accent}" stroke-width="8"><line x1="470" y1="465" x2="560" y2="465"/><line x1="1040" y1="465" x2="1130" y2="465"/></g>
  <g stroke="${C.ink}" stroke-width="6"><line x1="620" y1="630" x2="620" y2="720"/><line x1="980" y1="630" x2="980" y2="720"/><line x1="540" y1="720" x2="1060" y2="720"/></g>`

const pondCover = `
  <ellipse cx="800" cy="520" rx="520" ry="230" fill="${C.brand}" opacity=".12" stroke="${C.brand}" stroke-width="8"/>
  <g fill="${C.white}" stroke="${C.brand}" stroke-width="4" opacity=".95">
    ${Array.from({ length: 5 }, (_, r) =>
      Array.from({ length: 9 }, (_, c) => {
        const x = 420 + c * 84
        const y = 400 + r * 58
        const dx = (x - 800) / 520
        const dy = (y - 520) / 230
        return dx * dx + dy * dy < 0.82 ? `<rect x="${x}" y="${y}" width="76" height="50" rx="6"/>` : ''
      }).join('')
    ).join('')}
  </g>
  <g fill="${C.accent}">${[300, 800, 1300].map(x => `<circle cx="${x}" cy="520" r="15"/>`).join('')}</g>`

const heatLoop = `
  <g fill="none" stroke="${C.brand}" stroke-width="12">
    <path d="M 340 640 L 340 380 L 720 380 L 720 640 L 1100 640 L 1100 380 L 1300 380"/>
  </g>
  <g fill="${C.white}" stroke="${C.ink}" stroke-width="7">
    <rect x="240" y="560" width="200" height="180" rx="10"/>
    <rect x="1220" y="300" width="200" height="180" rx="10"/>
  </g>
  <g fill="${C.accent}">
    <circle cx="720" cy="380" r="18"/><circle cx="720" cy="640" r="18"/><circle cx="1100" cy="500" r="18"/>
  </g>`

const trapValve = `
  <g stroke="${C.brand}" stroke-width="16" fill="none"><line x1="200" y1="500" x2="1400" y2="500"/></g>
  <g fill="${C.white}" stroke="${C.ink}" stroke-width="8">
    <path d="M 700 420 L 900 420 L 820 500 L 900 580 L 700 580 L 780 500 Z"/>
  </g>
  <g fill="${C.accent}"><circle cx="800" cy="360" r="20"/></g>
  <g stroke="${C.ink}" stroke-width="6"><line x1="800" y1="380" x2="800" y2="420"/></g>
  <g stroke="${C.steel}" stroke-width="5" stroke-dasharray="12 10">
    <line x1="300" y1="620" x2="300" y2="700"/><line x1="1300" y1="620" x2="1300" y2="700"/>
    <line x1="300" y1="700" x2="1300" y2="700"/>
  </g>`

const simulator = `
  <g fill="${C.white}" stroke="${C.ink}" stroke-width="8">
    <rect x="360" y="260" width="880" height="420" rx="14"/>
  </g>
  <rect x="392" y="292" width="816" height="60" fill="${C.brand}" opacity=".16"/>
  <g stroke="${C.accent}" stroke-width="7" fill="none">
    <polyline points="420,600 540,520 660,560 780,430 900,480 1020,390 1140,440"/>
  </g>
  <g fill="${C.steel}">
    ${Array.from({ length: 8 }, (_, i) => `<rect x="${420 + i * 100}" y="640" width="70" height="14" rx="4"/>`).join('')}
  </g>
  <rect x="600" y="700" width="400" height="30" rx="8" fill="${C.ink}" opacity=".25"/>`

const drawings = `
  <g fill="${C.white}" stroke="${C.ink}" stroke-width="7">
    <rect x="300" y="240" width="700" height="500" rx="8" transform="rotate(-4 650 490)"/>
    <rect x="420" y="300" width="700" height="500" rx="8" transform="rotate(3 770 550)"/>
  </g>
  <g stroke="${C.brand}" stroke-width="5" opacity=".7" transform="rotate(3 770 550)">
    <line x1="470" y1="380" x2="1070" y2="380"/><line x1="470" y1="440" x2="900" y2="440"/>
    <rect x="470" y="500" width="260" height="200" fill="none"/>
    <line x1="800" y1="520" x2="1070" y2="520"/><line x1="800" y1="580" x2="1070" y2="580"/>
  </g>
  <g fill="${C.accent}" transform="rotate(3 770 550)"><circle cx="600" cy="600" r="16"/><circle cx="1010" cy="660" r="16"/></g>`

const foundation = `
  <rect x="180" y="620" width="1240" height="40" fill="${C.steel}" opacity=".5"/>
  <g fill="${C.white}" stroke="${C.ink}" stroke-width="8">
    <rect x="320" y="440" width="380" height="180" rx="6"/>
    <rect x="900" y="380" width="420" height="240" rx="6"/>
  </g>
  <g stroke="${C.accent}" stroke-width="6">
    ${Array.from({ length: 7 }, (_, i) => `<line x1="${350 + i * 55}" y1="440" x2="${350 + i * 55}" y2="360"/>`).join('')}
    ${Array.from({ length: 8 }, (_, i) => `<line x1="${930 + i * 52}" y1="380" x2="${930 + i * 52}" y2="300"/>`).join('')}
    <line x1="330" y1="390" x2="690" y2="390"/>
    <line x1="910" y1="330" x2="1310" y2="330"/>
  </g>
  <g stroke="${C.brand}" stroke-width="10"><line x1="180" y1="660" x2="1420" y2="660"/></g>`

const scaffoldTile = `
  <g stroke="${C.brand}" stroke-width="10" fill="none">
    ${Array.from({ length: 5 }, (_, i) => `<line x1="${340 + i * 230}" y1="200" x2="${340 + i * 230}" y2="820"/>`).join('')}
    ${Array.from({ length: 4 }, (_, i) => `<line x1="340" y1="${200 + i * 210}" x2="1260" y2="${200 + i * 210}"/>`).join('')}
  </g>
  <g stroke="${C.accent}" stroke-width="7">
    <line x1="340" y1="620" x2="570" y2="410"/><line x1="800" y1="820" x2="1030" y2="620"/>
  </g>`

const bridgeTile = `
  <rect x="120" y="230" width="1360" height="80" fill="${C.steel}" opacity=".55"/>
  <g stroke="${C.ink}" stroke-width="10"><line x1="420" y1="310" x2="420" y2="560"/><line x1="1180" y1="310" x2="1180" y2="560"/></g>
  <rect x="380" y="560" width="840" height="24" fill="${C.brand}"/>
  <rect x="380" y="640" width="840" height="24" fill="${C.brand}" opacity=".8"/>
  <g stroke="${C.accent}" stroke-width="8" fill="none"><rect x="380" y="500" width="840" height="164"/></g>`

const overviewTile = `
  <g fill="${C.white}" stroke="${C.brand}" stroke-width="7">
    ${Array.from({ length: 6 }, (_, i) => {
      const x = 260 + (i % 3) * 400
      const y = 280 + Math.floor(i / 3) * 280
      return `<rect x="${x}" y="${y}" width="340" height="220" rx="12"/>`
    }).join('')}
  </g>
  <g fill="${C.accent}">
    ${Array.from({ length: 6 }, (_, i) => {
      const x = 260 + (i % 3) * 400
      const y = 280 + Math.floor(i / 3) * 280
      return `<rect x="${x}" y="${y}" width="340" height="10" rx="5"/>`
    }).join('')}
  </g>`

/* ------------------------------------------------------------------ run - */

const FILES = [
  ['explainer-frame-scaffold', frameScaffold, 'FACADE FRAME SCAFFOLD — SCHEMATIC'],
  ['explainer-suspended-scaffold', suspendedScaffold, 'SUSPENDED DECK — SCHEMATIC'],
  ['explainer-water-treatment', waterTreatment, 'TREATMENT TRAIN — SCHEMATIC'],
  ['explainer-ei-panel', eiPanel, 'SWITCHGEAR & CONTROL — SCHEMATIC'],
  ['services-engineering', genericScene('ENGINEERING & DESIGN', drawings), null],
  ['services-civil', genericScene('CIVIL & INFRASTRUCTURE', foundation), null],
  ['solutions-construction-scaffolds', genericScene('CONSTRUCTION SCAFFOLDS', scaffoldTile), null],
  ['solutions-suspended-scaffolds', genericScene('SUSPENDED SCAFFOLDS', bridgeTile), null],
  ['solutions-water-treatment', genericScene('WATER TREATMENT', tank), null],
  ['solutions-floating-cover', genericScene('MODULAR FLOATING COVER', pondCover), null],
  ['solutions-heat-transfer', genericScene('PROCESS HEAT TRANSFER', heatLoop), null],
  ['solutions-steam-traps', genericScene('VENTURI STEAM TRAPS', trapValve), null],
  ['solutions-simulation', genericScene('ENGINEERING SIMULATION', simulator), null],
  ['solutions-overview', genericScene('SOLUTIONS OVERVIEW', overviewTile), null],
]

mkdirSync(OUT, { recursive: true })

for (const [slot, scene, note] of FILES) {
  const name = `PLACEHOLDER__${slot}.png`
  const markup = svg(scene, `/assets/_placeholder/${name}`, note)
  await sharp(Buffer.from(markup)).png({ quality: 90 }).toFile(join(OUT, name))
  console.log(`  generated  ${name}`)
}

/* A real (non-placeholder) brand graphic for the certificates card. */
mkdirSync('public/assets/brand', { recursive: true })
const certCard = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
  <rect width="1600" height="1000" fill="${C.brand}"/>
  <g stroke="${C.white}" stroke-width="1" opacity=".16">
    ${Array.from({ length: 50 }, (_, i) => `<line x1="${i * 32}" y1="0" x2="${i * 32}" y2="1000"/>`).join('')}
    ${Array.from({ length: 32 }, (_, i) => `<line x1="0" y1="${i * 32}" x2="1600" y2="${i * 32}"/>`).join('')}
  </g>
  <rect x="500" y="230" width="600" height="540" rx="16" fill="${C.white}"/>
  <rect x="560" y="300" width="360" height="22" rx="6" fill="${C.brand}" opacity=".85"/>
  <rect x="560" y="356" width="480" height="14" rx="6" fill="${C.steel}"/>
  <rect x="560" y="392" width="420" height="14" rx="6" fill="${C.steel}"/>
  <rect x="560" y="428" width="450" height="14" rx="6" fill="${C.steel}"/>
  <g transform="translate(560,520)">
    <rect width="12" height="56" rx="2" fill="${C.accent}" transform="skewX(-18)"/>
    <rect x="22" width="12" height="56" rx="2" fill="${C.accent}" opacity=".45" transform="skewX(-18)"/>
    <rect x="44" width="12" height="56" rx="2" fill="${C.accent}" opacity=".18" transform="skewX(-18)"/>
  </g>
  <circle cx="960" cy="620" r="74" fill="none" stroke="${C.accent}" stroke-width="10"/>
  <path d="M 925 620 L 950 648 L 998 594" fill="none" stroke="${C.accent}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
await sharp(Buffer.from(certCard)).png().toFile('public/assets/brand/certificate-card.png')
console.log('  generated  brand/certificate-card.png')

writeFileSync(
  join(OUT, 'README.txt'),
  'Every PNG in this folder is an original schematic generated by\n' +
    'scripts/make-placeholders.mjs. They are development stand-ins only.\n' +
    'scripts/check-placeholders.mjs fails a production build while any remain.\n'
)
console.log('\nDone. Replace these with licensed photography before production.')
