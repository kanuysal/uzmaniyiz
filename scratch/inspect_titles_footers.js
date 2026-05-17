const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const files = ['site-tasarimi.html', 'tanitim-ve-tasarim.html', 'urun-siteleri.html', 'uretici-ve-sanayi.html'];

files.forEach(f => {
  const p = path.join(WORKSPACE, f);
  if (!fs.existsSync(p)) return;
  const c = fs.readFileSync(p, 'utf8');
  
  console.log(`\n=== ${f} ===`);
  
  // 1. Check title area (usually starts with s is-subpage-hero)
  const heroPos = c.indexOf('is-subpage-hero');
  if (heroPos !== -1) {
    const endHero = c.indexOf('</section>', heroPos);
    console.log('--- Title Area ---');
    console.log(c.substring(heroPos, heroPos + 500));
  }
  
  // 2. Check footer area
  const footerPos = c.indexOf('subpage-footer-w');
  if (footerPos !== -1) {
    console.log('--- Footer Area ---');
    console.log(c.substring(footerPos, footerPos + 800));
  }
});
