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

async function deployTheme() {
  console.log('🚀 Deploying custom theme to staging...\n');
  console.log(`Target: ${STAGING_PATH}/wp-content/themes/client-website\n`);

  const conn = new Client();

  return new Promise((resolve, reject) => {
    conn.on('ready', () => {
      console.log('✅ Connected to Strato SFTP\n');

      conn.sftp((err, sftp) => {
        if (err) {
          conn.end();
          reject(err);
          return;
        }

        const themePath = `${STAGING_PATH}/wp-content/themes/client-website`;

        // Create theme directory
        console.log('📁 Creating theme directory...');

        sftp.mkdir(themePath, (err) => {
          // Ignore error if directory already exists
          if (err && err.code !== 4) {
            console.log('⚠️  Directory may already exist, continuing...');
          }

          console.log('✅ Theme directory ready\n');

          // Upload theme files
          const filesToUpload = [
            { local: 'style.css', remote: `${themePath}/style.css` },
            { local: 'functions.php', remote: `${themePath}/functions.php` },
            { local: 'theme.json', remote: `${themePath}/theme.json` },
            { local: 'index.php', remote: `${themePath}/index.php` },
          ];

          let uploaded = 0;

          filesToUpload.forEach(file => {
            if (!fs.existsSync(file.local)) {
              console.log(`⚠️  Skipping ${file.local} (not found)`);
              uploaded++;
              if (uploaded === filesToUpload.length) finish();
              return;
            }

            console.log(`📤 Uploading ${file.local}...`);

            sftp.fastPut(file.local, file.remote, (err) => {
              if (err) {
                console.error(`❌ Failed to upload ${file.local}:`, err.message);
              } else {
                console.log(`✅ ${file.local} uploaded`);
              }

              uploaded++;
              if (uploaded === filesToUpload.length) {
                finish();
              }
            });
          });

          function finish() {
            console.log('\n📁 Uploading directories...\n');

            // Upload directories
            uploadDirectory('components', `${themePath}/components`, sftp, () => {
              uploadDirectory('blocks', `${themePath}/blocks`, sftp, () => {
                uploadDirectory('patterns', `${themePath}/patterns`, sftp, () => {
                  uploadDirectory('parts', `${themePath}/parts`, sftp, () => {
                    uploadDirectory('templates', `${themePath}/templates`, sftp, () => {
                      console.log('\n' + '='.repeat(70));
                      console.log('✅ Theme deployment complete!\n');
                      console.log('Next steps:');
                      console.log('1. Login to WordPress admin:');
                      console.log('   https://wp-base-stg.rutgerthus.nl/wp-admin');
                      console.log('2. Go to Appearance → Themes');
                      console.log('3. Activate "Client Website" theme');
                      console.log('='.repeat(70));

                      conn.end();
                      resolve(true);
                    });
                  });
                });
              });
            });
          }
        });
      });
    });

    conn.on('error', (err) => {
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

function uploadDirectory(localDir, remoteDir, sftp, callback) {
  if (!fs.existsSync(localDir)) {
    console.log(`⚠️  Skipping ${localDir}/ (not found)`);
    callback();
    return;
  }

  console.log(`📁 Uploading ${localDir}/...`);

  sftp.mkdir(remoteDir, (err) => {
    // Ignore if exists
    uploadFilesInDirectory(localDir, remoteDir, sftp, () => {
      console.log(`✅ ${localDir}/ uploaded`);
      callback();
    });
  });
}

function uploadFilesInDirectory(localDir, remoteDir, sftp, callback) {
  const files = getAllFiles(localDir);

  if (files.length === 0) {
    callback();
    return;
  }

  let uploaded = 0;

  files.forEach(file => {
    const relativePath = path.relative(localDir, file);
    const remotePath = `${remoteDir}/${relativePath}`.replace(/\\/g, '/');
    const remoteFolder = path.dirname(remotePath);

    // Create remote directory if needed
    sftp.mkdir(remoteFolder, (err) => {
      // Upload file
      sftp.fastPut(file, remotePath, (err) => {
        if (err) {
          console.error(`  ❌ Failed: ${relativePath}`);
        }

        uploaded++;
        if (uploaded === files.length) {
          callback();
        }
      });
    });
  });
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      // Skip node_modules and build source directories
      if (file !== 'node_modules' && file !== 'src') {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      }
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

deployTheme()
  .then(() => {
    console.log('\n🎉 Success!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n❌ Deployment failed:', err.message);
    process.exit(1);
  });
