const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const allFiles = ['index.html','site-tasarimi.html','tanitim-ve-tasarim.html',
  'urun-siteleri.html','uretici-ve-sanayi.html','join-us.html','bize-katilin.html',
  'legal/terms-and-conditions.html','legal/privacy-policy.html','legal/cookie-policy.html'];

// ====== STEP 1: Rename join-us.html to bize-katilin.html ======
const joinUsOld = path.join(WORKSPACE, 'join-us.html');
const joinUsNew = path.join(WORKSPACE, 'bize-katilin.html');
if (fs.existsSync(joinUsOld) && !fs.existsSync(joinUsNew)) {
  fs.renameSync(joinUsOld, joinUsNew);
  console.log('Renamed join-us.html -> bize-katilin.html');
}

// Update all links in all files
const htmlFiles = fs.readdirSync(WORKSPACE)
  .filter(f => f.endsWith('.html'))
  .map(f => path.join(WORKSPACE, f));

// Also check legal folder
const legalDir = path.join(WORKSPACE, 'legal');
if (fs.existsSync(legalDir)) {
  fs.readdirSync(legalDir).filter(f=>f.endsWith('.html')).forEach(f => {
    htmlFiles.push(path.join(legalDir, f));
  });
}

htmlFiles.forEach(htmlPath => {
  if (!fs.existsSync(htmlPath)) return;
  let content = fs.readFileSync(htmlPath, 'utf8');

  // ====== STEP 2: Fix duplicate <title> tags (|<title>....|</title>) ======
  // Pattern: <title>X</title>|<title>Y</title> -> <title>Y</title>
  content = content.replace(/<title>[^<]*<\/title>\|<title>([^<]*)<\/title>/g, '<title>$1</title>');
  content = content.replace(/<title>[^<]*<\/title>\|<title>/g, '<title>');

  // ====== STEP 3: Fix malformed og:title with pipe ======
  content = content.replace(/content="[^"]*"\|content="([^"]*)" property="og:title"/g, 'content="$1" property="og:title"');
  content = content.replace(/content="[^"]*"\|content="([^"]*)" property="twitter:title"/g, 'content="$1" property="twitter:title"');

  // ====== STEP 4: Update join-us.html links to bize-katilin.html ======
  content = content.replace(/href="join-us\.html"/g, 'href="bize-katilin.html"');
  content = content.replace(/href="\.\.\/join-us\.html"/g, 'href="../bize-katilin.html"');

  // ====== STEP 5: Fix "Terms & Conditions" -> "Kullanım Koşulları" (missed ones) ======
  content = content.replace(/Terms &amp; Conditions/g, 'Kullanım Koşulları');
  content = content.replace(/Terms &amp;amp; Conditions/g, 'Kullanım Koşulları');

  // ====== STEP 6: Fix "Visit" -> "Ziyaret Et" ======
  content = content.replace(/>Visit</g, '>Ziyaret Et<');
  content = content.replace(/data-btn-text="Visit"/g, 'data-btn-text="Ziyaret Et"');

  // ====== STEP 7: Close -> Kapat (fix missed ones) ======
  content = content.replace(/>Close</g, '>Kapat<');
  content = content.replace(/aria-label="Close Manifesto"/g, 'aria-label="Hakkımızda Kapat"');

  // ====== STEP 8: Fix "İletişim" -> update the nav link text for join-us page ======
  // Already done, ensure it says İletişim/Bize Katılın
  content = content.replace(/>Join Us</g, '>Bize Katılın<');
  content = content.replace(/>Join us</g, '>Bize Katılın<');

  // ====== STEP 9: Fix "SKETCH MODE" -> "KALEMİ AÇ" missed ones ======
  content = content.replace(/SKETCH MODE/g, 'KALEMİ AÇ');

  // ====== STEP 10: Fix "Site by OFF+BRAND." ======
  content = content.replace(/Site by OFF\+BRAND\./g, 'Tasarım: OFF+BRAND.');

  fs.writeFileSync(htmlPath, content, 'utf8');
  console.log('Updated: ' + path.basename(htmlPath));
});

// ====== STEP 11: Fix bize-katilin.html title ======
const bizeKatilinPath = path.join(WORKSPACE, 'bize-katilin.html');
if (fs.existsSync(bizeKatilinPath)) {
  let content = fs.readFileSync(bizeKatilinPath, 'utf8');
  content = content.replace(/<title>.*?<\/title>/gi, '<title>Bize Katılın | UZMANIYIZ.COM</title>');
  content = content.replace(/property="og:title" content="[^"]*"/g, 'property="og:title" content="Bize Katılın | UZMANIYIZ.COM"');
  content = content.replace(/<meta content="[^"]*" property="og:title"\/>/g, '<meta content="Bize Katılın | UZMANIYIZ.COM" property="og:title"/>');
  content = content.replace(/<meta content="[^"]*" property="twitter:title"\/>/g, '<meta content="Bize Katılın | UZMANIYIZ.COM" property="twitter:title"/>');
  fs.writeFileSync(bizeKatilinPath, content, 'utf8');
  console.log('Fixed bize-katilin.html title');
}

// ====== STEP 12: Fix the nav İletişim link to point to bize-katilin.html ======
// Already handled above

// ====== STEP 13: Fix uretici-ve-sanayi.html scroll issue ======
// The scroll issue is likely caused by a duplicate HTML structure (page rendered twice)
const ureticiPath = path.join(WORKSPACE, 'uretici-ve-sanayi.html');
if (fs.existsSync(ureticiPath)) {
  let content = fs.readFileSync(ureticiPath, 'utf8');
  // Check for duplicate DOCTYPE
  const doctypeCount = (content.match(/<!DOCTYPE html>/gi) || []).length;
  if (doctypeCount > 1) {
    // Find the second occurrence and everything before it
    const firstEnd = content.indexOf('</html>');
    if (firstEnd !== -1) {
      content = content.substring(firstEnd + 7);
      fs.writeFileSync(ureticiPath, content, 'utf8');
      console.log('Removed duplicate HTML in uretici-ve-sanayi.html, doctypes were: ' + doctypeCount);
    }
  } else {
    console.log('uretici-ve-sanayi.html: no duplicate DOCTYPE found, checking page-w duplication...');
    // Check for duplicate page-w
    const pageWCount = (content.match(/class="page-w"/g) || []).length;
    console.log('page-w count: ' + pageWCount);
  }
}
