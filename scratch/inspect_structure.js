const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const content = fs.readFileSync(path.join(WORKSPACE, 'site-tasarimi.html'), 'utf8');
const pos = content.indexOf('subpage-intro-layout-w');

if (pos !== -1) {
  // Find the parent section
  const sectionPos = content.lastIndexOf('<section', pos);
  console.log('Structure in site-tasarimi.html:');
  console.log(content.substring(sectionPos, sectionPos + 500));
} else {
  console.log('Not found');
}
