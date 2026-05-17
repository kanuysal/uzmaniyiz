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
  
  // Fix the invalid CSS syntax
  const badSyntax = 'color: var(--color--text); !important;';
  const goodSyntax = 'color: var(--color--text) !important;';
  
  if (content.includes(badSyntax)) {
    content = content.replace(/color:\s*var\(--color--text\);\s*!important;/g, goodSyntax);
    fs.writeFileSync(htmlPath, content, 'utf8');
    console.log(`Fixed CSS syntax in: ${path.basename(htmlPath)}`);
  }
});
