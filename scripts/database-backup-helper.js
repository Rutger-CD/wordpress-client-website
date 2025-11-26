#!/usr/bin/env node

/**
 * Database Backup Helper
 *
 * Helper tool for managing WordPress database backups.
 * Features:
 * - List existing backups
 * - Organize backups by date
 * - Clean old backups (retention policy)
 * - Compress/decompress backups
 *
 * Usage:
 *   node scripts/database-backup-helper.js list
 *   node scripts/database-backup-helper.js clean [days]
 *   node scripts/database-backup-helper.js compress <file.sql>
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const BACKUP_DIR = path.join(__dirname, '..', 'backups');
const DEFAULT_RETENTION_DAYS = 30;

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];

function listBackups() {
  console.log('═'.repeat(80));
  console.log('  Database Backups');
  console.log('═'.repeat(80));
  console.log(`  Location: ${BACKUP_DIR}\n`);

  const files = fs.readdirSync(BACKUP_DIR)
    .filter(file => file.endsWith('.sql') || file.endsWith('.sql.gz'))
    .map(file => {
      const filePath = path.join(BACKUP_DIR, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        path: filePath,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime
      };
    })
    .sort((a, b) => b.modified - a.modified);

  if (files.length === 0) {
    console.log('  📭 No backups found\n');
    console.log('To create a backup:');
    console.log('  1. Export database via phpMyAdmin');
    console.log('  2. Save to: backups/production-backup-YYYYMMDD.sql');
    console.log('  3. Run: node scripts/database-backup-helper.js compress backups/your-file.sql');
    console.log('');
    return;
  }

  console.log('  📦 Found backups:\n');

  let totalSize = 0;
  files.forEach((file, index) => {
    const sizeMB = (file.size / 1024 / 1024).toFixed(2);
    const date = file.modified.toISOString().split('T')[0];
    const time = file.modified.toTimeString().split(' ')[0];
    const compressed = file.name.endsWith('.gz') ? '🗜️ ' : '   ';

    console.log(`  ${index + 1}. ${compressed}${file.name}`);
    console.log(`      ${sizeMB} MB | ${date} ${time}`);
    console.log('');

    totalSize += file.size;
  });

  const totalMB = (totalSize / 1024 / 1024).toFixed(2);
  const totalGB = (totalSize / 1024 / 1024 / 1024).toFixed(2);

  console.log('─'.repeat(80));
  console.log(`  Total: ${files.length} backups | ${totalMB} MB (${totalGB} GB)`);
  console.log('═'.repeat(80));
  console.log('');
}

function cleanOldBackups(retentionDays = DEFAULT_RETENTION_DAYS) {
  console.log('═'.repeat(80));
  console.log('  Clean Old Backups');
  console.log('═'.repeat(80));
  console.log(`  Retention policy: ${retentionDays} days\n`);

  const now = new Date();
  const cutoffDate = new Date(now.getTime() - (retentionDays * 24 * 60 * 60 * 1000));

  const files = fs.readdirSync(BACKUP_DIR)
    .filter(file => file.endsWith('.sql') || file.endsWith('.sql.gz'))
    .map(file => {
      const filePath = path.join(BACKUP_DIR, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        path: filePath,
        modified: stats.mtime
      };
    });

  const toDelete = files.filter(file => file.modified < cutoffDate);

  if (toDelete.length === 0) {
    console.log(`  ✅ No backups older than ${retentionDays} days found\n`);
    return;
  }

  console.log(`  ⚠️  Found ${toDelete.length} backups older than ${retentionDays} days:\n`);

  toDelete.forEach((file, index) => {
    const age = Math.floor((now - file.modified) / (24 * 60 * 60 * 1000));
    console.log(`  ${index + 1}. ${file.name} (${age} days old)`);
  });

  console.log('');
  console.log('  These files will be deleted. Press Ctrl+C to cancel...');
  console.log('  Or run with --dry-run to see what would be deleted without deleting');
  console.log('');

  const isDryRun = args.includes('--dry-run');

  if (isDryRun) {
    console.log('  🧪 DRY RUN - No files deleted\n');
  } else {
    // Wait 3 seconds before deleting
    setTimeout(() => {
      let deleted = 0;
      toDelete.forEach(file => {
        try {
          fs.unlinkSync(file.path);
          console.log(`  ✅ Deleted: ${file.name}`);
          deleted++;
        } catch (error) {
          console.error(`  ❌ Error deleting ${file.name}: ${error.message}`);
        }
      });

      console.log('');
      console.log(`  ✅ Deleted ${deleted} old backups\n`);
    }, 3000);
  }
}

function compressBackup(filePath) {
  console.log('═'.repeat(80));
  console.log('  Compress Backup');
  console.log('═'.repeat(80));
  console.log(`  Input:  ${filePath}\n`);

  if (!fs.existsSync(filePath)) {
    console.error(`  ❌ Error: File not found: ${filePath}\n`);
    process.exit(1);
  }

  if (!filePath.endsWith('.sql')) {
    console.error(`  ❌ Error: File must be a .sql file\n`);
    process.exit(1);
  }

  const outputFile = filePath + '.gz';

  if (fs.existsSync(outputFile)) {
    console.error(`  ❌ Error: Output file already exists: ${outputFile}\n`);
    console.log('  Delete the existing .gz file first or choose a different name\n');
    process.exit(1);
  }

  const stats = fs.statSync(filePath);
  const inputSizeMB = (stats.size / 1024 / 1024).toFixed(2);

  console.log(`  📊 Original size: ${inputSizeMB} MB`);
  console.log(`  🗜️  Compressing...\n`);

  const gzip = zlib.createGzip({ level: 9 }); // Maximum compression
  const input = fs.createReadStream(filePath);
  const output = fs.createWriteStream(outputFile);

  input.pipe(gzip).pipe(output);

  output.on('finish', () => {
    const outputStats = fs.statSync(outputFile);
    const outputSizeMB = (outputStats.size / 1024 / 1024).toFixed(2);
    const savings = (((stats.size - outputStats.size) / stats.size) * 100).toFixed(1);

    console.log('  ✅ Compression complete!\n');
    console.log('─'.repeat(80));
    console.log(`  Output: ${outputFile}`);
    console.log(`  Size:   ${outputSizeMB} MB (${savings}% smaller)`);
    console.log('─'.repeat(80));
    console.log('');
    console.log('  Next steps:');
    console.log('  1. Keep the .gz file for long-term storage');
    console.log('  2. Optionally delete the .sql file to save space');
    console.log('  3. To decompress: node scripts/database-backup-helper.js decompress ' + path.basename(outputFile));
    console.log('');
  });

  output.on('error', (error) => {
    console.error(`  ❌ Error compressing file: ${error.message}\n`);
    process.exit(1);
  });
}

function decompressBackup(filePath) {
  console.log('═'.repeat(80));
  console.log('  Decompress Backup');
  console.log('═'.repeat(80));
  console.log(`  Input:  ${filePath}\n`);

  if (!fs.existsSync(filePath)) {
    console.error(`  ❌ Error: File not found: ${filePath}\n`);
    process.exit(1);
  }

  if (!filePath.endsWith('.sql.gz')) {
    console.error(`  ❌ Error: File must be a .sql.gz file\n`);
    process.exit(1);
  }

  const outputFile = filePath.replace('.gz', '');

  if (fs.existsSync(outputFile)) {
    console.error(`  ❌ Error: Output file already exists: ${outputFile}\n`);
    console.log('  Delete the existing .sql file first or choose a different name\n');
    process.exit(1);
  }

  const stats = fs.statSync(filePath);
  const inputSizeMB = (stats.size / 1024 / 1024).toFixed(2);

  console.log(`  📊 Compressed size: ${inputSizeMB} MB`);
  console.log(`  📦 Decompressing...\n`);

  const gunzip = zlib.createGunzip();
  const input = fs.createReadStream(filePath);
  const output = fs.createWriteStream(outputFile);

  input.pipe(gunzip).pipe(output);

  output.on('finish', () => {
    const outputStats = fs.statSync(outputFile);
    const outputSizeMB = (outputStats.size / 1024 / 1024).toFixed(2);

    console.log('  ✅ Decompression complete!\n');
    console.log('─'.repeat(80));
    console.log(`  Output: ${outputFile}`);
    console.log(`  Size:   ${outputSizeMB} MB`);
    console.log('─'.repeat(80));
    console.log('');
    console.log('  Next steps:');
    console.log('  1. Import via phpMyAdmin or wp-env');
    console.log('  2. Optionally re-compress after import to save space');
    console.log('');
  });

  output.on('error', (error) => {
    console.error(`  ❌ Error decompressing file: ${error.message}\n`);
    process.exit(1);
  });
}

// Command routing
switch (command) {
  case 'list':
  case 'ls':
    listBackups();
    break;

  case 'clean':
    const days = parseInt(args[1]) || DEFAULT_RETENTION_DAYS;
    cleanOldBackups(days);
    break;

  case 'compress':
  case 'zip':
    if (!args[1]) {
      console.error('❌ Error: No file specified\n');
      console.log('Usage: node scripts/database-backup-helper.js compress <file.sql>\n');
      process.exit(1);
    }
    compressBackup(args[1]);
    break;

  case 'decompress':
  case 'unzip':
    if (!args[1]) {
      console.error('❌ Error: No file specified\n');
      console.log('Usage: node scripts/database-backup-helper.js decompress <file.sql.gz>\n');
      process.exit(1);
    }
    decompressBackup(args[1]);
    break;

  case 'help':
  case '--help':
  case '-h':
  default:
    console.log('═'.repeat(80));
    console.log('  Database Backup Helper');
    console.log('═'.repeat(80));
    console.log('');
    console.log('Commands:');
    console.log('  list                      List all backups in backups/ directory');
    console.log('  clean [days]              Delete backups older than N days (default: 30)');
    console.log('  compress <file.sql>       Compress a .sql file to .sql.gz');
    console.log('  decompress <file.sql.gz>  Decompress a .sql.gz file');
    console.log('  help                      Show this help message');
    console.log('');
    console.log('Examples:');
    console.log('  node scripts/database-backup-helper.js list');
    console.log('  node scripts/database-backup-helper.js clean 30');
    console.log('  node scripts/database-backup-helper.js clean 30 --dry-run');
    console.log('  node scripts/database-backup-helper.js compress backups/production.sql');
    console.log('  node scripts/database-backup-helper.js decompress backups/production.sql.gz');
    console.log('');
    break;
}
