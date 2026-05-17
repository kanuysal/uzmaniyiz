const fs = require('fs');
const path = require('path');

const appJsPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\assets\\app.js';
if (!fs.existsSync(appJsPath)) {
  console.log('app.js not found');
  process.exit(1);
}

let content = fs.readFileSync(appJsPath, 'utf8');

// Replace Rive remote links with local links
content = content.replace(
  /https:\/\/steven\.itsoffbrand\.io\/rive\/steven\.riv/gi,
  './rive/steven.riv'
);
content = content.replace(
  /https:\/\/steven\.itsoffbrand\.io\/rive\/signature\.riv/gi,
  './rive/signature.riv'
);

fs.writeFileSync(appJsPath, content, 'utf8');
console.log('Successfully updated Rive asset paths in assets/app.js to local versions.');
