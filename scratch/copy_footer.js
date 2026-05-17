const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const sitePath = path.join(WORKSPACE, 'site-tasarimi.html');
const ureticiPath = path.join(WORKSPACE, 'uretici-ve-sanayi.html');

if (fs.existsSync(sitePath) && fs.existsSync(ureticiPath)) {
  const siteContent = fs.readFileSync(sitePath, 'utf8');
  let ureticiContent = fs.readFileSync(ureticiPath, 'utf8');
  
  // 1. Extract footer from site-tasarimi.html
  const footerStart = siteContent.indexOf('<section data-module="sub-transition"');
  const footerEnd = siteContent.indexOf('</section>', footerStart) + 10;
  
  if (footerStart !== -1) {
    let footerHtml = siteContent.substring(footerStart, footerEnd);
    console.log('Extracted footer from site-tasarimi');
    
    // 2. Modify footer for uretici-ve-sanayi (link to site-tasarimi)
    // Replace link
    footerHtml = footerHtml.replace(/href="[^"]*"/, 'href="site-tasarimi.html"');
    footerHtml = footerHtml.replace(/data-gl-hero-link="[^"]*"/, 'data-gl-hero-link="roomMedia"');
    
    // Replace title in overlay
    footerHtml = footerHtml.replace(
      /<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay">[^<]*<\/div>/,
      '<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Site Tasarımı</span></div>'
    );
    // Fallback if structure is different
    footerHtml = footerHtml.replace(/<span class="span-visible">[^<]*<\/span>/g, '<span class="span-visible">Site Tasarımı</span>');
    
    // Replace H2 text
    footerHtml = footerHtml.replace(/<h2[^>]*>[^<]*<\/h2>/, '<h2 data-split="chars,lines" data-module="split" class="text-title-large is-subpage">Site Tasarımı</h2>');
    
    // 3. Insert footer into uretici-ve-sanayi.html
    // Find the last section or the end of the content
    // I added dummy content ending with </section>
    const lastSectionPos = ureticiContent.lastIndexOf('</section>');
    if (lastSectionPos !== -1) {
      ureticiContent = ureticiContent.substring(0, lastSectionPos + 10) + '\n' + footerHtml + ureticiContent.substring(lastSectionPos + 10);
      console.log('Inserted footer into uretici-ve-sanayi.html');
    } else {
      // Fallback: insert before </body>
      const bodyEnd = ureticiContent.indexOf('</body>');
      if (bodyEnd !== -1) {
        ureticiContent = ureticiContent.substring(0, bodyEnd) + '\n' + footerHtml + ureticiContent.substring(bodyEnd);
        console.log('Inserted footer before body end');
      }
    }
    
    fs.writeFileSync(ureticiPath, ureticiContent, 'utf8');
    console.log('File updated');
  } else {
    console.log('Footer section not found in site-tasarimi.html');
  }
}
