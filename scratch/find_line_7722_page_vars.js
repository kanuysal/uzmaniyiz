const fs = require('fs');
const content = fs.readFileSync('d:/UZMANIYIZ/stevencom/stevencom/steven-henna.vercel.app/app.js', 'utf8');
const lines = content.split('\n');

const line = lines[7721]; // 0-indexed, so 7722
let index = 0;
while (true) {
  const foundFrom = line.indexOf('PAGE_FROM_URL', index);
  if (foundFrom === -1) break;
  console.log('PAGE_FROM_URL found around:', line.substring(Math.max(0, foundFrom - 150), foundFrom + 150));
  index = foundFrom + 1;
}

index = 0;
while (true) {
  const foundTo = line.indexOf('PAGE_TO_URL', index);
  if (foundTo === -1) break;
  console.log('PAGE_TO_URL found around:', line.substring(Math.max(0, foundTo - 150), foundTo + 150));
  index = foundTo + 1;
}
