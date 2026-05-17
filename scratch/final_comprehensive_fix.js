const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const htmlFiles = fs.readdirSync(WORKSPACE)
  .filter(f => f.endsWith('.html'))
  .map(f => path.join(WORKSPACE, f));
const legalDir = path.join(WORKSPACE, 'legal');
if (fs.existsSync(legalDir)) {
  fs.readdirSync(legalDir).filter(f=>f.endsWith('.html'))
    .forEach(f => htmlFiles.push(path.join(legalDir, f)));
}

// ====== STEP 1: Global text fixes in ALL files ======
htmlFiles.forEach(htmlPath => {
  if (!fs.existsSync(htmlPath)) return;
  let content = fs.readFileSync(htmlPath, 'utf8');

  // Fix "Visit Site" -> "Siteyi Ziyaret Et"
  content = content.replace(/Visit Site/g, 'Siteyi Ziyaret Et');
  content = content.replace(/Visit site/g, 'Siteyi Ziyaret Et');
  content = content.replace(/>Visit</g, '>Ziyaret Et<');

  // Fix "Scroll Down" aria labels
  content = content.replace(/aria-label="Scroll Down"/g, 'aria-label="Aşağı Kaydır"');
  content = content.replace(/Title="Scroll Down"/g, 'Title="Aşağı Kaydır"');

  // Fix "Sketch Mode" aria labels
  content = content.replace(/aria-label="Sketch Mode"/g, 'aria-label="Kalem Modu"');
  content = content.replace(/Title="Sketch Mode"/g, 'Title="Kalem Modu"');

  // Fix "Color Mode Toggle"
  content = content.replace(/aria-label="Color Mode Toggle"/g, 'aria-label="Renk Modu"');

  // Fix nav "About Us" remaining
  content = content.replace(/>About Us</g, '>Hakkımızda<');
  content = content.replace(/>About us</g, '>Hakkımızda<');

  // Fix İletişim link -> bize-katilin
  content = content.replace(/href="join-us\.html"/g, 'href="bize-katilin.html"');

  fs.writeFileSync(htmlPath, content, 'utf8');
});
console.log('Global text fixes done.');

// ====== STEP 2: Fix homepage hero slogan ======
{
  const indexPath = path.join(WORKSPACE, 'index.html');
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Find the preloader tagline text
  content = content.replace(
    /Kreatif ve Profesyonel Web Tasarım Stüdyosu/g,
    'Sadece tasarlamıyoruz, işlerimizi birlikte büyütüyoruz.'
  );
  
  fs.writeFileSync(indexPath, content, 'utf8');
  console.log('Updated index.html hero slogan.');
}

// ====== STEP 3: Update all subpage preloader taglines ======
const taglineMap = {
  'site-tasarimi.html': 'Dijital kimliğinizi birlikte inşa ediyoruz.',
  'tanitim-ve-tasarim.html': 'Markanızı görünür kılıyoruz.',
  'urun-siteleri.html': 'Ürünlerinizi dijital dünyaya taşıyoruz.',
  'uretici-ve-sanayi.html': 'Sanayi güçünüzü dijitalde öne çıkarıyoruz.',
  'bize-katilin.html': 'Topluluğumuzun bir parçası olun.'
};

Object.entries(taglineMap).forEach(([filename, tagline]) => {
  const htmlPath = path.join(WORKSPACE, filename);
  if (!fs.existsSync(htmlPath)) return;
  let content = fs.readFileSync(htmlPath, 'utf8');
  
  // Replace the tagline in the preloader
  content = content.replace(
    /data-preloader="tagline"[^>]*>([^<]*)</g,
    (match, oldText) => match.replace(oldText, tagline)
  );
  
  fs.writeFileSync(htmlPath, content, 'utf8');
  console.log(`Updated tagline in ${filename}: "${tagline}"`);
});

// ====== STEP 4: Fix uretici-ve-sanayi scroll issue ======
// The scroll problem might be the page-w is missing data-start="hidden" or there's overflow:hidden somewhere
{
  const ureticiPath = path.join(WORKSPACE, 'uretici-ve-sanayi.html');
  let content = fs.readFileSync(ureticiPath, 'utf8');
  
  // Check for any overflow:hidden on body or main element that might block scroll
  // Add a scroll-fix style if page-w doesn't have proper height
  if (!content.includes('overflow-fix-uretici')) {
    const styleTag = `<style>/* overflow-fix-uretici */ .page-w { min-height: 100vh; overflow: visible !important; } body { overflow-y: auto !important; }</style>`;
    content = content.replace('</head>', styleTag + '</head>');
    fs.writeFileSync(ureticiPath, content, 'utf8');
    console.log('Added scroll fix to uretici-ve-sanayi.html');
  }
}

// ====== STEP 5: Fix bize-katilin.html nav active link ======
{
  const bizeKatilinPath = path.join(WORKSPACE, 'bize-katilin.html');
  if (fs.existsSync(bizeKatilinPath)) {
    let content = fs.readFileSync(bizeKatilinPath, 'utf8');
    // Fix the nav current link
    content = content.replace(/href="join-us\.html" class="nav-link/g, 'href="bize-katilin.html" class="nav-link');
    content = content.replace(/<title>Bize Katılın \| UZMANIYIZ\.COM<\/title>\|<title>[^<]*<\/title>/g, '<title>Bize Katılın | UZMANIYIZ.COM</title>');
    fs.writeFileSync(bizeKatilinPath, content, 'utf8');
    console.log('Fixed bize-katilin.html nav link');
  }
}

// ====== STEP 6: Update footer İletişim link in ALL pages ======
htmlFiles.forEach(htmlPath => {
  if (!fs.existsSync(htmlPath)) return;
  let content = fs.readFileSync(htmlPath, 'utf8');
  // The nav İletişim link now points to bize-katilin.html (already done above)
  // Also check for any remaining join-us references
  const remaining = (content.match(/join-us\.html/g) || []).length;
  if (remaining > 0) {
    content = content.replace(/join-us\.html/g, 'bize-katilin.html');
    fs.writeFileSync(htmlPath, content, 'utf8');
    console.log(`Fixed ${remaining} remaining join-us.html refs in ${path.basename(htmlPath)}`);
  }
});

// ====== FINAL: Verify ======
console.log('\n=== Final Verification ===');
['index.html','site-tasarimi.html','bize-katilin.html'].forEach(f => {
  const htmlPath = path.join(WORKSPACE, f);
  if (!fs.existsSync(htmlPath)) { console.log(f + ': NOT FOUND'); return; }
  const c = fs.readFileSync(htmlPath, 'utf8');
  const title = (c.match(/<title>(.*?)<\/title>/) || [])[1] || '?';
  const tagline = (c.match(/data-preloader="tagline"[^>]*>([^<]*)</) || [])[1] || '?';
  const joinRefs = (c.match(/join-us\.html/g) || []).length;
  console.log(`${f}: title="${title}" | tagline="${tagline}" | join-us refs: ${joinRefs}`);
});
