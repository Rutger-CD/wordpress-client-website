# Handover Documentation

## Project Overview

**Project**: WordPress Client Website
**Developer**: Craft Digital (rutger@craft-digital.nl)
**Status**: Production Ready
**Completion Date**: 2025-01-16

Dit document bevat alle essentiële informatie voor het overnemen en onderhouden van het WordPress Client Website project.

## Quick Access

- **GitHub Repository**: [https://github.com/Rutger-CD/wordpress-client-website](https://github.com/Rutger-CD/wordpress-client-website)
- **Linear Project**: WordPress Client Website
- **Staging Site**: (configureer na setup)
- **Production Site**: (configureer na setup)

## What's Included

### 1. UI Component Library (11 Components)

**Location**: `components/`

Complete design system met 11 herbruikbare UI componenten:

**Phase 1** (Foundation):
- Button (6 variants)
- Card (responsive, image/text)

**Phase 2** (Forms):
- Input (text/email/password/number, validation)
- Textarea (auto-resize)
- Select (custom styling)

**Phase 3** (Interactive):
- Accordion (smooth animations)
- Tabs (keyboard accessible)
- Modal (focus trap, backdrop)
- Alert (4 types)
- Tooltip (8 positions)
- Dropdown Menu (nested support)

**Features**:
- Design tokens (CSS variables)
- BEM methodology
- Fully responsive
- WCAG 2.1 AA compliant
- Demo page: `components/demo/index.html`

### 2. WordPress Gutenberg Blocks (5 Blocks)

**Location**: `blocks/`

Custom blocks gebouwd met @wordpress/scripts:

1. **Hero Block** - 3 variants, full-width/boxed, dual CTAs
2. **Content Section Block** - InnerBlocks, customizable spacing
3. **Button Block** - 6 variants, 3 sizes, link support
4. **Card Grid Block** - Responsive grid, 2-4 columns
5. **CTA Section Block** - 4 backgrounds, text alignment

**All blocks**:
- Fully editable in WordPress editor
- Mobile responsive
- Use design tokens
- Pass linting (ESLint + Stylelint)

### 3. GitHub Actions CI/CD (5 Workflows)

**Location**: `.github/workflows/`

Complete automation pipeline:

1. **code-quality.yml** - Runs on push to main/develop
2. **pr-checks.yml** - Runs on all PRs
3. **deploy-staging.yml** - Auto-deploy develop → staging
4. **deploy-production.yml** - Manual deploy main → production
5. **rollback-production.yml** - Emergency rollback

**Features**:
- Automated linting & building
- Pre-deployment checks
- Automatic backups
- Rollback capability
- Complete audit trail

### 4. Complete Documentation

**Main Docs**:
- `README.md` - Project overview & quick start
- `SETUP.md` - Local development setup (3 options)
- `MAINTENANCE.md` - Ongoing maintenance procedures
- `HANDOVER.md` - Dit document

**GitHub Docs** (`.github/`):
- `DEPLOY.md` - Deployment guide
- `PRODUCTION.md` - Production deployment (585 lines)

## Getting Started

### For Developers

```bash
# 1. Clone repository
git clone https://github.com/Rutger-CD/wordpress-client-website.git
cd wordpress-client-website

# 2. Setup local WordPress (choose one):
# Option A: wp-env (recommended for block dev)
npm install -g @wordpress/env
wp-env start

# Option B: Local by Flywheel (recommended for full site)
# Download from https://localwp.com/

# 3. Build blocks
cd blocks
npm install
npm run build

# 4. Activate theme
# WordPress Admin → Appearance → Themes → Activate "Client Website"

# 5. Start developing
npm start  # Watch mode for blocks
```

**Zie `SETUP.md` voor volledige setup instructies.**

### For Content Editors

1. Login to WordPress Admin
2. Pages → Add New
3. Click '+' button to add blocks
4. Search for: "Hero", "Button", "Card Grid", "CTA Section", "Content Section"
5. Customize content, colors, spacing via block settings
6. Preview and publish

**All blocks are fully customizable in the WordPress editor.**

## Deployment Workflow

### Development → Staging → Production

```
Local Development
    ↓
    git push origin develop
    ↓
Auto-deploy to Staging (GitHub Actions)
    ↓
Test & Client Approval
    ↓
    git checkout main
    git merge develop
    git push origin main
    ↓
Manual Deploy to Production (GitHub Actions)
    • Requires confirmation: "deploy-to-production"
    • Automatic backup created
    • Pre-flight checks
    • Post-deployment verification
```

### Deployment Commands

**Staging (Auto)**:
```bash
git push origin develop
# Automatically deploys to staging via GitHub Actions
```

**Production (Manual)**:
```bash
# 1. Merge develop to main
git checkout main
git pull origin main
git merge develop
git push origin main

# 2. Trigger deployment
# GitHub → Actions → Deploy to Production → Run workflow
# Input: "deploy-to-production"
```

**Zie `.github/PRODUCTION.md` voor volledige deployment checklist.**

## Configuration Required

### GitHub Secrets

**Staging** (already configured):
- `STAGING_FTP_SERVER`
- `STAGING_FTP_USERNAME`
- `STAGING_FTP_PASSWORD`

**Production** (configure before first deploy):
- `PRODUCTION_FTP_SERVER`
- `PRODUCTION_FTP_USERNAME`
- `PRODUCTION_FTP_PASSWORD`

**Setup**:
```
GitHub → Settings → Secrets and variables → Actions → New repository secret
```

### Environment Variables

**Staging**:
- `STAGING_URL` - Staging website URL

**Production**:
- `PRODUCTION_URL` - Production website URL

**Setup**:
```
GitHub → Settings → Environments → production → Add variable
```

## Maintenance

### Weekly Tasks

```bash
# Update dependencies
cd blocks
npm outdated
npm update @wordpress/scripts
npm run lint && npm run build

# Test all blocks in WordPress
# Review and close completed PRs
```

### Monthly Tasks

```bash
# Update WordPress core & plugins
# Security scan
# Performance audit (PageSpeed Insights)
# Review GitHub Actions usage
```

**Zie `MAINTENANCE.md` voor volledige maintenance schedule.**

## Troubleshooting

### Blocks Don't Appear

```bash
# Rebuild blocks
cd blocks
npm run build

# Clear WordPress cache
# Hard refresh browser (Cmd+Shift+R)
```

### Build Errors

```bash
# Clean install
cd blocks
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Failed

```bash
# Check GitHub Actions logs
# Verify FTP credentials in GitHub Secrets
# Ensure all files pass linting
# Review .github/PRODUCTION.md troubleshooting section
```

## Support & Resources

### Primary Contact

**Developer**: Craft Digital
**Email**: rutger@craft-digital.nl
**GitHub**: [@Rutger-CD](https://github.com/Rutger-CD)

### Documentation

- [README.md](README.md) - Project overview
- [SETUP.md](SETUP.md) - Local setup guide
- [MAINTENANCE.md](MAINTENANCE.md) - Maintenance procedures
- [.github/DEPLOY.md](.github/DEPLOY.md) - Deployment guide
- [.github/PRODUCTION.md](.github/PRODUCTION.md) - Production deployment

### External Resources

- [WordPress Block Editor](https://developer.wordpress.org/block-editor/)
- [wp-env Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/)
- [GitHub Actions](https://docs.github.com/en/actions)

## File Structure

```
wordpress-client-website/
├── blocks/                    # 5 WordPress Gutenberg blocks
│   ├── hero/
│   ├── content-section/
│   ├── button/
│   ├── card-grid/
│   ├── cta-section/
│   └── package.json          # Build configuration
├── components/               # 11 UI components
│   ├── button/
│   ├── card/
│   ├── input/
│   ├── textarea/
│   ├── select/
│   ├── accordion/
│   ├── tabs/
│   ├── modal/
│   ├── alert/
│   ├── tooltip/
│   ├── dropdown/
│   ├── _base/                # Design tokens
│   └── demo/                 # Component demo page
├── .github/
│   ├── workflows/            # 5 GitHub Actions workflows
│   ├── DEPLOY.md            # Deployment guide
│   └── PRODUCTION.md        # Production guide (585 lines)
├── functions.php            # WordPress theme functions
├── style.css               # WordPress theme stylesheet
├── README.md               # Project overview
├── SETUP.md                # Setup guide
├── MAINTENANCE.md          # Maintenance guide
└── HANDOVER.md             # This document
```

## Next Steps

1. ✅ Project complete en production ready
2. Setup local WordPress environment (zie SETUP.md)
3. Configure production FTP credentials
4. Test deployment to staging
5. Deploy to production when ready
6. Monitor and maintain (zie MAINTENANCE.md)

## Technical Stack

**Frontend**:
- CSS3 (Design Tokens, BEM methodology)
- Vanilla JavaScript (ES6+)
- WordPress Gutenberg (React-based)

**Build Tools**:
- @wordpress/scripts (Webpack, Babel, ESLint, Stylelint)
- npm (package management)

**WordPress**:
- Version: 6.0+
- PHP: 8.0+
- Theme: Custom block theme

**CI/CD**:
- GitHub Actions
- FTP Deployment
- Automated testing & linting

**Version Control**:
- Git
- GitHub
- Branch strategy: main (production), develop (staging), feature/*

## Project Status

| Component | Status | Notes |
|-----------|--------|-------|
| UI Components (11) | ✅ Complete | All phases done, demo page available |
| WordPress Blocks (5) | ✅ Complete | All linted, tested, production ready |
| CI/CD Pipeline | ✅ Complete | 5 workflows, automated deployment |
| Documentation | ✅ Complete | README, SETUP, MAINTENANCE, PRODUCTION, HANDOVER |
| Staging Environment | ⚙️ Configure | FTP credentials needed |
| Production Environment | ⚙️ Configure | FTP credentials needed |

## License

This project is proprietary software developed by Craft Digital for the client.

---

**Last Updated**: 2025-01-16
**Version**: 1.0.0
**Maintained By**: Craft Digital

**Voor vragen of support**: rutger@craft-digital.nl
