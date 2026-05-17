const fs = require('fs');
const path = require('path');

const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';

const dirsToRename = [
  { oldName: 'steven.com', newName: 'uzmaniyiz.com' },
  { oldName: 'steven.itsoffbrand.io', newName: 'uzmaniyiz.itsoffbrand.io' }
];

dirsToRename.forEach(d => {
  const oldPath = path.join(WORKSPACE, d.oldName);
  const newPath = path.join(WORKSPACE, d.newName);
  
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed folder: '${d.oldName}' -> '${d.newName}'`);
  } else {
    console.log(`Folder not found or already renamed: ${d.oldName}`);
  }
});
