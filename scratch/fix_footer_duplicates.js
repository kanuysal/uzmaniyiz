const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

// 1. Fix site-tasarimi.html footer
const sitePath = path.join(WORKSPACE, 'site-tasarimi.html');
if (fs.existsSync(sitePath)) {
  let c = fs.readFileSync(sitePath, 'utf8');
  const footerPos = c.indexOf('subpage-footer-w');
  if (footerPos !== -1) {
    const overlayPos = c.indexOf('class="text-title-large is-subpage is-overlay"', footerPos);
    if (overlayPos !== -1) {
      const start = c.indexOf('>', overlayPos) + 1;
      const end = c.indexOf('</div>', start);
      // Remove <br/> and make it one line
      c = c.substring(0, start) + '<span class="span-visible">Tanıtım ve Tasarım</span>' + c.substring(end);
    }
    
    // Fix H2 to make sure it matches
    const h2Pos = c.indexOf('<h2', footerPos);
    if (h2Pos !== -1) {
      const start = c.indexOf('>', h2Pos) + 1;
      const end = c.indexOf('</h2>', start);
      c = c.substring(0, start) + 'Tanıtım ve Tasarım' + c.substring(end);
    }
  }
  fs.writeFileSync(sitePath, c, 'utf8');
  console.log('Fixed site-tasarimi.html footer');
}

// 2. Fix uretici-ve-sanayi.html footer
const ureticiPath = path.join(WORKSPACE, 'uretici-ve-sanayi.html');
if (fs.existsSync(ureticiPath)) {
  let c = fs.readFileSync(ureticiPath, 'utf8');
  const footerPos = c.indexOf('subpage-footer-w');
  if (footerPos !== -1) {
    const overlayPos = c.indexOf('class="text-title-large is-subpage is-overlay"', footerPos);
    if (overlayPos !== -1) {
      const start = c.indexOf('>', overlayPos) + 1;
      const end = c.indexOf('</div>', start);
      // Remove the duplicate span
      c = c.substring(0, start) + '<span class="span-visible">Site Tasarımı</span>' + c.substring(end);
    }
    
    // Fix H2
    const h2Pos = c.indexOf('<h2', footerPos);
    if (h2Pos !== -1) {
      const start = c.indexOf('>', h2Pos) + 1;
      const end = c.indexOf('</h2>', start);
      c = c.substring(0, start) + 'Site Tasarımı' + c.substring(end);
    }
  }
  fs.writeFileSync(ureticiPath, c, 'utf8');
  console.log('Fixed uretici-ve-sanayi.html footer');
}
