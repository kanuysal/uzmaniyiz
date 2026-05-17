const fs = require('fs');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const files = ['index.html','site-tasarimi.html','tanitim-ve-tasarim.html','urun-siteleri.html','uretici-ve-sanayi.html','join-us.html'];

files.forEach(f => {
  const c = fs.readFileSync(WORKSPACE + '\\' + f, 'utf8');
  const lang = (c.match(/lang="([^"]+)"/) || [])[1] || '?';
  const title = (c.match(/<title>(.*?)<\/title>/) || [])[1] || '?';
  const desc = (c.match(/content="([^"]{20,80})" name="description"/) || [])[1] || '?';
  console.log(`\n[${f}]`);
  console.log(`  lang: ${lang}`);
  console.log(`  title: ${title}`);
  console.log(`  desc: ${desc.substring(0,70)}...`);
});
