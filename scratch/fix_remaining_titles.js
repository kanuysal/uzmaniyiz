const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

// Fix urun-siteleri.html - has a second wrong h1 "Creator Tech"
{
  const htmlPath = path.join(WORKSPACE, 'urun-siteleri.html');
  let content = fs.readFileSync(htmlPath, 'utf8');
  
  // Replace all remaining old h1 subpage titles
  content = content.replace(/<h1 data-split="chars,lines" data-module="split" class="text-title-large is-subpage">Creator[\s\S]*?<\/h1>/g, 
    '<h1 data-split="chars,lines" data-module="split" class="text-title-large is-subpage">Ürün<br/>Siteleri<br/></h1>');
  
  fs.writeFileSync(htmlPath, content, 'utf8');
  console.log('Fixed urun-siteleri.html h1');
}

// Fix Manifesto text - replace the garbled "Powered by Üretici ve Sanayinology"
const allFiles = ['index.html','site-tasarimi.html','tanitim-ve-tasarim.html','urun-siteleri.html','uretici-ve-sanayi.html','join-us.html'];

allFiles.forEach(filename => {
  const htmlPath = path.join(WORKSPACE, filename);
  if (!fs.existsSync(htmlPath)) return;
  let content = fs.readFileSync(htmlPath, 'utf8');
  
  // Fix the garbled manifesto text created by earlier replacement
  content = content.replace(/Powered by Üretici ve Sanayinology/gi, 'Powered by Technology');
  content = content.replace(/Site Tasarımı: Amplifying/gi, 'Site Tasarımı: Dijital görünürlüğü artırma');
  content = content.replace(/Site Tasarımı: Amplifying reach, influence, and trust/gi, 'Site Tasarımı: Dijital görünürlüğü artırma ve marka güveni');
  content = content.replace(/Creator Community: Transforming audiences into connected tribes/gi, 'Topluluk: İzleyicileri güçlü topluluklara dönüştürme');
  content = content.replace(/Ürün Siteleri: Providing creators with the infrastructure to build and back aligned products and ventures/gi, 'Ürün Siteleri: Markaların kendi ürün ve girişimlerini inşa etmesi için altyapı');
  
  // Also fix "About us" title in manifesto - make it Turkish
  // content = content.replace(/>About us<\/h1>/gi, '>Hakkımızda</h1>');
  
  fs.writeFileSync(htmlPath, content, 'utf8');
  console.log(`Fixed manifesto text in: ${filename}`);
});

// Final verification
allFiles.slice(1, 5).forEach(filename => {
  const htmlPath = path.join(WORKSPACE, filename);
  const content = fs.readFileSync(htmlPath, 'utf8');
  const m = content.match(/<h1[^>]*is-subpage[^>]*>([\s\S]{0,60})<\/h1>/);
  if (m) console.log(`${filename} h1: ${m[1].replace(/<[^>]*>/g,'')}`);
});
