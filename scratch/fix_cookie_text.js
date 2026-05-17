const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const htmlFiles = fs.readdirSync(WORKSPACE)
  .filter(f => f.endsWith('.html'))
  .map(f => path.join(WORKSPACE, f));

htmlFiles.forEach(htmlPath => {
  if (!fs.existsSync(htmlPath)) return;
  let c = fs.readFileSync(htmlPath, 'utf8');

  // Replace the full cookie consent sentence
  c = c.replace(
    /Select 'Tümünü Kabul Et' to agree to our use of cookies and similar technologies to enhance your browsing experience, security, analytics and customisation\./gi,
    'Gezinme deneyiminizi, güvenliğinizi ve analizlerimizi geliştirmek amacıyla çerez kullanımımızı kabul etmek için "Tümünü Kabul Et" seçeneğine tıklayın.'
  );
  c = c.replace(
    /Select 'Accept All' to agree to our use of cookies[^<]*/gi,
    'Çerez kullanımımızı kabul etmek için "Tümünü Kabul Et"e tıklayın.'
  );
  c = c.replace(
    /Review our çerez politikası buraya tıklayın\./gi,
    'Çerez politikamızı incelemek için tıklayın.'
  );
  // Also fix the english that was partially translated
  c = c.replace(/to enhance your browsing experience, security, analytics and customisation\./gi,
    'deneyiminizi geliştirmek için.');

  fs.writeFileSync(htmlPath, c, 'utf8');
});
console.log('Cookie text fully fixed!');

// Final verify
const c = fs.readFileSync(path.join(WORKSPACE, 'index.html'), 'utf8');
const cpos = c.indexOf('class="cookie-w"');
const cookieText = c.substring(cpos, cpos + 600).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log('\nFinal cookie text:', cookieText);
