const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const htmlFiles = fs.readdirSync(WORKSPACE)
  .filter(f => f.endsWith('.html'))
  .map(f => path.join(WORKSPACE, f));

// ====== 1. Fix cookie text (using raw approach) ======
htmlFiles.forEach(htmlPath => {
  if (!fs.existsSync(htmlPath)) return;
  let c = fs.readFileSync(htmlPath, 'utf8');

  // Find the cookie-w section and replace the p text directly
  const cookieWPos = c.indexOf('class="cookie-w"');
  if (cookieWPos === -1) return;

  const pStart = c.indexOf('<p class="text-cookie">', cookieWPos);
  const pEnd = c.indexOf('</p>', pStart);
  if (pStart === -1 || pEnd === -1) return;

  const oldText = c.substring(pStart, pEnd + 4);
  const filename = path.basename(htmlPath);
  const isSubpage = filename !== 'index.html';
  const cookieHref = isSubpage ? '../legal/cookie-policy.html' : 'legal/cookie-policy.html';

  const newText = `<p class="text-cookie">Gezinme deneyiminizi geliştirmek için çerez kullanıyoruz. <strong>"Tümünü Kabul Et"</strong> ile kabul edebilir veya <a href="${cookieHref}" class="span-underline"><strong class="bold-text">çerez politikamızı</strong></a> inceleyebilirsiniz.</p>`;

  c = c.substring(0, pStart) + newText + c.substring(pEnd + 4);
  fs.writeFileSync(htmlPath, c, 'utf8');
  console.log(`Cookie text fixed in: ${filename}`);
});

// ====== 2. Replace inline nav SVG logo with <img> tag pointing to uzmaniyiz.svg ======
// The old logo SVG starts with: <svg width="100%" height="100%" viewBox="0 0 170 17"
// It's inside: <div class="embed-logo w-embed">

const oldLogoPattern = /<svg width="100%" height="100%" viewBox="0 0 170 17" fill="none" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*?<\/svg>/;

// For index.html and root-level pages, use images/uzmaniyiz.svg
// For subpages (same level), also images/uzmaniyiz.svg
// For pages in legal subfolder, use ../images/uzmaniyiz.svg

const newLogoRoot = `<img src="images/uzmaniyiz.svg" alt="UZMANIYIZ.COM" style="width:100%;height:100%;object-fit:contain;" />`;
const newLogoSubpage = `<img src="images/uzmaniyiz.svg" alt="UZMANIYIZ.COM" style="width:100%;height:100%;object-fit:contain;" />`;

htmlFiles.forEach(htmlPath => {
  if (!fs.existsSync(htmlPath)) return;
  let c = fs.readFileSync(htmlPath, 'utf8');
  const filename = path.basename(htmlPath);
  const isLegal = htmlPath.includes('\\legal\\');
  const logoSrc = isLegal ? '../images/uzmaniyiz.svg' : 'images/uzmaniyiz.svg';
  const newLogo = `<img src="${logoSrc}" alt="UZMANIYIZ.COM" style="width:140px;height:auto;display:block;" />`;

  if (oldLogoPattern.test(c)) {
    c = c.replace(oldLogoPattern, newLogo);
    fs.writeFileSync(htmlPath, c, 'utf8');
    console.log(`Logo SVG replaced in: ${filename}`);
  } else {
    // Also check if there's a specific embed-logo div we can target
    const embedLogoPos = c.indexOf('class="embed-logo w-embed"');
    if (embedLogoPos !== -1) {
      const svgStart = c.indexOf('<svg', embedLogoPos);
      const svgEnd = c.indexOf('</svg>', svgStart) + 6;
      if (svgStart !== -1 && svgEnd !== -1 && svgStart < embedLogoPos + 100) {
        c = c.substring(0, svgStart) + newLogo + c.substring(svgEnd);
        fs.writeFileSync(htmlPath, c, 'utf8');
        console.log(`Logo SVG replaced (embed-logo) in: ${filename}`);
      } else {
        console.log(`Logo pattern not matched in: ${filename}`);
      }
    }
  }
});

console.log('\nAll done! Verify uzmaniyiz.svg exists:');
const svgPath = path.join(WORKSPACE, 'images', 'uzmaniyiz.svg');
console.log('uzmaniyiz.svg exists:', fs.existsSync(svgPath));
