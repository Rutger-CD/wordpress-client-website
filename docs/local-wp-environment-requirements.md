# Local WordPress Development Environment - Requirements

## Overview

Setup eenvoudige lokale WordPress development environment die seamless integreert met staging en production deployment workflow.

## Workflow Design

```
┌──────────────────────┐
│ Local Development    │
│ (wp-env/Docker)      │
│ - Claude kan hier    │
│   ontwikkelen        │
│ - Live reload        │
│ - Database included  │
└──────────┬───────────┘
           │
           │ git push origin develop
           ▼
┌──────────────────────┐
│ Staging Server       │
│ (Auto-deploy)        │
│ - WordPress running  │
│ - Client preview     │
│ - QA testing         │
└──────────┬───────────┘
           │
           │ Manual approval + merge to main
           ▼
┌──────────────────────┐
│ Production Server    │
│ (Manual deploy)      │
│ - Live website       │
│ - Full backups       │
│ - Rollback enabled   │
└──────────────────────┘
```

## Requirements

### 1. Local Development Environment

**Primary Option: wp-env** (recommended)

Waarom wp-env:
- ✅ Officieel WordPress tool
- ✅ Docker-based (isolated)
- ✅ Geen MySQL install nodig
- ✅ Quick setup (1 command)
- ✅ Werkt met @wordpress/scripts
- ✅ Command-line friendly (ideal voor Claude)

**Setup**:
```bash
# Install wp-env globally
npm install -g @wordpress/env

# Start WordPress
wp-env start

# Site URLs
# WordPress: http://localhost:8888
# Admin: http://localhost:8888/wp-admin (admin/password)
```

**Alternative Option: Local by Flywheel**

Voor full-site development met GUI:
- Database management UI
- Easy email testing
- SSL support
- Better voor complex WordPress setup

### 2. Theme Auto-Sync

**Requirement**: Theme files in local wp-env moeten automatisch synced zijn met git repository

**Solution 1: Symlink** (recommended)
```bash
# Link git repo to wp-env theme directory
ln -s /path/to/repo /path/to/wp-env/themes/client-website
```

**Solution 2: .wp-env.json Configuration**
```json
{
  "core": "WordPress/WordPress#6.4",
  "themes": [
    "./path/to/theme"
  ],
  "plugins": []
}
```

### 3. Block Development Workflow

**Requirement**: Changes in blocks/ moeten direct visible zijn in WordPress editor

**Workflow**:
```bash
# Terminal 1: WordPress running
wp-env start

# Terminal 2: Watch mode for blocks
cd blocks
npm start  # Watch mode - auto-rebuild on changes

# Browser: WordPress editor
# Refresh to see changes (no page reload needed in most cases)
```

### 4. Git Integration

**Requirement**: Seamless git workflow van local → staging → production

**Workflow**:
```bash
# 1. Develop locally
cd /path/to/repo
git checkout -b feature/my-feature

# 2. Make changes, test in wp-env
# ... develop ...

# 3. Commit & push
git add .
git commit -m "feat: my feature"
git push origin feature/my-feature

# 4. Create PR to develop
# GitHub → Pull Request

# 5. Auto-deploy to staging (when merged to develop)
# GitHub Actions → deploy-staging.yml

# 6. Client approval on staging

# 7. Merge to main → manual production deploy
```

### 5. Database Management

**Requirement**: Easy database reset, import, export voor testing

**wp-env Commands**:
```bash
# Export database
wp-env run cli wp db export backup.sql

# Import database
wp-env run cli wp db import backup.sql

# Reset database (fresh install)
wp-env destroy
wp-env start
```

**Use Cases**:
- Testing with production data (import)
- Resetting to clean state
- Creating test scenarios
- Backup before risky changes

### 6. Content Sync (Optional but Recommended)

**Requirement**: Ability om content van staging te testen locally

**Options**:

**Option A: WP-CLI database sync**
```bash
# Export from staging
ssh staging@server "wp db export - | gzip" > staging-db.sql.gz

# Import to local
gunzip < staging-db.sql.gz | wp-env run cli wp db import -

# Search-replace URLs
wp-env run cli wp search-replace 'https://staging.example.com' 'http://localhost:8888'
```

**Option B: Manual Export/Import**
- Staging → Tools → Export → All content
- Local → Tools → Import → WordPress import

### 7. Claude Code Development Access

**Requirement**: Claude moet kunnen ontwikkelen in local environment

**Considerations**:
- Claude heeft toegang tot file system
- Claude kan npm commands runnen
- Claude kan git operations uitvoeren
- Claude kan wp-env commands runnen
- WordPress editor is manual (browser-based)

**Workflow**:
1. Claude editeert files in repo
2. Claude runs `npm run build` in blocks/
3. User refreshed WordPress editor in browser
4. Claude sees results via user feedback
5. Claude commits & pushes changes

### 8. Configuration Files

**Required Files**:

