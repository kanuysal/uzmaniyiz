const fs = require('fs');

const appJsPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\assets\\app.js';
const content = fs.readFileSync(appJsPath, 'utf8');

['models/', 'textures/'].forEach(query => {
  let pos = 0;
  console.log(`\n=== Matches for ${query} ===`);
  while ((pos = content.indexOf(query, pos)) !== -1) {
    const start = Math.max(0, pos - 50);
    const end = Math.min(content.length, pos + query.length + 50);
    console.log(`Match at ${pos}: "${content.substring(start, end).replace(/\n/g, '')}"`);
    pos += query.length;
  }
});
