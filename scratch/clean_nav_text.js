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

const textMappings = [
  // 1. Creator Media -> Site Tasarımı
  {
    regex: /<div[^>]*class="[^"]*text-title-mission[^"]*is-overlay[^"]*is-navlink[^"]*"[^>]*>[\s\S]*?Creator Media[\s\S]*?<\/div>/gi,
    replacement: '<div data-split="chars,words" aria-hidden="true" data-module="split" class="text-title-mission is-overlay is-navlink">Site Tasarımı</div>'
  },
  {
    regex: /<div[^>]*class="[^"]*text-title-mission[^"]*is-overlay[^"]*is-navlink[^"]*"[^>]*>C<span class="span-hidden">re<\/span>at<span class="span-hidden">o<\/span>r Media<\/div>/gi,
    replacement: '<div data-split="chars,words" aria-hidden="true" data-module="split" class="text-title-mission is-overlay is-navlink">Site Tasarımı</div>'
  },

  // 2. Creator Communities -> Tanıtım ve Tasarım
  {
    regex: /<div[^>]*class="[^"]*text-title-mission[^"]*is-overlay[^"]*is-navlink[^"]*"[^>]*>C<span class="span-hidden">re<\/span>at<span class="span-hidden">o<\/span>r communities<\/div>/gi,
    replacement: '<div data-split="chars,words" aria-hidden="true" data-module="split" class="text-title-mission is-overlay is-navlink">Tanıtım ve Tasarım</div>'
  },
  {
    regex: /<div[^>]*class="[^"]*text-title-mission[^"]*is-navlink[^"]*"[^>]*>\s*Creator communities\s*<\/div>/gi,
    replacement: '<div data-split="chars,words" data-module="split" class="text-title-mission is-navlink">Tanıtım ve Tasarım</div>'
  },

  // 3. Creator Products -> Ürün Siteleri
  {
    regex: /<div[^>]*class="[^"]*text-title-mission[^"]*is-overlay[^"]*is-navlink[^"]*"[^>]*>C<span class="span-hidden">re<\/span>at<span class="span-hidden">o<\/span>r products<\/div>/gi,
    replacement: '<div data-split="chars,words" aria-hidden="true" data-module="split" class="text-title-mission is-overlay is-navlink">Ürün Siteleri</div>'
  },
  {
    regex: /<div[^>]*class="[^"]*text-title-mission[^"]*is-navlink[^"]*"[^>]*>\s*Creator products\s*<\/div>/gi,
    replacement: '<div data-split="chars,words" data-module="split" class="text-title-mission is-navlink">Ürün Siteleri</div>'
  },

  // 4. Creator Tech -> Üretici ve Sanayi
  {
    regex: /<div[^>]*class="[^"]*text-title-mission[^"]*is-overlay[^"]*is-navlink[^"]*"[^>]*>C<span class="span-hidden">re<\/span>at<span class="span-hidden">o<\/span>r Tech<\/div>/gi,
    replacement: '<div data-split="chars,words" aria-hidden="true" data-module="split" class="text-title-mission is-overlay is-navlink">Üretici ve Sanayi</div>'
  },
  {
    regex: /<div[^>]*class="[^"]*text-title-mission[^"]*is-overlay[^"]*is-navlink[^"]*"[^>]*>\s*Creator Tech\s*<\/div>/gi,
    replacement: '<div data-split="chars,words" aria-hidden="true" data-module="split" class="text-title-mission is-overlay is-navlink">Üretici ve Sanayi</div>'
  }
];

htmlFiles.forEach(htmlPath => {
  if (!fs.existsSync(htmlPath)) return;
  
  let content = fs.readFileSync(htmlPath, 'utf8');
  
  textMappings.forEach(mapping => {
    content = content.replace(mapping.regex, mapping.replacement);
  });
  
  // Also globally replace any loose Creator communities/products strings just in case they exist elsewhere in text!
  content = content.replace(/Creator communities/gi, 'Tanıtım ve Tasarım');
  content = content.replace(/Creator products/gi, 'Ürün Siteleri');
  content = content.replace(/Creator Tech/gi, 'Üretici ve Sanayi');
  content = content.replace(/Creator Media/gi, 'Site Tasarımı');
  
  // Also any remaining `C<span class="span-hidden">re</span>at<span class="span-hidden">o</span>r`
  content = content.replace(/C<span class="span-hidden">re<\/span>at<span class="span-hidden">o<\/span>r/gi, 'Site Tasarımı');

  fs.writeFileSync(htmlPath, content, 'utf8');
  console.log(`Cleaned overlapping texts in: ${path.basename(htmlPath)}`);
});
