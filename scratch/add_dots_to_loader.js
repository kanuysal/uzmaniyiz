const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const htmlFiles = fs.readdirSync(WORKSPACE)
  .filter(f => f.endsWith('.html'))
  .map(f => path.join(WORKSPACE, f));

htmlFiles.forEach(htmlPath => {
  if (!fs.existsSync(htmlPath)) return;
  let c = fs.readFileSync(htmlPath, 'utf8');

  // Find the preloader text
  const oldText = `UZMANIYIZ<span style="padding: 0 0.4em">.</span>COM`;
  const newText = `UZMANIYIZ<span style="padding: 0 0.4em">.</span>COM<span style="color: #fff">.....</span>`;
  
  if (c.includes(oldText)) {
    c = c.replace(oldText, newText);
    fs.writeFileSync(htmlPath, c, 'utf8');
    console.log(`Added dots to loader in: ${path.basename(htmlPath)}`);
  }
});

console.log('Done!');
