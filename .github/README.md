# GitHub Actions CI/CD

Geautomatiseerde workflows voor code quality, testing en deployment.

## Overzicht

| Workflow | Trigger | Doel |
|----------|---------|------|
| **Code Quality** | Push/PR op main/develop | Lint & validatie checks |
| **PR Checks** | Pull Request | PR informatie & file changes |
| **Deploy Staging** | Push op develop | Auto-deploy naar staging |

## Quick Start

### 1. Setup Secrets

```bash
# Via GitHub repository settings
Settings → Secrets and variables → Actions → New repository secret
```

Voeg toe:
- `STAGING_FTP_SERVER`
- `STAGING_FTP_USERNAME`
- `STAGING_FTP_PASSWORD`

### 2. Setup Environment

```bash
# Create staging environment
Settings → Environments → New environment → staging
```

Voeg variabele toe:
- `STAGING_URL` (bijv. https://staging.yourdomain.com)

### 3. Enable Workflows

Workflows worden automatisch geactiveerd bij:
- Push naar `develop` → Deploy to Staging
- Push/PR naar `main`/`develop` → Code Quality
- Nieuwe PR → PR Checks

## Workflows Detail

### Code Quality (`code-quality.yml`)

**Checks**:
- ✅ JavaScript linting
- ✅ CSS linting
- ✅ Format checking
- ✅ Design tokens validatie
- ✅ Component file structure

**Voorbeeld output**:
```
✅ All CSS uses design tokens
✅ BEM validation passed
✅ All components have required files
```

### PR Checks (`pr-checks.yml`)

**Features**:
- 📋 PR metadata
- 📝 Changed files lijst
- 🧩 Component count
- 📦 Bundle size rapport

**Voorbeeld summary**:
```markdown
## 📋 Pull Request Information
- Title: feat: Add new Hero component
- Author: developer
- Base: develop
- Head: feature/hero-component

## 🧩 Component Library Status
- Total Components: 11
- Design Tokens: ✅ Used
- BEM Convention: ✅ Followed
```

### Deploy Staging (`deploy-staging.yml`)

**Process**:
1. **Build** (2min)
   - npm ci
   - npm run build
   - Create package

2. **Deploy** (1min)
   - Upload via FTP
   - Deploy to theme directory

3. **Notify**
   - Success/failure status
   - Deployment URL

**Deployment Summary**:
```markdown
## 🚀 Deployment Summary
- Environment: Staging
- Branch: develop
- Commit: abc123
- Status: ✅ Success
🌐 View site: https://staging.example.com
```

## File Structure

```
.github/
├── workflows/
│   ├── code-quality.yml     # Lint & validation
│   ├── pr-checks.yml        # PR information
│   └── deploy-staging.yml   # Staging deployment
├── DEPLOY.md               # Deployment guide
└── README.md               # This file
```

## Development Workflow

```
1. Create feature branch
   git checkout -b feature/new-component

2. Make changes
   - Add component
   - Write tests
   - Update docs

3. Push & create PR
   git push origin feature/new-component

4. Code quality runs automatically
   - Fix any issues
   - Push fixes

5. Merge to develop
   - Auto-deploys to staging
   - Test on staging

6. Merge to main (when ready)
   - Manual deploy to production
```

## Branch Protection

Aanbevolen regels voor `main` en `develop`:

```yaml
Require pull request before merging: ✅
Require status checks to pass: ✅
  - lint-and-validate
  - validate-components
Require branches to be up to date: ✅
```

## Monitoring

### View Workflow Runs

```bash
# Via GitHub UI
Actions → Select workflow → View runs

# Via GitHub CLI
gh run list
gh run view <run-id>
```

### Check Deployment Status

```bash
# Latest staging deployment
gh run list --workflow=deploy-staging.yml --limit 1

# View deployment logs
gh run view --log
```

## Troubleshooting

### Build Fails

```bash
# Run locally
cd blocks
npm ci
npm run build

# Check for errors
npm run lint
```

### Deployment Fails

```bash
# Verify secrets
gh secret list

# Check FTP connection
# Test credentials with FTP client

# View detailed logs
gh run view <run-id> --log
```

### Linting Fails

```bash
# Fix JavaScript
npm run lint:js --fix

# Fix CSS
npm run lint:css --fix

# Check format
npm run format
```

## Performance

### Workflow Execution Times

| Workflow | Average | Max |
|----------|---------|-----|
| Code Quality | 1-2 min | 3 min |
| PR Checks | 30s | 1 min |
| Deploy Staging | 3-4 min | 5 min |

### Optimization

- ✅ npm caching enabled
- ✅ Parallel jobs where possible
- ✅ Incremental builds
- ✅ Only deploy changed files

## Security Best Practices

- ✅ Use secrets for credentials
- ✅ Restrict FTP user permissions
- ✅ Enable branch protection
- ✅ Review PRs before merge
- ✅ Rotate credentials regularly

## Support

- 📚 [Full Deployment Guide](./DEPLOY.md)
- 🐛 [Report Issues](https://github.com/Rutger-CD/wordpress-client-website/issues)
- 📧 Contact: rutger@craft-digital.nl
