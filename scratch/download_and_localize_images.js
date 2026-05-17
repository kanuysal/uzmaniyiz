const fs = require('fs');
const path = require('path');
const https = require('https');

const WORKSPACE = 'd:\\UZMANIYIZ\\stevencom\\stevencom';
const IMAGES_DIR = path.join(WORKSPACE, 'images');

// Create images directory if it doesn't exist
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  console.log('Created images/ directory:', IMAGES_DIR);
}

// List of HTML files to process
const htmlFiles = [
  'index.html',
  'creator-communities.html',
  'creator-media.html',
  'creator-products.html',
  'creator-tech.html',
  'join-us.html'
].map(file => path.join(WORKSPACE, file));

// Map to keep track of already localized images to avoid duplicates
// Key: original URL/path, Value: local filename (e.g., '1.webp')
const imageMap = {};
let imageCounter = 1;

// Download a remote URL to a local file path
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        reject(new Error(`Failed to download ${url}, status code: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

// Helper to determine original file extension
function getExtension(urlOrPath) {
  // Clean query parameters or hash from URL
  const cleanPath = urlOrPath.split('?')[0].split('#')[0];
  const ext = path.extname(cleanPath).toLowerCase();
  // Safe defaults
  if (['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.ico'].includes(ext)) {
    return ext;
  }
  if (cleanPath.includes('.jpg') || cleanPath.includes('.jpeg')) return '.jpg';
  if (cleanPath.includes('.png')) return '.png';
  if (cleanPath.includes('.webp')) return '.webp';
  if (cleanPath.includes('.svg')) return '.svg';
  return '.webp'; // fallback
}

// Helper to find a local file path if it exists relative to workspace
function findLocalFile(urlOrPath, htmlFileDir) {
  // If it is a relative path (e.g. '../cdn.prod.website-files.com/...')
  if (!urlOrPath.startsWith('http://') && !urlOrPath.startsWith('https://')) {
    const relativePath = path.resolve(htmlFileDir, urlOrPath);
    if (fs.existsSync(relativePath)) {
      return relativePath;
    }
    // Try relative to workspace
    const workspacePath = path.resolve(WORKSPACE, urlOrPath.replace(/^\.+\//, ''));
    if (fs.existsSync(workspacePath)) {
      return workspacePath;
    }
  }
  return null;
}

async function processImage(urlOrPath, htmlFileDir) {
  if (!urlOrPath) return null;
  
  // Normalize path/URL representation
  const cleanUrlOrPath = urlOrPath.trim();
  
  if (imageMap[cleanUrlOrPath]) {
    return imageMap[cleanUrlOrPath];
  }
  
  const ext = getExtension(cleanUrlOrPath);
  const localFilename = `${imageCounter}${ext}`;
  const destPath = path.join(IMAGES_DIR, localFilename);
  
  console.log(`Processing image [${imageCounter}]: ${cleanUrlOrPath}`);
  
  // 1. Check if it's already a local file
  const localSourcePath = findLocalFile(cleanUrlOrPath, htmlFileDir);
  
  try {
    if (localSourcePath) {
      // Copy local file
      fs.copyFileSync(localSourcePath, destPath);
      console.log(`  -> Copied locally from: ${localSourcePath}`);
      imageMap[cleanUrlOrPath] = `images/${localFilename}`;
      imageCounter++;
      return `images/${localFilename}`;
    } else if (cleanUrlOrPath.startsWith('http://') || cleanUrlOrPath.startsWith('https://')) {
      // Download remote file
      await downloadFile(cleanUrlOrPath, destPath);
      console.log(`  -> Downloaded and saved as: ${localFilename}`);
      imageMap[cleanUrlOrPath] = `images/${localFilename}`;
      imageCounter++;
      return `images/${localFilename}`;
    } else {
      // It's a relative path but we can't find it, try to download as a Webflow CDN fallback
      if (cleanUrlOrPath.includes('cdn.prod.website-files.com') || cleanUrlOrPath.includes('cloudfront.net')) {
        let fallbackUrl = cleanUrlOrPath;
        if (!fallbackUrl.startsWith('http')) {
          fallbackUrl = 'https://' + fallbackUrl.replace(/^\.+\//, '');
        }
        console.log(`  -> File not found locally. Trying fallback remote download: ${fallbackUrl}`);
        await downloadFile(fallbackUrl, destPath);
        console.log(`  -> Downloaded remote fallback and saved as: ${localFilename}`);
        imageMap[cleanUrlOrPath] = `images/${localFilename}`;
        imageCounter++;
        return `images/${localFilename}`;
      }
      console.log(`  [Warning] Could not resolve image path: ${cleanUrlOrPath}`);
      return null;
    }
  } catch (error) {
    console.error(`  [Error] Failed to localize image ${cleanUrlOrPath}:`, error.message);
    return null;
  }
}

async function run() {
  for (const htmlPath of htmlFiles) {
    if (!fs.existsSync(htmlPath)) {
      console.log(`Skipping missing HTML file: ${htmlPath}`);
      continue;
    }
    
    console.log(`\n==================================================`);
    console.log(`Processing HTML file: ${path.basename(htmlPath)}`);
    console.log(`==================================================`);
    
    let content = fs.readFileSync(htmlPath, 'utf8');
    const htmlFileDir = path.dirname(htmlPath);
    
    // Regular expression to match all <img ...> tags
    // Matches src="..." and srcset="..." attributes
    const imgTagRegex = /<img\b([^>]*?)>/gi;
    let match;
    let modifiedContent = content;
    
    // Scan all <img ...> tags
    const imgTags = [];
    while ((match = imgTagRegex.exec(content)) !== null) {
      imgTags.push({
        fullTag: match[0],
        attributes: match[1],
        index: match.index
      });
    }
    
    // We will do replacement from back to front to avoid shifting indices,
    // or just construct replacements using string replacement of full tags.
    for (const tag of imgTags) {
      let updatedAttributes = tag.attributes;
      
      // Extract src attribute
      const srcMatch = /\bsrc\s*=\s*(['"])(.*?)\1/i.exec(tag.attributes);
      if (srcMatch) {
        const quote = srcMatch[1];
        const srcVal = srcMatch[2];
        const localPath = await processImage(srcVal, htmlFileDir);
        if (localPath) {
          updatedAttributes = updatedAttributes.replace(
            /\bsrc\s*=\s*(['"])(.*?)\1/gi,
            `src="${localPath}"`
          );
        }
      }
      
      // Extract srcset attribute
      const srcsetMatch = /\bsrcset\s*=\s*(['"])(.*?)\1/i.exec(tag.attributes);
      if (srcsetMatch) {
        const quote = srcsetMatch[1];
        const srcsetVal = srcsetMatch[2];
        
        // Find the main URL in srcset (usually the first one, or the largest resolution)
        // For simplicity, we just parse the first image in srcset or map to the localized src
        const urls = srcsetVal.split(',').map(s => s.trim().split(' ')[0]);
        if (urls.length > 0) {
          const mainUrl = urls[0];
          const localPath = await processImage(mainUrl, htmlFileDir);
          if (localPath) {
            // Replace srcset with clean single responsive path or remove it
            // We replace with srcset="images/X.ext" to be clean
            updatedAttributes = updatedAttributes.replace(
              /\bsrcset\s*=\s*(['"])(.*?)\1/gi,
              `srcset="${localPath}"`
            );
          }
        }
      } else {
        // If there is no srcset but we localized src, we are good
      }
      
      const newTag = `<img${updatedAttributes}>`;
      modifiedContent = modifiedContent.replace(tag.fullTag, newTag);
    }
    
    // Scan other image tags like favicons, apple touch icons, og images, twitter images
    // e.g. <link href="..." rel="shortcut icon" ...>
    const linkTagRegex = /<link\b([^>]*?)>/gi;
    const linkTags = [];
    while ((match = linkTagRegex.exec(content)) !== null) {
      linkTags.push({
        fullTag: match[0],
        attributes: match[1]
      });
    }
    
    for (const tag of linkTags) {
      if (tag.attributes.includes('shortcut icon') || tag.attributes.includes('apple-touch-icon')) {
        const hrefMatch = /\bhref\s*=\s*(['"])(.*?)\1/i.exec(tag.attributes);
        if (hrefMatch) {
          const hrefVal = hrefMatch[2];
          const localPath = await processImage(hrefVal, htmlFileDir);
          if (localPath) {
            const newAttributes = tag.attributes.replace(
              /\bhref\s*=\s*(['"])(.*?)\1/gi,
              `href="${localPath}"`
            );
            const newTag = `<link${newAttributes}>`;
            modifiedContent = modifiedContent.replace(tag.fullTag, newTag);
          }
        }
      }
    }
    
    // Scan meta tags (og:image, twitter:image)
    // <meta content="..." property="og:image" />
    const metaTagRegex = /<meta\b([^>]*?)>/gi;
    const metaTags = [];
    while ((match = metaTagRegex.exec(content)) !== null) {
      metaTags.push({
        fullTag: match[0],
        attributes: match[1]
      });
    }
    
    for (const tag of metaTags) {
      if (tag.attributes.includes('og:image') || tag.attributes.includes('twitter:image')) {
        const contentMatch = /\bcontent\s*=\s*(['"])(.*?)\1/i.exec(tag.attributes);
        if (contentMatch) {
          const contentVal = contentMatch[2];
          const localPath = await processImage(contentVal, htmlFileDir);
          if (localPath) {
            const newAttributes = tag.attributes.replace(
              /\bcontent\s*=\s*(['"])(.*?)\1/gi,
              `content="${localPath}"`
            );
            const newTag = `<meta${newAttributes}>`;
            modifiedContent = modifiedContent.replace(tag.fullTag, newTag);
          }
        }
      }
    }
    
    // Write back updated HTML content
    fs.writeFileSync(htmlPath, modifiedContent, 'utf8');
    console.log(`Successfully rewrote ${path.basename(htmlPath)} with localized image paths.`);
  }
  
  console.log(`\n==================================================`);
  console.log(`Phase 1 Asset Centralization Summary:`);
  console.log(`Total localized images: ${imageCounter - 1}`);
  console.log(`==================================================`);
}

run().catch(console.error);
