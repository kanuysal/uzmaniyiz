const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const htmlFiles = fs.readdirSync(WORKSPACE)
  .filter(f => f.endsWith('.html'))
  .map(f => path.join(WORKSPACE, f));

htmlFiles.forEach(htmlPath => {
  if (!fs.existsSync(htmlPath)) return;
  let c = fs.readFileSync(htmlPath, 'utf8');
  
  // Fix remaining cookie button texts
  c = c.replace(/data-cookie="reject"([^>]*)><div class="text-cookie">No thanks<\/div>/g,
    'data-cookie="reject"$1><div class="text-cookie">Hayır, Teşekkürler</div>');
  c = c.replace(/>No thanks</g, '>Hayır, Teşekkürler<');
  c = c.replace(/>No, thanks</g, '>Hayır, Teşekkürler<');
  
  // Find and fix the full cookie banner text
  const cookiePos = c.indexOf('class="cookie-w"');
  if (cookiePos !== -1) {
    const end = c.indexOf('</div></div></div>', cookiePos) + 18;
    let cookieSection = c.substring(cookiePos, end);
    
    // Replace English text inside cookie section
    cookieSection = cookieSection
      .replace(/We use cookies/gi, 'Çerez kullanıyoruz')
      .replace(/improve your experience/gi, 'deneyiminizi geliştirmek için')
      .replace(/our website/gi, 'web sitemizde')
      .replace(/By clicking "Accept All"/gi, '"Tümünü Kabul Et" seçeneğine tıklayarak')
      .replace(/you agree to the storing of cookies/gi, 'çerezlerin cihazınızda depolanmasını kabul etmiş olursunuz')
      .replace(/>Read more</gi, '>Daha Fazla Oku<')
      .replace(/>Learn more</gi, '>Daha Fazla Bilgi<')
      .replace(/here\./gi, 'buraya tıklayın.')
      .replace(/>here\.</gi, '>buraya tıklayın.<');
    
    c = c.substring(0, cookiePos) + cookieSection + c.substring(end);
  }

  fs.writeFileSync(htmlPath, c, 'utf8');
});
console.log('Cookie banner fully localized!');

// Verify
const c = fs.readFileSync(path.join(WORKSPACE, 'index.html'), 'utf8');
const cookieSection = c.substring(c.indexOf('class="cookie-w"'), c.indexOf('class="cookie-w"') + 800);
console.log('\nCookie section preview:');
console.log(cookieSection.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
