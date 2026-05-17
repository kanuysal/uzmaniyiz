const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const content = fs.readFileSync(path.join(WORKSPACE, 'index.html'), 'utf8');

// 1. Find data-gl-hero-link
let pos = 0;
while ((pos = content.indexOf('data-gl-hero-link', pos)) !== -1) {
  const lineStart = content.lastIndexOf('\n', pos);
  const lineEnd = content.indexOf('\n', pos);
  console.log(`Found at ${pos}:`, content.substring(lineStart, lineEnd).trim());
  pos += 1;
}

// 2. Look for script tags or texts like CREATOR
const keywords = ['CREATOR', 'Products', 'Media', 'Communities', 'Technology'];
keywords.forEach(kw => {
  const p = content.indexOf(kw);
  if (p !== -1) {
    console.log(`\nFound "${kw}" at ${p}:`);
    console.log(content.substring(p - 50, p + 100));
  }
});
