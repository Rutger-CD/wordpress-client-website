# Setup Guide

Complete setup instructies voor local development van het WordPress Client Website project.

## Quick Start

```bash
# 1. Clone & Install
git clone https://github.com/Rutger-CD/wordpress-client-website.git
cd wordpress-client-website
cd blocks && npm install && npm run build && cd ..

# 2. Setup WordPress (choose option below)
# 3. Activate theme
# 4. Start developing!
```

## Local WordPress Setup Options

### Option 1: wp-env (Recommended for Block Development)

**Voordelen**: Snel, geïsoleerd, geen MySQL install nodig

```bash
# Install wp-env globally
npm install -g @wordpress/env

# Start WordPress environment
wp-env start

# Site URLs:
# WordPress: http://localhost:8888
# Admin: http://localhost:8888/wp-admin (admin/password)

# Stop environment
wp-env stop
```

### Option 2: Local by Flywheel (Recommended for Full Site)

**Voordelen**: GUI, easy database management, SSL support

```bash
# 1. Download & install Local
# https://localwp.com/

# 2. Create new site
#    - Site name: client-website
#    - PHP: 8.0+
#    - WordPress: Latest

# 3. Add this theme
#    - Go to site folder
#    - Navigate to: app/public/wp-content/themes/
#    - Clone repository here OR symlink

# 4. Activate theme in WordPress
```

### Option 3: XAMPP/MAMP

**Voordelen**: Traditional setup, familiar for many

```bash
# 1. Install XAMPP/MAMP
# 2. Start Apache + MySQL
# 3. Create database: client_website
# 4. Download WordPress
# 5. Install WordPress
# 6. Clone theme to wp-content/themes/
# 7. Activate theme
```

## Theme Installation

### Copy Theme Files

```bash
# Copy this repository to WordPress themes directory
cp -r /path/to/wordpress-client-website /path/to/wordpress/wp-content/themes/

# Or create symlink (recommended for development)
ln -s /path/to/wordpress-client-website /path/to/wordpress/wp-content/themes/client-website
```

### Build Blocks

```bash
cd /path/to/wordpress/wp-content/themes/client-website/blocks
npm install
npm run build
```

## WordPress Configuration

### 1. Activate Theme

```
WordPress Admin → Appearance → Themes → Activate "Client Website"
```

### 2. Verify Blocks

```
Pages → Add New → Click '+' button
Search for: "Hero", "Button", "Card Grid", "CTA Section", "Content Section"
All 5 blocks should appear
```

### 3. Test Component Demo

```bash
# Open in browser
open components/demo/index.html

# Verify all 11 components display correctly
```

## Development Workflow

### Daily Development

```bash
# 1. Start block development mode (watch)
cd blocks
npm start

# 2. Make changes to blocks
# Changes rebuild automatically

# 3. Refresh WordPress editor to see changes

# 4. When done, build for commit
npm run build
```

### Creating New Blocks

```bash
# 1. Create block directory
mkdir blocks/my-block

# 2. Add required files
touch blocks/my-block/block.json
touch blocks/my-block/index.js
touch blocks/my-block/edit.js
touch blocks/my-block/save.js
touch blocks/my-block/style.css
touch blocks/my-block/editor.css

# 3. Register in functions.php (already automatic if using block.json)

# 4. Build
cd blocks && npm run build
```

### Code Quality

```bash
# Before committing
cd blocks

# Lint
npm run lint

# Auto-fix
npm run lint:js -- --fix
npm run lint:css -- --fix

# Format
npm run format
```

## Git Workflow

### Feature Development

```bash
# 1. Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/my-feature

# 2. Make changes
# ... develop ...

# 3. Commit
git add .
git commit -m "feat: my feature description"

# 4. Push
git push origin feature/my-feature

# 5. Create PR to develop
# GitHub → Pull Request → develop
```

### Branch Strategy

```
main        → Production (manual deploy)
develop     → Staging (auto-deploy)
feature/*   → Your work
```

## Troubleshooting

### Blocks Don't Appear

```bash
# Rebuild blocks
cd blocks
npm run build

# Clear WordPress cache
WordPress Admin → Plugins → Clear cache plugin

# Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+F5)
```

### Styling Not Working

```bash
# Check console for errors
# Verify design-tokens.css loaded
# Clear browser cache
# Check functions.php enqueues styles correctly
```

### Build Errors

```bash
# Clean install
cd blocks
rm -rf node_modules package-lock.json
npm install
npm run build
```

### wp-env Issues

```bash
# Reset environment
wp-env destroy
wp-env start

# View logs
wp-env logs

# Access database
wp-env run cli wp db export backup.sql
```

## Quick Reference

### Useful Commands

```bash
# Blocks
npm run build          # Build for production
npm start              # Development watch mode
npm run lint           # Lint all
npm run format         # Format code

# Git
git status             # Check status
git log --oneline -5   # Recent commits
git branch -a          # List branches

# wp-env
wp-env start           # Start WordPress
wp-env stop            # Stop WordPress
wp-env destroy         # Delete environment
wp-env clean all       # Clean downloads
```

### File Locations

```
Theme Root: /wp-content/themes/client-website/
Blocks:     /wp-content/themes/client-website/blocks/
Components: /wp-content/themes/client-website/components/
Functions:  /wp-content/themes/client-website/functions.php
```

### URLs (wp-env)

```
Site:       http://localhost:8888
Admin:      http://localhost:8888/wp-admin
Username:   admin
Password:   password
```

## Next Steps

1. ✅ Setup complete
2. Build first page with blocks
3. Test all block variations
4. Create custom page templates
5. Push to develop → auto-deploy to staging
6. Get client feedback
7. Deploy to production

## Resources

- [WordPress Block Editor](https://developer.wordpress.org/block-editor/)
- [wp-env Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)
- [Local by Flywheel](https://localwp.com/)
- [Project README](README.md)

---

**Need Help?** Check [README.md](README.md) or contact rutger@craft-digital.nl
