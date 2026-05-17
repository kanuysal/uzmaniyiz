const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

// 1. Check for hakkimizda.html
const hasHakkimizda = fs.existsSync(path.join(WORKSPACE, 'hakkimizda.html'));
console.log('hakkimizda.html exists:', hasHakkimizda);

// 2. Find text in urun-siteleri.html
const urunPath = path.join(WORKSPACE, 'urun-siteleri.html');
if (fs.existsSync(urunPath)) {
  const content = fs.readFileSync(urunPath, 'utf8');
  const kw = 'built on trust';
  const pos = content.indexOf(kw);
  if (pos !== -1) {
    console.log('\nFound "built on trust" at', pos);
    console.log(content.substring(pos - 300, pos + 500));
  } else {
    console.log('\n"built on trust" not found');
  }
  
  // Find "Launch a Product"
  const btnKw = 'Launch a Product';
  const btnPos = content.indexOf(btnKw);
  if (btnPos !== -1) {
    console.log('\nFound "Launch a Product" at', btnPos);
    console.log(content.substring(btnPos - 100, btnPos + 300));
  }
}
