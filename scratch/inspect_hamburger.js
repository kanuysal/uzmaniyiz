const fs = require('fs');
const indexHtmlPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\index.html';
const content = fs.readFileSync(indexHtmlPath, 'utf8');

const navPos = content.indexOf('site-tasarimi.html');
if (navPos !== -1) {
  console.log(content.substring(Math.max(0, navPos - 500), navPos + 500));
}
