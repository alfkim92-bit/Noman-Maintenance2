import sharp from 'sharp';

const inputPath = 'C:/Users/alfki/.gemini/antigravity-ide/brain/ad5c1554-5d8e-4663-b87d-99479f1d4811/.user_uploaded/media_1789799047605.png';
const outputPath = 'C:/Users/alfki/OneDrive/Desktop/soc/website/public/logo.png';

console.log('Processing...');

const { data, info } = await sharp(inputPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const pixels = new Uint8Array(data);

function idx(x, y) { return (y * width + x) * channels; }

function isNearWhite(x, y, threshold = 200) {
  const i = idx(x, y);
  return pixels[i] > threshold && pixels[i+1] > threshold && pixels[i+2] > threshold;
}

// BFS flood fill from all 4 edges to find background pixels
const visited = new Uint8Array(width * height);
const queue = [];

for (let x = 0; x < width; x++) {
  if (isNearWhite(x, 0))        { queue.push([x, 0]);        visited[0 * width + x] = 1; }
  if (isNearWhite(x, height-1)) { queue.push([x, height-1]); visited[(height-1) * width + x] = 1; }
}
for (let y = 0; y < height; y++) {
  if (isNearWhite(0, y))       { queue.push([0, y]);       visited[y * width + 0] = 1; }
  if (isNearWhite(width-1, y)) { queue.push([width-1, y]); visited[y * width + (width-1)] = 1; }
}

const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
let qi = 0;
while (qi < queue.length) {
  const [cx, cy] = queue[qi++];
  for (const [dx, dy] of dirs) {
    const nx = cx+dx, ny = cy+dy;
    if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
    if (visited[ny * width + nx]) continue;
    if (isNearWhite(nx, ny, 180)) {
      visited[ny * width + nx] = 1;
      queue.push([nx, ny]);
    }
  }
}

// Make all visited (background) pixels transparent
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    if (visited[y * width + x]) {
      const i = idx(x, y);
      pixels[i + 3] = 0;
    }
  }
}

// Scale up 2.5x for bigger display
const scale = 2.5;
await sharp(Buffer.from(pixels), { raw: { width, height, channels } })
  .resize(Math.round(width * scale), Math.round(height * scale), { kernel: 'lanczos3' })
  .png()
  .toFile(outputPath);

console.log('Done! Transparent + bigger logo.png saved. Size:', Math.round(width*scale), 'x', Math.round(height*scale));
