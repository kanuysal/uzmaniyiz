const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const files = ['site-tasarimi.html', 'tanitim-ve-tasarim.html', 'urun-siteleri.html', 'uretici-ve-sanayi.html'];

files.forEach(f => {
  const p = path.join(WORKSPACE, f);
  if (!fs.existsSync(p)) return;
  const c = fs.readFileSync(p, 'utf8');
  
  console.log(`\n=== ${f} ===`);
  
  // Check title overlay
  const heroPos = c.indexOf('is-subpage-hero');
  if (heroPos !== -1) {
    const overlayPos = c.indexOf('is-overlay', heroPos);
    if (overlayPos !== -1) {
      const endDiv = c.indexOf('</div>', overlayPos);
      console.log('Title Overlay:', c.substring(overlayPos, endDiv + 6).replace(/<[^>]+>/g, '').trim());
    }
  }
  
  // Check footer overlay
  const footerPos = c.indexOf('subpage-footer-w');
  if (footerPos !== -1) {
    const overlayPos = c.indexOf('is-overlay', footerPos);
    if (overlayPos !== -1) {
      const endDiv = c.indexOf('</div>', overlayPos);
      console.log('Footer Overlay:', c.substring(overlayPos, endDiv + 6).replace(/<[^>]+>/g, '').trim());
    }
  }
});
