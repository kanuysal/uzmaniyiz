const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

// Extract all text-title-mission is-navlink texts from site-tasarimi.html
const content = fs.readFileSync(path.join(WORKSPACE, 'site-tasarimi.html'), 'utf8');

const navLinkRegex = /<div[^>]*class="[^"]*text-title-mission[^"]*is-navlink[^"]*"[^>]*>([\s\S]*?)<\/div>/g;

let match;
let all = [];
while ((match = navLinkRegex.exec(content)) !== null) {
  all.push({ 
    pos: match.index, 
    classes: match[0].match(/class="([^"]+)"/)?.[1] || '',
    text: match[1].replace(/<[^>]+>/g, '').trim()
  });
}

console.log('All is-navlink divs in site-tasarimi.html:');
all.forEach(m => {
  console.log(`  pos:${m.pos} classes:${m.classes.substring(0,60)} text:"${m.text}"`);
});

// Also check dropdown items
const dropdownRegex = /<div[^>]*class="[^"]*dropdown-item[^"]*"[^>]*>([\s\S]*?)<\/div>/g;
let dropdowns = [];
let dm;
while ((dm = dropdownRegex.exec(content)) !== null) {
  const text = dm[1].replace(/<[^>]+>/g, '').trim().substring(0, 80);
  if (text) dropdowns.push({ pos: dm.index, text });
}
if (dropdowns.length > 0) {
  console.log('\nDropdown items:');
  dropdowns.slice(0, 10).forEach(d => console.log(`  pos:${d.pos} text:"${d.text}"`));
}
