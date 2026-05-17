const fs = require('fs');
const content = fs.readFileSync('d:/UZMANIYIZ/stevencom/stevencom/steven-henna.vercel.app/app.js', 'utf8');

const regex = /let\s+VA\s*=/i;
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('var VA') || line.includes('let VA') || line.includes('const VA')) {
    console.log(`Line ${idx + 1}: ${line.substring(0, 500)}...`);
  }
});

// Let's also look for any place emitting "PAGE_TO_URL" or "PAGE" or any event on VA.
// VA might use a method like .emit(), .trigger(), .dispatch(), etc.
console.log('--- Searching for VA emissions ---');
lines.forEach((line, idx) => {
  if (line.includes('PAGE_TO_URL') || line.includes('PAGE_FROM_URL')) {
    console.log(`Line ${idx + 1}: ${line.substring(0, 500)}...`);
  }
});
