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
  
  // Let's use a regex to capture whatever is between <title> and </title> and replace it purely based on the filename
  let filename = path.basename(htmlPath);
  let newTitle = '';
  
  if (filename === 'index.html') {
    newTitle = 'UZMANIYIZ.COM | Web Tasarım Portfolyosu';
  } else if (filename === 'site-tasarimi.html') {
    newTitle = 'Site Tasarımı | UZMANIYIZ.COM';
  } else if (filename === 'tanitim-ve-tasarim.html') {
    newTitle = 'Tanıtım ve Tasarım | UZMANIYIZ.COM';
  } else if (filename === 'urun-siteleri.html') {
    newTitle = 'Ürün Siteleri | UZMANIYIZ.COM';
  } else if (filename === 'uretici-ve-sanayi.html') {
    newTitle = 'Üretici ve Sanayi | UZMANIYIZ.COM';
  } else if (filename === 'join-us.html') {
    newTitle = 'İletişim | UZMANIYIZ.COM';
  }
  
  // Replace the <title> tag completely
  content = content.replace(/<title>.*?<\/title>/gi, `<title>${newTitle}</title>`);
  
  // Also fix any malformed OG titles if they got messed up
  content = content.replace(/content="[^"]*<title>[^"]*"/gi, `content="${newTitle}"`);
  
  fs.writeFileSync(htmlPath, content, 'utf8');
  console.log(`Fixed title in: ${filename} to ${newTitle}`);
});
