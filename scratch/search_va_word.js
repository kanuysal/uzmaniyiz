const fs = require('fs');
const content = fs.readFileSync('d:/UZMANIYIZ/stevencom/stevencom/steven-henna.vercel.app/app.js', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  const match = line.match(/\bVA\b/);
  if (match) {
    console.log(`Line ${idx + 1}: ${line.substring(match.index - 50, match.index + 200)}...`);
  }
});
