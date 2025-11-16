# WordPress Client Website

Modern WordPress theme met custom Gutenberg blocks en complete UI Component Library.

## 📋 Project Overview

Custom WordPress website met volledige design system, 5 custom Gutenberg blocks, 11 UI components en automated deployment pipeline.

**Status**: ✅ **Production Ready** - Complete CI/CD, blocks, en documentation

## 🚀 Quick Start

```bash
# 1. Clone repository
git clone https://github.com/Rutger-CD/wordpress-client-website.git
cd wordpress-client-website

# 2. Install dependencies
cd blocks
npm install

# 3. Build blocks
npm run build

# 4. Development mode (watch)
npm start
```

## 📁 Project Structure

```
wordpress-client-website/
├── .github/
│   ├── workflows/                    # GitHub Actions CI/CD
│   │   ├── code-quality.yml         # Linting & validation
│   │   ├── pr-checks.yml            # PR information
│   │   ├── deploy-staging.yml       # Auto-deploy to staging
│   │   ├── deploy-production.yml    # Manual production deploy
│   │   └── rollback-production.yml  # Production rollback
│   ├── DEPLOY.md                    # Deployment guide
│   ├── PRODUCTION.md                # Production guide (585 lines)
│   └── README.md                    # CI/CD overview
├── blocks/                          # WordPress Gutenberg blocks (5)
│   ├── hero/                        # Hero block
│   ├── content-section/             # Content section block
│   ├── button/                      # Button block
│   ├── card-grid/                   # Card grid block
│   ├── cta-section/                 # CTA section block
│   ├── package.json
│   ├── README.md
│   └── BLOCKS_IMPLEMENTATION.md
├── components/                      # UI Component Library (11)
│   ├── _base/                       # Design tokens & reset
│   ├── button/                      # Button component
│   ├── card/                        # Card component
│   ├── hero/                        # Hero component
│   ├── content-section/             # Content section component
│   ├── header/                      # Header component
│   ├── footer/                      # Footer component
│   ├── input/                       # Input component (Phase 3)
│   ├── textarea/                    # Textarea component (Phase 3)
│   ├── select/                      # Select component (Phase 3)
│   ├── checkbox/                    # Checkbox component (Phase 3)
│   ├── radio/                       # Radio component (Phase 3)
│   ├── demo/                        # Component demo page
│   └── README.md
├── functions.php                    # WordPress theme functions
├── style.css                        # WordPress theme header (optional)
└── README.md                        # This file
```

## 🧱 WordPress Blocks (5)

### Implemented Blocks

