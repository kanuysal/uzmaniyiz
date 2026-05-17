const fs = require('fs');
const path = require('path');

const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

// Define the renaming mapping
const renameMapping = [
  { oldFile: 'creator-media.html', newFile: 'site-tasarimi.html', oldSlug: 'creator-media', newSlug: 'site-tasarimi.html' },
  { oldFile: 'creator-communities.html', newFile: 'tanitim-ve-tasarim.html', oldSlug: 'creator-communities', newSlug: 'tanitim-ve-tasarim.html' },
  { oldFile: 'creator-products.html', newFile: 'urun-siteleri.html', oldSlug: 'creator-products', newSlug: 'urun-siteleri.html' },
  { oldFile: 'creator-tech.html', newFile: 'uretici-ve-sanayi.html', oldSlug: 'creator-tech', newSlug: 'uretici-ve-sanayi.html' }
];

// 1. Rename files on disk
renameMapping.forEach(mapping => {
  const oldPath = path.join(WORKSPACE, mapping.oldFile);
  const newPath = path.join(WORKSPACE, mapping.newFile);
  
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed file: '${mapping.oldFile}' -> '${mapping.newFile}'`);
  } else {
    console.log(`File already renamed or not found: ${mapping.oldFile}`);
  }
});

// 2. Scan and update all links in all HTML files
const allHtmlFiles = [
  'index.html',
  'site-tasarimi.html',
  'tanitim-ve-tasarim.html',
  'urun-siteleri.html',
  'uretici-ve-sanayi.html',
  'join-us.html'
].map(file => path.join(WORKSPACE, file));

allHtmlFiles.forEach(htmlPath => {
  if (!fs.existsSync(htmlPath)) {
    console.log(`Skipping missing HTML file for link updates: ${path.basename(htmlPath)}`);
    return;
  }
  
  let content = fs.readFileSync(htmlPath, 'utf8');
  let updatedContent = content;
  
  renameMapping.forEach(mapping => {
    // Replace old HTML references (e.g. href="creator-media.html")
    const regexHtml = new RegExp(`href=["']\\.?\\/?${mapping.oldFile}["']`, 'gi');
    updatedContent = updatedContent.replace(regexHtml, `href="${mapping.newFile}"`);
    
    // Replace old slug references (e.g. href="creator-media")
    const regexSlug = new RegExp(`href=["']\\.?\\/?${mapping.oldSlug}["']`, 'gi');
    updatedContent = updatedContent.replace(regexSlug, `href="${mapping.newFile}"`);
  });
  
  if (content !== updatedContent) {
    fs.writeFileSync(htmlPath, updatedContent, 'utf8');
    console.log(`Updated internal links in: ${path.basename(htmlPath)}`);
  }
});
