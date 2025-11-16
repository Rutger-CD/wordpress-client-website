# Production Deployment Guide

Complete guide voor deploying naar production environment.

## Quick Start

```bash
# 1. Test on staging
git push origin develop
# Test thoroughly ✓

# 2. Merge to main
git checkout main
git merge develop
git push origin main

# 3. Deploy to production
# GitHub → Actions → Deploy to Production → Run workflow
# Type: "deploy-to-production"
```

## Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing
- [ ] Linting passed (`npm run lint`)
- [ ] Build successful (`npm run build`)
- [ ] No console errors
- [ ] No hardcoded values (design tokens used)

### Content & Functionality
- [ ] All blocks work correctly
- [ ] Forms submit successfully
- [ ] Media/images load properly
- [ ] Navigation works on all pages
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing complete

### WordPress Specific
- [ ] Gutenberg editor functional
- [ ] Custom blocks appear in editor
- [ ] Block variations work
- [ ] Theme activated successfully
- [ ] Widgets configured
- [ ] Plugins compatible

### Performance
- [ ] Page load time < 3 seconds
- [ ] Images optimized
- [ ] CSS/JS minified
- [ ] Caching enabled
- [ ] CDN configured (if applicable)

### Security
- [ ] HTTPS enabled
- [ ] WordPress updated
- [ ] Strong admin password
- [ ] File permissions correct (644/755)
- [ ] Debug mode disabled in production

### Staging Verification
- [ ] Deployed to staging successfully
- [ ] Staging tested by QA
- [ ] Client approved staging
- [ ] All critical paths tested
- [ ] Performance acceptable

## Deployment Steps

### 1. Prepare for Deployment

```bash
# Ensure you're on main branch
git checkout main

# Pull latest changes
git pull origin main

# Verify current state
git status
git log --oneline -5

# Check for any uncommitted changes
git diff
```

### 2. Run Pre-Flight Checks

```bash
# Run linting
cd blocks
npm run lint

# Run build
npm run build

# Check build output
ls -la build/

# Return to root
cd ..
```

### 3. Trigger Production Deployment

**Via GitHub UI**:
1. Navigate to https://github.com/Rutger-CD/wordpress-client-website/actions
2. Click "Deploy to Production" workflow
3. Click "Run workflow" button
4. Select branch: `main`
5. Enter confirmation: `deploy-to-production`
6. Click "Run workflow"

**Monitor Progress**:
- Watch live logs in Actions tab
- Jobs run in sequence:
  1. ✅ Validate Input
  2. ✅ Pre-Deployment Checks
  3. ✅ Backup Production
  4. ✅ Deploy
  5. ✅ Verify Deployment
  6. ✅ Notify

### 4. Post-Deployment Verification

**Immediate Checks** (within 5 minutes):
```bash
# Check site is up
curl -I https://yourdomain.com

# Check response time
time curl -s https://yourdomain.com > /dev/null
```

**Manual Verification**:
- [ ] Homepage loads
- [ ] All pages accessible
- [ ] Navigation works
- [ ] Forms submit correctly
- [ ] Contact form receives emails
- [ ] Search functionality works
- [ ] WordPress admin accessible
- [ ] Gutenberg editor works
- [ ] All custom blocks functional
- [ ] Media library accessible
- [ ] User login/logout works

**Performance Verification**:
- [ ] Google PageSpeed Insights > 80
- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s
- [ ] All images loading
- [ ] No 404 errors

### 5. Document Deployment

```markdown
# Deployment Log

**Date**: 2025-01-16 14:30 UTC
**Version**: abc123d
**Deployed By**: @username
**Branch**: main
**Backup Timestamp**: 20250116-143000

**Changes**:
- Added new WordPress blocks
- Updated UI component library
- Performance improvements

**Verification**:
- ✅ All checks passed
- ✅ Site responding
- ✅ No errors in console

**Notes**:
- Production deployment successful
- Backup available for rollback
```

## Rollback Procedure

### When to Rollback

**Immediately rollback if**:
- Site is completely down
- Critical functionality broken
- Security vulnerability detected
- Data loss occurring
- Database corruption

**Consider rollback if**:
- Performance severely degraded
- Multiple features not working
- User reports increasing rapidly
- Error rate > 5%

### Automated Rollback

**Step 1: Get Backup Timestamp**
```bash
# From deployment logs or GitHub Actions summary
# Format: YYYYMMDD-HHMMSS
# Example: 20250116-143000
```

**Step 2: Trigger Rollback**
```bash
# Via GitHub UI:
Actions → Rollback Production → Run workflow
# Inputs:
#   backup_timestamp: 20250116-143000
#   confirm: rollback-production
```

**Step 3: Monitor Rollback**
- Watch workflow progress
- Jobs run:
  1. ✅ Validate Rollback
  2. ✅ Create Emergency Backup
  3. ✅ Restore from Backup
  4. ✅ Verify Rollback

