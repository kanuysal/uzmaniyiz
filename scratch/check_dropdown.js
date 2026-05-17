const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';
const content = fs.readFileSync(path.join(WORKSPACE, 'site-tasarimi.html'), 'utf8');

// Find dropdown section
const dropPos = content.indexOf('dropdown-list');
if (dropPos !== -1) {
  let lastDropPos = dropPos;
  let p = dropPos;
  while ((p = content.indexOf('dropdown-list', p + 1)) !== -1) {
    lastDropPos = p;
  }
  // Show last occurrence in DOM (not CSS)
  console.log('Last dropdown-list at:', lastDropPos);
  console.log(content.substring(lastDropPos - 100, lastDropPos + 1500));
}
