# Local WordPress Development Guide

Complete guide voor local WordPress development met wp-env.

## Quick Start

```bash
# 1. Install wp-env globally (one-time)
npm install -g @wordpress/env

# 2. Start WordPress
wp-env start

# 3. Open WordPress
# Site: http://localhost:8888
# Admin: http://localhost:8888/wp-admin
# Username: admin
# Password: password

# 4. Start block development (in separate terminal)
cd blocks
npm start
```

## Overview

Dit project gebruikt **wp-env** voor local WordPress development:

- ✅ Docker-based (isolated environment)
- ✅ Officieel WordPress tool
- ✅ Geen MySQL install nodig
- ✅ Theme auto-sync (via `.wp-env.json`)
- ✅ Debug mode enabled
- ✅ Works met @wordpress/scripts

## Installation

### Prerequisites

```bash
# Required:
- Node.js 18+ (check: node --version)
- npm (check: npm --version)
- Docker Desktop (check: docker --version)
- Git (check: git --version)
```

### Install Docker Desktop

**Windows/Mac**:
1. Download from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Install and start Docker Desktop
3. Verify: `docker --version`

**Linux**:
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker
```

### Install wp-env

```bash
# Install globally (one-time)
npm install -g @wordpress/env

# Verify installation
wp-env --version
```

## Configuration

### .wp-env.json

Project root bevat `.wp-env.json` configuratie:

```json
{
  "core": "WordPress/WordPress#6.4",
  "phpVersion": "8.0",
  "themes": [
    "."
  ],
  "plugins": [],
  "port": 8888,
  "config": {
    "WP_DEBUG": true,
    "WP_DEBUG_LOG": true,
    "WP_DEBUG_DISPLAY": false,
    "SCRIPT_DEBUG": true
  },
  "mappings": {
    "wp-content/themes/client-website": "."
  }
}
```

**Features**:
- WordPress 6.4
- PHP 8.0
- Theme auto-sync (current directory → `wp-content/themes/client-website`)
- Debug logging enabled
- Port 8888

### Theme Auto-Sync

Het theme wordt automatisch gesynchroniseerd:

```
/path/to/repo (your git repo)
    ↓ (mapped via .wp-env.json)
/wp-content/themes/client-website (in wp-env)
```

**Changes in git repo** → **Automatically visible in wp-env**

## Daily Workflow

### Starting Development

```bash
# Terminal 1: Start WordPress
wp-env start

# Wait for:
# ✔ WordPress started
# ✔ MySQL started
# ✔ http://localhost:8888

# Terminal 2: Start block development
cd blocks
npm start

# Wait for:
# ✔ webpack compiled
# ✔ watching for changes...
```

### Accessing WordPress

**Site**: http://localhost:8888
**Admin**: http://localhost:8888/wp-admin

**Default Credentials**:
- Username: `admin`
- Password: `password`

### Making Changes

**Blocks**:
```bash
# Terminal with npm start running:
# 1. Edit block files (blocks/hero/edit.js)
# 2. Webpack auto-rebuilds
# 3. Refresh WordPress editor
# 4. See changes!
```

**Theme Files**:
```bash
# Edit theme files (functions.php, style.css)
# Changes are immediately visible (theme auto-sync)
# Refresh browser to see changes
```

**CSS/JS**:
```bash
# Edit component CSS (components/button/button.css)
# Rebuild blocks: npm run build (in blocks/)
# Refresh browser
```

### Stopping Development

```bash
# Stop WordPress (keeps data)
wp-env stop

# Or destroy completely (removes data)
wp-env destroy
```

## WordPress Commands

### Basic Commands

```bash
# Start WordPress
wp-env start

# Stop WordPress (keeps data)
wp-env stop

# Restart WordPress
wp-env stop && wp-env start

# Destroy WordPress (removes all data!)
wp-env destroy

# View logs
wp-env logs

# Clean downloaded files
wp-env clean all
```

### WP-CLI Commands

wp-env includes WP-CLI voor database en WordPress management:

```bash
# Run WP-CLI commands
wp-env run cli wp <command>

# Examples:
wp-env run cli wp --version
wp-env run cli wp plugin list
wp-env run cli wp theme list
wp-env run cli wp user list
```

## Database Management

### Export Database

```bash
# Export to SQL file
wp-env run cli wp db export backup.sql

