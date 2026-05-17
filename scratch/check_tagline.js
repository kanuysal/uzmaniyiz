const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const files = ['index.html','site-tasarimi.html','bize-katilin.html','uretici-ve-sanayi.html'];

files.forEach(f => {
  const c = fs.readFileSync(path.join(WORKSPACE, f), 'utf8');
  const taglinePos = c.indexOf('data-preloader="tagline"');
  if (taglinePos !== -1) {
    const snippet = c.substring(taglinePos, taglinePos + 200);
    console.log(`[${f}] tagline area:\n  ${snippet}\n`);
  } else {
    console.log(`[${f}] tagline: NOT FOUND`);
  }
});
