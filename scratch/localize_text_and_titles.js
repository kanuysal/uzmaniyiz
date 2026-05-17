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

// 1. Text replacements mapping
const textReplacements = [
  // Page Titles
  { old: '<title>Steven.com | The Operating System for the Creator Economy</title>', new: '<title>UZMANIYIZ.COM | Profesyonel Web Tasarım Portfolyosu</title>' },
  { old: '<title>Creator Media | Steven.com</title>', new: '<title>Site Tasarımı | UZMANIYIZ.COM</title>' },
  { old: '<title>Creator Communities | Steven.com</title>', new: '<title>Tanıtım ve Tasarım | UZMANIYIZ.COM</title>' },
  { old: '<title>Creator Products | Steven.com</title>', new: '<title>Ürün Siteleri | UZMANIYIZ.COM</title>' },
  { old: '<title>Creator Tech | Steven.com</title>', new: '<title>Üretici ve Sanayi | UZMANIYIZ.COM</title>' },
  { old: '<title>Join Us | Steven.com</title>', new: '<title>İletişim | UZMANIYIZ.COM</title>' },

  // OG Titles
  { old: 'content="Creator Media | Steven.com"', new: 'content="Site Tasarımı | UZMANIYIZ.COM"' },
  { old: 'content="Creator Communities | Steven.com"', new: 'content="Tanıtım ve Tasarım | UZMANIYIZ.COM"' },
  { old: 'content="Creator Products | Steven.com"', new: 'content="Ürün Siteleri | UZMANIYIZ.COM"' },
  { old: 'content="Creator Tech | Steven.com"', new: 'content="Üretici ve Sanayi | UZMANIYIZ.COM"' },
  { old: 'content="Join Us | Steven.com"', new: 'content="İletişim | UZMANIYIZ.COM"' },
  
  // Category Name mapping in UI
  { old: 'Creator Media', new: 'Site Tasarımı' },
  { old: 'Creator Communities', new: 'Tanıtım ve Tasarım' },
  { old: 'Creator Products', new: 'Ürün Siteleri' },
  { old: 'Creator Tech', new: 'Üretici ve Sanayi' },
  { old: 'Join Us', new: 'İletişim' },

  // General Rebranding Texts
  { old: 'Steven.com', new: 'UZMANIYIZ.COM' },
  { old: 'steven.com', new: 'uzmaniyiz.com' },
  { old: 'Steven Bartlett', new: 'UZMANIYIZ' },
  { old: 'STEVEN', new: 'UZMANIYIZ' },
  
  // Footer Copyrights
  { old: '© 2026 UZMANIYIZ.COM', new: '© 2026 UZMANIYIZ.COM' },
  
  // Manifesto (About Panel) Texts
  { old: '<h1>About us</h1>', new: '<h1>Hakkımızda</h1>' },
  { old: 'The Operating System for the Creator Economy', new: 'Kreatif ve Profesyonel Web Tasarım Stüdyosu' },
  { old: 'Our mission is to accelerate the journey back to human.', new: 'Misyonumuz, markanızın dijital dünyadaki varlığını en estetik ve etkileyici biçimde inşa etmektir.' }
];

// Stylized premium UZMANIYIZ.COM text logo to replace the old preloader logo SVG
const oldPreloaderSVGTag = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 431 43" fill="none" class="preloader-svg-w is-2">`;
const newPreloaderLogoText = `
<div class="preloader-logo-text" style="font-family: 'Outfit', sans-serif; font-weight: 900; font-size: 32px; letter-spacing: 0.18em; color: var(--color-text-main, #ffffff); text-transform: uppercase; text-align: center; width: 100%; display: flex; justify-content: center; align-items: center; white-space: nowrap;">
  UZMANIYIZ.COM
</div>
<!-- Removed old SVG preloader logo to show clean premium rebranded text -->
<div style="display:none;">
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 431 43" fill="none" class="preloader-svg-w is-2">
`;

htmlFiles.forEach(htmlPath => {
  if (!fs.existsSync(htmlPath)) return;
  
  let content = fs.readFileSync(htmlPath, 'utf8');
  let updatedContent = content;
  
  // Apply preloader logo replacements
  if (updatedContent.includes(oldPreloaderSVGTag)) {
    updatedContent = updatedContent.replace(oldPreloaderSVGTag, newPreloaderLogoText);
    // Add closing tag for hidden SVG just after it closes inside preloader structure
    // Let's find the closing defs or SVG tag for is-2
    // For simplicity, let's just make the old SVG display:none using style
    updatedContent = updatedContent.replace(
      /class="preloader-svg-w is-2"/gi,
      `class="preloader-svg-w is-2" style="display:none;"`
    );
    console.log(`Updated preloader logo in: ${path.basename(htmlPath)}`);
  }
  
  // Apply all text replacements
  textReplacements.forEach(rep => {
    // Perform global case-sensitive replacement
    const regex = new RegExp(rep.old, 'g');
    updatedContent = updatedContent.replace(regex, rep.new);
  });
  
  // Save modifications
  fs.writeFileSync(htmlPath, updatedContent, 'utf8');
  console.log(`Localized content in: ${path.basename(htmlPath)}`);
});
