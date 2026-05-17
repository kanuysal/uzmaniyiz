const fs = require('fs');
const content = fs.readFileSync('d:/UZMANIYIZ/stevencom/stevencom/steven-henna.vercel.app/app.js', 'utf8');
const lines = content.split('\n');

const line = lines[7721];
const targetIndex = line.indexOf('async transitionOut({from:A,trigger:Q}){');
if (targetIndex !== -1) {
  console.log('Found transitionOut:');
  console.log(line.substring(targetIndex, targetIndex + 300));
} else {
  console.log('transitionOut not found');
}
