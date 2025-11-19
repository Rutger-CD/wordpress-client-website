# Deployment Guide

## CI/CD Pipeline Overzicht

Dit project gebruikt GitHub Actions voor geautomatiseerde deployment en code quality checks.

## Workflows

### 1. Code Quality Checks (`code-quality.yml`)

**Trigger**: Bij elke push en pull request naar `main` of `develop`

**Taken**:
- ✅ JavaScript linting
- ✅ CSS linting
- ✅ Format checking
- ✅ Design tokens validatie (geen hardcoded values)
- ✅ BEM naming convention check
- ✅ Component file structure validatie

### 2. Pull Request Checks (`pr-checks.yml`)

**Trigger**: Bij elke PR

**Taken**:
- 📋 PR informatie weergeven
- 📝 Changed files lijst
- 🧩 Component library status
- 📦 Bundle size rapport
- ✅ Ready-to-merge check

### 3. Deploy to Staging (`deploy-staging.yml`)

**Trigger**:
- Automatisch bij push naar `develop` branch
- Handmatig via workflow_dispatch

**Stappen**:
1. **Build** - Compileert blocks en maakt deployment package
2. **Deploy** - Uploadt via FTP naar staging server
3. **Notify** - Stuurt deployment status notificatie

### 4. Deploy to Production (`deploy-production.yml`)

**Trigger**: Alleen handmatig via workflow_dispatch

**Safety Features**:
- ✅ Confirmation input vereist ("deploy-to-production")
- ✅ Pre-deployment checks (linting, build, required files)
- ✅ Automatic backup creation before deployment
- ✅ Environment protection (production environment)
- ✅ Post-deployment verification

**Stappen**:
1. **Validate Input** - Confirmeert deployment intentie
2. **Pre-Deployment Checks** - Lint, build, file checks
3. **Backup Production** - Maakt backup van huidige productie
4. **Deploy** - Uploadt naar production server
5. **Verify** - Checkt of site bereikbaar is
6. **Notify** - Stuurt deployment status

**Usage**:
```bash
# Via GitHub UI
Actions → Deploy to Production → Run workflow
# Type "deploy-to-production" to confirm
```

### 5. Rollback Production (`rollback-production.yml`)

**Trigger**: Alleen handmatig via workflow_dispatch

**Safety Features**:
- ✅ Confirmation input vereist ("rollback-production")
- ✅ Backup timestamp validation
- ✅ Emergency backup van current state
- ✅ Post-rollback verification checklist

**Stappen**:
1. **Validate** - Confirmeert rollback + valideert timestamp
2. **Emergency Backup** - Backup huidige productie state
3. **Rollback** - Restore vanaf gespecificeerde backup
4. **Verify** - Site availability check
5. **Notify** - Rollback status

**Usage**:
```bash
# Via GitHub UI
Actions → Rollback Production → Run workflow
# Inputs:
#   - backup_timestamp: 20250116-143000 (YYYYMMDD-HHMMSS)
#   - confirm: rollback-production
```

## Required Secrets

Configureer deze secrets in GitHub:
**Settings → Secrets and variables → Actions**

### Staging Environment

```
STAGING_FTP_SERVER     # FTP server hostname (bijv. ftp.yourdomain.com)
STAGING_FTP_USERNAME   # FTP username
STAGING_FTP_PASSWORD   # FTP password
```

**Environment Variables**:
```
STAGING_URL           # Staging website URL (bijv. https://staging.yourdomain.com)
```

### Production Environment

```
PRODUCTION_FTP_SERVER     # Production FTP server hostname
PRODUCTION_FTP_USERNAME   # Production FTP username
PRODUCTION_FTP_PASSWORD   # Production FTP password
```

**Environment Variables**:
```
PRODUCTION_URL            # Production website URL (bijv. https://yourdomain.com)
```

**⚠️ BELANGRIJK**:
- Gebruik VERSCHILLENDE credentials voor staging en production
- Production credentials hebben minimale permissions (alleen theme directory)
- Test deployment altijd eerst op staging

## Setup Instructies

### 1. GitHub Secrets Toevoegen

```bash
# Via GitHub UI:
Repository → Settings → Secrets and variables → Actions → New repository secret

# Of via GitHub CLI:
gh secret set STAGING_FTP_SERVER
gh secret set STAGING_FTP_USERNAME
gh secret set STAGING_FTP_PASSWORD
```

### 2. Environment Variables Instellen

```bash
# Via GitHub UI:
Repository → Settings → Environments → New environment

# Create 'staging' environment
# Add variable: STAGING_URL
```

### 3. Staging Server Configureren

**FTP/SFTP Access vereist**:
- Server hostname
- Username en password
- Deploy path: `/public_html/wp-content/themes/client-website/`

**WordPress Setup**:
```bash
# Op staging server:
/wp-content/themes/client-website/
├── components/      # UI Component Library
├── blocks/         # Compiled blocks
├── theme/          # WordPress theme files
├── style.css       # Theme stylesheet
└── functions.php   # Theme functions
```

### 4. Test Deployment

```bash
# Option 1: Push naar develop branch
git checkout develop
git push origin develop

# Option 2: Manual trigger
# GitHub → Actions → Deploy to Staging → Run workflow
```

## Deployment Flow

```mermaid
graph LR
    A[Push to develop] --> B[Code Quality Checks]
    B --> C[Build Assets]
    C --> D[Create Package]
    D --> E[Deploy via FTP]
    E --> F[Staging Live]
```

## Branch Strategy