# Export with compression
wp-env run cli wp db export - | gzip > backup-$(date +%Y%m%d).sql.gz

# Backup location: project root
```

### Import Database

```bash
# Import SQL file
wp-env run cli wp db import backup.sql

# Import compressed file
gunzip < backup.sql.gz | wp-env run cli wp db import -

# Search-replace URLs after import
wp-env run cli wp search-replace 'https://staging.example.com' 'http://localhost:8888'
```

### Reset Database

```bash
# Option 1: Destroy and recreate (complete reset)
wp-env destroy
wp-env start

# Option 2: Reset via WP-CLI
wp-env run cli wp db reset --yes
```

### Database Info

```bash
# Check database
wp-env run cli wp db check

# Database size
wp-env run cli wp db size

# Optimize database
wp-env run cli wp db optimize
```

## Content Sync from Staging

### Option 1: Manual Export/Import

**On Staging** (WordPress Admin):
1. Tools → Export
2. Choose "All content"
3. Download XML file

**On Local**:
1. Tools → Import
2. Install WordPress importer
3. Upload XML file
4. Import content

### Option 2: Database Sync (Advanced)

**Prerequisites**:
- SSH access to staging server
- WP-CLI on staging server

**Steps**:

```bash
# 1. Export from staging (run on your machine)
ssh staging@server "wp db export - | gzip" > staging-db.sql.gz

# 2. Import to local
gunzip < staging-db.sql.gz | wp-env run cli wp db import -

# 3. Search-replace URLs
wp-env run cli wp search-replace 'https://staging.example.com' 'http://localhost:8888' --all-tables

# 4. Flush rewrite rules
wp-env run cli wp rewrite flush
```

## Git Workflow

### Feature Development

```bash
# 1. Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/my-feature

# 2. Develop in wp-env
wp-env start
cd blocks && npm start

# 3. Make changes, test in WordPress

# 4. Build for production
cd blocks
npm run lint
npm run build

# 5. Commit changes
git add .
git commit -m "feat: my feature description"

# 6. Push to GitHub
git push origin feature/my-feature

# 7. Create PR to develop
# GitHub → Pull Request → develop
```

### Deployment Flow

```
Local (wp-env)
    ↓
    git push → feature/my-feature
    ↓
    PR to develop
    ↓
Staging (auto-deploy when merged)
    ↓
    Client approval
    ↓
    Merge develop to main
    ↓
Production (manual deploy)
```

## Block Development

### Watch Mode (Recommended)

```bash
# Start watch mode
cd blocks
npm start

# Features:
# - Auto-rebuild on file changes
# - Fast compilation
# - Error reporting
# - Source maps
```

### Manual Build

```bash
# Build once
cd blocks
npm run build

# Lint first
npm run lint

# Format code
npm run format
```

### Testing Blocks in WordPress

```bash
# 1. Ensure WordPress running
wp-env start

# 2. Ensure blocks built
cd blocks && npm run build

# 3. Open WordPress editor
# http://localhost:8888/wp-admin
# Pages → Add New → Click '+' button

# 4. Search for blocks:
# - Hero
# - Content Section
# - Button
# - Card Grid
# - CTA Section
```

## Troubleshooting

### wp-env start fails

**Error**: "Cannot connect to Docker daemon"

**Solution**:
```bash
# 1. Ensure Docker Desktop is running
# 2. Verify: docker ps
# 3. Restart Docker Desktop if needed
```

**Error**: "Port 8888 already in use"

**Solution**:
```bash
# Option 1: Change port in .wp-env.json
{
  "port": 8889  // or any available port
}

# Option 2: Stop process using port 8888
# Windows: netstat -ano | findstr :8888
# Mac/Linux: lsof -i :8888
# Kill process using that port
```

### Blocks don't appear in WordPress

**Solution**:
```bash
# 1. Rebuild blocks
cd blocks
npm run build

# 2. Check for build errors
npm run lint

# 3. Restart wp-env
wp-env stop
wp-env start

# 4. Clear browser cache (Cmd+Shift+R / Ctrl+Shift+F5)
```

### Changes not visible

**Solution**:
```bash
# 1. Verify npm start is running
cd blocks
npm start

# 2. Check webpack compilation
# Look for "webpack compiled successfully"

# 3. Hard refresh browser
# Cmd+Shift+R (Mac) / Ctrl+Shift+F5 (Windows)