**Step 4: Verify Site**
- Check homepage
- Test critical paths
- Verify WordPress admin
- Check for errors

### Manual Rollback (Emergency)

**If GitHub Actions unavailable**:

1. **Via FTP**:
```bash
# Connect to production server
# Navigate to: /public_html/wp-content/themes/

# Backup current state
mv client-website client-website-failed-YYYYMMDD

# Restore from backup
cp -r client-website-backup-[timestamp] client-website
```

2. **Via Git**:
```bash
# Revert to previous commit
git revert HEAD
git push origin main
# Trigger deploy manually or wait for auto-deploy
```

## Troubleshooting

### Deployment Failed

**Error: FTP Connection Failed**
```bash
# Check FTP credentials in GitHub Secrets
# Verify FTP server is accessible
# Check firewall rules
# Try connecting manually via FTP client
```

**Error: Build Failed**
```bash
# Check build logs
cd blocks
npm run build
# Fix errors locally
# Commit fixes
# Retry deployment
```

**Error: Pre-deployment Checks Failed**
```bash
# Check linting errors
npm run lint

# Fix errors
npm run lint:js -- --fix
npm run lint:css -- --fix

# Commit fixes
# Retry deployment
```

### Site Issues After Deployment

**White Screen of Death**
```bash
# Enable WordPress debug
# Check error logs
# Verify file permissions
# Check for PHP errors
# Rollback if critical
```

**Blocks Not Working**
```bash
# Clear WordPress cache
# Regenerate block assets
# Check browser console for errors
# Verify block registration in functions.php
# Check build/output directory
```

**Styling Broken**
```bash
# Clear browser cache
# Check CSS file loading
# Verify design tokens
# Check for CSS conflicts
# Inspect network tab for 404s
```

## Best Practices

### Deployment Timing
- ✅ Deploy during low-traffic hours
- ✅ Avoid Fridays/weekends (no support available)
- ✅ Schedule maintenance window
- ✅ Notify users of planned downtime

### Communication
- ✅ Notify team before deployment
- ✅ Have rollback plan ready
- ✅ Document all changes
- ✅ Be available for 1 hour post-deployment

### Testing
- ✅ Test on staging first (ALWAYS)
- ✅ Get client/QA approval
- ✅ Test all critical user flows
- ✅ Verify on multiple devices/browsers

### Monitoring
- ✅ Watch error logs for 24 hours
- ✅ Monitor uptime
- ✅ Check performance metrics
- ✅ Review user feedback

## Emergency Contacts

**Critical Issues**:
- Primary: rutger@craft-digital.nl
- Backup: [backup-contact]
- Hosting Support: [hosting-support]

**Escalation**:
1. Attempt automated rollback
2. Contact primary support
3. If site down > 15 min, escalate to backup
4. Document all actions

## Backup Strategy

### Automatic Backups
- ✅ Created before every production deployment
- ✅ Retention: 30 days
- ✅ Location: Same server, separate directory
- ✅ Naming: `client-website-backup-YYYYMMDD-HHMMSS`

### Manual Backups
```bash
# Before major changes
# Before WordPress updates
# Before plugin installations
# Weekly full backups (recommended)
```

### Backup Verification
- [ ] Test restore monthly
- [ ] Verify backup integrity
- [ ] Document restore procedure
- [ ] Keep offsite backups

## Compliance & Security

### Pre-Deployment Security
- [ ] Scan for vulnerabilities
- [ ] Update dependencies
- [ ] Check for exposed secrets
- [ ] Verify HTTPS configuration
- [ ] Review file permissions

### Post-Deployment Security
- [ ] Monitor error logs
- [ ] Check for suspicious activity
- [ ] Verify backups encrypted
- [ ] Review access logs
- [ ] Test authentication

## Appendix

### Deployment Checklist Template

```markdown
## Deployment: [Date]

### Pre-Deployment
- [ ] Staging tested
- [ ] Client approved
- [ ] Linting passed
- [ ] Build successful
- [ ] Team notified

### Deployment
- [ ] Backup created
- [ ] Deployment triggered
- [ ] Monitoring active
- [ ] Logs reviewed

### Post-Deployment
- [ ] Site verified
- [ ] Performance checked
- [ ] Documentation updated
- [ ] Team notified

### Rollback Plan
- Backup timestamp: _______
- Responsible person: _______
- Communication plan: _______
```

### Version History

| Date | Version | Changes | Deployed By |
|------|---------|---------|-------------|
| 2025-01-16 | v1.0.0 | Initial production release | @rutger |
| | | | |

---

**Last Updated**: 2025-01-16
**Maintained By**: Craft Digital
**Contact**: rutger@craft-digital.nl
