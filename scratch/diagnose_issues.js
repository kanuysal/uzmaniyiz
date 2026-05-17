const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

// 1. Find "operating system" in index.html
const indexContent = fs.readFileSync(path.join(WORKSPACE, 'index.html'), 'utf8');
let pos = indexContent.indexOf('operating system');
while (pos !== -1) {
  const before = indexContent.substring(Math.max(0, pos - 200), pos);
  const isInStyle = before.lastIndexOf('<style>') > before.lastIndexOf('</style>');
  const isInMeta = before.lastIndexOf('<meta') > before.lastIndexOf('>');
  if (!isInStyle) {
    console.log(`[index.html] "operating system" at pos ${pos}:`);
    console.log(indexContent.substring(pos - 100, pos + 200));
    console.log('---');
  }
  pos = indexContent.indexOf('operating system', pos + 16);
}

// 2. Check uretici-ve-sanayi scroll - find any overflow:hidden on body or main elements
const ureticiContent = fs.readFileSync(path.join(WORKSPACE, 'uretici-ve-sanayi.html'), 'utf8');
const overflowHiddens = [];
let opos = 0;
while ((opos = ureticiContent.indexOf('overflow', opos)) !== -1) {
  const snippet = ureticiContent.substring(opos, opos + 50);
  if (snippet.includes('hidden') || snippet.includes('clip')) {
    const before = ureticiContent.substring(Math.max(0, opos - 50), opos + 80);
    if (!before.includes('//')) overflowHiddens.push(before);
  }
  opos += 8;
}
console.log(`\nuretici-ve-sanayi.html overflow:hidden occurrences: ${overflowHiddens.length}`);
if (overflowHiddens.length > 0 && overflowHiddens.length < 10) {
  overflowHiddens.slice(0, 5).forEach(s => console.log(s.substring(0, 100)));
}

// 3. Find English text in subpages - look for text-callout or text-title-homepage
['site-tasarimi.html','tanitim-ve-tasarim.html','urun-siteleri.html'].forEach(f => {
  const c = fs.readFileSync(path.join(WORKSPACE, f), 'utf8');
  // Find text-title-homepage class
  const pos1 = c.indexOf('text-title-homepage');
  if (pos1 !== -1) {
    console.log(`\n[${f}] text-title-homepage at ${pos1}:`);
    console.log(c.substring(pos1 - 30, pos1 + 400));
  }
  // Find text-callout
  const pos2 = c.indexOf('text-title-callout');
  if (pos2 !== -1) {
    console.log(`\n[${f}] text-title-callout at ${pos2}:`);
    console.log(c.substring(pos2 - 30, pos2 + 300));
  }
});
