const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const filePath = path.join(WORKSPACE, 'tanitim-ve-tasarim.html');
if (!fs.existsSync(filePath)) {
  console.log('File not found');
  return;
}

let c = fs.readFileSync(filePath, 'utf8');

// 1. Replace the DOM content
const oldBlock = `<div data-split="lines,words,chars" data-text-highlight="" data-module="split" class="text-title-subpage-large">Legacy is found in the depth of the <strong>community</strong>.</div><div class="subpage-intro-divider-line"></div><div class="grid-main is-sub-10 mobile-flex-vertical"><div id="w-node-_7fab9ec9-2c39-39dd-4fb9-8644814d1bb9-814d1bac" class="subpage-intro-eyebrow-w"><div class="text-navigation wrap">FROM FOLLOWERS TO FANDOMS</div></div><div id="w-node-_7fab9ec9-2c39-39dd-4fb9-8644814d1bbc-814d1bac" class="subpage-intro-para-w"><p class="text-body xl op-60">We organize world-class experiences, events and programs that build real life communities.</p>`;

const newBlock = `<div data-split="lines,words,chars" data-text-highlight="" data-module="split" class="text-title-subpage-large">İz bırakan tasarımlar, <strong>derin bağlar</strong> kurar.</div><div class="subpage-intro-divider-line"></div><div class="grid-main is-sub-10 mobile-flex-vertical"><div id="w-node-_7fab9ec9-2c39-39dd-4fb9-8644814d1bb9-814d1bac" class="subpage-intro-eyebrow-w"><div class="text-navigation wrap">ETKİLEYİCİ TANITIM</div></div><div id="w-node-_7fab9ec9-2c39-39dd-4fb9-8644814d1bbc-814d1bac" class="subpage-intro-para-w"><p class="text-body xl op-60">Markanızı sadece duyurmakla kalmıyor, hedef kitlenizle kalıcı bağlar kuracak görsel diller ve stratejiler geliştiriyoruz.</p>`;

if (c.includes(oldBlock)) {
  c = c.replace(oldBlock, newBlock);
  console.log('DOM block replaced successfully');
} else {
  console.log('Exact DOM block not found, trying partial replacements');
  c = c.replace(/Legacy is found in the depth of the <strong>community<\/strong>\./, 'İz bırakan tasarımlar, <strong>derin bağlar</strong> kurar.');
  c = c.replace(/FROM FOLLOWERS TO FANDOMS/, 'ETKİLEYİCİ TANITIM');
  c = c.replace(/We organize world-class experiences, events and programs that build real life communities\./, 'Markanızı sadece duyurmakla kalmıyor, hedef kitlenizle kalıcı bağlar kuracak görsel diller ve stratejiler geliştiriyoruz.');
}

// 2. Replace the button
const oldButton = `<a tabindex="0" data-button-function="" data-wf--button---pill--variant="large" href="https://app.culturetest.com/ct/16dffd6e-9ffb-404a-9bc7-e5d333b84dbc" target="_blank" class="btn-w is-secondary w-variant-3663a019-2978-3ca1-ad32-b64e618b528e w-inline-block"><div class="btn-inner-w"><div class="text-button w-variant-3663a019-2978-3ca1-ad32-b64e618b528e">Work With Us</div></div></a>`;

const newButton = `<a tabindex="0" data-button-function="" data-wf--button---pill--variant="large" href="bize-katilin.html" class="btn-w is-secondary w-variant-3663a019-2978-3ca1-ad32-b64e618b528e w-inline-block"><div class="btn-inner-w"><div class="text-button w-variant-3663a019-2978-3ca1-ad32-b64e618b528e">İletişim</div></div></a>`;

if (c.includes(oldButton)) {
  c = c.replace(oldButton, newButton);
  console.log('Button replaced successfully');
} else {
  console.log('Exact button not found, searching by text');
  // Fallback
  const btnPos = c.indexOf('Work With Us');
  if (btnPos !== -1) {
    const aStart = c.lastIndexOf('<a', btnPos);
    const aEnd = c.indexOf('</a>', btnPos) + 4;
    c = c.substring(0, aStart) + newButton + c.substring(aEnd);
    console.log('Button replaced by fallback');
  }
}

// 3. Replace the JSON-LD schema content
c = c.replace(/"description": "From followers to fandoms. We organize world-class experiences, events and programs that build real life communities.",/, '"description": "Markanızı sadece duyurmakla kalmıyor, hedef kitlenizle kalıcı bağlar kuracak görsel diller ve stratejiler geliştiriyoruz.",');
c = c.replace(/"inLanguage": "en"/, '"inLanguage": "tr"');

fs.writeFileSync(filePath, c, 'utf8');
console.log('File updated');