# 4. Check browser console for errors
# F12 → Console tab
```

### Database import fails

**Solution**:
```bash
# 1. Check SQL file integrity
head backup.sql  # Should show SQL commands

# 2. Try resetting database first
wp-env run cli wp db reset --yes

# 3. Import again
wp-env run cli wp db import backup.sql

# 4. If still fails, recreate wp-env
wp-env destroy
wp-env start
```

### Theme not activated

**Solution**:
```bash
# 1. List themes
wp-env run cli wp theme list

# 2. Activate manually
wp-env run cli wp theme activate client-website

# 3. Verify in WordPress Admin
# Appearance → Themes → Client Website (should be active)
```

### wp-env very slow

**Solution**:
```bash
# 1. Allocate more resources to Docker
# Docker Desktop → Settings → Resources
# Increase CPU and Memory

# 2. Clean wp-env cache
wp-env clean all

# 3. Destroy and recreate
wp-env destroy
wp-env start
```

## Best Practices

### Development

- ✅ Always use `npm start` (watch mode) during development
- ✅ Run `npm run lint` before committing
- ✅ Test all blocks in WordPress editor
- ✅ Hard refresh browser after major changes
- ✅ Check browser console for errors

### Database

- ✅ Export database before risky changes
- ✅ Use descriptive backup names (`backup-20250116-feature-name.sql`)
- ✅ Search-replace URLs after importing from staging
- ✅ Regular backups (`wp-env run cli wp db export backup.sql`)

### Git

- ✅ Always work in feature branches
- ✅ Never commit to `main` directly
- ✅ Create PR to `develop` first
- ✅ Wait for staging deployment before production
- ✅ Run linting before pushing

### Performance

- ✅ Stop wp-env when not developing (`wp-env stop`)
- ✅ Clean old Docker images occasionally
- ✅ Don't commit `.wp-env/` directory (in `.gitignore`)
- ✅ Use watch mode instead of repeated builds

## Advanced Usage

### Custom PHP Version

Edit `.wp-env.json`:
```json
{
  "phpVersion": "8.1"  // or "8.2"
}
```

Then recreate:
```bash
wp-env destroy
wp-env start
```

### Add Plugins

Edit `.wp-env.json`:
```json
{
  "plugins": [
    "https://downloads.wordpress.org/plugin/akismet.zip",
    "./path/to/local-plugin"
  ]
}
```

### Multiple Environments

Create `.wp-env.override.json` for local customizations:
```json
{
  "port": 8889,
  "config": {
    "WP_DEBUG_DISPLAY": true
  }
}
```

(This file is in `.gitignore`)

### Access MySQL Directly

```bash
# Get MySQL credentials
wp-env run cli wp config get DB_NAME
wp-env run cli wp config get DB_USER
wp-env run cli wp config get DB_PASSWORD

# Connect via MySQL client
# Host: localhost
# Port: Check Docker port mapping
```

## Quick Reference

### Essential Commands

```bash
# Start/Stop
wp-env start                          # Start WordPress
wp-env stop                           # Stop WordPress
wp-env destroy                        # Destroy WordPress

# Block Development
cd blocks && npm start                # Watch mode
cd blocks && npm run build            # Build once
cd blocks && npm run lint             # Lint code

# Database
wp-env run cli wp db export backup.sql    # Export
wp-env run cli wp db import backup.sql    # Import
wp-env run cli wp db reset --yes          # Reset

# Theme
wp-env run cli wp theme activate client-website   # Activate
wp-env run cli wp theme list                      # List themes

# URLs
wp-env run cli wp search-replace 'old.url' 'new.url'  # Replace URLs
```

### URLs

- **Site**: http://localhost:8888
- **Admin**: http://localhost:8888/wp-admin
- **Username**: admin
- **Password**: password

### File Locations

```
Project Root
├── .wp-env.json              # wp-env configuration
├── .wp-env/                  # wp-env data (gitignored)
├── blocks/                   # Gutenberg blocks
├── components/               # UI components
├── functions.php             # WordPress theme functions
└── style.css                 # WordPress theme stylesheet
```

## Resources

- [wp-env Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)
- [WP-CLI Commands](https://developer.wordpress.org/cli/commands/)
- [WordPress Block Editor](https://developer.wordpress.org/block-editor/)
- [Docker Documentation](https://docs.docker.com/)

---

**Need Help?** Check [SETUP.md](../SETUP.md) or contact rutger@craft-digital.nl
