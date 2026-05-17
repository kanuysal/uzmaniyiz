const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const htmlFiles = fs.readdirSync(WORKSPACE)
  .filter(f => f.endsWith('.html'))
  .map(f => path.join(WORKSPACE, f));

const logoStyleFix = `
<style>
/* Logo dark/light mode color fix */
.embed-logo img, .nav-brand img {
  filter: none;
  transition: filter 0.3s ease;
}
[data-theme="dark"] .embed-logo img,
[data-theme="dark"] .nav-brand img {
  filter: invert(1) brightness(2);
}
/* Also handle the default dark state (site starts dark) */
body:not([data-theme="light"]) .embed-logo img,
body:not([data-theme="light"]) .nav-brand img {
  filter: invert(1) brightness(2);
}
[data-theme="light"] .embed-logo img,
[data-theme="light"] .nav-brand img {
  filter: none;
}
</style>`;

htmlFiles.forEach(htmlPath => {
  if (!fs.existsSync(htmlPath)) return;
  let c = fs.readFileSync(htmlPath, 'utf8');

  // 1. Add logo dark mode CSS (inject before </head> if not already there)
  if (!c.includes('Logo dark/light mode color fix')) {
    c = c.replace('</head>', logoStyleFix + '\n</head>');
    console.log(`Added logo dark mode CSS to: ${path.basename(htmlPath)}`);
  }

  // 2. Fix the preloader text - add letter-spacing around the dot
  // Change "UZMANIYIZ.COM" to "UZMANIYIZ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;COM"
  // Using a span with padding for cleaner control
  const oldPreloaderText = `  UZMANIYIZ.COM\n`;
  const newPreloaderText = `  UZMANIYIZ<span style="padding: 0 0.4em">.</span>COM\n`;
  
  if (c.includes(oldPreloaderText)) {
    c = c.replace(oldPreloaderText, newPreloaderText);
    console.log(`Updated preloader dot spacing in: ${path.basename(htmlPath)}`);
  }

  // Also handle without leading spaces
  const oldPreloaderText2 = `UZMANIYIZ.COM`;
  // Only replace inside the preloader div, not everywhere
  const preloaderPos = c.indexOf('class="preloader-logo-text"');
  if (preloaderPos !== -1) {
    const preloaderEnd = c.indexOf('</div>', preloaderPos) + 6;
    let preloaderSection = c.substring(preloaderPos, preloaderEnd);
    
    if (preloaderSection.includes('UZMANIYIZ.COM') && !preloaderSection.includes('padding: 0 0.4em')) {
      preloaderSection = preloaderSection.replace(
        'UZMANIYIZ.COM',
        'UZMANIYIZ<span style="padding: 0 0.4em">.</span>COM'
      );
      c = c.substring(0, preloaderPos) + preloaderSection + c.substring(preloaderEnd);
      console.log(`Updated preloader dot (method 2) in: ${path.basename(htmlPath)}`);
    }
  }

  // 3. Also update the img style to ensure currentColor-like behavior via CSS
  // Replace static style on the logo img with a class reference
  c = c.replace(
    /(<img src="[^"]*uzmaniyiz\.svg"[^>]*) style="[^"]*"/g,
    '$1 class="brand-logo-img" style="width:140px;height:auto;display:block;"'
  );

  fs.writeFileSync(htmlPath, c, 'utf8');
});

console.log('\nDone! Verifying...');
const c = fs.readFileSync(path.join(WORKSPACE, 'index.html'), 'utf8');
const preloaderPos = c.indexOf('class="preloader-logo-text"');
const preloaderEnd = c.indexOf('</div>', preloaderPos) + 6;
console.log('Preloader text:', c.substring(preloaderPos, preloaderEnd).replace(/<[^>]+>/g, '|').trim());

const logoPos = c.indexOf('embed-logo w-embed');
console.log('Logo area:', c.substring(logoPos, logoPos + 150));
