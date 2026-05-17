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
  
  // Replace the old injected div with the properly styled one, adding data-preloader-anim="3" so GSAP picks it up
  const oldDiv = `<div class="preloader-logo-text" style="font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 32px; letter-spacing: 0.18em; color: var(--color-text-main, #ffffff); text-transform: uppercase; text-align: center; width: 100%; display: flex; justify-content: center; align-items: center; white-space: nowrap;">
  UZMANIYIZ.COM
</div>`;

  const newDiv = `<div class="preloader-logo-text" data-preloader-anim="3" style="font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 32px; letter-spacing: 0.18em; color: var(--color--preloader-text); text-transform: uppercase; text-align: center; width: 100%; display: flex; justify-content: center; align-items: center; white-space: nowrap; transition: opacity 0.5s, transform 0.5s;">
  UZMANIYIZ.COM
</div>`;

  // Use a more robust regex to find the div in case whitespace differs
  const oldDivRegex = /<div class="preloader-logo-text" style="[^"]*?color:\s*var\(--color-text-main,\s*#ffffff\);[^"]*?">[\s\S]*?UZMANIYIZ\.COM[\s\S]*?<\/div>/gi;
  
  content = content.replace(oldDivRegex, newDiv);
  
  fs.writeFileSync(htmlPath, content, 'utf8');
  console.log(`Updated preloader text in: ${path.basename(htmlPath)}`);
});
