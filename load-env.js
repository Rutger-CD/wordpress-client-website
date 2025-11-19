// Simple .env file loader for Node.js scripts
// Usage: const { LINEAR_API_KEY } = require('./load-env.js');

const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, '.env');

  if (!fs.existsSync(envPath)) {
    console.error('❌ Error: .env file not found!');
    console.error('Please create a .env file based on .env.example');
    process.exit(1);
  }

  const envFile = fs.readFileSync(envPath, 'utf8');
  const env = {};

  envFile.split('\n').forEach(line => {
    // Skip comments and empty lines
    if (line.trim().startsWith('#') || !line.trim()) {
      return;
    }

    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      env[key.trim()] = valueParts.join('=').trim();
    }
  });

  return env;
}

module.exports = loadEnv();
