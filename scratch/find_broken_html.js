const fs = require('fs');

const indexHtmlPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\index.html';
const content = fs.readFileSync(indexHtmlPath, 'utf8');

const pos = content.indexOf('UZMANIYIZ.COM');
if (pos !== -1) {
    const start = Math.max(0, pos - 500);
    const end = Math.min(content.length, pos + 500);
    console.log(`Around UZMANIYIZ.COM:\n${content.substring(start, end)}`);
} else {
    console.log("Not found.");
}
