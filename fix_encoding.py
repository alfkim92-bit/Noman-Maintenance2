import os
import glob

html_files = glob.glob('c:/Users/alfki/OneDrive/Desktop/soc/website/*.html')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix Arabic text encoding
    content = content.replace('Ø´Ø±ÙƒØ© Ù†ÙˆÙ…Ø§Ù† Ù…ÙŠÙ†ØªÙŠÙ†Ø§Ù†Ø³ Ø³ÙŠØ±Ù ÙŠØ³Ø²', 'شركة نومان مينتينانس سيرفيسز')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Fixed encoding in {len(html_files)} files.")
