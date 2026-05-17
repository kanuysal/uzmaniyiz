const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const allFiles = fs.readdirSync(WORKSPACE)
  .filter(f => f.endsWith('.html'))
  .map(f => path.join(WORKSPACE, f));
const legalDir = path.join(WORKSPACE, 'legal');
if (fs.existsSync(legalDir)) {
  fs.readdirSync(legalDir).filter(f => f.endsWith('.html'))
    .forEach(f => allFiles.push(path.join(legalDir, f)));
}

// ====================================================
// STEP 1: Homepage H1 + body text + cookie banner
// ====================================================
{
  const indexPath = path.join(WORKSPACE, 'index.html');
  let c = fs.readFileSync(indexPath, 'utf8');

  // Fix H1
  c = c.replace(
    /class="text-title-homepage ch-max">the operating system for the creator economy\.\s*<\/h1>/,
    'class="text-title-homepage ch-max">Sıradan olmayanlara, Sanatsal web sitesi tasarımları.<\/h1>'
  );

  // Fix homepage body paragraph under H1
  c = c.replace(
    /class="text-body ch-max">In an era where trust has shifted from institutions to individuals, the creator sits at the heart of our ecosystem, connected to resources, platforms, community and technology\.<\/p>/,
    'class="text-body ch-max">Topluluğumuzun bir parçası olan markaların ve girişimcilerin dijital hikayelerini birlikte yaratıyoruz.<\/p>'
  );

  // Fix "Our Story" / "Manifesto" button text that appears under H1
  c = c.replace(/>Our Story</g, '>Hikayemiz<');
  c = c.replace(/>Manifesto</g, '>Vizyonumuz<');
  c = c.replace(/>Learn More</g, '>Daha Fazla<');
  c = c.replace(/>Get Started</g, '>Başlayalım<');
  c = c.replace(/>Join the community</gi, '>Topluluğa Katıl<');
  c = c.replace(/>Join now</gi, '>Hemen Katıl<');
  c = c.replace(/>Explore</gi, '>Keşfet<');

  // JSON-LD schema description
  c = c.replace(
    /"description": "The operating system for the creator economy. Connecting creators to resources, platforms, community and technology where trust shifts to individuals."/,
    '"description": "Sıradan olmayanlara sanatsal web sitesi tasarımları. Markanızın dijital dünyadaki varlığını birlikte inşa ediyoruz."'
  );
  c = c.replace(
    /"slogan": "[^"]*"/,
    '"slogan": "Sadece tasarlamıyoruz, işlerimizi birlikte büyütüyoruz."'
  );

  fs.writeFileSync(indexPath, c, 'utf8');
  console.log('Fixed index.html H1 and body text');
}

