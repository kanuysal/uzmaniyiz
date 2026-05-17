const fs = require('fs');
const path = require('path');

const appJsPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\assets\\app.js';
if (!fs.existsSync(appJsPath)) {
  console.log('app.js not found at:', appJsPath);
  process.exit(1);
}

const content = fs.readFileSync(appJsPath, 'utf8');

const queries = [
  'creator-communities',
  'creator-media',
  'creator-products',
  'creator-tech'
];

queries.forEach(q => {
  let pos = 0;
  let count = 0;
  while ((pos = content.indexOf(q, pos)) !== -1) {
    count++;
    // Get snippet around occurrence
    const start = Math.max(0, pos - 50);
    const end = Math.min(content.length, pos + q.length + 50);
    console.log(`Query: "${q}" (Match #${count} at index ${pos}):`);
    console.log(`Snippet: "${content.substring(start, end).replace(/\n/g, ' ')}"`);
    console.log('-'.repeat(40));
    pos += q.length;
  }
});
