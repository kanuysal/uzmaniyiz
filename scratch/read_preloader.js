const fs = require('fs');

const indexHtmlPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\index.html';
const content = fs.readFileSync(indexHtmlPath, 'utf8');

const start = content.indexOf('<div class="preloader-w">');
if (start !== -1) {
    const end = content.indexOf('</div></div></div>', start);
    console.log(content.substring(start, end + 18));
}
