const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';
const c = fs.readFileSync(path.join(WORKSPACE, 'index.html'), 'utf8');

// 1. Cookie banner
const cookiePos = c.indexOf('cookie-w');
let p = cookiePos;
while ((p = c.indexOf('cookie-w', p)) !== -1) {
  const before = c.substring(Math.max(0, p-200), p);
  const isCSS = before.lastIndexOf('<style>') > before.lastIndexOf('</style>');
  if (!isCSS) {
    console.log('Cookie DOM at:', p);
    console.log(c.substring(p-20, p+1000));
    break;
  }
  p += 8;
}

// 2. Arm link buttons (3D scene buttons)
const armPos = c.indexOf('hero-arm-link');
let p2 = 0;
while ((p2 = c.indexOf('hero-arm-link', p2)) !== -1) {
  const before = c.substring(Math.max(0, p2-100), p2);
  const isCSS = before.lastIndexOf('<style>') > before.lastIndexOf('</style>');
  if (!isCSS) {
    console.log('\nArm link at:', p2);
    console.log(c.substring(p2-20, p2+500));
    break;
  }
  p2 += 13;
}

// 3. Homepage H1 and body text
const h1Pos = c.indexOf('text-title-homepage ch-max');
console.log('\nHomepage H1 area:');
console.log(c.substring(h1Pos-10, h1Pos+500));

// 4. subpage intro text (text-title-callout in DOM)
['site-tasarimi.html','tanitim-ve-tasarim.html','urun-siteleri.html','uretici-ve-sanayi.html'].forEach(f => {
  const sc = fs.readFileSync(path.join(WORKSPACE, f), 'utf8');
  let sp = 0;
  while ((sp = sc.indexOf('text-title-callout', sp)) !== -1) {
    const before = sc.substring(Math.max(0, sp-200), sp);
    const isCSS = before.lastIndexOf('<style>') > before.lastIndexOf('</style>');
    if (!isCSS) {
      console.log(`\n[${f}] callout DOM at ${sp}:`);
      console.log(sc.substring(sp-30, sp+400));
      break;
    }
    sp += 18;
  }
});
