const fs = require('fs');

const indexHtmlPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\index.html';
const content = fs.readFileSync(indexHtmlPath, 'utf8');

// Print lines around preloader
const lines = content.split('\n');
console.log(lines.slice(700, 800).join('\n'));
