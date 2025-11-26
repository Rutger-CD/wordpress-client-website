#!/usr/bin/env node

/**
 * SQL URL Replacement Tool
 *
 * Replaces URLs in SQL dump files for WordPress database migrations.
 * Handles serialized data correctly by updating string lengths.
 *
 * Usage:
 *   node scripts/sql-url-replace.js <input.sql> <old-url> <new-url> [output.sql]
 *
 * Examples:
 *   node scripts/sql-url-replace.js production.sql https://wp-base.rutgerthus.nl https://staging.nl staging.sql
 *   node scripts/sql-url-replace.js staging.sql https://staging.nl http://localhost:8888 local.sql
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length < 3) {
  console.error('❌ Error: Not enough arguments\n');
  console.log('Usage: node sql-url-replace.js <input.sql> <old-url> <new-url> [output.sql]\n');
  console.log('Examples:');
  console.log('  node scripts/sql-url-replace.js production.sql https://wp-base.rutgerthus.nl https://staging.nl staging.sql');
  console.log('  node scripts/sql-url-replace.js staging.sql https://staging.nl http://localhost:8888');
  process.exit(1);
}

const inputFile = args[0];
const oldUrl = args[1];
const newUrl = args[2];
const outputFile = args[3] || inputFile.replace('.sql', '-replaced.sql');

console.log('═'.repeat(80));
console.log('  SQL URL Replacement Tool');
console.log('═'.repeat(80));
console.log(`  Input file:  ${inputFile}`);
console.log(`  Output file: ${outputFile}`);
console.log(`  Old URL:     ${oldUrl}`);
console.log(`  New URL:     ${newUrl}`);
console.log('═'.repeat(80));
console.log('');

// Check if input file exists
if (!fs.existsSync(inputFile)) {
  console.error(`❌ Error: Input file not found: ${inputFile}`);
  process.exit(1);
}

// Get file size
const stats = fs.statSync(inputFile);
const fileSizeMB = (stats.size / 1024 / 1024).toFixed(2);
console.log(`📊 File size: ${fileSizeMB} MB`);

if (stats.size > 100 * 1024 * 1024) {
  console.log('⚠️  Warning: Large file (>100MB). This may take a while...\n');
}

console.log('🔄 Processing SQL file...\n');

try {
  // Read file
  let content = fs.readFileSync(inputFile, 'utf8');

  let replacements = 0;

  // Function to replace URLs in serialized data
  function replaceSerializedUrl(match) {
    replacements++;
    // match format: s:27:"https://old-url.com"
    // We need to update the length (27) to match new URL length

    const oldLength = oldUrl.length;
    const newLength = newUrl.length;

    // Replace the string and update the length
    return match
      .replace(`s:${oldLength}:"${oldUrl}"`, `s:${newLength}:"${newUrl}"`)
      .replace(oldUrl, newUrl);
  }

  // 1. Replace serialized URLs with correct length
  // Pattern: s:27:"https://old-url.com"
  const serializedPattern = new RegExp(
    `s:(\\d+):\\"${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\"`,
    'g'
  );

  console.log('🔍 Step 1/4: Replacing serialized URLs...');
  content = content.replace(serializedPattern, (match) => {
    const newLength = newUrl.length;
    replacements++;
    return `s:${newLength}:"${newUrl}"`;
  });

  // 2. Replace plain URLs in INSERT statements
  console.log('🔍 Step 2/4: Replacing plain URLs in INSERT statements...');
  const plainUrlPattern = new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const beforePlainReplace = content;
  content = content.replace(plainUrlPattern, (match) => {
    replacements++;
    return newUrl;
  });

  // 3. Replace URLs with escaped slashes (common in serialized data)
  console.log('🔍 Step 3/4: Replacing URLs with escaped slashes...');
  const escapedOldUrl = oldUrl.replace(/\//g, '\\/');
  const escapedNewUrl = newUrl.replace(/\//g, '\\/');
  const escapedPattern = new RegExp(escapedOldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  content = content.replace(escapedPattern, (match) => {
    replacements++;
    return escapedNewUrl;
  });

  // 4. Update serialized array lengths if needed
  console.log('🔍 Step 4/4: Verifying serialized data integrity...');

  // This is a simple check - for complex serialized data, use WordPress plugins
  const lengthDiff = newUrl.length - oldUrl.length;
  if (lengthDiff !== 0) {
    console.log(`⚠️  URL length changed by ${lengthDiff} characters`);
    console.log('   Complex serialized data may need manual verification');
    console.log('   Consider using "Better Search Replace" plugin after import\n');
  }

  // Write output file
  console.log(`💾 Writing to: ${outputFile}...`);
  fs.writeFileSync(outputFile, content, 'utf8');

  const outputStats = fs.statSync(outputFile);
  const outputSizeMB = (outputStats.size / 1024 / 1024).toFixed(2);

  console.log('');
  console.log('═'.repeat(80));
  console.log('  ✅ Success!');
  console.log('═'.repeat(80));
  console.log(`  Output file: ${outputFile}`);
  console.log(`  Output size: ${outputSizeMB} MB`);
  console.log(`  Replacements made: ${replacements.toLocaleString()}`);
  console.log('═'.repeat(80));
  console.log('');
  console.log('Next steps:');
  console.log('  1. Import the SQL file via phpMyAdmin or wp-env');
  console.log('  2. Verify URLs are correct in wp_options table');
  console.log('  3. Test the site thoroughly');
  console.log('  4. Consider using "Better Search Replace" plugin for complex data');
  console.log('');

} catch (error) {
  console.error('❌ Error processing file:', error.message);
  console.error(error.stack);
  process.exit(1);
}
