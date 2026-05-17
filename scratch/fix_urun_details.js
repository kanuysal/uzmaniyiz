const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const filePath = path.join(WORKSPACE, 'urun-siteleri.html');
if (!fs.existsSync(filePath)) {
  console.log('File not found');
  return;
}

let c = fs.readFileSync(filePath, 'utf8');

// 1. Fix the title overlay
const oldOverlay = `<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Üretici ve</span><br/><span class="span-visible">Sanayi</span><br/></div>`;

const newOverlay = `<div data-noclone="" aria-hidden="true" data-module="split" data-split="chars,lines" class="text-title-large is-subpage is-overlay"><span class="span-visible">Ürün</span><br/><span class="span-visible">Siteleri</span><br/></div>`;

if (c.includes(oldOverlay)) {
  c = c.replace(oldOverlay, newOverlay);
  console.log('Title overlay fixed');
} else {
  console.log('Title overlay not found, searching by partial text');
  c = c.replace(/<span class="span-visible">Üretici ve<\/span><br\/><span class="span-visible">Sanayi<\/span>/, '<span class="span-visible">Ürün</span><br/><span class="span-visible">Siteleri</span>');
}

// 2. Fix the paragraph
const oldPara = `<p class="text-body xl op-60">We build and back creator-led businesses that solve genuine problems.</p>`;
const newPara = `<p class="text-body xl op-60">Gerçek sorunları çözen, kullanıcı odaklı ve yenilikçi ürünler geliştiriyor ve destekliyoruz.</p>`;

if (c.includes(oldPara)) {
  c = c.replace(oldPara, newPara);
  console.log('Paragraph fixed');
} else {
  console.log('Paragraph not found by exact match, trying regex');
  c = c.replace(/We build and back creator-led businesses that solve genuine problems\./, 'Gerçek sorunları çözen, kullanıcı odaklı ve yenilikçi ürünler geliştiriyor ve destekliyoruz.');
}

fs.writeFileSync(filePath, c, 'utf8');
console.log('File updated');
