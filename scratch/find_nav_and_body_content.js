const fs = require('fs');
const path = require('path');

const indexHtmlPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\index.html';
const content = fs.readFileSync(indexHtmlPath, 'utf8');

// Print lines 600 to 900 of index.html
const lines = content.split('\n');
console.log(lines.slice(600, 900).join('\n'));
