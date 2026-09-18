/** Generates app/icon.png and app/apple-icon.png — the chevron mark on brand blue. */
import sharp from 'sharp'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#0B3D91"/>
  <g transform="translate(152,132)">
    <rect width="36" height="248" rx="6" fill="#FF7E00" transform="skewX(-14)"/>
    <rect x="78" width="36" height="248" rx="6" fill="#FFFFFF" opacity=".92" transform="skewX(-14)"/>
    <rect x="156" width="36" height="248" rx="6" fill="#FF7E00" opacity=".45" transform="skewX(-14)"/>
  </g>
</svg>`

await sharp(Buffer.from(svg)).resize(512, 512).png().toFile('app/icon.png')
await sharp(Buffer.from(svg)).resize(180, 180).png().toFile('app/apple-icon.png')
console.log('  generated  app/icon.png, app/apple-icon.png')
