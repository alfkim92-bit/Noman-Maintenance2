const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/alfki/OneDrive/Desktop/soc/website';

fs.readdir(dir, (err, files) => {
    if (err) throw err;
    
    files.filter(f => f.endsWith('.html')).forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Fix encoding
        content = content.replace(/Ø´Ø±ÙƒØ© Ù†ÙˆÙ…Ø§Ù† Ù…ÙŠÙ†ØªÙŠÙ†Ø§Ù†Ø³ Ø³ÙŠØ±Ù ÙŠØ³Ø²/g, 'شركة نومان مينتينانس سيرفيسز');
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed ${file}`);
    });
});
