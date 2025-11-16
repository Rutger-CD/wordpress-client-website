# Maintenance Guide

Ongoing maintenance instructies voor het WordPress Client Website project.

## Regular Maintenance Schedule

### Daily (During Active Development)
- [ ] Monitor GitHub Actions status
- [ ] Check staging site functionality
- [ ] Review error logs

### Weekly
- [ ] Update npm dependencies
- [ ] Test all blocks in WordPress
- [ ] Review and close completed PRs
- [ ] Backup production database

### Monthly
- [ ] Update WordPress core
- [ ] Update WordPress plugins
- [ ] Security scan
- [ ] Performance audit
- [ ] Review GitHub Actions usage
- [ ] Clean old backups

### Quarterly
- [ ] Dependency security audit
- [ ] Full accessibility audit
- [ ] Browser compatibility testing
- [ ] Mobile responsiveness check
- [ ] SEO audit

## Dependency Updates

### Node Dependencies

```bash
# Check outdated packages
cd blocks
npm outdated

# Update @wordpress packages
npm update @wordpress/scripts
npm update @wordpress/block-editor
npm update @wordpress/blocks
npm update @wordpress/components

# Update all dependencies (careful!)
npm update

# Test after update
npm run lint
npm run build

# Commit if successful
git add package.json package-lock.json
git commit -m "chore: update npm dependencies"
```

### WordPress Updates

```bash
# Core
WordPress Admin → Dashboard → Updates → Update WordPress

# Plugins (if any)
WordPress Admin → Plugins → Update available plugins

# Theme (this theme)
git pull origin main
cd blocks && npm install && npm run build
```

## Backup Procedures

### Automatic Backups

Backups worden automatisch gemaakt:
- ✅ Voor elke production deployment
- ✅ Retention: 30 dagen
- ✅ Location: Server backup directory

### Manual Backup

```bash
# Via wp-env (local)
wp-env run cli wp db export backup-$(date +%Y%m%d).sql

# Via WordPress Admin
Tools → Export → All content

# Via FTP
# Download entire wp-content/uploads directory
# Download database via phpMyAdmin
```

### Restore from Backup

```bash
# Use automated rollback (preferred)
GitHub → Actions → Rollback Production
# Enter backup timestamp

# Or manual via FTP
# See .github/PRODUCTION.md for details
```

## Monitoring

### Site Health

```bash
# WordPress Site Health
WordPress Admin → Tools → Site Health

# Check for:
- PHP version
- Database status
- HTTPS status
- File permissions
- Scheduled events
```

### Performance

```bash
# Google PageSpeed Insights
https://pagespeed.web.dev/

# Target scores:
- Performance: > 80
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

# GTmetrix
https://gtmetrix.com/

# Target:
- Load time: < 3s
- Total page size: < 2MB
```

### Error Logs

```bash
# WordPress Debug Log
wp-content/debug.log

# Server Error Log
# Check with hosting provider

# GitHub Actions Logs
GitHub → Actions → Failed workflows
```

## Security

### Security Checklist

```bash
# Weekly
- [ ] Review user accounts
- [ ] Check failed login attempts
- [ ] Scan for malware
- [ ] Review file permissions

# Monthly
- [ ] Update WordPress & plugins
- [ ] Password audit
- [ ] SSL certificate check
- [ ] Backup verification
```

### Security Hardening

```php
// wp-config.php (already configured)
define('DISALLOW_FILE_EDIT', true);  // Disable file editor
define('WP_DEBUG', false);           // Disable debug in production
define('WP_DEBUG_LOG', false);       // Disable debug log
```

### File Permissions

```bash
# Correct permissions
chmod 755 wp-content/themes/client-website
chmod 644 wp-content/themes/client-website/functions.php
chmod 644 wp-content/themes/client-website/style.css

# Blocks directory
chmod 755 blocks
chmod 644 blocks/**/*.js
chmod 644 blocks/**/*.css
```

## Performance Optimization

### Image Optimization

```bash
# Before upload
# Use tools like:
- TinyPNG
- ImageOptim
- Squoosh

# WordPress Plugins (optional)
- Smush
- ShortPixel
- EWWW Image Optimizer
```

### Caching

```bash
# Enable browser caching (.htaccess)
# Enable WordPress object caching
# Consider using:
- WP Super Cache
- W3 Total Cache
- WP Rocket (paid)
```

### Database Optimization

```bash
# Via WordPress
WordPress Admin → Tools → WP-Optimize

# Via wp-cli
wp db optimize

# Clean transients
wp transient delete --all

# Clean revisions (careful!)
wp post delete $(wp post list --post_type=revision --format=ids)
```

## Troubleshooting

### Site Down

```bash
# 1. Check server status
# 2. Check error logs
# 3. Rollback if recent deployment
GitHub → Actions → Rollback Production

# 4. Contact hosting if server issue
# 5. Emergency contact: rutger@craft-digital.nl
```

### Slow Performance

```bash
# 1. Check PageSpeed Insights
# 2. Review recent changes
# 3. Clear all caches
# 4. Optimize database
# 5. Check for plugin conflicts
# 6. Review error logs
```

### Blocks Not Working

```bash
# 1. Rebuild blocks
cd blocks && npm run build

# 2. Clear WordPress cache
# 3. Clear browser cache
# 4. Check browser console for errors
# 5. Verify functions.php registered blocks
# 6. Test in different browser
```

## Code Quality Maintenance

### Run Tests Before Deployment

```bash
cd blocks

# Linting
npm run lint

# Fix auto-fixable issues
npm run lint:js -- --fix
npm run lint:css -- --fix

# Format code
npm run format

# Build
npm run build
```

### Code Review

```bash
# Before merging PRs:
- [ ] Code follows BEM methodology
- [ ] No hardcoded values (use design tokens)
- [ ] Linting passes
- [ ] Build succeeds
- [ ] Tested in WordPress editor
- [ ] Tested on frontend
- [ ] Mobile responsive
- [ ] Accessibility check
```

## Documentation Updates

### When to Update Docs

Update documentation when:
- Adding new blocks
- Changing deployment process
- Updating dependencies
- Adding new features
- Changing configuration

### Docs to Update

```
README.md              # Project overview
SETUP.md              # Setup instructions
MAINTENANCE.md        # This file
.github/DEPLOY.md     # Deployment guide
.github/PRODUCTION.md # Production guide
blocks/README.md      # Blocks documentation
```

## Deployment Maintenance

### Staging Cleanup

```bash
# Monthly: Clean staging database
# Remove test content
# Reset to clean state
# Verify latest code deployed
```

### Production Monitoring

```bash
# After each deployment:
- [ ] Monitor for 24 hours
- [ ] Check error logs daily
- [ ] Review analytics for anomalies
- [ ] Test critical user paths
```

### Rollback Testing

```bash
# Quarterly: Test rollback procedure
# Do NOT run on production!
# Test on staging:
1. Create test backup
2. Trigger rollback workflow
3. Verify restore successful
4. Document any issues
```

## Contact & Support

### Primary Contact
**Developer**: Craft Digital
**Email**: rutger@craft-digital.nl

### Escalation
**Emergency** (site down):
1. Check GitHub Actions status
2. Review error logs
3. Attempt rollback if recent deployment
4. Contact primary developer
5. Contact hosting support

### Resources
- [Project README](README.md)
- [Setup Guide](SETUP.md)
- [Deployment Guide](.github/DEPLOY.md)
- [Production Guide](.github/PRODUCTION.md)
- [GitHub Repository](https://github.com/Rutger-CD/wordpress-client-website)

---

**Last Updated**: 2025-01-16
**Maintained By**: Craft Digital
