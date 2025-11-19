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

console.log('🚀 Deploying blocks to staging...\n');
console.log(`Target: ${STAGING_PATH}/wp-content/themes/client-website/blocks/build\n`);

const conn = new Client();

// Helper function to get all files recursively
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
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
      // Directory already exists, that's fine
      callback(null);
    } else if (err && err.code === 2) {
      // Parent directory doesn't exist, create it first
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

        const localBuildPath = path.join(__dirname, 'blocks', 'build');
        const remoteBuildPath = `${STAGING_PATH}/wp-content/themes/client-website/blocks/build`;

        // Get all files from build directory
        const allFiles = getAllFiles(localBuildPath);
        console.log(`📦 Found ${allFiles.length} files to upload\n`);

        let uploaded = 0;
        let failed = 0;

        // Create remote build directory first
        mkdirRecursive(sftp, remoteBuildPath, (err) => {
          if (err && err.code !== 4) {
            console.error('❌ Could not create build directory:', err);
            conn.end();
            reject(err);
            return;
          }

          console.log('📁 Build directory ready\n');

          // Upload each file
          allFiles.forEach(localFile => {
            const relativePath = path.relative(localBuildPath, localFile);
            const remoteFile = `${remoteBuildPath}/${relativePath.replace(/\\/g, '/')}`;
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
                  console.log(`✅ Upload complete!`);
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
    console.log('Next steps:');
    console.log('1. Go to WordPress admin');
    console.log('2. Create a new page or post');
    console.log('3. Look for the custom blocks in the block inserter');
    console.log('4. Test adding: Hero, Content Section, Card Grid, CTA Section, Button');
  })
  .catch((err) => {
    console.error('❌ Deployment failed:', err);
    process.exit(1);
  });
