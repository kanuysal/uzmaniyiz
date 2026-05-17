const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

['index.html', 'site-tasarimi.html', 'uretici-ve-sanayi.html'].forEach(f => {
  const c = fs.readFileSync(path.join(WORKSPACE, f), 'utf8');
  
  // Check logo
  const embedPos = c.indexOf('embed-logo w-embed');
  if (embedPos !== -1) {
    const logoSnippet = c.substring(embedPos, embedPos + 200);
    const hasSvg = logoSnippet.includes('<svg');
    const hasImg = logoSnippet.includes('<img');
    console.log(`[${f}] Logo: ${hasImg ? '✅ <img>' : hasSvg ? '❌ still SVG' : '?'}`);
    if (hasImg) {
      const imgMatch = logoSnippet.match(/src="([^"]+)"/);
      console.log(`  src: ${imgMatch ? imgMatch[1] : '?'}`);
    }
  }
  
  // Check cookie
  const cookiePos = c.indexOf('class="cookie-w"');
  if (cookiePos !== -1) {
    const pMatch = c.substring(cookiePos, cookiePos + 500).match(/<p class="text-cookie">([\s\S]*?)<\/p>/);
    if (pMatch) {
      const text = pMatch[1].replace(/<[^>]+>/g, '').trim();
      console.log(`[${f}] Cookie: "${text.substring(0, 80)}..."`);
    }
  }
  console.log('');
});
