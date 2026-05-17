const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

// Find all nav-links-list occurrences
['site-tasarimi.html', 'tanitim-ve-tasarim.html'].forEach(filename => {
  const content = fs.readFileSync(path.join(WORKSPACE, filename), 'utf8');
  let pos = 0;
  let count = 0;
  while((pos = content.indexOf('nav-links-list', pos)) !== -1) {
    count++;
    if (!content.substring(Math.max(0, pos-100), pos).includes('list-style-type')) {
      // This is the DOM one, not CSS
      console.log(`\n[${filename}] nav-links-list DOM at ${pos}:`);
      console.log(content.substring(pos - 30, pos + 600));
    }
    pos += 14;
  }
  console.log(`[${filename}] nav-links-list total: ${count}`);
});
