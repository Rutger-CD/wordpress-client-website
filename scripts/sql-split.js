#!/usr/bin/env node

/**
 * SQL File Splitter
 *
 * Splits large SQL files into smaller chunks for easier import via phpMyAdmin.
 * Handles SQL statements properly to avoid breaking queries.
 *
 * Usage:
 *   node scripts/sql-split.js <input.sql> [chunk-size-mb]
 *
 * Examples:
 *   node scripts/sql-split.js database.sql 10
 *   node scripts/sql-split.js production-backup.sql 25
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length < 1) {
  console.error('❌ Error: No input file specified\n');
  console.log('Usage: node sql-split.js <input.sql> [chunk-size-mb]\n');
  console.log('Examples:');
  console.log('  node scripts/sql-split.js database.sql 10');
  console.log('  node scripts/sql-split.js production-backup.sql 25');
  console.log('');
  console.log('Default chunk size: 10 MB');
  process.exit(1);
}

const inputFile = args[0];
const chunkSizeMB = parseInt(args[1]) || 10;
const chunkSizeBytes = chunkSizeMB * 1024 * 1024;

console.log('═'.repeat(80));
console.log('  SQL File Splitter');
console.log('═'.repeat(80));
console.log(`  Input file:  ${inputFile}`);
console.log(`  Chunk size:  ${chunkSizeMB} MB`);
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
const estimatedChunks = Math.ceil(stats.size / chunkSizeBytes);

console.log(`📊 File size: ${fileSizeMB} MB`);
console.log(`📦 Estimated chunks: ${estimatedChunks}`);
console.log('');

if (stats.size <= chunkSizeBytes) {
  console.log('✅ File is already smaller than chunk size. No splitting needed!');
  process.exit(0);
}

console.log('🔄 Splitting SQL file...\n');

const basename = path.basename(inputFile, '.sql');
const dirname = path.dirname(inputFile);

let chunkNumber = 1;
let currentSize = 0;
let currentChunk = '';
let linesProcessed = 0;

// Create write stream for first chunk
let outputFile = path.join(dirname, `${basename}-part-${chunkNumber}.sql`);
let writeStream = fs.createWriteStream(outputFile);

console.log(`📝 Writing chunk ${chunkNumber}: ${path.basename(outputFile)}`);

// Read file line by line
const rl = readline.createInterface({
  input: fs.createReadStream(inputFile),
  crlfDelay: Infinity
});

let buffer = '';
let insideStatement = false;

rl.on('line', (line) => {
  linesProcessed++;

  // Add line to buffer
  buffer += line + '\n';

  // Check if we're at the end of a complete SQL statement
  // SQL statements end with semicolon (but not inside quotes)
  const trimmedLine = line.trim();

  if (trimmedLine === '') {
    // Empty line - safe to split here
    writeStream.write(buffer);
    currentSize += Buffer.byteLength(buffer);
    buffer = '';

    // Check if we should start a new chunk
    if (currentSize >= chunkSizeBytes && chunkNumber < estimatedChunks) {
      writeStream.end();
      chunkNumber++;
      currentSize = 0;
      outputFile = path.join(dirname, `${basename}-part-${chunkNumber}.sql`);
      writeStream = fs.createWriteStream(outputFile);
      console.log(`📝 Writing chunk ${chunkNumber}: ${path.basename(outputFile)}`);
    }
  } else if (trimmedLine.endsWith(';') && !insideStatement) {
    // Complete SQL statement
    writeStream.write(buffer);
    currentSize += Buffer.byteLength(buffer);
    buffer = '';

    // Check if we should start a new chunk
    if (currentSize >= chunkSizeBytes && chunkNumber < estimatedChunks) {
      writeStream.end();
      chunkNumber++;
      currentSize = 0;
      outputFile = path.join(dirname, `${basename}-part-${chunkNumber}.sql`);
      writeStream = fs.createWriteStream(outputFile);
      console.log(`📝 Writing chunk ${chunkNumber}: ${path.basename(outputFile)}`);
    }
  } else if (trimmedLine.startsWith('INSERT INTO') || trimmedLine.startsWith('CREATE TABLE')) {
    insideStatement = true;
  } else if (trimmedLine.endsWith(';')) {
    insideStatement = false;
  }

  // Progress indicator every 100k lines
  if (linesProcessed % 100000 === 0) {
    const progress = ((linesProcessed / stats.size) * 100).toFixed(1);
    console.log(`   Progress: ${linesProcessed.toLocaleString()} lines processed...`);
  }
});

rl.on('close', () => {
  // Write any remaining buffer
  if (buffer.length > 0) {
    writeStream.write(buffer);
  }

  writeStream.end();

  console.log('');
  console.log('═'.repeat(80));
  console.log('  ✅ Success!');
  console.log('═'.repeat(80));
  console.log(`  Total chunks created: ${chunkNumber}`);
  console.log(`  Total lines processed: ${linesProcessed.toLocaleString()}`);
  console.log('═'.repeat(80));
  console.log('');
  console.log('Output files:');

  for (let i = 1; i <= chunkNumber; i++) {
    const chunkFile = path.join(dirname, `${basename}-part-${i}.sql`);
    const chunkStats = fs.statSync(chunkFile);
    const chunkMB = (chunkStats.size / 1024 / 1024).toFixed(2);
    console.log(`  ${i}. ${path.basename(chunkFile)} (${chunkMB} MB)`);
  }

  console.log('');
  console.log('Next steps:');
  console.log('  1. Import each chunk in order via phpMyAdmin');
  console.log('  2. Start with part-1.sql, then part-2.sql, etc.');
  console.log('  3. Verify import completes successfully for each chunk');
  console.log('  4. Delete chunk files after successful import');
  console.log('');
});

rl.on('error', (error) => {
  console.error('❌ Error reading file:', error.message);
  process.exit(1);
});
