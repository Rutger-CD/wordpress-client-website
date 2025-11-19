const { Client } = require('ssh2');
const {
  STAGING_SFTP_HOST,
  STAGING_SFTP_PORT,
  STAGING_SFTP_USER,
  STAGING_SFTP_PASSWORD,
  STAGING_PATH
} = require('./load-env.js');

async function fixPermissions() {
  console.log('🔧 Fixing theme file permissions...\n');

  const conn = new Client();

  return new Promise((resolve, reject) => {
    conn.on('ready', () => {
      conn.sftp((err, sftp) => {
        if (err) {
          conn.end();
          reject(err);
          return;
        }

        const themePath = `${STAGING_PATH}/wp-content/themes/client-website`;

        // Set directory permission to 755
        console.log('Setting directory permissions to 755...');
        sftp.chmod(themePath, '0755', (err) => {
          if (err) console.log('⚠️  Could not set theme dir permissions');

          // Set file permissions to 644
          const files = ['style.css', 'functions.php', 'theme.json', 'index.php'];

          let fixed = 0;
          files.forEach(file => {
            sftp.chmod(`${themePath}/${file}`, '0644', (err) => {
              if (err) {
                console.log(`⚠️  Could not set ${file} permissions`);
              } else {
                console.log(`✅ ${file} - permissions set to 644`);
              }

              fixed++;
              if (fixed === files.length) {
                console.log('\n✅ Permissions updated!');
                conn.end();
                resolve();
              }
            });
          });
        });
      });
    });

    conn.on('error', reject);

    conn.connect({
      host: STAGING_SFTP_HOST,
      port: parseInt(STAGING_SFTP_PORT),
      username: STAGING_SFTP_USER,
      password: STAGING_SFTP_PASSWORD
    });
  });
}

fixPermissions()
  .then(() => {
    console.log('\nNow try:');
    console.log('1. Clear your browser cache (Ctrl+Shift+R)');
    console.log('2. Login to WordPress admin again');
    console.log('3. Go to Appearance → Themes');
    console.log('4. Look for "Client Website" theme');
  })
  .catch(console.error);
