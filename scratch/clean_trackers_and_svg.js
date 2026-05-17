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
  
  // Remove tracking pixels
  content = content.replace(/<!-- PIXEL TRACKING -->[\s\S]*?<\/script>/gi, '');
  content = content.replace(/<!-- GA \/ GTM INIT -->[\s\S]*?<\/script>/gi, '');
  
  // Empty the old STEVEN SVG paths so they don't animate or show up
  content = content.replace(/(class="preloader-svg-w is-2" style="display:none;">)[\s\S]*?<\/svg>/gi, '$1</svg>');
  // Also if there's any without the display:none style (just in case)
  content = content.replace(/(class="preloader-svg-w is-2">)[\s\S]*?<\/svg>/gi, '$1</svg>');
  
  // Also clean the old `<svg ...>` without is-2 if it exists
  content = content.replace(/(<svg[^>]*data-preloader-anim[^>]*>)[\s\S]*?<\/svg>/gi, '$1</svg>');

  fs.writeFileSync(htmlPath, content, 'utf8');
  console.log(`Cleaned up tracking and old paths in: ${path.basename(htmlPath)}`);
});