1. **Hero Block** (`client-website/hero`)
   - 3 variants: gradient, solid, minimal
   - 2 alignments: left, center
   - Editable: heading, subheading, description
   - Primary & secondary CTA buttons
   - Full/wide alignment support
   - [Documentation](blocks/README.md#hero-block)

2. **Content Section Block** (`client-website/content-section`)
   - InnerBlocks for flexible content
   - Width options: contained, wide, full
   - Padding controls (top/bottom)
   - Background color options
   - [Documentation](blocks/README.md#content-section-block)

3. **Button Block** (`client-website/button`)
   - 6 variants: primary, secondary, tertiary, danger, success, outline
   - 3 sizes: small, medium, large
   - URL controls + "open in new tab"
   - Text alignment support
   - [Documentation](blocks/README.md#button-block)

4. **Card Grid Block** (`client-website/card-grid`)
   - Responsive grid (2, 3, or 4 columns)
   - Repeater field for unlimited cards
   - Image upload via MediaUpload
   - Each card: image, title, description, link
   - Auto-responsive on mobile
   - [Documentation](blocks/README.md#card-grid-block)

5. **CTA Section Block** (`client-website/cta-section`)
   - 4 background options: primary, secondary, neutral, gradient
   - Text alignment: left, center
   - Editable heading, description, button
   - Full/wide alignment support
   - [Documentation](blocks/README.md#cta-section-block)

### Block Development

```bash
cd blocks

# Development (watch mode)
npm start

# Production build
npm run build

# Linting
npm run lint
npm run lint:js
npm run lint:css

# Format code
npm run format
```

## 🎨 UI Component Library (11)

### Phase 1: Foundation
- **Button** - 7 variants, 3 sizes, icons, loading states
- **Card** - 3 variants, image support, actions

### Phase 2: Layout
- **Header** - Navigation, logo, mobile menu
- **Footer** - Links, social, copyright
- **Hero** - 3 variants, dual CTAs
- **Content Section** - Flexible width, spacing

### Phase 3: Forms
- **Input** - Validation states, icons, multiple types
- **Textarea** - Character counter, auto-resize
- **Select** - Custom styling, option groups
- **Checkbox** - Switch variant, groups, indeterminate
- **Radio** - Radio groups, card variant

**Demo**: Open [components/demo/index.html](components/demo/index.html)

**Features**:
- ✅ Design tokens (no hardcoded values)
- ✅ BEM methodology
- ✅ WCAG AA compliant
- ✅ Mobile responsive
- ✅ Cross-browser compatible

## 🔄 CI/CD Pipeline

### Automated Workflows

**1. Code Quality** (automatic)
- **Trigger**: Push/PR to main/develop
- **Tasks**: Linting (JS, CSS), design tokens validation, BEM checks

**2. PR Checks** (automatic)
- **Trigger**: Pull requests
- **Tasks**: PR info, file changes, component status, bundle size

**3. Deploy to Staging** (automatic)
- **Trigger**: Push to develop
- **Tasks**: Build, FTP upload to staging
- **URL**: Staging environment

**4. Deploy to Production** (manual)
- **Trigger**: Manual workflow dispatch only
- **Safety**: Confirmation required, pre-flight checks, automatic backup
- **Tasks**: Validate → Backup → Deploy → Verify

**5. Rollback Production** (manual)
- **Trigger**: Manual workflow dispatch
- **Safety**: Timestamp validation, emergency backup
- **Tasks**: Validate → Backup → Restore → Verify

### Branch Strategy

```
main (production)
  ↑
  │ Manual deploy only
  │
develop (staging - auto-deploys)
  ↑
  │ Merge via PR
  │
feature/* (development)
```

### Deployment Flow

```bash
# 1. Feature Development
git checkout -b feature/my-feature
git commit -m "feat: my feature"
git push origin feature/my-feature

# 2. Create PR → develop
# Auto-deploys to staging when merged

# 3. Test on Staging
# Get client approval

# 4. Production Deploy
# Merge develop → main
# GitHub Actions → Deploy to Production
# Type: "deploy-to-production"
```

## 📚 Documentation

### Guides
- **[README.md](README.md)** - This file (project overview)
- **[CI/CD Overview](.github/README.md)** - GitHub Actions workflows
- **[Deployment Guide](.github/DEPLOY.md)** - Staging & production deployment
- **[Production Guide](.github/PRODUCTION.md)** - Complete production deployment (585 lines)
- **[Blocks Documentation](blocks/README.md)** - WordPress blocks development
- **[Component Library](components/README.md)** - UI components overview

### Checklists
- Pre-deployment checklist (40+ items) - [.github/PRODUCTION.md](.github/PRODUCTION.md#pre-deployment-checklist)
- Block testing checklist - [blocks/README.md](blocks/README.md#testing-checklist)
- Component verification - [components/README.md](components/README.md)

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm 9+
- Git
- WordPress 6.x
- FTP access (deployment)

### Local WordPress Setup

**Option 1: Local by Flywheel** (Recommended)
```bash
1. Install Local by Flywheel
2. Create new site
3. Clone theme to wp-content/themes/
4. Activate theme
5. Build blocks: cd blocks && npm run build
```

**Option 2: XAMPP/MAMP**
```bash
1. Install XAMPP/MAMP
2. Create database
3. Install WordPress
4. Clone theme to wp-content/themes/
5. Activate theme
6. Build blocks
```

### Theme Integration

```php
// functions.php automatically registers all blocks
// Located at: /functions.php

// Blocks registered:
- client-website/hero
- client-website/content-section
- client-website/button
- client-website/card-grid
- client-website/cta-section
```

### Design Tokens

All components use CSS custom properties:

```css
/* Colors */
var(--color-primary-500)
var(--color-text-primary)

/* Spacing */
var(--spacing-4)
var(--spacing-16)

/* Typography */
var(--text-xl)
var(--font-bold)

/* Effects */
var(--radius-lg)
var(--transition-base)
```

**Location**: [components/_base/variables.css](components/_base/variables.css)

**Rule**: Never use hardcoded values! Always use design tokens.

## 🚢 Deployment

### Staging

**Automatic** on push to develop:
```bash
git push origin develop
# Auto-deploys via GitHub Actions
```

**Manual trigger**:
```bash
GitHub → Actions → Deploy to Staging → Run workflow
```

### Production

**Prerequisites**:
1. ✅ Tested on staging
2. ✅ Client approval
3. ✅ Merge develop to main

**Deploy**:
```bash
GitHub → Actions → Deploy to Production → Run workflow
Branch: main
Confirmation: deploy-to-production
```

**Post-Deployment**:
- Monitor for 24 hours
- Document version & timestamp
- Note backup timestamp

### Rollback

```bash
GitHub → Actions → Rollback Production → Run workflow
Backup timestamp: 20250116-143000
Confirmation: rollback-production
```

## 🔐 Configuration

### GitHub Secrets

**Staging**:
```
STAGING_FTP_SERVER
STAGING_FTP_USERNAME
STAGING_FTP_PASSWORD
```

**Production**:
```
PRODUCTION_FTP_SERVER
PRODUCTION_FTP_USERNAME
PRODUCTION_FTP_PASSWORD
```

### GitHub Environments

**Staging**:
- Environment variable: `STAGING_URL`
- Auto-deploy: Yes

**Production**:
- Environment variable: `PRODUCTION_URL`
- Auto-deploy: No (manual only)

## 🧪 Testing

### Component Testing
```bash
# Open demo page
open components/demo/index.html
```

### Block Testing in WordPress
1. Activate theme
2. Create/edit page
3. Add blocks via Gutenberg
4. Test variations
5. Save & preview
6. Check frontend

## 📊 Project Stats

- **Blocks**: 5 complete
- **Components**: 11 complete
- **Workflows**: 5 GitHub Actions
- **Documentation**: 2000+ lines
- **Code**: 4000+ lines (blocks + components)

## 🐛 Troubleshooting

### Build Errors
```bash
cd blocks
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Errors
- Check GitHub Actions logs
- Verify FTP credentials in Secrets
- Check server permissions

### Block Errors
- Regenerate: `npm run build`
- Clear WordPress cache
- Check browser console

## 🔗 Resources

- [WordPress Block Editor](https://developer.wordpress.org/block-editor/)
- [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [BEM Methodology](http://getbem.com/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 📞 Support

**Development**:
- GitHub Issues: https://github.com/Rutger-CD/wordpress-client-website/issues
- Email: rutger@craft-digital.nl

**Emergency** (production down):
1. Use automated rollback workflow
2. Contact: rutger@craft-digital.nl
3. See: [.github/PRODUCTION.md](.github/PRODUCTION.md)

## 📝 License

GPL-2.0-or-later

## 👥 Credits

**Development**: Craft Digital
**Contact**: rutger@craft-digital.nl

---

**Version**: 1.0.0
**Last Updated**: 2025-01-16
**Status**: ✅ Production Ready
