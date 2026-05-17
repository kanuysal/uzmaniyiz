const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

function fixFile(filename, topText, footerText) {
  const p = path.join(WORKSPACE, filename);
  if (!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf8');
  
  // Fix Top Title
  const heroPos = c.indexOf('is-subpage-hero');
  if (heroPos !== -1) {
    const overlayPos = c.indexOf('class="text-title-large is-subpage is-overlay"', heroPos);
    if (overlayPos !== -1) {
      const start = c.indexOf('>', overlayPos) + 1;
      const end = c.indexOf('</div>', start);
      c = c.substring(0, start) + topText + c.substring(end);
    }
  }
  
  // Fix Footer Title
  const footerPos = c.indexOf('subpage-footer-w');
  if (footerPos !== -1) {
    const overlayPos = c.indexOf('class="text-title-large is-subpage is-overlay"', footerPos);
    if (overlayPos !== -1) {
      const start = c.indexOf('>', overlayPos) + 1;
      const end = c.indexOf('</div>', start);
      c = c.substring(0, start) + footerText + c.substring(end);
    }
  }
  
  fs.writeFileSync(p, c, 'utf8');
  console.log(`Fixed titles in ${filename}`);
}

// 1. Fix titles
fixFile('site-tasarimi.html', 
  '<span class="span-visible">Site Tasarımı</span>', 
  '<span class="span-visible">Tanıtım ve</span><br/><span class="span-visible">Tasarım</span><br/>'
);

fixFile('tanitim-ve-tasarim.html', 
  '<span class="span-visible">Tanıtım ve</span><br/><span class="span-visible">Tasarım</span><br/>', 
  '<span class="span-visible">Ürün Siteleri</span>'
);

fixFile('urun-siteleri.html', 
  '<span class="span-visible">Ürün Siteleri</span>', 
  '<span class="span-visible">Üretici ve</span><br/><span class="span-visible">Sanayi</span><br/>'
);

// 2. Fix uretici grid width and data-module
const ureticiPath = path.join(WORKSPACE, 'uretici-ve-sanayi.html');
if (fs.existsSync(ureticiPath)) {
  let c = fs.readFileSync(ureticiPath, 'utf8');
  
  // Add data-module and id to the dummy section
  c = c.replace(
    /<section class="s"><div class="c"><div class="grid-main">\s*<div class="subpage-intro-layout-w">/,
    '<section id="intro" data-module="sub-intro" class="s"><div class="c"><div class="grid-main"><div class="subpage-intro-layout-w">'
  );
  
  // If the user says it's still not full width, maybe it needs a different container structure or removing "c"
  // Let's try removing "c" for the dummy section if the user insists, but first let's try adding the data-module which might trigger JS layout.
  
  fs.writeFileSync(ureticiPath, c, 'utf8');
  console.log('Fixed uretici-ve-sanayi.html section attributes');
}

// 3. Fix the untranslated text in urun-siteleri if it's still there
const urunPath = path.join(WORKSPACE, 'urun-siteleri.html');
if (fs.existsSync(urunPath)) {
  let c = fs.readFileSync(urunPath, 'utf8');
  if (c.includes('We build and back creator-led businesses')) {
    c = c.replace(
      'We build and back creator-led businesses that solve genuine problems.',
      'Gerçek sorunları çözen, kullanıcı odaklı ve yenilikçi ürünler geliştiriyor ve destekliyoruz.'
    );
    fs.writeFileSync(urunPath, c, 'utf8');
    console.log('Fixed paragraph in urun-siteleri.html (again)');
  }
}
