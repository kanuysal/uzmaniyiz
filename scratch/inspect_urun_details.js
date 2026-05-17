const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const p = path.join(WORKSPACE, 'urun-siteleri.html');
if (fs.existsSync(p)) {
  const c = fs.readFileSync(p, 'utf8');
  
  // 1. Inspect title area
  const heroPos = c.indexOf('is-subpage-hero');
  if (heroPos !== -1) {
    console.log('=== Title Area ===');
    console.log(c.substring(heroPos, heroPos + 800));
  }
  
  // 2. Inspect the paragraph text
  const kw = 'creator-led businesses';
  const pos = c.indexOf(kw);
  if (pos !== -1) {
    console.log('\n=== Paragraph Area ===');
    console.log(c.substring(pos - 100, pos + 300));
  } else {
    console.log('\n"creator-led businesses" not found');
  }
}
