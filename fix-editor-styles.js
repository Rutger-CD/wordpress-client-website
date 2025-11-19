/**
 * Fix Editor Styles for WordPress Blocks
 *
 * This script updates all block editor.css files to include the full
 * component styles needed for proper styling in the WordPress block editor.
 */

const fs = require('fs');
const path = require('path');

// Block to component mapping
const blockComponents = {
	'button': ['button'],
	'card-grid': ['card', 'button'],
	'content-section': ['content-section', 'button'],
	'cta-section': ['button'], // CTA section uses button component
	'hero': ['hero', 'button'], // Already done, but included for completeness
};

// Read a CSS file and minify it (remove comments, extra whitespace)
function readAndMinifyCSS(filePath) {
	const content = fs.readFileSync(filePath, 'utf-8');
	// Remove comments
	let minified = content.replace(/\/\*[\s\S]*?\*\//g, '');
	// Remove extra whitespace
	minified = minified.replace(/\s+/g, ' ').trim();
	return minified;
}

// Get component CSS with proper formatting
function getComponentCSS(componentName) {
	const componentPath = path.join(__dirname, 'components', componentName, `${componentName}.css`);

	if (!fs.existsSync(componentPath)) {
		console.warn(`⚠️  Warning: Component CSS not found: ${componentPath}`);
		return '';
	}

	const css = fs.readFileSync(componentPath, 'utf-8');
	return `\n/* ===================================\n * ${componentName.toUpperCase()} COMPONENT STYLES\n * =================================== */\n\n${css}`;
}

// Update editor.css for a specific block
function updateBlockEditorCSS(blockName) {
	const editorCSSPath = path.join(__dirname, 'blocks', blockName, 'editor.css');

	if (!fs.existsSync(editorCSSPath)) {
		console.warn(`⚠️  Skipping ${blockName}: editor.css not found`);
		return;
	}

	// Build the new editor.css content
	let newContent = `/**\n * ${blockName.charAt(0).toUpperCase() + blockName.slice(1)} Block - Editor Styles\n * Includes all component styles needed for proper editor preview\n */\n`;

	// Add component styles
	const components = blockComponents[blockName] || [];
	for (const component of components) {
		newContent += getComponentCSS(component);
	}

	// Add editor-specific overrides section
	newContent += `\n/* ===================================\n * EDITOR-SPECIFIC OVERRIDES\n * =================================== */\n\n`;
	newContent += `/* Make text editable */\n`;
	newContent += `.wp-block-client-website-${blockName} [contenteditable="true"] {\n\tcursor: text;\n}\n\n`;
	newContent += `/* Disable button clicks in editor */\n`;
	newContent += `.wp-block-client-website-${blockName} .btn {\n\tpointer-events: none;\n}\n\n`;
	newContent += `/* Editor placeholder styling */\n`;
	newContent += `.wp-block-client-website-${blockName} .block-editor-rich-text__editable:empty::before {\n\tcolor: var(--color-text-tertiary, rgba(0, 0, 0, 0.5));\n\topacity: 0.6;\n}\n`;

	// Write the updated file
	fs.writeFileSync(editorCSSPath, newContent);
	console.log(`✅ Updated: blocks/${blockName}/editor.css`);
}

// Main execution
console.log('🔧 Fixing editor styles for all blocks...\n');

for (const blockName in blockComponents) {
	updateBlockEditorCSS(blockName);
}

console.log('\n✅ All editor styles have been updated!');
console.log('\nNext steps:');
console.log('1. cd blocks');
console.log('2. npm run build');
console.log('3. Run deployment script to update staging');
