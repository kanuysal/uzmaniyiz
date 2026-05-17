const fs = require('fs');
const indexHtmlPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\index.html';
const content = fs.readFileSync(indexHtmlPath, 'utf8');

const count = (content.match(/span-visible/g) || []).length;
console.log(`span-visible count: ${count}`);

const count2 = (content.match(/style="display: block;/g) || []).length;
console.log(`display: block count: ${count2}`);

const navText = content.match(/<div data-split="chars,words" data-module="split" class="text-title-mission is-navlink">([\s\S]*?)<\/div>/);
if (navText) {
  console.log(`Nav Text: ${navText[1]}`);
}
