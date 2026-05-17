const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const p = path.join(WORKSPACE, 'urun-siteleri.html');
if (fs.existsSync(p)) {
  let c = fs.readFileSync(p, 'utf8');
  const pos = c.indexOf('subpage-footer-w');
  if (pos !== -1) {
    // Find the closing </svg> inside the footer
    const svgPos = c.indexOf('</svg>', pos);
    if (svgPos !== -1) {
      // Find the next tag after </svg>
      const nextTagPos = c.indexOf('<h2', svgPos);
      if (nextTagPos !== -1 && nextTagPos < pos + 2000) {
        const start = c.indexOf('>', nextTagPos) + 1;
        const end = c.indexOf('</h2>', start);
        console.log('Current H2 text:', c.substring(start, end));
        c = c.substring(0, start) + 'Üretici ve Sanayi' + c.substring(end);
        fs.writeFileSync(p, c, 'utf8');
        console.log('Fixed footer base text');
      } else {
        console.log('H2 not found after SVG');
      }
    }
  }
}
