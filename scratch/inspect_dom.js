const fs = require('fs');

const indexHtmlPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\index.html';
const content = fs.readFileSync(indexHtmlPath, 'utf8');

const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (bodyMatch) {
  const bodyContent = bodyMatch[1];
  
  console.log("=== PRELOADER DIV ===");
  const preloaderDiv = bodyContent.indexOf('<div class="preloader-logo-w">');
  if (preloaderDiv !== -1) {
    console.log(bodyContent.substring(preloaderDiv, preloaderDiv + 1000));
  }
  
  console.log("\n=== NAV MENU ===");
  const navMenu = bodyContent.indexOf('nav-menu-layout');
  if (navMenu !== -1) {
    console.log(bodyContent.substring(navMenu, navMenu + 2000));
  }
}