// ====================================================
// STEP 2: Cookie banner - find and translate in ALL files
// ====================================================
allFiles.forEach(htmlPath => {
  if (!fs.existsSync(htmlPath)) return;
  let c = fs.readFileSync(htmlPath, 'utf8');

  // Cookie consent text patterns
  c = c.replace(/We use cookies/gi, 'Çerez kullanıyoruz');
  c = c.replace(/This site uses cookies/gi, 'Bu site çerez kullanmaktadır');
  c = c.replace(/We use cookies to enhance your experience/gi, 'Deneyiminizi geliştirmek için çerez kullanıyoruz');
  c = c.replace(/Accept All/gi, 'Tümünü Kabul Et');
  c = c.replace(/Accept all/gi, 'Tümünü Kabul Et');
  c = c.replace(/Decline All/gi, 'Tümünü Reddet');
  c = c.replace(/Decline all/gi, 'Tümünü Reddet');
  c = c.replace(/Accept Cookies/gi, 'Çerezleri Kabul Et');
  c = c.replace(/Reject All/gi, 'Tümünü Reddet');
  c = c.replace(/Manage Preferences/gi, 'Tercihleri Yönet');
  c = c.replace(/Cookie Preferences/gi, 'Çerez Tercihleri');
  c = c.replace(/Cookie Settings/gi, 'Çerez Ayarları');
  c = c.replace(/Save Preferences/gi, 'Tercihleri Kaydet');
  c = c.replace(/>Necessary</g, '>Zorunlu<');
  c = c.replace(/>Analytics</g, '>Analitik<');
  c = c.replace(/>Marketing</g, '>Pazarlama<');
  c = c.replace(/>Functional</g, '>İşlevsel<');
  c = c.replace(/data-cookie="accept">([^<]*Accept[^<]*)</g, 'data-cookie="accept">Kabul Et<');
  c = c.replace(/data-cookie="decline">([^<]*Decline[^<]*)</g, 'data-cookie="decline">Reddet<');
  c = c.replace(/data-cookie="settings">([^<]*)<\/div><\/div><\/button>/g, 'data-cookie="settings">Çerez Ayarları</div></div></button>');

  // Fix specific cookie button patterns
  c = c.replace(/>Accept<\/div>/g, '>Kabul Et</div>');
  c = c.replace(/>Decline<\/div>/g, '>Reddet</div>');

  // Fix any "cookie-policy" page links text
  c = c.replace(/>cookie policy</gi, '>çerez politikası<');
  c = c.replace(/>Cookie Policy</g, '>Çerez Politikası<');
  c = c.replace(/>Privacy Policy</g, '>Gizlilik Politikası<');
  c = c.replace(/>Terms of Service</g, '>Kullanım Koşulları<');

  fs.writeFileSync(htmlPath, c, 'utf8');
});
console.log('Cookie banner localized in all files');

// ====================================================
// STEP 3: Subpage intro/callout text translations
// (text-title-callout DOM elements and intro body text)
// ====================================================
const subpageIntros = {
  'site-tasarimi.html': {
    calloutRegex: /class="[^"]*text-title-callout[^"]*"[^>]*>([\s\S]{0,200}?)<\/div>/,
    callout: 'Markanız için özel tasarım.',
    bodyIntro: 'Dijital kimliğinizi en iyi şekilde yansıtan bir web sitesi, işinizin en güçlü satış aracıdır.',
    explore: 'Çalışmalarımızı İncele',
  },
  'tanitim-ve-tasarim.html': {
    callout: 'İzleyenleri etkileyen tasarım.',
    bodyIntro: 'Güçlü bir görsel kimlik, markanızı rakiplerinizden ayıran en önemli faktördür.',
    explore: 'Çalışmalarımızı İncele',
  },
  'urun-siteleri.html': {
    callout: 'Ürününüzü öne çıkaran site.',
    bodyIntro: 'Online satışlarınızı artırmak için tasarlanmış, yüksek dönüşüm oranlı ürün siteleri.',
    explore: 'Çalışmalarımızı İncele',
  },
  'uretici-ve-sanayi.html': {
    callout: 'Sektörünüzü dijitalde temsil edin.',
    bodyIntro: 'B2B ve sanayi markaları için güvenilirlik ve uzmanlığı yansıtan profesyonel dijital kimlik.',
    explore: 'Çalışmalarımızı İncele',
  }
};

