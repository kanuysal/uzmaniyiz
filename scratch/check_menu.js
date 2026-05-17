const fs = require('fs');
const html = fs.readFileSync('d:/UZMANIYIZ/stevencom/stevencom/index.html', 'utf8');

// Find all href attributes in the file
const hrefs = [];
const regex = /href="([^"]+)"/g;
let match;
while ((match = regex.exec(html)) !== null) {
  hrefs.push(match[1]);
}

console.log('Unique hrefs in index.html:', [...new Set(hrefs)]);
