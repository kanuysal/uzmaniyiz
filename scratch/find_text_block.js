const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const content = fs.readFileSync(path.join(WORKSPACE, 'site-tasarimi.html'), 'utf8');

// Search for keywords
const keywords = ['empires', 'PLATFORM', 'organises', 'belong to'];
keywords.forEach(kw => {
  let pos = content.indexOf(kw);
  if (pos !== -1) {
    console.log(`Found "${kw}" at ${pos}:`);
    console.log(content.substring(pos - 100, pos + 300));
    console.log('---');
  } else {
    console.log(`"${kw}" not found`);
  }
});
