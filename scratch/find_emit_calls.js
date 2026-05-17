const fs = require('fs');
const content = fs.readFileSync('d:/UZMANIYIZ/stevencom/stevencom/steven-henna.vercel.app/app.js', 'utf8');

const regex = /\.emit\(\s*['"`]/g;
const lines = content.split('\n');
lines.forEach((line, idx) => {
  let index = 0;
  while (true) {
    const found = line.search(regex);
    if (found === -1) break;
    console.log(`Line ${idx + 1}: ${line.substring(Math.max(0, found - 100), found + 150)}`);
    break; // only print once per line to avoid infinite loop
  }
});
