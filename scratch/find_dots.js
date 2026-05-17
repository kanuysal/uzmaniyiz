const fs = require('fs');
const path = require('path');

const indexHtmlPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\index.html';
const content = fs.readFileSync(indexHtmlPath, 'utf8');

let pos = 0;
while ((pos = content.indexOf('COM', pos)) !== -1) {
  const start = Math.max(0, pos - 100);
  const end = Math.min(content.length, pos + 100);
  console.log(`Match at index ${pos}: "${content.substring(start, end).replace(/\n/g, ' ')}"`);
  pos += 3;
}
