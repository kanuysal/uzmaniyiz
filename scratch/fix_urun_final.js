const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const p = path.join(WORKSPACE, 'urun-siteleri.html');
if (fs.existsSync(p)) {
  let c = fs.readFileSync(p, 'utf8');
  
  // 1. Replace "Next" with "Sonraki" in footer
  const nextText = `<div data-split="chars" data-module="split" class="text-navigation c-grey-40">Next</div>`;
  const newNextText = `<div data-split="chars" data-module="split" class="text-navigation c-grey-40">Sonraki</div>`;
  if (c.includes(nextText)) {
    c = c.replace(nextText, newNextText);
    console.log('Replaced Next with Sonraki');
  }
  
  // 2. Fix Top Title Overlay (remove <br/> to match H1)
  const oldTopOverlay = `<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Ürün</span><br/><span class="span-visible">Siteleri</span></div>`;
  const newTopOverlay = `<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Ürün Siteleri</span></div>`;
  
  if (c.includes(oldTopOverlay)) {
    c = c.replace(oldTopOverlay, newTopOverlay);
    console.log('Fixed top title overlay structure');
  }
  
  // 3. Fix Footer Titles
  const footerPos = c.indexOf('subpage-footer-w');
  if (footerPos !== -1) {
    // Find the H1 after the SVG in the footer
    const h1Pos = c.indexOf('<h1', footerPos);
    if (h1Pos !== -1) {
      const start = c.indexOf('>', h1Pos) + 1;
      const end = c.indexOf('</h1>', start);
      console.log('Current Footer H1 text:', c.substring(start, end));
      
      // Replace H1 content
      c = c.substring(0, start) + 'Üretici ve Sanayi' + c.substring(end);
      console.log('Fixed footer H1 text');
      
      // Also make sure the overlay matches
      const overlayPos = c.indexOf('class="text-title-large is-subpage is-overlay"', footerPos);
      if (overlayPos !== -1) {
        const oStart = c.indexOf('>', overlayPos) + 1;
        const oEnd = c.indexOf('</div>', oStart);
        c = c.substring(0, oStart) + '<span class="span-visible">Üretici ve Sanayi</span>' + c.substring(oEnd);
        console.log('Fixed footer overlay text to match H1 (one line)');
      }
    }
  }
  
  fs.writeFileSync(p, c, 'utf8');
  console.log('File updated');
}
