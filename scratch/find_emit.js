const fs = require('fs');
const content = fs.readFileSync('d:/UZMANIYIZ/stevencom/stevencom/steven-henna.vercel.app/app.js', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('PAGE_TO_URL')) {
    console.log(`Line ${idx + 1}: ${line.substring(0, 500)}...`);
  }
});
