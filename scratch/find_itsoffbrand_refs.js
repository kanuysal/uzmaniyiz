const fs = require('fs');
const path = require('path');

const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

// 1. Search in assets/app.js
const appJsPath = path.join(WORKSPACE, 'assets', 'app.js');
if (fs.existsSync(appJsPath)) {
  const content = fs.readFileSync(appJsPath, 'utf8');
  let pos = 0;
  console.log('--- Matches in assets/app.js ---');
  while ((pos = content.indexOf('steven.itsoffbrand.io', pos)) !== -1) {
    const start = Math.max(0, pos - 80);
    const end = Math.min(content.length, pos + 120);
    console.log(`Index ${pos}: "${content.substring(start, end).replace(/\n/g, ' ')}"`);
    pos += 21;
  }
}

// 2. Search in all HTML files
const htmlFiles = [
  'index.html',
  'site-tasarimi.html',
  'tanitim-ve-tasarim.html',
  'urun-siteleri.html',
  'uretici-ve-sanayi.html',
  'join-us.html'
].map(file => path.join(WORKSPACE, file));

console.log('\n--- Matches in HTML files ---');
htmlFiles.forEach(htmlPath => {
  if (!fs.existsSync(htmlPath)) return;
  const content = fs.readFileSync(htmlPath, 'utf8');
  let pos = 0;
  while ((pos = content.indexOf('steven.itsoffbrand.io', pos)) !== -1) {
    const start = Math.max(0, pos - 80);
    const end = Math.min(content.length, pos + 120);
    console.log(`${path.basename(htmlPath)} at index ${pos}: "${content.substring(start, end).replace(/\n/g, ' ')}"`);
    pos += 21;
  }
});
