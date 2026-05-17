const fs = require('fs');
const content = fs.readFileSync('d:/UZMANIYIZ/stevencom/stevencom/steven-henna.vercel.app/app.js', 'utf8');

const regexes = [
  /PAGE_FROM_URL/g,
  /PAGE_TO_URL/g
];

regexes.forEach((regex) => {
  let match;
  console.log(`--- Searching for ${regex} ---`);
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    let index = 0;
    while (true) {
      const found = line.indexOf(regex.source, index);
      if (found === -1) break;
      console.log(`Line ${idx + 1}: ${line.substring(Math.max(0, found - 100), found + 150)}`);
      index = found + 1;
    }
  });
});
