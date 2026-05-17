const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const p = path.join(WORKSPACE, 'urun-siteleri.html');
if (fs.existsSync(p)) {
  const c = fs.readFileSync(p, 'utf8');
  
  // 1. Inspect top title
  const heroPos = c.indexOf('is-subpage-hero');
  if (heroPos !== -1) {
    console.log('=== Top Title Area ===');
    console.log(c.substring(heroPos, heroPos + 1000));
  }
  
  // 2. Inspect footer
  const footerPos = c.indexOf('subpage-footer-w');
  if (footerPos !== -1) {
    console.log('\n=== Footer Area ===');
    console.log(c.substring(footerPos, footerPos + 1500));
  }
}
