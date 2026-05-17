const fs = require('fs');

const indexHtmlPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\index.html';
const content = fs.readFileSync(indexHtmlPath, 'utf8');

const pos = content.indexOf('preloader-logo-text');
if (pos !== -1) {
    const start = Math.max(0, pos - 100);
    const end = Math.min(content.length, pos + 2500);
    console.log(`Around preloader-logo-text:\n${content.substring(start, end)}`);
} else {
    console.log("Not found.");
}
