const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const files = ['tanitim-ve-tasarim.html', 'site-tasarimi.html'];

files.forEach(f => {
  const p = path.join(WORKSPACE, f);
  const content = fs.readFileSync(p, 'utf8');
  const pos = content.indexOf('subpage-footer-w');
  if (pos !== -1) {
    console.log(`\n=== ${f} ===`);
    // Find the end of the section
    const endPos = content.indexOf('</section>', pos);
    console.log(content.substring(pos, endPos !== -1 ? endPos + 10 : pos + 2000));
  }
});
