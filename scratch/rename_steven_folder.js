const fs = require('fs');
const path = require('path');

const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';
const OLD_DIR = path.join(WORKSPACE, 'steven-henna.vercel.app');
const NEW_DIR = path.join(WORKSPACE, 'assets');

// 1. Rename the folder if it exists
if (fs.existsSync(OLD_DIR)) {
  fs.renameSync(OLD_DIR, NEW_DIR);
  console.log(`Successfully renamed folder: '${OLD_DIR}' -> '${NEW_DIR}'`);
} else {
  console.log(`Folder not found or already renamed: ${OLD_DIR}`);
}

// 2. Scan all HTML files and update references
const htmlFiles = [
  'index.html',
  'creator-communities.html',
  'creator-media.html',
  'creator-products.html',
  'creator-tech.html',
  'join-us.html'
].map(file => path.join(WORKSPACE, file));

htmlFiles.forEach(htmlPath => {
  if (!fs.existsSync(htmlPath)) return;
  let content = fs.readFileSync(htmlPath, 'utf8');
  
  // Replace references
  // 1) './steven-henna.vercel.app/' -> './assets/'
  // 2) 'https://steven-henna.vercel.app/' -> './assets/' (local hosting instead of absolute live CDN)
  let updatedContent = content.replace(/\.?\/steven-henna\.vercel\.app\//gi, './assets/');
  updatedContent = updatedContent.replace(/https:\/\/steven-henna\.vercel\.app\//gi, './assets/');
  
  // Also clean up any backup CDN links:
  // e.g., 'https://steven-git-rework-itsoffbrand.vercel.app/app.js' -> './assets/app.js'
  updatedContent = updatedContent.replace(/https:\/\/steven-git-rework-itsoffbrand\.vercel\.app\//gi, './assets/');
  
  if (content !== updatedContent) {
    fs.writeFileSync(htmlPath, updatedContent, 'utf8');
    console.log(`Updated assets references in: ${path.basename(htmlPath)}`);
  }
});
