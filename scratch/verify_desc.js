const fs = require('fs');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const files = ['index.html','site-tasarimi.html','urun-siteleri.html'];

files.forEach(f => {
  const c = fs.readFileSync(WORKSPACE + '\\' + f, 'utf8');
  // Find meta description differently  
  const m = c.match(/name="description"[^/]*\/>/);
  if (m) {
    // Go back to find the content attribute
    const pos = c.indexOf(m[0]);
    const before = c.substring(pos - 300, pos + 50);
    const contentMatch = before.match(/content="([^"]+)" name="description"/);
    if (contentMatch) {
      console.log(`[${f}] desc: ${contentMatch[1].substring(0,80)}`);
    } else {
      console.log(`[${f}] desc: not found in before`);
      console.log(before.substring(200));
    }
  }
});
