const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const htmlFiles = fs.readdirSync(WORKSPACE)
  .filter(f => f.endsWith('.html'))
  .map(f => path.join(WORKSPACE, f));

const oldCookieText = `Select <strong>'Tümünü Kabul Et'</strong> to agree to our use of cookies and similar technologies deneyiminizi geliştirmek için. Review our<strong> </strong><a href="legal/cookie-policy.html" class="span-underline"><strong class="bold-text">çerez politikası</strong></a> buraya tıklayın.`;

const newCookieText = `Gezinme deneyiminizi geliştirmek için çerez kullanıyoruz. <strong>"Tümünü Kabul Et"</strong> seçeneğine tıklayarak çerez kullanımımızı kabul edebilirsiniz. Detaylar için <a href="legal/cookie-policy.html" class="span-underline"><strong class="bold-text">çerez politikamızı</strong></a> inceleyebilirsiniz.`;

// Also the subpage version which has ../legal/
const oldCookieTextSubpage = `Select <strong>'Tümünü Kabul Et'</strong> to agree to our use of cookies and similar technologies deneyiminizi geliştirmek için. Review our<strong> </strong><a href="../legal/cookie-policy.html" class="span-underline"><strong class="bold-text">çerez politikası</strong></a> buraya tıklayın.`;

const newCookieTextSubpage = `Gezinme deneyiminizi geliştirmek için çerez kullanıyoruz. <strong>"Tümünü Kabul Et"</strong> seçeneğine tıklayarak çerez kullanımımızı kabul edebilirsiniz. Detaylar için <a href="../legal/cookie-policy.html" class="span-underline"><strong class="bold-text">çerez politikamızı</strong></a> inceleyebilirsiniz.`;

let fixedCount = 0;
htmlFiles.forEach(htmlPath => {
  if (!fs.existsSync(htmlPath)) return;
  let c = fs.readFileSync(htmlPath, 'utf8');
  
  if (c.includes(oldCookieText)) {
    c = c.replace(oldCookieText, newCookieText);
    fixedCount++;
  }
  if (c.includes(oldCookieTextSubpage)) {
    c = c.replace(oldCookieTextSubpage, newCookieTextSubpage);
    fixedCount++;
  }
  
  // Also use a regex to catch any remaining variations
  c = c.replace(
    /Select <strong>'Tümünü Kabul Et'<\/strong>[^<]*to agree to our use of cookies[^<]*/gi,
    'Gezinme deneyiminizi geliştirmek için çerez kullanıyoruz. <strong>"Tümünü Kabul Et"</strong> seçeneğine tıklayarak kabul edebilirsiniz.'
  );
  
  fs.writeFileSync(htmlPath, c, 'utf8');
});

console.log(`Fixed cookie text in ${fixedCount} files`);

// Final verify
const c = fs.readFileSync(path.join(WORKSPACE, 'index.html'), 'utf8');
const cpos = c.indexOf('class="cookie-w"');
const snippet = c.substring(cpos, cpos + 600).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
console.log('\nFinal cookie text:', snippet.substring(0, 200));
