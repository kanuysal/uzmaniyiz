const fs = require('fs');
const path = require('path');

const appJsPath = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\assets\\app.js';
if (!fs.existsSync(appJsPath)) {
  console.log('app.js not found at:', appJsPath);
  process.exit(1);
}

let content = fs.readFileSync(appJsPath, 'utf8');
const originalLength = content.length;

// Slugs mapping
const slugMappings = [
  { oldStr: 'creator-communities', newStr: 'tanitim-ve-tasarim' },
  { oldStr: 'creator-media', newStr: 'site-tasarimi' },
  { oldStr: 'creator-products', newStr: 'urun-siteleri' },
  { oldStr: 'creator-tech', newStr: 'uretici-ve-sanayi' }
];

slugMappings.forEach(mapping => {
  // Use regex to replace all occurrences globally
  const regex = new RegExp(mapping.oldStr, 'g');
  content = content.replace(regex, mapping.newStr);
  console.log(`Replaced all occurrences of '${mapping.oldStr}' with '${mapping.newStr}'`);
});

fs.writeFileSync(appJsPath, content, 'utf8');
console.log(`Successfully updated assets/app.js. Original size: ${originalLength}, New size: ${content.length}`);
