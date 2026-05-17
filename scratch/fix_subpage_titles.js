const fs = require('fs');
const path = require('path');

const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

// Page-specific configurations
const pageConfigs = [
  {
    file: 'site-tasarimi.html',
    oldH1: /Creator\s*<br\/>[\s\S]*?Media[\s\S]*?<br\/>/gi,
    newH1: 'Site Tasarımı<br/>',
    oldOverlay: /(<span class="span-visible">)C(<\/span>)r(<span class="span-visible">)eat(<\/span>)o(<span class="span-visible">)r(<\/span>)[\s\S]*?Media[\s\S]*?(<br\/>)/gi,
    newOverlay: '<span class="span-visible">S</span>i<span class="span-visible">t</span>e<span class="span-visible"> </span>T<span class="span-visible">asarı</span>m<span class="span-visible">ı</span><br/>',
  },
  {
    file: 'tanitim-ve-tasarim.html',
    oldH1: /Creator\s*<br\/>[\s\S]*?comm?un?ities?[\s\S]*?<br\/>/gi,
    newH1: 'Tanıtım ve<br/>Tasarım<br/>',
    oldOverlay: /(<span class="span-visible">)C(<\/span>)r(<span class="span-visible">)eat(<\/span>)o(<span class="span-visible">)r(<\/span>)[\s\S]*?comm?un?ities?[\s\S]*?(<br\/>)/gi,
    newOverlay: '<span class="span-visible">T</span>a<span class="span-visible">nı</span>t<span class="span-visible">ım</span><br/>',
  },
  {
    file: 'urun-siteleri.html',
    oldH1: /Creator\s*<br\/>[\s\S]*?[Pp]roducts?[\s\S]*?<br\/>/gi,
    newH1: 'Ürün<br/>Siteleri<br/>',
    oldOverlay: /(<span class="span-visible">)C(<\/span>)r(<span class="span-visible">)eat(<\/span>)o(<span class="span-visible">)r(<\/span>)[\s\S]*?[Pp]roducts?[\s\S]*?(<br\/>)/gi,
    newOverlay: '<span class="span-visible">Ü</span>r<span class="span-visible">ün</span><br/>',
  },
  {
    file: 'uretici-ve-sanayi.html',
    oldH1: /Creator\s*<br\/>[\s\S]*?[Tt]ech[\s\S]*?<br\/>/gi,
    newH1: 'Üretici ve<br/>Sanayi<br/>',
    oldOverlay: /(<span class="span-visible">)C(<\/span>)r(<span class="span-visible">)eat(<\/span>)o(<span class="span-visible">)r(<\/span>)[\s\S]*?[Tt]ech[\s\S]*?(<br\/>)/gi,
    newOverlay: '<span class="span-visible">Ü</span>r<span class="span-visible">eti</span>c<span class="span-visible">i</span><br/>',
  }
];

// The preloader SVG is-3 contains V and N letter paths from old "STEVEN" logo
// We'll clear it completely
const preloaderIs3Regex = /(<svg[^>]*class="preloader-svg-w is-3"[^>]*>)[\s\S]*?(<\/svg>)/g;

const allHtmlFiles = [
  'index.html',
  'site-tasarimi.html',
  'tanitim-ve-tasarim.html',
  'urun-siteleri.html',
  'uretici-ve-sanayi.html',
  'join-us.html'
];

// 1. First clear the preloader SVG is-3 from ALL files
allHtmlFiles.forEach(filename => {
  const htmlPath = path.join(WORKSPACE, filename);
  if (!fs.existsSync(htmlPath)) return;
  let content = fs.readFileSync(htmlPath, 'utf8');
  content = content.replace(preloaderIs3Regex, '$1$2'); // remove inner paths
  fs.writeFileSync(htmlPath, content, 'utf8');
  console.log(`Cleared preloader SVG is-3 in: ${filename}`);
});

