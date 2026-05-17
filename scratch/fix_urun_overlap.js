const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const p = path.join(WORKSPACE, 'urun-siteleri.html');
if (fs.existsSync(p)) {
  let c = fs.readFileSync(p, 'utf8');
  
  // 1. Fix Top Title Area
  const heroPos = c.indexOf('is-subpage-hero');
  if (heroPos !== -1) {
    const overlayPos = c.indexOf('class="text-title-large is-subpage is-overlay"', heroPos);
    if (overlayPos !== -1) {
      const start = c.indexOf('>', overlayPos) + 1;
      const end = c.indexOf('</div>', start);
      c = c.substring(0, start) + '<span class="span-visible">Ürün</span><br/><span class="span-visible">Siteleri</span>' + c.substring(end);
      console.log('Fixed top title overlay text');
    }
    
    // Also check for the base text or duplicate texts
    // Let's see if there is another text block that is not overlay
    // Usually there is a heading or div with class "text-title-large is-subpage" (without is-overlay)
    const basePos = c.indexOf('class="text-title-large is-subpage"', heroPos);
    if (basePos !== -1 && basePos !== overlayPos) {
      const start = c.indexOf('>', basePos) + 1;
      const end = c.indexOf('</', start); // could be </h2> or </div>
      const tagEnd = c.indexOf('>', start);
      // Let's just replace the content between > and the next tag or line break if it's text
      // Better: find the next closing tag
      const closeTagPos = c.indexOf('</', start);
      c = c.substring(0, start) + 'Ürün Siteleri' + c.substring(closeTagPos);
      console.log('Fixed top title base text');
    }
  }
  
  // 2. Fix Footer Area (links to uretici)
  const footerPos = c.indexOf('subpage-footer-w');
  if (footerPos !== -1) {
    const overlayPos = c.indexOf('class="text-title-large is-subpage is-overlay"', footerPos);
    if (overlayPos !== -1) {
      const start = c.indexOf('>', overlayPos) + 1;
      const end = c.indexOf('</div>', start);
      c = c.substring(0, start) + '<span class="span-visible">Üretici ve</span><br/><span class="span-visible">Sanayi</span>' + c.substring(end);
      console.log('Fixed footer overlay text');
    }
    
    // Fix base text in footer
    // The link in footer points to uretici-ve-sanayi.html
    // The base text is usually an h2
    const h2Pos = c.indexOf('<h2', footerPos);
    if (h2Pos !== -1) {
      const start = c.indexOf('>', h2Pos) + 1;
      const end = c.indexOf('</h2>', start);
      c = c.substring(0, start) + 'Üretici ve Sanayi' + c.substring(end);
      console.log('Fixed footer base text');
    }
  }
  
  fs.writeFileSync(p, c, 'utf8');
  console.log('File updated');
}
