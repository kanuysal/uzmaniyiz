const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';
const c = fs.readFileSync(path.join(WORKSPACE, 'index.html'), 'utf8');

// Find the H1
const h1Pos = c.indexOf('text-title-homepage ch-max');
console.log('H1 area:', c.substring(h1Pos - 5, h1Pos + 200));

// Find cookie banner
const cookiePos = c.indexOf('data-cookie=');
if (cookiePos !== -1) {
  console.log('\nCookie button area:', c.substring(cookiePos - 50, cookiePos + 300));
}
