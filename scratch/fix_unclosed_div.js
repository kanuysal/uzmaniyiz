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
  
  const marker = 'class="preloader-svg-w is-2" style="display:none;">';
  const pos = content.indexOf(marker);
  
  if (pos !== -1) {
    // Find the next </svg>
    const svgClosePos = content.indexOf('</svg>', pos);
    if (svgClosePos !== -1) {
      // Check if it's already followed by </div>
      const afterSvg = content.substring(svgClosePos + 6, svgClosePos + 20).trim();
      if (!afterSvg.startsWith('</div>')) {
        // We need to inject </div>
        content = content.substring(0, svgClosePos + 6) + '\n</div>\n' + content.substring(svgClosePos + 6);
        fs.writeFileSync(htmlPath, content, 'utf8');
        console.log(`Fixed unclosed div in: ${path.basename(htmlPath)}`);
      } else {
        console.log(`Already fixed: ${path.basename(htmlPath)}`);
      }
    }
  }
});
