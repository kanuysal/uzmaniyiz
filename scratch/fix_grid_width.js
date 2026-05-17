const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const filePath = path.join(WORKSPACE, 'uretici-ve-sanayi.html');
if (!fs.existsSync(filePath)) {
  console.log('File not found');
  return;
}

let c = fs.readFileSync(filePath, 'utf8');

// Find the dummy section content we added
const oldBlock = `<div class="grid-main">
      <div class="subpage-intro-layout-w">
        <div data-split="lines,words,chars" data-text-highlight="" data-module="split" class="text-title-subpage-large">Endüstriyel güç, <strong>dijital vizyonla</strong> buluşuyor.</div>
        <div class="subpage-intro-divider-line"></div>
        <div class="grid-main is-sub-10 mobile-flex-vertical">
          <div class="subpage-intro-eyebrow-w"><div class="text-navigation wrap">B2B VE SANAYİ</div></div>
          <div class="subpage-intro-para-w"><p class="text-body xl op-60">Üretici ve sanayi kuruluşları için güvenilirlik ve uzmanlığı yansıtan profesyonel dijital kimlikler inşa ediyoruz.</p></div>
        </div>
      </div>
    </div>`;

// New block with grid classes removed to make it full width block layout
const newBlock = `<div style="width: 100%;">
      <div class="subpage-intro-layout-w" style="width: 100%;">
        <div data-split="lines,words,chars" data-text-highlight="" data-module="split" class="text-title-subpage-large">Endüstriyel güç, <strong>dijital vizyonla</strong> buluşuyor.</div>
        <div class="subpage-intro-divider-line"></div>
        <div style="display: flex; flex-direction: column; gap: 15px;">
          <div class="subpage-intro-eyebrow-w"><div class="text-navigation wrap">B2B VE SANAYİ</div></div>
          <div class="subpage-intro-para-w"><p class="text-body xl op-60">Üretici ve sanayi kuruluşları için güvenilirlik ve uzmanlığı yansıtan profesyonel dijital kimlikler inşa ediyoruz.</p></div>
        </div>
      </div>
    </div>`;

if (c.includes(oldBlock)) {
  c = c.replace(oldBlock, newBlock);
  console.log('Block replaced successfully');
} else {
  console.log('Block not found by exact match, trying fallback');
  // Fallback: replace just the grid classes inside the section
  c = c.replace(/<div class="grid-main">\s*<div class="subpage-intro-layout-w">/, '<div style="width: 100%;"><div class="subpage-intro-layout-w" style="width: 100%;">');
  c = c.replace(/<div class="grid-main is-sub-10 mobile-flex-vertical">/, '<div style="display: flex; flex-direction: column; gap: 15px;">');
}

fs.writeFileSync(filePath, c, 'utf8');
console.log('File updated');
