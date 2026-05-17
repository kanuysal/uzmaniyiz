const fs = require('fs');
const indexHtmlPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\index.html';
const content = fs.readFileSync(indexHtmlPath, 'utf8');

['Creator', 'Steven', 'STEVEN', 'S t e v e n', 'C r e a t o r'].forEach(term => {
  const count = (content.match(new RegExp(term, 'gi')) || []).length;
  console.log(`Found "${term}": ${count} times`);
  
  if (count > 0 && count < 20) {
    let pos = content.toLowerCase().indexOf(term.toLowerCase());
    if (pos !== -1) {
       console.log(content.substring(Math.max(0, pos - 100), pos + 100));
    }
  }
});
