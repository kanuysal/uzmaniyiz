const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const files = ['index.html','site-tasarimi.html','tanitim-ve-tasarim.html',
  'urun-siteleri.html','uretici-ve-sanayi.html','bize-katilin.html'];

files.forEach(f => {
  const c = fs.readFileSync(path.join(WORKSPACE, f), 'utf8');
  let pos = 0;
  while ((pos = c.indexOf('data-preloader="tagline"', pos)) !== -1) {
    const before = c.substring(Math.max(0, pos - 300), pos);
    const isInStyle = before.lastIndexOf('<style>') > before.lastIndexOf('</style>');
    if (!isInStyle) {
      // Extract the text content
      const snippet = c.substring(pos, pos + 300);
      const textMatch = snippet.match(/>([^<]{5,})</);
      const text = textMatch ? textMatch[1].trim() : 'empty?';
      console.log(`[${f}] tagline: "${text}"`);
    }
    pos += 24;
  }
});

// Also verify join-us.html is gone
const joinUsPath = path.join(WORKSPACE, 'join-us.html');
console.log('\njoin-us.html exists:', fs.existsSync(joinUsPath));
console.log('bize-katilin.html exists:', fs.existsSync(path.join(WORKSPACE, 'bize-katilin.html')));

// Check title duplicates
['uretici-ve-sanayi.html','site-tasarimi.html'].forEach(f => {
  const c = fs.readFileSync(path.join(WORKSPACE, f), 'utf8');
  const titleCount = (c.match(/<title>/g) || []).length;
  console.log(`[${f}] <title> count: ${titleCount}`);
});
