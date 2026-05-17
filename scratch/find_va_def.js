const fs = require('fs');
const content = fs.readFileSync('d:/UZMANIYIZ/stevencom/stevencom/steven-henna.vercel.app/app.js', 'utf8');

const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes(' VA =') || line.includes(' VA=') || line.includes('window.VA') || line.includes('var VA') || line.includes('let VA')) {
    console.log(`Line ${idx + 1}: ${line.substring(0, 300)}...`);
  }
});
