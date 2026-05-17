const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const p = path.join(WORKSPACE, 'urun-siteleri.html');
if (fs.existsSync(p)) {
  const c = fs.readFileSync(p, 'utf8');
  const pos = c.indexOf('subpage-footer-w');
  if (pos !== -1) {
    console.log(c.substring(pos, pos + 1000));
  }
}
