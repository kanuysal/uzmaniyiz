const fs = require('fs');

const indexHtmlPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\index.html';
const content = fs.readFileSync(indexHtmlPath, 'utf8');

const regex = /<div[^>]*class="[^"]*text-title-mission[^"]*is-navlink[^"]*"[^>]*>([\s\S]*?)<\/div>/g;

let match;
while ((match = regex.exec(content)) !== null) {
  console.log(`Matched Nav Link:\n${match[0]}\n`);
}