```
main (production)
  ↓
develop (staging) ← feature branches
```

### Workflow:
1. Create feature branch from `develop`
2. Make changes
3. Create PR to `develop`
4. Code quality checks run
5. After merge → Auto-deploy to staging
6. Test on staging
7. Create PR from `develop` to `main`
8. After merge → Manual deploy to production

## Monitoring

### Deployment Logs

```bash
# View in GitHub Actions
Repository → Actions → Deploy to Staging → View run
```

### Deployment Summary

Elke deployment maakt een summary met:
- Environment (staging/production)
- Branch & commit
- Deployed by
- Status
- Site URL

## Troubleshooting

### Deployment Fails

1. **Check FTP credentials**
   ```bash
   # Verify secrets are set correctly
   gh secret list
   ```

2. **Check server permissions**
   ```bash
   # Ensure deploy directory is writable
   chmod 755 /public_html/wp-content/themes/
   ```

3. **Check workflow logs**
   ```bash
   # View detailed error messages
   Actions → Failed workflow → View logs
   ```

### Build Fails

1. **Check Node.js version**
   ```yaml
   # In workflow file
   node-version: '20'  # Must match local development
   ```

2. **Clear npm cache**
   ```bash
   cd blocks
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

### Code Quality Fails

1. **Run linters locally**
   ```bash
   cd blocks
   npm run lint:js
   npm run lint:css
   npm run format
   ```

2. **Fix design token violations**
   ```bash
   # Search for hardcoded colors
   grep -r "color: #" components/ --include="*.css"

   # Replace with design tokens
   # ❌ color: #0ea5e9
   # ✅ color: var(--color-primary-500)
   ```

## Performance

### Build Time
- **Average**: 2-3 minutes
- **Steps**:
  - Checkout: ~10s
  - Install deps: ~30s
  - Build blocks: ~60s
  - Deploy: ~60s

### Optimization Tips

1. **Use npm ci instead of npm install**
   ```yaml
   - run: npm ci  # Faster, uses lock file
   ```

2. **Cache dependencies**
   ```yaml
   - uses: actions/setup-node@v4
     with:
       cache: 'npm'
   ```

3. **Parallel jobs**
   ```yaml
   jobs:
     lint:
       # Runs in parallel
     build:
       # Runs in parallel
     deploy:
       needs: [lint, build]  # Waits for both
   ```

## Security

### Secrets Management
- ✅ Never commit secrets to repo
- ✅ Use GitHub Secrets
- ✅ Rotate credentials regularly
- ✅ Use environment-specific credentials

### FTP Security
- ✅ Use SFTP when possible
- ✅ Use strong passwords
- ✅ Restrict FTP user to theme directory only
- ✅ Enable FTP over TLS/SSL

## Production Deployment Workflow

### Prerequisites

1. **Environment Setup** in GitHub:
   ```bash
   Settings → Environments → New environment → "production"
   ```

2. **Add Environment Variables**:
   - `PRODUCTION_URL`: Production website URL

3. **Add Secrets** (see Required Secrets section above)

4. **Test on Staging First**:
   ```bash
   # Always deploy to staging first
   git push origin develop
   # Test thoroughly on staging
   # Then proceed to production
   ```

### Deployment Process

**Step 1: Trigger Deployment**
```bash
# Via GitHub UI:
Actions → Deploy to Production → Run workflow
# Select branch: main
# Confirmation: deploy-to-production
```

**Step 2: Monitor Deployment**
- Watch workflow progress in Actions tab
- Check each job: Validate → Pre-checks → Backup → Deploy → Verify
- Review deployment summary

**Step 3: Verify Production**
- Visit production URL
- Test all pages
- Check custom blocks functionality
- Verify WordPress admin access

**Step 4: Post-Deployment**
- Document deployment (version, timestamp)
- Note backup timestamp for potential rollback
- Monitor site for 24 hours

### Rollback Procedure

**Option 1: Automated Rollback (Recommended)**
```bash
# Via GitHub UI:
Actions → Rollback Production → Run workflow
# Inputs:
#   backup_timestamp: [from deployment logs] (e.g., 20250116-143000)
#   confirm: rollback-production
```

**Option 2: Revert Commit**
```bash
git revert <commit-hash>
git push origin main
# Wait for auto-deploy or trigger manually
```

**Option 3: Manual FTP Rollback**
```bash
# Connect via FTP
# Navigate to theme directory
# Restore from backup-[timestamp] folder
```

### Rollback Decision Tree

```
Problem detected
    ↓
Is it critical? (Site down, data loss, security issue)
    ↓ YES
    Use Option 1: Automated Rollback
    ↓ NO
Can it be fixed with hotfix? (< 30 min)
    ↓ YES
    Deploy hotfix
    ↓ NO
    Use Option 1: Automated Rollback
```

## Maintenance

### Weekly Tasks
- [ ] Check deployment logs
- [ ] Review failed workflows
- [ ] Update dependencies

### Monthly Tasks
- [ ] Rotate FTP credentials
- [ ] Review and clean old artifacts
- [ ] Update GitHub Actions versions

### Quarterly Tasks
- [ ] Security audit
- [ ] Performance review
- [ ] Backup strategy review

## Support

Voor vragen of problemen:
- GitHub Issues: [Repository Issues](https://github.com/Rutger-CD/wordpress-client-website/issues)
- Email: rutger@craft-digital.nl

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [FTP Deploy Action](https://github.com/SamKirkland/FTP-Deploy-Action)
- [WordPress Theme Development](https://developer.wordpress.org/themes/)
