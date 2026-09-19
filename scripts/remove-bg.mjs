import sharp from 'sharp';

const inputPath = 'C:/Users/alfki/.gemini/antigravity-ide/brain/ad5c1554-5d8e-4663-b87d-99479f1d4811/.user_uploaded/media_1789799047605.png';
const outputPath = 'C:/Users/alfki/OneDrive/Desktop/soc/website/public/logo.png';

console.log('Processing uploaded logo...');

const { data, info } = await sharp(inputPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const pixels = new Uint8Array(data);

// Remove white/near-white background pixels
for (let i = 0; i < pixels.length; i += channels) {
  const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
  if (r > 230 && g > 230 && b > 230) {
    pixels[i + 3] = 0;
  }
}

await sharp(Buffer.from(pixels), { raw: { width, height, channels } })
  .png()
  .toFile(outputPath);

console.log('Done! Transparent logo.png saved.');
