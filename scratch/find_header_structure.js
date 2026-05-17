const fs = require('fs');
const path = require('path');

const indexHtmlPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\index.html';
const content = fs.readFileSync(indexHtmlPath, 'utf8');

// Print lines 1 to 200 of index.html
const lines = content.split('\n');
console.log(lines.slice(0, 150).join('\n'));
