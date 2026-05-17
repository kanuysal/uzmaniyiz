const fs = require('fs');
const path = require('path');
const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const c = fs.readFileSync(path.join(WORKSPACE, 'index.html'), 'utf8');

// Find the DOM element (not CSS) - look for data-preloader="tagline" outside <style>
let pos = 0;
while ((pos = c.indexOf('data-preloader="tagline"', pos)) !== -1) {
  const before = c.substring(Math.max(0, pos - 200), pos);
  const isInStyle = before.lastIndexOf('<style>') > before.lastIndexOf('</style>');
  const isInScript = before.lastIndexOf('<script>') > before.lastIndexOf('</script>');
  
  if (!isInStyle && !isInScript) {
    console.log('DOM tagline at pos:', pos);
    console.log(c.substring(pos - 50, pos + 300));
  }
  pos += 24;
}