**.wp-env.json** (project root):
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
  }
}
```

**.gitignore additions**:
```
# wp-env
.wp-env/
*.sql
*.sql.gz
```

### 9. Documentation Updates

**Files to Update**:

**SETUP.md**:
- Add .wp-env.json setup section
- Document wp-env start/stop commands
- Add database sync instructions
- Troubleshooting wp-env issues

**README.md**:
- Add local development section
- Document complete workflow (local → staging → production)
- Add architecture diagram

**New: docs/LOCAL-DEVELOPMENT.md**:
- Complete wp-env guide
- Database management
- Content sync procedures
- Troubleshooting
- Best practices

### 10. CI/CD Integration

**Requirement**: Local development moet seamless integreren met existing CI/CD

**Current CI/CD**:
- ✅ code-quality.yml (main/develop)
- ✅ pr-checks.yml (all PRs)
- ✅ deploy-staging.yml (develop → auto-deploy)
- ✅ deploy-production.yml (main → manual deploy)
- ✅ rollback-production.yml (emergency rollback)

**Integration Points**:
1. Local linting moet matchen CI (`npm run lint`)
2. Local build moet matchen CI (`npm run build`)
3. Git workflow moet matchen branch strategy
4. Testing moet matchen staging environment

## Implementation Checklist

### Phase 1: Basic Setup
- [ ] Install wp-env globally
- [ ] Create .wp-env.json configuration
- [ ] Test wp-env start/stop
- [ ] Verify theme loads in WordPress
- [ ] Test block development workflow (npm start)
- [ ] Verify live reload works

### Phase 2: Git Integration
- [ ] Document git workflow (local → staging → production)
- [ ] Test feature branch workflow
- [ ] Verify auto-deploy to staging
- [ ] Test manual production deploy

### Phase 3: Database Management
- [ ] Document database export/import
- [ ] Test database reset procedure
- [ ] Create sample database backup
- [ ] Document content sync from staging

### Phase 4: Documentation
- [ ] Update SETUP.md with wp-env instructions
- [ ] Update README.md with workflow diagram
- [ ] Create docs/LOCAL-DEVELOPMENT.md
- [ ] Add troubleshooting section
- [ ] Update MAINTENANCE.md with local dev maintenance

### Phase 5: Testing & Validation
- [ ] Test complete workflow (local → staging → production)
- [ ] Verify all blocks work in wp-env
- [ ] Test database sync from staging
- [ ] Validate git workflow
- [ ] Test rollback procedures

## Success Criteria

**Local Development**:
- ✅ Claude kan ontwikkelen in local wp-env
- ✅ Live reload werkt voor block changes
- ✅ Database management is eenvoudig
- ✅ Git workflow is duidelijk

**Staging Integration**:
- ✅ Auto-deploy naar staging works
- ✅ Content sync van staging naar local werkt
- ✅ Client kan preview op staging

**Production Deployment**:
- ✅ Manual deploy naar production werkt
- ✅ Rollback procedures zijn getest
- ✅ Backups worden automatisch gemaakt

**Documentation**:
- ✅ Complete setup guide (SETUP.md)
- ✅ Local development guide (docs/LOCAL-DEVELOPMENT.md)
- ✅ Workflow diagram (README.md)
- ✅ Troubleshooting (all docs)

## Technical Stack

**Local Development**:
- wp-env (Docker-based WordPress environment)
- @wordpress/scripts (build tooling)
- Node.js 18+ (npm, wp-scripts)
- Git (version control)

**WordPress**:
- WordPress 6.4+
- PHP 8.0+
- MySQL 8.0 (via Docker)

**Deployment**:
- GitHub Actions (CI/CD)
- FTP (file transfer)
- Automated backups

## Timeline Estimate

**Total**: ~4-6 hours

**Breakdown**:
- Phase 1 (Basic Setup): 1-2 hours
- Phase 2 (Git Integration): 30 minutes
- Phase 3 (Database Management): 1 hour
- Phase 4 (Documentation): 1-2 hours
- Phase 5 (Testing): 1 hour

## Dependencies

**Required**:
- ✅ Node.js 18+ installed
- ✅ npm installed
- ✅ Docker installed (for wp-env)
- ✅ Git installed

**Optional**:
- SSH access to staging server (for database sync)
- WP-CLI on staging server (for database operations)

## Risks & Mitigations

**Risk 1: wp-env Docker issues**
- Mitigation: Document Local by Flywheel as fallback
- Mitigation: Troubleshooting section in docs

**Risk 2: Database sync complexity**
- Mitigation: Start with manual export/import
- Mitigation: Document WP-CLI method as advanced option

**Risk 3: File permissions on Windows**
- Mitigation: Document Windows-specific symlink issues
- Mitigation: Provide .wp-env.json path configuration alternative

**Risk 4: Port conflicts (8888 already in use)**
- Mitigation: Document port configuration in .wp-env.json
- Mitigation: Provide alternative port examples

## Next Steps

1. Create Linear issue "CRA-14: Local WordPress Development Environment"
2. Implement Phase 1 (Basic Setup)
3. Test complete workflow
4. Update documentation
5. Create PR with changes
6. Merge and deploy to staging for validation

---

**Priority**: High
**Effort**: Medium (4-6 hours)
**Impact**: High (enables efficient local development)