Object.entries(subpageIntros).forEach(([filename, config]) => {
  const htmlPath = path.join(WORKSPACE, filename);
  if (!fs.existsSync(htmlPath)) return;
  let c = fs.readFileSync(htmlPath, 'utf8');

  // Fix "Explore" button
  c = c.replace(/>Explore</g, '>Keşfet<');
  c = c.replace(/>View more</gi, '>Daha Fazla Gör<');
  c = c.replace(/>View all</gi, '>Tümünü Gör<');
  c = c.replace(/>See more</gi, '>Daha Fazla<');
  c = c.replace(/>Load more</gi, '>Daha Fazla Yükle<');

  // Find and replace subpage intro text (text-title-callout in body)
  const bodyStart = c.indexOf('<body');
  const styleEnd = c.lastIndexOf('</style>', bodyStart > 0 ? bodyStart : c.length);

  // Look for text-title-callout after the last style block
  const calloutInDom = c.indexOf('text-title-callout', Math.max(styleEnd, bodyStart));
  if (calloutInDom !== -1) {
    // Get the full div
    const closingDiv = c.indexOf('</div>', calloutInDom);
    const excerpt = c.substring(calloutInDom - 100, closingDiv + 6);
    // Extract the inner text
    const innerTextMatch = excerpt.match(/>([^<]{5,})</);
    if (innerTextMatch) {
      const oldText = innerTextMatch[1];
      c = c.substring(0, calloutInDom - 100 + excerpt.indexOf(oldText)) + 
          config.callout + 
          c.substring(calloutInDom - 100 + excerpt.indexOf(oldText) + oldText.length);
      console.log(`[${filename}] callout: "${oldText}" -> "${config.callout}"`);
    }
  }

  fs.writeFileSync(htmlPath, c, 'utf8');
});

// ====================================================
// STEP 4: Fix scroll issue in uretici-ve-sanayi
// The page might have a CSS that blocks scroll on the body
// ====================================================
{
  const ureticiPath = path.join(WORKSPACE, 'uretici-ve-sanayi.html');
  let c = fs.readFileSync(ureticiPath, 'utf8');
  
  // Remove the previously added overflow fix and add a proper one
  c = c.replace(/<style>\/\* overflow-fix-uretici \*\/[\s\S]*?<\/style>/, '');
  
  // Add better scroll fix before </head>
  const scrollFix = `<style>
  /* scroll-fix: ensure page scrolls */
  html, body { overflow-x: hidden; overflow-y: auto !important; height: auto !important; }
  .page-w { min-height: 100vh; }
  .main-w { overflow: visible !important; }
</style>`;
  c = c.replace('</head>', scrollFix + '</head>');

  fs.writeFileSync(ureticiPath, c, 'utf8');
  console.log('Fixed scroll in uretici-ve-sanayi.html');
}

// ====================================================
// STEP 5: Fix meta description in all pages (og:description still has English)
// ====================================================
const metaDescriptions = {
  'index.html': 'Sıradan olmayanlara sanatsal web sitesi tasarımları. Topluluğumuzun bir parçası olan markaların dijital hikayelerini birlikte yaratıyoruz.',
  'site-tasarimi.html': 'Markanızın dijital kimliğini yansıtan, kullanıcı dostu ve dönüşüm odaklı profesyonel web sitesi tasarımı.',
  'tanitim-ve-tasarim.html': 'Hedef kitlenize ulaşan etkili tanıtım materyalleri ve grafik tasarım hizmetleri.',
  'urun-siteleri.html': 'Ürünlerinizi en iyi şekilde sergileyen e-ticaret ve ürün tanıtım siteleri.',
  'uretici-ve-sanayi.html': 'Üretici ve sanayi kuruluşları için özel web tasarım ve dijital dönüşüm çözümleri.',
  'bize-katilin.html': 'Topluluğumuza katılın. Dijital büyüme yolculuğunuzu birlikte başlatalım.'
};

Object.entries(metaDescriptions).forEach(([filename, desc]) => {
  const htmlPath = path.join(WORKSPACE, filename);
  if (!fs.existsSync(htmlPath)) return;
  let c = fs.readFileSync(htmlPath, 'utf8');
  c = c.replace(/<meta content="[^"]*" property="og:description"\/>/g, `<meta content="${desc}" property="og:description"/>`);
  c = c.replace(/<meta content="[^"]*" property="twitter:description"\/>/g, `<meta content="${desc}" property="twitter:description"/>`);
  fs.writeFileSync(htmlPath, c, 'utf8');
  console.log(`Updated og:description in ${filename}`);
});

console.log('\nAll fixes complete!');
