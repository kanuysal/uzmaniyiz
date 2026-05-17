const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';
const c = fs.readFileSync(path.join(WORKSPACE, 'index.html'), 'utf8');

// Find the actual cookie-w div in the DOM (after </head>)
const bodyStart = c.indexOf('<body');
const cookieInBody = c.indexOf('cookie-w', bodyStart);
if (cookieInBody !== -1) {
  // Find the opening div
  const divStart = c.lastIndexOf('<div', cookieInBody);
  console.log('Cookie banner DOM:');
  console.log(c.substring(divStart, divStart + 1500));
}

// Find hero-arm-links-w in DOM
const heroArmInBody = c.indexOf('hero-arm-links-w', bodyStart);
if (heroArmInBody !== -1) {
  console.log('\nHero Arm Links:');
  console.log(c.substring(heroArmInBody - 20, heroArmInBody + 2000));
}
