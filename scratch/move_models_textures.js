const fs = require('fs');
const path = require('path');

const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';
const APP_JS = path.join(WORKSPACE, 'assets', 'app.js');

const modelsDir = path.join(WORKSPACE, 'models');
const texturesDir = path.join(WORKSPACE, 'textures');
const newModelsDir = path.join(WORKSPACE, 'assets', 'models');
const newTexturesDir = path.join(WORKSPACE, 'assets', 'textures');

if (!fs.existsSync(newModelsDir)) fs.mkdirSync(newModelsDir, { recursive: true });
if (!fs.existsSync(newTexturesDir)) fs.mkdirSync(newTexturesDir, { recursive: true });

let appJsContent = fs.readFileSync(APP_JS, 'utf8');

// Helper to get all files recursively
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

// 1. Move and Rename Models
let modelCounter = 1;
const oldModels = getFilesRecursively(modelsDir);
for (const oldFile of oldModels) {
  const ext = path.extname(oldFile);
  const newName = `${modelCounter++}${ext}`;
  const newFile = path.join(newModelsDir, newName);
  
  // Update app.js
  const oldRelative = oldFile.replace(WORKSPACE, '').replace(/\\/g, '/').replace(/^\//, ''); // e.g. "models/filename.glb"
  const newRelative = `assets/models/${newName}`;
  
  // In app.js it is referenced as /models/filename.glb or models/filename.glb
  // But wait! appJsPath uses `this.path+"/models/...`
  // We should replace `/models/...` with `/assets/models/...`
  const oldRefName = path.basename(oldFile);
  const regex = new RegExp(`/[^\'\"/]+/models/${oldRefName}|/models/${oldRefName}`, 'g');
  appJsContent = appJsContent.replace(regex, `/assets/models/${newName}`);
  
  fs.renameSync(oldFile, newFile);
  console.log(`Moved model: ${oldRelative} -> ${newRelative}`);
}

// 2. Move and Rename Textures
let texCounter = 1;
const oldTextures = getFilesRecursively(texturesDir);
for (const oldFile of oldTextures) {
  const ext = path.extname(oldFile);
  const newName = `${texCounter++}${ext}`;
  const newFile = path.join(newTexturesDir, newName);
  
  const oldRelative = oldFile.replace(WORKSPACE, '').replace(/\\/g, '/').replace(/^\//, '');
  const newRelative = `assets/textures/${newName}`;
  
  const oldRefName = path.basename(oldFile);
  // It could be in a subfolder like /textures/ktx2/name.ktx2
  // Let's replace the full subpath from /textures/...
  const oldRefPath = oldRelative.replace(/^textures/, '/textures'); // e.g. /textures/ktx2/name.ktx2
  // Escape for regex
  const regexPath = oldRefPath.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(regexPath, 'g');
  
  appJsContent = appJsContent.replace(regex, `/assets/textures/${newName}`);
  
  fs.renameSync(oldFile, newFile);
  console.log(`Moved texture: ${oldRelative} -> ${newRelative}`);
}

fs.writeFileSync(APP_JS, appJsContent, 'utf8');
console.log('Updated app.js with new models and textures paths.');
