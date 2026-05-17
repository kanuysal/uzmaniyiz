const fs = require('fs');

const indexHtmlPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\index.html';
const content = fs.readFileSync(indexHtmlPath, 'utf8');

const pos = content.indexOf('<div data-show="preloader" class="preloader-w">');
if (pos !== -1) {
    const start = pos;
    const end = Math.min(content.length, pos + 2500);
    console.log(content.substring(start, end));
} else {
    const pos2 = content.indexOf('class="preloader-w"');
    if (pos2 !== -1) {
        // find previous `<div`
        const start = content.lastIndexOf('<div', pos2);
        const end = Math.min(content.length, pos2 + 3000);
        console.log(content.substring(start, end));
    }
}
