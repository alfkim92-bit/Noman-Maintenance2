import sharp from 'sharp';
import path from 'path';

const inputPath = 'C:/Users/alfki/OneDrive/Desktop/soc/website/assets/logo.jpeg';
const outputPath = 'C:/Users/alfki/OneDrive/Desktop/soc/website/public/logo.png';

console.log('Processing:', inputPath);

const image = sharp(inputPath);
const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const pixels = new Uint8Array(data);

for (let i = 0; i < pixels.length; i += channels) {
  const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
  if (r > 230 && g > 230 && b > 230) {
    pixels[i + 3] = 0;
  }
}

await sharp(Buffer.from(pixels), { raw: { width, height, channels } })
  .png()
  .toFile(outputPath);

console.log('Done! logo.png saved with transparent background.');
