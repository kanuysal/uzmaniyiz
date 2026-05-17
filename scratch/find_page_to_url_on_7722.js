const fs = require('fs');
const content = fs.readFileSync('d:/UZMANIYIZ/stevencom/stevencom/steven-henna.vercel.app/app.js', 'utf8');
const lines = content.split('\n');

const line = lines[7721];
const targetIndex = line.indexOf('PAGE_TO_URL');
if (targetIndex !== -1) {
  console.log('PAGE_TO_URL occurrences on 7722:');
  let start = 0;
  while (true) {
    const idx = line.indexOf('PAGE_TO_URL', start);
    if (idx === -1) break;
    console.log(line.substring(Math.max(0, idx - 100), idx + 200));
    start = idx + 1;
  }
}
