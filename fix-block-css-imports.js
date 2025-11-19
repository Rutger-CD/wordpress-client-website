const fs = require('fs');
const path = require('path');

console.log('🔧 Removing @import statements from block CSS files...\n');

const blocks = ['button', 'card-grid', 'content-section', 'cta-section', 'hero'];

let fixed = 0;

blocks.forEach(block => {
  const styleFile = path.join(__dirname, 'blocks', block, 'style.css');
  const editorFile = path.join(__dirname, 'blocks', block, 'editor.css');

  // Fix style.css
  if (fs.existsSync(styleFile)) {
    let content = fs.readFileSync(styleFile, 'utf8');
    const originalContent = content;

    // Remove @import lines
    content = content.replace(/@import\s+["'].*?["'];?\s*\n/g, '');

    if (content !== originalContent) {
      fs.writeFileSync(styleFile, content, 'utf8');
      console.log(`✅ Fixed: blocks/${block}/style.css`);
      fixed++;
    }
  }

  // Fix editor.css
  if (fs.existsSync(editorFile)) {
    let content = fs.readFileSync(editorFile, 'utf8');
    const originalContent = content;

    // Remove @import lines
    content = content.replace(/@import\s+["'].*?["'];?\s*\n/g, '');

    if (content !== originalContent) {
      fs.writeFileSync(editorFile, content, 'utf8');
      console.log(`✅ Fixed: blocks/${block}/editor.css`);
      fixed++;
    }
  }
});

console.log(`\n✅ Fixed ${fixed} CSS files`);
console.log('\nNow uploading fixed files to staging...');
