const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

function inspectFooter(filename) {
  const p = path.join(WORKSPACE, filename);
  if (!fs.existsSync(p)) return;
  const c = fs.readFileSync(p, 'utf8');
  
  const pos = c.indexOf('subpage-footer-w');
  if (pos !== -1) {
    console.log(`\n=== Footer in ${filename} ===`);
    console.log(c.substring(pos, pos + 1500));
  } else {
    console.log(`\n=== Footer not found in ${filename} ===`);
  }
}

inspectFooter('site-tasarimi.html');
inspectFooter('uretici-ve-sanayi.html');
