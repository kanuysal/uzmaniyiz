const fs = require('fs');
const path = require('path');

const indexHtmlPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\index.html';
const content = fs.readFileSync(indexHtmlPath, 'utf8');

// Print lines 300 to 600 of index.html
const lines = content.split('\n');
console.log(lines.slice(300, 600).join('\n'));
