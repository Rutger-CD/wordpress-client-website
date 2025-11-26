/**
 * Fix CSS Specificity Issues in Block Editor Files
 *
 * Removes WordPress wrapper classes from button styles in editor.css
 * to fix "no-descending-specificity" linting errors
 */

const fs = require('fs');
const path = require('path');

const blocks = [
	'button',
	'hero',
	'content-section',
	'card-grid',
	'cta-section',
	'testimonial'
];

console.log('🔧 Fixing CSS specificity issues in block editor files...\n');

blocks.forEach(block => {
	const editorFile = path.join(__dirname, 'blocks', block, 'editor.css');

	if (!fs.existsSync(editorFile)) {
		console.log(`⚠️  Skipping ${block}: editor.css not found`);
		return;
	}

	let content = fs.readFileSync(editorFile, 'utf8');

	// Remove WordPress wrapper class from .btn selector at the end
	// Change: .wp-block-client-website-{block} .btn { ... }
	// To:     .btn { ... }
	const wrapperPattern = new RegExp(`\\.wp-block-client-website-${block}\\s+\\.btn\\s*\\{`, 'g');

	const before = content;
	content = content.replace(wrapperPattern, '.btn {');

	if (before !== content) {
		fs.writeFileSync(editorFile, content, 'utf8');
		console.log(`✅ Fixed: blocks/${block}/editor.css`);
	} else {
		console.log(`⏭️  No changes: blocks/${block}/editor.css`);
	}
});

console.log('\n✅ CSS specificity fixes complete!\n');
console.log('Run "npm run lint:css" to verify...');
