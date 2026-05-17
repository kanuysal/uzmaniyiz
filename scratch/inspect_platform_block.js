const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const content = fs.readFileSync(path.join(WORKSPACE, 'site-tasarimi.html'), 'utf8');
const pos = content.indexOf('PEOPLE ARE THE PLATFORM');

if (pos !== -1) {
  console.log(content.substring(pos - 500, pos + 500));
} else {
  console.log('Not found');
}
