const fs = require('fs');
const path = require('path');

const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

// Source files
const filesToMove = [
  {
    src: path.join(WORKSPACE, 'cdn.prod.website-files.com', '6932cd1b03d7cbc06304d0ee', 'css', 'ob-steven.shared.c74eb9ec4.min.css'),
    dest: path.join(WORKSPACE, 'assets', 'main.css'),
    patterns: [
      /https:\/\/cdn\.prod\.website-files\.com\/6932cd1b03d7cbc06304d0ee\/css\/ob-steven\.shared\.c74eb9ec4\.min\.css/g,
      /\.\.\/cdn\.prod\.website-files\.com\/6932cd1b03d7cbc06304d0ee\/css\/ob-steven\.shared\.c74eb9ec4\.min\.css/g
    ]
  },
  {
    src: path.join(WORKSPACE, 'cdn.prod.website-files.com', '6932cd1b03d7cbc06304d0ee', 'js', 'ob-steven.751e0867.148dc658e77a3916.js'),
    dest: path.join(WORKSPACE, 'assets', 'main.js'),
    patterns: [
      /https:\/\/cdn\.prod\.website-files\.com\/6932cd1b03d7cbc06304d0ee\/js\/ob-steven\.751e0867\.148dc658e77a3916\.js/g
    ]
  },
  {
    src: path.join(WORKSPACE, 'cdn.prod.website-files.com', '6932cd1b03d7cbc06304d0ee', 'js', 'ob-steven.schunk.79b71263bda4d666.js'),
    dest: path.join(WORKSPACE, 'assets', 'chunk.js'),
    patterns: [
      /https:\/\/cdn\.prod\.website-files\.com\/6932cd1b03d7cbc06304d0ee\/js\/ob-steven\.schunk\.79b71263bda4d666\.js/g
    ]
  },
  {
    src: path.join(WORKSPACE, 'd3e54v103j8qbb.cloudfront.net', 'js', 'jquery-3.5.1.min.dc5e7f18c87e42.js'),
    dest: path.join(WORKSPACE, 'assets', 'jquery.js'),
    patterns: [
      /https:\/\/d3e54v103j8qbb\.cloudfront\.net\/js\/jquery-3\.5\.1\.min\.dc5e7f18c8\.js\?site=6932cd1b03d7cbc06304d0ee/g,
      /https:\/\/d3e54v103j8qbb\.cloudfront\.net\/js\/jquery-3\.5\.1\.min\.dc5e7f18c8\.js/g
    ]
  }
];

// Move the files
filesToMove.forEach(f => {
  if (fs.existsSync(f.src)) {
    fs.renameSync(f.src, f.dest);
    console.log(`Moved ${path.basename(f.src)} to ${path.basename(f.dest)}`);
  } else {
    console.log(`File not found: ${f.src}`);
  }
});

// Update HTML files
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
  
  filesToMove.forEach(f => {
    f.patterns.forEach(pattern => {
      content = content.replace(pattern, `./assets/${path.basename(f.dest)}`);
    });
  });

  // Also remove the offending preload link that causes the console warning
  content = content.replace(/<link rel="preload"[^>]*preloader-base-grey\.webp"[^>]*>/g, '');
  
  // Also clean the `<script ... src="../www.googletagmanager.com/gtm5445.html?id=...` which causes the syntax error
  content = content.replace(/<script[^>]*src="\.\.\/www\.googletagmanager\.com[^>]*><\/script>/g, '');
  // And if it is dynamically loaded:
  content = content.replace(/'\.\.\/www\.googletagmanager\.com\/gtm5445\.html\?id='\+i\+dl;/g, `'https://www.googletagmanager.com/gtm.js?id='+i+dl;`);

  fs.writeFileSync(htmlPath, content, 'utf8');
  console.log(`Updated references in: ${path.basename(htmlPath)}`);
});

// Optional: cleanup empty folders
try {
  fs.rmSync(path.join(WORKSPACE, 'cdn.prod.website-files.com'), { recursive: true, force: true });
  fs.rmSync(path.join(WORKSPACE, 'd3e54v103j8qbb.cloudfront.net'), { recursive: true, force: true });
  fs.rmSync(path.join(WORKSPACE, 'uzmaniyiz.com'), { recursive: true, force: true });
  fs.rmSync(path.join(WORKSPACE, 'uzmaniyiz.itsoffbrand.io'), { recursive: true, force: true });
  fs.rmSync(path.join(WORKSPACE, 'hts-cache'), { recursive: true, force: true });
  console.log('Cleaned up old folders.');
} catch (e) {
  console.log('Error cleaning up folders:', e.message);
}
