const fs = require('fs');
const content = fs.readFileSync('d:/UZMANIYIZ/stevencom/stevencom/steven-henna.vercel.app/app.js', 'utf8');

const regexes = [
  /PAGE_FROM_URL/g,
  /PAGE_TO_URL/g,
  /onPageToUrl/g
];

regexes.forEach((regex) => {
  let match;
  console.log(`--- Searching for ${regex} ---`);
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (regex.test(line)) {
      console.log(`Line ${idx + 1}: ${line.substring(0, 300)}...`);
    }
  });
});
