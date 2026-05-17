const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

// 1. Fix tanitim-ve-tasarim.html
const tanitimPath = path.join(WORKSPACE, 'tanitim-ve-tasarim.html');
if (fs.existsSync(tanitimPath)) {
  let c = fs.readFileSync(tanitimPath, 'utf8');
  
  // Replace "Next"
  c = c.replace(
    /<div data-split="chars" data-module="split" class="text-navigation c-grey-40">Next<\/div>/,
    '<div data-split="chars" data-module="split" class="text-navigation c-grey-40">Sonraki</div>'
  );
  
  // Replace "Creator <br/>Products<br/>"
  c = c.replace(
    /<h2 data-split="chars,lines" data-module="split" class="text-title-large is-subpage">Creator <br\/>Products<br\/><\/h2>/,
    '<h2 data-split="chars,lines" data-module="split" class="text-title-large is-subpage">Ürün Siteleri</h2>'
  );
  
  // Replace overlay text
  c = c.replace(
    /<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Tanıtım ve<\/span><br\/><span class="span-visible">Tasarım<\/span><br\/><\/div>/,
    '<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Ürün Siteleri</span><br/></div>'
  );
  
  fs.writeFileSync(tanitimPath, c, 'utf8');
  console.log('Fixed footer in tanitim-ve-tasarim.html');
}

// 2. Fix site-tasarimi.html
const sitePath = path.join(WORKSPACE, 'site-tasarimi.html');
if (fs.existsSync(sitePath)) {
  let c = fs.readFileSync(sitePath, 'utf8');
  
  // Replace "Next"
  c = c.replace(
    /<div data-split="chars" data-module="split" class="text-navigation c-grey-40">Next<\/div>/,
    '<div data-split="chars" data-module="split" class="text-navigation c-grey-40">Sonraki</div>'
  );
  
  // Replace "Creator <br/>Communities<br/>"
  c = c.replace(
    /<h2 data-split="chars,lines" data-module="split" class="text-title-large is-subpage">Creator <br\/>Communities<br\/><\/h2>/,
    '<h2 data-split="chars,lines" data-module="split" class="text-title-large is-subpage">Tanıtım ve Tasarım</h2>'
  );
  
  // Replace overlay text
  c = c.replace(
    /<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Site Tasarımı<\/span><br\/><\/div>/,
    '<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Tanıtım ve</span><br/><span class="span-visible">Tasarım</span><br/></div>'
  );
  
  fs.writeFileSync(sitePath, c, 'utf8');
  console.log('Fixed footer in site-tasarimi.html');
}