// 2. Fix subpage h1 titles using simple string replacements
const subpageH1Map = {
  'site-tasarimi.html': [
    { from: '<h1 data-split="chars,lines" data-module="split" class="text-title-large is-subpage">Creator <br/>\nMedia<br/></h1>', to: '<h1 data-split="chars,lines" data-module="split" class="text-title-large is-subpage">Site Tasarımı<br/></h1>' },
    { from: '<h1 data-split="chars,lines" data-module="split" class="text-title-large is-subpage">Creator \nMedia<br/></h1>', to: '<h1 data-split="chars,lines" data-module="split" class="text-title-large is-subpage">Site Tasarımı<br/></h1>' },
    // generic fallback
    { fromRegex: /<h1[^>]*class="text-title-large is-subpage"[^>]*>Creator\s*<br\/>\s*Media[\s\S]*?<\/h1>/gi, to: '<h1 data-split="chars,lines" data-module="split" class="text-title-large is-subpage">Site Tasarımı<br/></h1>' },
    { fromRegex: /<h1[^>]*class="text-title-large is-subpage"[^>]*>[\s\S]*?Media[\s\S]*?<\/h1>/gi, to: '<h1 data-split="chars,lines" data-module="split" class="text-title-large is-subpage">Site Tasarımı<br/></h1>' },
  ],
  'tanitim-ve-tasarim.html': [
    { fromRegex: /<h1[^>]*class="text-title-large is-subpage"[^>]*>[\s\S]*?[Cc]ommunit[\s\S]*?<\/h1>/gi, to: '<h1 data-split="chars,lines" data-module="split" class="text-title-large is-subpage">Tanıtım ve<br/>Tasarım<br/></h1>' },
    { fromRegex: /<h1[^>]*class="text-title-large is-subpage"[^>]*>[\s\S]*?[Cc]ommunities[\s\S]*?<\/h1>/gi, to: '<h1 data-split="chars,lines" data-module="split" class="text-title-large is-subpage">Tanıtım ve<br/>Tasarım<br/></h1>' },
  ],
  'urun-siteleri.html': [
    { fromRegex: /<h1[^>]*class="text-title-large is-subpage"[^>]*>[\s\S]*?[Pp]roduct[\s\S]*?<\/h1>/gi, to: '<h1 data-split="chars,lines" data-module="split" class="text-title-large is-subpage">Ürün<br/>Siteleri<br/></h1>' },
  ],
  'uretici-ve-sanayi.html': [
    { fromRegex: /<h1[^>]*class="text-title-large is-subpage"[^>]*>[\s\S]*?[Tt]ech[\s\S]*?<\/h1>/gi, to: '<h1 data-split="chars,lines" data-module="split" class="text-title-large is-subpage">Üretici ve<br/>Sanayi<br/></h1>' },
    { fromRegex: /<h1[^>]*class="text-title-large is-subpage"[^>]*>Creator\s*<br\/>\s*Tech[\s\S]*?<\/h1>/gi, to: '<h1 data-split="chars,lines" data-module="split" class="text-title-large is-subpage">Üretici ve<br/>Sanayi<br/></h1>' },
  ]
};

// Also fix overlay divs
const overlayMap = {
  'site-tasarimi.html': {
    fromRegex: /<div[^>]*class="text-title-large is-subpage is-overlay"[^>]*>[\s\S]*?<\/div>/gi,
    to: '<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Site Tasarımı</span><br/></div>'
  },
  'tanitim-ve-tasarim.html': {
    fromRegex: /<div[^>]*class="text-title-large is-subpage is-overlay"[^>]*>[\s\S]*?<\/div>/gi,
    to: '<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Tanıtım ve</span><br/><span class="span-visible">Tasarım</span><br/></div>'
  },
  'urun-siteleri.html': {
    fromRegex: /<div[^>]*class="text-title-large is-subpage is-overlay"[^>]*>[\s\S]*?<\/div>/gi,
    to: '<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Ürün</span><br/><span class="span-visible">Siteleri</span><br/></div>'
  },
  'uretici-ve-sanayi.html': {
    fromRegex: /<div[^>]*class="text-title-large is-subpage is-overlay"[^>]*>[\s\S]*?<\/div>/gi,
    to: '<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Üretici ve</span><br/><span class="span-visible">Sanayi</span><br/></div>'
  }
};

Object.entries(subpageH1Map).forEach(([filename, replacements]) => {
  const htmlPath = path.join(WORKSPACE, filename);
  if (!fs.existsSync(htmlPath)) return;
  let content = fs.readFileSync(htmlPath, 'utf8');
  
  replacements.forEach(r => {
    if (r.fromRegex) {
      content = content.replace(r.fromRegex, r.to);
    } else if (r.from) {
      content = content.replace(r.from, r.to);
    }
  });
  
  // Also fix overlay
  const overlay = overlayMap[filename];
  if (overlay) {
    content = content.replace(overlay.fromRegex, overlay.to);
  }
  
  fs.writeFileSync(htmlPath, content, 'utf8');
  console.log(`Fixed h1 titles in: ${filename}`);
});
