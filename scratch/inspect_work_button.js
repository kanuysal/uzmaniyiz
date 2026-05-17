const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const content = fs.readFileSync(path.join(WORKSPACE, 'tanitim-ve-tasarim.html'), 'utf8');
const pos = content.indexOf('Work With Us');

if (pos !== -1) {
  // Find the start of the <a> tag
  const aStart = content.lastIndexOf('<a', pos);
  const aEnd = content.indexOf('</a>', pos) + 4;
  console.log('Button area:');
  console.log(content.substring(aStart, aEnd));
} else {
  console.log('Not found');
}
