const fs = require('fs');
const path = require('path');

const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const htmlFiles = [
  'index.html',
  'site-tasarimi.html',
  'tanitim-ve-tasarim.html',
  'urun-siteleri.html',
  'uretici-ve-sanayi.html',
  'join-us.html'
].map(file => path.join(WORKSPACE, file));

htmlFiles.forEach(htmlPath => {
  if (!fs.existsSync(htmlPath)) return;
  
  let content = fs.readFileSync(htmlPath, 'utf8');
  
  // Replace ANY occurrence of the old paths, regardless of prefix
  // CSS:
  content = content.replace(/["'][^"']*ob-steven\.shared\.c74eb9ec4\.min\.css[^"']*["']/gi, '"./assets/main.css"');
  
  // JS:
  content = content.replace(/["'][^"']*ob-steven\.751e0867\.148dc658e77a3916\.js[^"']*["']/gi, '"./assets/main.js"');
  content = content.replace(/["'][^"']*ob-steven\.schunk\.79b71263bda4d666\.js[^"']*["']/gi, '"./assets/chunk.js"');
  content = content.replace(/["'][^"']*jquery-3\.5\.1\.min\.dc5e7f18c87e42\.js[^"']*["']/gi, '"./assets/jquery.js"');
  
  // Also fix the case where it might be `dc5e7f18c8.js`
  content = content.replace(/["'][^"']*jquery-3\.5\.1\.min\.dc5e7f18c8\.js[^"']*["']/gi, '"./assets/jquery.js"');

  fs.writeFileSync(htmlPath, content, 'utf8');
  console.log(`Updated robust references in: ${path.basename(htmlPath)}`);
});
