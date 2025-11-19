const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');
const {
  STAGING_SFTP_HOST,
  STAGING_SFTP_PORT,
  STAGING_SFTP_USER,
  STAGING_SFTP_PASSWORD,
  STAGING_PATH
} = require('./load-env.js');

console.log('🚀 Deploying complete blocks structure to staging...\n');

const conn = new Client();

// Helper function to get all files recursively, excluding node_modules
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    if (file === 'node_modules') return; // Skip node_modules

    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Helper function to create directory recursively
function mkdirRecursive(sftp, dir, callback) {
  sftp.mkdir(dir, { mode: 0o755 }, (err) => {
    if (err && err.code === 4) {
      callback(null);
    } else if (err && err.code === 2) {
      const parent = path.dirname(dir);
      mkdirRecursive(sftp, parent, (err) => {
        if (err) return callback(err);
        sftp.mkdir(dir, { mode: 0o755 }, callback);
      });
    } else {
      callback(err);
    }
  });
}

async function deployBlocks() {
  return new Promise((resolve, reject) => {
    conn.on('ready', () => {
      console.log('✅ Connected to Strato SFTP\n');

      conn.sftp((err, sftp) => {
        if (err) {
          conn.end();
          reject(err);
          return;
        }

        const localBlocksPath = path.join(__dirname, 'blocks');
        const remoteBlocksPath = `${STAGING_PATH}/wp-content/themes/client-website/blocks`;

        // Get all files from blocks directory (excluding node_modules)
        const allFiles = getAllFiles(localBlocksPath).filter(file => {
          // Skip package files and README
          const basename = path.basename(file);
          return basename !== 'package.json' &&
                 basename !== 'package-lock.json' &&
                 basename !== 'README.md' &&
                 basename !== 'BLOCKS_IMPLEMENTATION.md' &&
                 basename !== 'webpack.config.js';
        });

        console.log(`📦 Found ${allFiles.length} files to upload\n`);

        let uploaded = 0;
        let failed = 0;

        // Upload each file
        allFiles.forEach(localFile => {
          const relativePath = path.relative(localBlocksPath, localFile);
          const remoteFile = `${remoteBlocksPath}/${relativePath.replace(/\\/g, '/')}`;
          const remoteDir = path.dirname(remoteFile);

          // Create remote directory for this file
          mkdirRecursive(sftp, remoteDir, (err) => {
            if (err && err.code !== 4) {
              console.log(`  ❌ Failed: ${relativePath}`);
              failed++;
              return;
            }

            // Upload file
            sftp.fastPut(localFile, remoteFile, { mode: 0o644 }, (err) => {
              if (err) {
                console.log(`  ❌ Failed: ${relativePath}`);
                failed++;
              } else {
                console.log(`  ✅ ${relativePath}`);
                uploaded++;
              }

              // Check if all files are processed
              if (uploaded + failed === allFiles.length) {
                console.log('\n======================================================================');
                console.log(`✅ Deployment complete!`);
                console.log(`   Uploaded: ${uploaded} files`);
                if (failed > 0) {
                  console.log(`   Failed: ${failed} files`);
                }
                console.log('======================================================================\n');
                conn.end();
                resolve();
              }
            });
          });
        });
      });
    });

    conn.on('error', (err) => {
      console.error('Connection error:', err);
      reject(err);
    });

    conn.connect({
      host: STAGING_SFTP_HOST,
      port: parseInt(STAGING_SFTP_PORT),
      username: STAGING_SFTP_USER,
      password: STAGING_SFTP_PASSWORD
    });
  });
}

deployBlocks()
  .then(() => {
    console.log('🎉 All block files deployed!');
    console.log('\nNext steps:');
    console.log('1. Refresh WordPress admin');
    console.log('2. Create a new page');
    console.log('3. The blocks should now have full styling');
  })
  .catch((err) => {
    console.error('❌ Deployment failed:', err);
    process.exit(1);
  });
