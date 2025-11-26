/**
 * Remove Duplicate .btn Selector from Block Editor Files
 *
 * The .btn selector appears twice - once inline with all button styles,
 * and once at the end as a WordPress wrapper override.
 * We'll remove the duplicate at the end.
 */

const fs = require('fs');
const path = require('path');

const blocks = [
	'button',
	'hero',
	'content-section',
	'card-grid',
	'cta-section'
];

console.log('🔧 Removing duplicate .btn selectors from block editor files...\n');

blocks.forEach(block => {
	const editorFile = path.join(__dirname, 'blocks', block, 'editor.css');

	if (!fs.existsSync(editorFile)) {
		console.log(`⚠️  Skipping ${block}: editor.css not found`);
		return;
	}

	let content = fs.readFileSync(editorFile, 'utf8');

	// Find the last occurrence of .btn { selector (the duplicate one)
	// This is typically at the end after all other button styles
	const lines = content.split('\n');
	let lastBtnIndex = -1;
	let inBtnBlock = false;
	let btnBlockStart = -1;
	let btnBlockEnd = -1;

	// Find the LAST .btn { ... } block
	for (let i = lines.length - 1; i >= 0; i--) {
		const line = lines[i].trim();

		if (line === '}' && inBtnBlock) {
			btnBlockEnd = i;
			inBtnBlock = false;
			break; // We found it
		}

		if (line.startsWith('.btn') && line.includes('{')) {
			inBtnBlock = true;
			btnBlockStart = i;
		}
	}

	if (btnBlockStart !== -1 && btnBlockEnd !== -1) {
		// Remove this block
		const before = lines.slice(0, btnBlockStart);
		const after = lines.slice(btnBlockEnd + 1);

		// Also remove empty lines around it
		while (before.length > 0 && before[before.length - 1].trim() === '') {
			before.pop();
		}
		while (after.length > 0 && after[0].trim() === '') {
			after.shift();
		}

		const newContent = [...before, ...after].join('\n');

		fs.writeFileSync(editorFile, newContent, 'utf8');
		console.log(`✅ Removed duplicate .btn selector: blocks/${block}/editor.css`);
		console.log(`   Lines ${btnBlockStart + 1} to ${btnBlockEnd + 1} removed`);
	} else {
		console.log(`⏭️  No duplicate found: blocks/${block}/editor.css`);
	}
});

console.log('\n✅ Duplicate selector removal complete!\n');
console.log('Run "npm run lint:css" to verify...');
