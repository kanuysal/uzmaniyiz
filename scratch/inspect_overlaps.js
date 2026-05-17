const fs = require('fs');

const indexHtmlPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\index.html';
const content = fs.readFileSync(indexHtmlPath, 'utf8');

console.log("=== PRELOADER SVGS ===");
const preloaderPos = content.indexOf('preloader-svg-w');
if (preloaderPos !== -1) {
  console.log(content.substring(Math.max(0, preloaderPos - 200), preloaderPos + 1000));
}

console.log("\n=== NAV MENU TEXTS ===");
const navPos = content.indexOf('nav-menu');
if (navPos !== -1) {
  console.log(content.substring(Math.max(0, navPos - 50), navPos + 1500));
}
