const fs = require('fs');
const appJsPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\assets\\app.js';
const content = fs.readFileSync(appJsPath, 'utf8');

['Creator', 'Steven', 'STEVEN', 'Site Tasarımı'].forEach(term => {
  const count = (content.match(new RegExp(term, 'gi')) || []).length;
  console.log(`Found "${term}" in app.js: ${count} times`);
  
  if (count > 0 && count < 20) {
    let pos = content.toLowerCase().indexOf(term.toLowerCase());
    if (pos !== -1) {
       console.log(content.substring(Math.max(0, pos - 100), pos + 100));
    }
  }
});
