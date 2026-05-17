const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const p = path.join(WORKSPACE, 'site-tasarimi.html');
if (fs.existsSync(p)) {
  let c = fs.readFileSync(p, 'utf8');
  
  const footerPos = c.indexOf('subpage-footer-w');
  if (footerPos !== -1) {
    // 1. Fix overlay text
    const overlayPos = c.indexOf('class="text-title-large is-subpage is-overlay"', footerPos);
    if (overlayPos !== -1) {
      const start = c.indexOf('>', overlayPos) + 1;
      const end = c.indexOf('</div>', start);
      c = c.substring(0, start) + '<span class="span-visible">Tanıtım ve</span><br/><span class="span-visible">Tasarım</span>' + c.substring(end);
      console.log('Fixed footer overlay text');
    }
    
    // 2. Fix base text (usually h2 or similar after SVG)
    const svgPos = c.indexOf('</svg>', footerPos);
    if (svgPos !== -1) {
      const nextTagPos = c.indexOf('<h2', svgPos);
      if (nextTagPos !== -1 && nextTagPos < footerPos + 2000) {
        const start = c.indexOf('>', nextTagPos) + 1;
        const end = c.indexOf('</h2>', start);
        console.log('Current H2 text:', c.substring(start, end));
        c = c.substring(0, start) + 'Tanıtım ve Tasarım' + c.substring(end);
        console.log('Fixed footer base text');
      } else {
        console.log('H2 not found after SVG, searching for any text-title-large');
        // Fallback: search for class="text-title-large is-subpage" without is-overlay
        const basePos = c.indexOf('class="text-title-large is-subpage"', footerPos);
        if (basePos !== -1 && basePos !== overlayPos) {
          const start = c.indexOf('>', basePos) + 1;
          const end = c.indexOf('</', start);
          c = c.substring(0, start) + 'Tanıtım ve Tasarım' + c.substring(end);
          console.log('Fixed footer base text by fallback');
        }
      }
    }
  }
  
  fs.writeFileSync(p, c, 'utf8');
  console.log('File updated');
}
