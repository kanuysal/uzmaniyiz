const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const files = ['tanitim-ve-tasarim.html', 'site-tasarimi.html'];

files.forEach(f => {
  const p = path.join(WORKSPACE, f);
  if (!fs.existsSync(p)) {
    console.log(`${f} does not exist`);
    return;
  }
  const content = fs.readFileSync(p, 'utf8');
  const pos = content.indexOf('subpage-footer-w');
  if (pos !== -1) {
    console.log(`\n=== ${f} ===`);
    console.log(content.substring(pos - 100, pos + 1000));
  } else {
    console.log(`\n=== ${f} ===`);
    console.log('subpage-footer-w not found');
    // search for "Next"
    const nextPos = content.indexOf('Next');
    if (nextPos !== -1) {
      console.log('Found "Next" at', nextPos);
      console.log(content.substring(nextPos - 100, nextPos + 200));
    }
  }
});
