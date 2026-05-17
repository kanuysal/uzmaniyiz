const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const filePath = path.join(WORKSPACE, 'site-tasarimi.html');
if (!fs.existsSync(filePath)) {
  console.log('File not found');
  return;
}

let c = fs.readFileSync(filePath, 'utf8');

// 1. Replace the DOM content
const oldBlock = `<div data-split="lines,words,chars" data-text-highlight="" data-module="split" class="text-title-subpage-large">The new <strong>media empires</strong> will start with a person.</div><div class="subpage-intro-divider-line"></div><div class="grid-main is-sub-10 mobile-flex-vertical"><div id="w-node-_7fab9ec9-2c39-39dd-4fb9-8644814d1bb9-814d1bac" class="subpage-intro-eyebrow-w"><div class="text-navigation wrap">PEOPLE ARE THE PLATFORM</div></div><div id="w-node-_7fab9ec9-2c39-39dd-4fb9-8644814d1bbc-814d1bac" class="subpage-intro-para-w"><p class="text-body xl op-60">Media influence now organises around individuals. We build media brands around creators people choose to belong to.</p></div></div>`;

const newBlock = `<div data-split="lines,words,chars" data-text-highlight="" data-module="split" class="text-title-subpage-large">Yeni nesil web siteleri <strong>sanatsal bir dokunuşla</strong> başlar.</div><div class="subpage-intro-divider-line"></div><div class="grid-main is-sub-10 mobile-flex-vertical"><div id="w-node-_7fab9ec9-2c39-39dd-4fb9-8644814d1bb9-814d1bac" class="subpage-intro-eyebrow-w"><div class="text-navigation wrap">SANATSAL TASARIM</div></div><div id="w-node-_7fab9ec9-2c39-39dd-4fb9-8644814d1bbc-814d1bac" class="subpage-intro-para-w"><p class="text-body xl op-60">Web siteniz sadece bir bilgi sayfası değil, markanızın dijital dünyadaki sanat eseridir. Ziyaretçilerinizi etkileyen, özgün ve estetik deneyimler inşa ediyoruz.</p></div></div>`;

if (c.includes(oldBlock)) {
  c = c.replace(oldBlock, newBlock);
  console.log('DOM block replaced successfully');
} else {
  console.log('Exact DOM block not found, trying partial replacements');
  // Fallback to partial replacements if whitespace differs
  c = c.replace(/The new <strong>media empires<\/strong> will start with a person\./, 'Yeni nesil web siteleri <strong>sanatsal bir dokunuşla</strong> başlar.');
  c = c.replace(/PEOPLE ARE THE PLATFORM/, 'SANATSAL TASARIM');
  c = c.replace(/Media influence now organises around individuals\. We build media brands around creators people choose to belong to\./, 'Web siteniz sadece bir bilgi sayfası değil, markanızın dijital dünyadaki sanat eseridir. Ziyaretçilerinizi etkileyen, özgün ve estetik deneyimler inşa ediyoruz.');
}

// 2. Replace the JSON-LD schema content
c = c.replace(/"description": "Building media empires around creators people choose to belong to. Media influence now organises around individuals.",/, '"description": "Sıradan olmayanlara sanatsal web sitesi tasarımları. Markanızın dijital dünyadaki varlığını birlikte inşa ediyoruz.",');
c = c.replace(/"description": "Media influence now organises around individuals. We build media brands around creators people choose to belong to.",/, '"description": "Web siteniz sadece bir bilgi sayfası değil, markanızın dijital dünyadaki sanat eseridir.",');
c = c.replace(/"inLanguage": "en"/, '"inLanguage": "tr"');

fs.writeFileSync(filePath, c, 'utf8');
console.log('File updated');
