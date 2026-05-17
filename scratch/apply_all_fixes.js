const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

// Helper to replace content in file
function updateFile(filename, updates) {
  const p = path.join(WORKSPACE, filename);
  if (!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf8');
  let changed = false;
  
  updates.forEach(u => {
    if (c.includes(u.old)) {
      c = c.replace(u.old, u.new);
      changed = true;
    } else if (u.regex && u.regex.test(c)) {
      c = c.replace(u.regex, u.new);
      changed = true;
    }
  });
  
  if (changed) {
    fs.writeFileSync(p, c, 'utf8');
    console.log(`Updated ${filename}`);
  } else {
    console.log(`No matching updates for ${filename}`);
  }
}

// ====== 1. Fix site-tasarimi.html ======
updateFile('site-tasarimi.html', [
  // Top Title Overlay
  {
    old: `<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Tanıtım ve</span><br/><span class="span-visible">Tasarım</span><br/></div>`,
    new: `<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Site Tasarımı</span><br/></div>`
  },
  // Footer Overlay (links to tanitim)
  {
    old: `<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Site Tasarımı</span><br/></div>`,
    new: `<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Tanıtım ve</span><br/><span class="span-visible">Tasarım</span><br/></div>`
  }
]);

// ====== 2. Fix tanitim-ve-tasarim.html ======
updateFile('tanitim-ve-tasarim.html', [
  // Top Title Overlay
  {
    old: `<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Ürün Siteleri</span><br/></div>`,
    new: `<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Tanıtım ve</span><br/><span class="span-visible">Tasarım</span><br/></div>`
  },
  // Footer Overlay (links to urun)
  {
    old: `<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Tanıtım ve</span><br/><span class="span-visible">Tasarım</span><br/></div>`,
    new: `<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Ürün Siteleri</span><br/></div>`
  }
]);

// ====== 3. Fix urun-siteleri.html ======
updateFile('urun-siteleri.html', [
  // Footer Overlay (links to uretici)
  {
    old: `<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Ürün</span><br/><span class="span-visible">Siteleri</span><br/></div>`,
    new: `<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Üretici ve</span><br/><span class="span-visible">Sanayi</span><br/></div>`
  },
  // Translate content
  {
    old: `The most enduring<strong> products</strong> are built on trust.`,
    new: `En kalıcı <strong>ürünler</strong> güven üzerine kurulur.`
  },
  {
    old: `INFLUENCE MEETS INNOVATION`,
    new: `ETKİ VE İNOVASYON`
  },
  {
    old: `We build and back creator-led businesses that solve genuine problems.`,
    new: `Gerçek sorunları çözen, kullanıcı odaklı ve yenilikçi ürünler geliştiriyor ve destekliyoruz.`
  },
  // Fix button
  {
    old: `<div class="text-button w-variant-3663a019-2978-3ca1-ad32-b64e618b528e">Launch a Product With Us </div>`,
    new: `<div class="text-button w-variant-3663a019-2978-3ca1-ad32-b64e618b528e">Hakkımızda</div>`
  },
  {
    old: `href="https://app.culturetest.com/ct/16dffd6e-9ffb-404a-9bc7-e5d333b84dbc" target="_blank"`,
    new: `href="bize-katilin.html"` // Pointing to bize-katilin as Hakkimizda alternative
  }
]);

// ====== 4. Add dummy sections to uretici-ve-sanayi.html to enable scroll ======
const ureticiPath = path.join(WORKSPACE, 'uretici-ve-sanayi.html');
if (fs.existsSync(ureticiPath)) {
  let c = fs.readFileSync(ureticiPath, 'utf8');
  
  // Find where the hero section ends
  const heroEnd = c.indexOf('</section>');
  if (heroEnd !== -1 && !c.includes('dummy-content')) {
    const dummySections = `
    <!-- dummy-content -->
    <div data-wf--spacer--variant="large" class="spacer w-variant-465b0d23-ddcd-378b-4d7f-08cceb4f773d"></div>
    <section class="s"><div class="c"><div class="grid-main">
      <div class="subpage-intro-layout-w">
        <div data-split="lines,words,chars" data-text-highlight="" data-module="split" class="text-title-subpage-large">Endüstriyel güç, <strong>dijital vizyonla</strong> buluşuyor.</div>
        <div class="subpage-intro-divider-line"></div>
        <div class="grid-main is-sub-10 mobile-flex-vertical">
          <div class="subpage-intro-eyebrow-w"><div class="text-navigation wrap">B2B VE SANAYİ</div></div>
          <div class="subpage-intro-para-w"><p class="text-body xl op-60">Üretici ve sanayi kuruluşları için güvenilirlik ve uzmanlığı yansıtan profesyonel dijital kimlikler inşa ediyoruz.</p></div>
        </div>
      </div>
    </div></div></section>
    <div data-wf--spacer--variant="large" class="spacer w-variant-465b0d23-ddcd-378b-4d7f-08cceb4f773d"></div>
    <section class="s"><div class="c"><div class="grid-main">
      <div style="height: 300px; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.4);">
        [İçerik Galerisi Alanı]
      </div>
    </div></div></section>
    `;
    
    c = c.substring(0, heroEnd + 10) + dummySections + c.substring(heroEnd + 10);
    fs.writeFileSync(ureticiPath, c, 'utf8');
    console.log('Added dummy sections to uretici-ve-sanayi.html');
  }
}

console.log('\nAll done!');
