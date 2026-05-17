const fs = require('fs');
const path = require('path');

function getFilesRecursively(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const cdnDir = 'd:\\UZMANIYIZ\\stevencom\\stevencom\\cdn.prod.website-files.com';
const allFiles = getFilesRecursively(cdnDir);
console.log('Total files found:', allFiles.length);
allFiles.forEach(f => {
  console.log(path.relative(cdnDir, f));
});
