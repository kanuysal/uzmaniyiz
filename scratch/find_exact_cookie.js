const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

// Find exact cookie text in index.html first to understand the pattern
const indexContent = fs.readFileSync(path.join(WORKSPACE, 'index.html'), 'utf8');
const cookieStart = indexContent.indexOf('class="cookie-w"');
const cookieSection = indexContent.substring(cookieStart, cookieStart + 1000);
console.log('Raw cookie section:');
console.log(cookieSection);
