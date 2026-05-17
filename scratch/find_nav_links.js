const fs = require('fs');
const path = require('path');

const indexHtmlPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\index.html';
const content = fs.readFileSync(indexHtmlPath, 'utf8');

// Find all matches for Creator Media, Creator Communities, etc.
const keywords = [
  'Creator Media',
  'Creator Communities',
  'Creator Products',
  'Creator Tech'
];

keywords.forEach(kw => {
  let pos = 0;
  console.log(`=== Matches for Keyword: "${kw}" ===`);
  while ((pos = content.indexOf(kw, pos)) !== -1) {
    const start = Math.max(0, pos - 150);
    const end = Math.min(content.length, pos + kw.length + 150);
    console.log(`Snippet: "${content.substring(start, end).replace(/\n/g, ' ')}"`);
    console.log('-'.repeat(50));
    pos += kw.length;
  }
});
