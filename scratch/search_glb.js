const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\assets\\models';

const files = ['1.glb', '2.glb', '3.glb', '4.glb', '5.glb'];

files.forEach(f => {
  const p = path.join(WORKSPACE, f);
  if (!fs.existsSync(p)) return;
  const buf = fs.readFileSync(p);
  const str = buf.toString('utf8');
  
  const kw = 'CREATOR';
  let pos = str.indexOf(kw);
  if (pos !== -1) {
    console.log(`Found "${kw}" in ${f} at ${pos}`);
    // Print a bit of context
    console.log(str.substring(pos - 20, pos + 50));
  } else {
    console.log(`"${kw}" not found in ${f}`);
  }
});
