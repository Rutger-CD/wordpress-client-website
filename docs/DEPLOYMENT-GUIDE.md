# WordPress Deployment Guide

Complete handleiding voor het deployen van WordPress custom theme met Gutenberg blocks naar Strato hosting.

## Inhoudsopgave

- [Overzicht Deployment Pipeline](#overzicht-deployment-pipeline)
- [Vereisten](#vereisten)
- [Omgeving Configuratie](#omgeving-configuratie)
- [GitHub Secrets Setup](#github-secrets-setup)
- [Deployment Workflows](#deployment-workflows)
- [Staging Deployment](#staging-deployment)
- [Productie Deployment](#productie-deployment)
- [Verificatie Stappen](#verificatie-stappen)
- [Troubleshooting](#troubleshooting)

---

## Overzicht Deployment Pipeline

```
┌─────────────┐      ┌─────────────────────────────┐      ┌───────────────────────────────┐
│   Lokaal    │      │         Staging             │      │        Productie              │
│   wp-env    │ ───▶ │  wp-base-stg.rutgerthus.nl │ ───▶ │  wp-base.rutgerthus.nl       │
│ localhost   │      │     (Strato SFTP)           │      │     (Strato SFTP)             │
└─────────────┘      └─────────────────────────────┘      └───────────────────────────────┘
     │                           │                                     │
     │                           │                                     │
  Development              Automatisch                          Handmatige Goedkeuring
                        (push naar main)                         (workflow_dispatch)
```

### Status

✅ **GitHub Actions Workflows**: Volledig geconfigureerd en getest
- `deploy-staging.yml` - Automatische deployment naar staging bij push naar `main`
- `deploy-production.yml` - Handmatige deployment met pre-checks en goedkeuring

✅ **Server Configuratie**: Volledig ingesteld en werkend
- Strato SFTP verbinding (ssh.strato.com)
- WordPress installatie via Strato App Install
- Staging: /STRATO-apps/wordpress_01/app
- Production: /STRATO-apps/wordpress_02/app

---

## Vereisten

### Benodigde Tools

- Node.js v20 of hoger
- npm (komt met Node.js)
- Git
- GitHub account met repository toegang
- SFTP credentials voor Strato hosting

### Benodigde Bestanden

Zorg dat deze bestanden aanwezig zijn in je project:

- `package-lock.json` (root directory)
- `blocks/package-lock.json`
- `.env` (alleen lokaal - NIET committen naar Git)
- `deploy-theme-staging.js`
- `deploy-blocks-complete.js`
- `deploy-theme-production.js`
- `deploy-blocks-production.js`

---

## Omgeving Configuratie

### Lokaal `.env` Bestand

Maak een `.env` bestand in de project root (dit bestand wordt genegeerd door Git):

```env
# Staging Omgeving
STAGING_SFTP_HOST=ssh.strato.com
STAGING_SFTP_PORT=22
STAGING_SFTP_USER=sftp_claude@craftdigital.nl
STAGING_SFTP_PASSWORD=jouw_wachtwoord_hier
STAGING_PATH=/STRATO-apps/wordpress_01/app
STAGING_URL=https://wp-base-stg.rutgerthus.nl

# Productie Omgeving
PRODUCTION_SFTP_HOST=ssh.strato.com
PRODUCTION_SFTP_PORT=22
PRODUCTION_SFTP_USER=sftp_claude@craftdigital.nl
PRODUCTION_SFTP_PASSWORD=jouw_wachtwoord_hier
PRODUCTION_PATH=/STRATO-apps/wordpress_02/app
PRODUCTION_URL=https://wp-base.rutgerthus.nl
```

⚠️ **Belangrijk**: Commit NOOIT het `.env` bestand naar Git! Het bevat gevoelige credentials.

---

## GitHub Secrets Setup

GitHub Secrets slaan gevoelige credentials veilig op voor GitHub Actions workflows.

### Secrets Toevoegen

1. Ga naar je GitHub repository
2. Klik **Settings** → **Secrets and variables** → **Actions**
3. Klik **New repository secret**

### Staging Secrets

Voeg de volgende secrets toe voor staging:

| Secret Naam | Waarde |
|------------|-------|
| `STAGING_SFTP_HOST` | `ssh.strato.com` |
| `STAGING_SFTP_PORT` | `22` |
| `STAGING_SFTP_USER` | `sftp_claude@craftdigital.nl` |
| `STAGING_SFTP_PASSWORD` | Jouw SFTP wachtwoord |
| `STAGING_PATH` | `/STRATO-apps/wordpress_01/app` |
| `STAGING_URL` | `https://wp-base-stg.rutgerthus.nl` |

### Productie Secrets

Voeg de volgende secrets toe voor productie:

| Secret Naam | Waarde |
|------------|-------|
| `PRODUCTION_SFTP_HOST` | `ssh.strato.com` |
| `PRODUCTION_SFTP_PORT` | `22` |
| `PRODUCTION_SFTP_USER` | `sftp_claude@craftdigital.nl` |
| `PRODUCTION_SFTP_PASSWORD` | Jouw SFTP wachtwoord |
| `PRODUCTION_PATH` | `/STRATO-apps/wordpress_02/app` |
| `PRODUCTION_URL` | `https://wp-base.rutgerthus.nl` |

### Protected Environment Setup (Alleen Productie)

1. Ga naar **Settings** → **Environments**
2. Klik op **production** environment (of maak aan als deze niet bestaat)
3. Schakel **Required reviewers** in en voeg jezelf toe
4. Zet **Deployment branches** op **Selected branches** → Voeg rule toe voor alleen `main`
5. Klik **Save protection rules**

Dit zorgt ervoor dat productie deployments handmatige goedkeuring vereisen.

---

## Deployment Workflows

### Staging Workflow

**Bestand**: `.github/workflows/deploy-staging.yml`

**Triggers**:
- Automatisch bij push naar `main` branch
- Handmatig via GitHub Actions UI

**Stappen**:
1. Checkout code
2. Setup Node.js v20
3. Installeer root dependencies (`npm install`)
4. Installeer blocks dependencies (`npm ci` in `./blocks`)
5. Build blocks (`npm run build`)
6. Maak `.env` bestand van GitHub Secrets
7. Deploy theme naar staging (`node deploy-theme-staging.js`)
8. Deploy blocks naar staging (`node deploy-blocks-complete.js`)
9. Maak deployment samenvatting

### Productie Workflow

**Bestand**: `.github/workflows/deploy-production.yml`

**Triggers**:
- Alleen handmatig via GitHub Actions UI
- Vereist typen van "deploy-to-production" voor bevestiging

**Stappen**:
1. **Valideer Input**: Check bevestigingstekst
2. **Pre-Deployment Checks**:
   - Run JavaScript linting (`npm run lint:js`)
   - Run CSS linting (`npm run lint:css`)
   - Build blocks voor productie
   - Check voor kritieke bestanden
   - Maak deployment samenvatting
3. **Deploy** (vereist handmatige goedkeuring):
   - Installeer dependencies
   - Build blocks
   - Maak `.env` bestand van GitHub Secrets
   - Deploy theme naar productie
   - Deploy blocks naar productie
4. **Verifieer Deployment**: Check of productie site bereikbaar is
5. **Notificatie**: Stuur deployment notificatie

---

## Staging Deployment

### Methode 1: Automatische Deployment (Aanbevolen)

Elke push naar de `main` branch triggert automatisch staging deployment.

**Proces**:

1. Maak wijzigingen in een feature branch
2. Maak een Pull Request naar `main`
3. Krijg code review en goedkeuring
4. Merge PR naar `main`
5. GitHub Actions deployed automatisch naar staging

**Monitor Deployment**:

1. Ga naar je GitHub repository
2. Klik **Actions** tab
3. Klik op de running workflow
4. Bekijk deployment voortgang

### Methode 2: Handmatige Deployment

Je kunt staging deployment ook handmatig triggeren:

1. Ga naar **Actions** tab in GitHub
2. Selecteer **Deploy to Staging** workflow
3. Klik **Run workflow** button
4. Selecteer branch (meestal `main`)
5. Klik **Run workflow**

### Methode 3: Lokale Deployment (Development)

Voor test doeleinden kun je deployen vanaf je lokale machine:

```bash
# Build blocks
cd blocks
npm run build
cd ..

# Deploy theme
node deploy-theme-staging.js

# Deploy blocks
node deploy-blocks-complete.js
```

⚠️ **Let op**: Zorg dat je `.env` bestand staging credentials bevat.

### Verificatie

Na afloop van deployment:

1. Bezoek https://wp-base-stg.rutgerthus.nl
2. Log in op WordPress admin
3. Check dat theme actief is
4. Check dat plugin actief is
5. Verifieer frontend styling (bezoek de site)
6. Verifieer backend editor styling (bewerk een pagina met blocks)

---

## Productie Deployment

Productie deployment vereist handmatige goedkeuring om ongewenste deployments te voorkomen.

### Triggeren van Productie Deployment

1. Ga naar **Actions** tab in GitHub
2. Selecteer **Deploy to Production** workflow
3. Klik **Run workflow** button
4. **BELANGRIJK**: Type `deploy-to-production` in het bevestigingsveld
5. Klik **Run workflow**

### Goedkeuringsproces

1. Workflow voert pre-deployment checks uit (linting, building, validatie)
2. Als checks slagen, pauzeert workflow bij "Deploy to Production" job
3. Je ontvangt een notificatie om deployment te reviewen
4. Ga naar de workflow run pagina
5. Klik **Review deployments** button
6. Selecteer **production** environment
7. Klik **Approve and deploy**
8. Deployment gaat verder naar productie

### Pre-Deployment Checks

Voor deployment naar productie voert de workflow automatisch uit:

✅ JavaScript linting (`npm run lint:js`)
✅ CSS linting (`npm run lint:css`)
✅ Productie build (`npm run build`)
✅ Kritieke bestanden check (functions.php, style.css, etc.)

Als een check faalt, wordt deployment geblokkeerd.

### ⚠️ Pre-Deployment Checklist

Voordat je naar productie deployed, controleer:

- [ ] Alle functionaliteit getest op staging
- [ ] Geen console errors in browser
- [ ] Alle links werken correct
- [ ] Mobile responsive werkt goed
- [ ] SSL certificaat actief
- [ ] Database backup recent gemaakt (indien van toepassing)

### Post-Deployment Verificatie

De workflow verifieert automatisch:

1. Check of productie site HTTP 200 teruggeeft
2. Maak verificatie samenvatting
3. Stuur deployment notificatie

### Handmatige Productie Deployment (Alleen Noodgevallen)

Voor nood-fixes kun je deployen vanaf je lokale machine:

```bash
# Build blocks
cd blocks
npm run build
cd ..

# Deploy theme
node deploy-theme-production.js

# Deploy blocks
node deploy-blocks-production.js
```

⚠️ **Waarschuwing**: Gebruik handmatige deployment alleen in noodgevallen. Gebruik altijd de GitHub Actions workflow waar mogelijk.

---

## Verificatie Stappen

### Frontend Verificatie

1. Bezoek de website URL (staging of productie)
2. Check homepage laadt correct
3. Navigeer naar pagina's met custom blocks
4. Verifieer alle blocks hebben juiste styling:
   - Hero block (gradient achtergrond, buttons)
   - Card Grid block (cards met hover effecten)
   - CTA Section block (call-to-action styling)
   - Content Section block (content opmaak)
   - Button block (primary/secondary varianten)
5. Test responsive design (mobiel, tablet, desktop)
6. Check browser console voor errors (F12 → Console tab)

### Backend Editor Verificatie

1. Log in op WordPress admin (`/wp-admin`)
2. Maak of bewerk een pagina
3. Voeg custom blocks toe vanuit de block inserter
4. Verifieer blocks hebben styling in de editor:
   - Design tokens (kleuren, spacing, typografie) werken
   - Component styles renderen correct
   - Buttons hebben juiste styling
   - Hover states zijn zichtbaar
5. Check dat content bewerkbaar is
6. Sla op en preview de pagina

### Veelvoorkomende Issues om te Checken

- ❌ **Geen styling op frontend**: Check of CSS bestanden correct zijn ge-upload
- ❌ **Geen styling in editor**: Check of editor.css design tokens bevat
- ❌ **404 errors voor CSS bestanden**: Check bestandspaden en SFTP upload
- ❌ **Blocks verschijnen niet**: Check of plugin geactiveerd is
- ❌ **Cache problemen**: Clear WordPress cache en browser cache

---

## Troubleshooting

Voor gedetailleerde troubleshooting guides, zie [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).

### Snelle Fixes

#### Deployment Gefaald - Missing package-lock.json

**Symptoom**: `npm ci` faalt in GitHub Actions

**Oplossing**:
```bash
# Genereer package-lock.json
npm install

# Genereer blocks/package-lock.json
cd blocks
npm install
cd ..

# Commit en push
git add package-lock.json blocks/package-lock.json
git commit -m "fix: Add package-lock.json files for CI/CD"
git push
```

#### Editor Heeft Geen Styling

**Symptoom**: Blocks zien er ongestyle uit in WordPress editor

**Oplossing**:
```bash
# Rebuild editor styles met design tokens
node fix-editor-styles.js

# Build blocks
cd blocks
npm run build
cd ..

# Deploy naar staging
node deploy-blocks-complete.js
```

#### Frontend Heeft Geen Styling

**Symptoom**: Blocks zien er ongestyle uit op de website

**Oplossing**:
1. Check of CSS bestanden zijn ge-upload naar server
2. Verifieer WordPress theme is geactiveerd
3. Clear WordPress cache
4. Check browser console voor 404 errors
5. Verifieer design tokens zijn inline (geen @import statements)

#### Kan PR Niet Mergen - Branch Protection

**Symptoom**: "At least 1 approving review is required"

**Oplossing**:
1. Ga naar **Settings** → **Branches**
2. Vind branch protection rule voor `main`
3. Schakel tijdelijk "Require approvals" uit
4. Merge de PR
5. Schakel branch protection weer in

#### Productie Deployment Geblokkeerd

**Symptoom**: Kan productie deployment niet triggeren

**Oplossing**:
1. Zorg dat je `deploy-to-production` exact typt (hoofdlettergevoelig)
2. Check dat production environment is geconfigureerd
3. Verifieer dat je toegevoegd bent als required reviewer
4. Check workflow bestand syntax is correct

---

## Aanvullende Resources

- [WordPress Block Development](https://developer.wordpress.org/block-editor/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Strato WordPress Hosting](https://www.strato.de/hosting/wordpress-hosting/)
- [SFTP Connection Guide](https://www.strato.de/faq/hosting/)

---

## Support

Voor issues of vragen:

1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) eerst
2. Bekijk GitHub Actions workflow logs
3. Check WordPress debug.log (`/wp-content/debug.log`)
4. Verifieer SFTP credentials zijn correct
5. Contact hosting provider (Strato) voor server issues

---

**Laatst Bijgewerkt**: 2025-11-19
**Versie**: 1.0

---

## Best Practices

### ✅ DO

- **Altijd testen op staging** voordat je naar productie deployed
- **Gebruik version control** (Git) voor alle wijzigingen
- **Monitor deployments** via GitHub Actions logs
- **Gebruik environment variables** voor configuratie
- **Flush caches** na elke deployment
- **Verifieer website functionaliteit** na deployment

### ❌ DON'T

- ❌ **Direct naar productie deployen** zonder staging test
- ❌ **Hard-coded URLs** in code gebruiken
- ❌ **Sensitive data committen** naar Git (API keys, passwords)
- ❌ **Deployment tijdens peak hours** uitvoeren
- ❌ **Vergeten om cache te flushen** na deployment

---

## Deployment Checklist

### Pre-Deployment

- [ ] Alle code changes zijn gecommit en gepusht
- [ ] Blocks zijn gebuild (`npm run build`)
- [ ] Lokaal getest in wp-env
- [ ] Geen console errors

### Deployment

- [ ] GitHub Actions workflow succesvol
- [ ] Website bereikbaar op nieuwe environment
- [ ] Alle pagina's laden correct
- [ ] WordPress admin toegankelijk

### Post-Deployment

- [ ] Functionaliteit getest
- [ ] Media/uploads worden getoond
- [ ] Navigatie werkt
- [ ] Cache geflushed

---

## Database Migratie

**Let op**: Voor dit project is database migratie meestal niet nodig, omdat we alleen het theme en blocks deployen.

### Lokaal → Staging (indien nodig)

#### Optie 1: WP-CLI (Aanbevolen)

```bash
# Exporteer lokale database
npx @wordpress/env run cli wp db export /tmp/local-database.sql

# Download geëxporteerde database
npx @wordpress/env run cli cat /tmp/local-database.sql > local-database.sql
```

#### Optie 2: WordPress Plugin

1. **Export lokaal:**
   - Open http://localhost:8888/wp-admin/
   - Installeer plugin: "All-in-One WP Migration" of "Duplicator"
   - Export complete website

2. **Import op staging:**
   - Open staging phpMyAdmin
   - Import SQL file
   - Update URLs via SQL:

```sql
-- Update site URL
UPDATE wp_options
SET option_value = 'https://staging.jouw-domein.nl'
WHERE option_name IN ('siteurl', 'home');

-- Update post content URLs
UPDATE wp_posts
SET post_content = REPLACE(post_content, 'http://localhost:8888', 'https://staging.jouw-domein.nl');

-- Update post meta
UPDATE wp_postmeta
SET meta_value = REPLACE(meta_value, 'http://localhost:8888', 'https://staging.jouw-domein.nl');
```

#### Optie 3: WP Migrate DB Plugin

```bash
# Installeer plugin op beide omgevingen
npx @wordpress/env run cli wp plugin install wp-migrate-db --activate

# In WordPress admin:
# Tools → Migrate DB
# Push naar staging URL
```

### Staging → Productie

**⚠️ Voorzichtigheid vereist!**

Staging naar productie migreren betekent dat je de live database overschrijft.

```bash
# 1. BACKUP PRODUCTIE EERST!
ssh user@production-server
cd /path/to/wordpress
wp db export /backups/production-backup-$(date +%Y%m%d-%H%M%S).sql

# 2. Export staging database
ssh user@staging-server
cd /path/to/wordpress
wp db export /tmp/staging-database.sql
scp /tmp/staging-database.sql user@production-server:/tmp/

# 3. Import op productie
ssh user@production-server
cd /path/to/wordpress
wp db import /tmp/staging-database.sql

# 4. Update URLs
wp search-replace 'https://staging.jouw-domein.nl' 'https://www.jouw-domein.nl' --all-tables

# 5. Update permalink structure
wp rewrite flush

# 6. Clear cache
wp cache flush
```

---

## Uploads Directory

WordPress uploads (afbeeldingen, media) zitten in `wp-content/uploads/`.

### Sync Uploads

```bash
# Lokaal → Staging
rsync -avz --progress \
  wp-content/uploads/ \
  user@staging-server:/path/to/wordpress/wp-content/uploads/

# Staging → Productie
ssh user@staging-server
rsync -avz --progress \
  /path/to/wordpress/wp-content/uploads/ \
  user@production-server:/path/to/wordpress/wp-content/uploads/
```

**Let op**: Uploads kunnen groot zijn! Overweeg:
- Alleen recent gewijzigde bestanden syncen
- CDN gebruiken voor media
- Afbeeldingen optimaliseren voor deployment

---

## Deployment Scripts

### Script 1: Complete Deployment naar Staging

Maak `deploy-to-staging.sh`:

```bash
#!/bin/bash
set -e

echo "🚀 Deploying to staging..."

# 1. Build blocks
echo "�� Building blocks..."
cd blocks/
npm run build
cd ..

# 2. Commit changes
echo "💾 Committing changes..."
git add .
git commit -m "deploy: Update for staging deployment" || echo "No changes to commit"

# 3. Push to develop branch
echo "⬆️ Pushing to GitHub..."
git push origin develop

echo "✅ Deployment triggered! Check GitHub Actions for progress."
echo "🌐 Staging URL: https://staging.jouw-domein.nl"
```

Gebruik:

```bash
chmod +x deploy-to-staging.sh
./deploy-to-staging.sh
```

### Script 2: Database Sync

Maak `sync-database.sh`:

```bash
#!/bin/bash
set -e

SOURCE="${1:-local}"
TARGET="${2:-staging}"

echo "🔄 Syncing database: $SOURCE → $TARGET"

if [ "$SOURCE" = "local" ]; then
  # Export from local wp-env
  echo "📤 Exporting local database..."
  npx @wordpress/env run cli wp db export /tmp/database.sql
  npx @wordpress/env run cli cat /tmp/database.sql > database-export.sql
  echo "✅ Database exported to: database-export.sql"
fi

if [ "$TARGET" = "staging" ]; then
  echo "📥 Uploading to staging..."
  scp database-export.sql $STAGING_SSH_USER@$STAGING_SSH_HOST:/tmp/

  echo "📝 Importing on staging..."
  ssh $STAGING_SSH_USER@$STAGING_SSH_HOST << 'EOF'
    cd /path/to/wordpress
    wp db import /tmp/database-export.sql
    wp search-replace 'http://localhost:8888' 'https://staging.jouw-domein.nl' --all-tables
    wp cache flush
EOF

  echo "✅ Database synced to staging!"
fi
```

---

## Troubleshooting

### Issue: GitHub Actions Deployment Fails

**Symptom**: Workflow fails met "Connection refused" of "Authentication failed"

**Oplossing**:

```bash
# 1. Verifieer FTP credentials
curl -v ftp://STAGING_FTP_SERVER --user USERNAME:PASSWORD

# 2. Check GitHub Secrets
# GitHub → Settings → Secrets → Actions
# Verifieer dat alle secrets correct zijn

# 3. Check server firewall
# Zorg dat GitHub Actions IPs toegang hebben tot FTP
```

### Issue: Database Import Fails

**Symptom**: "Error establishing database connection"

**Oplossing**:

```bash
# 1. Check database credentials
wp db check

# 2. Verify database exists
mysql -u DB_USER -p -e "SHOW DATABASES;"

# 3. Check wp-config.php
cat wp-config.php | grep DB_

# 4. Test database connection
wp db query "SELECT 1;"
```

### Issue: White Screen After Deployment

**Symptom**: Website toont witte pagina of 500 error

**Oplossing**:

```bash
# 1. Enable WordPress debug mode
# Edit wp-config.php:
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);

# 2. Check error logs
tail -f /path/to/wordpress/wp-content/debug.log

# 3. Check PHP error logs
tail -f /var/log/apache2/error.log  # Of nginx error log

# 4. Verify file permissions
chmod 644 wp-config.php
chmod -R 755 wp-content/themes/
chmod -R 755 wp-content/plugins/

# 5. Clear all caches
wp cache flush
wp rewrite flush
```

### Issue: Blocks Niet Zichtbaar na Deployment

**Symptom**: Custom blocks werken lokaal maar niet op staging/productie

**Oplossing**:

```bash
# 1. Verifieer build files zijn mee gedeployed
ls -la wp-content/themes/client-website/blocks/build/

# 2. Check of webpack build succesvol was
cd blocks/
npm run build
ls -la build/

# 3. Flush WordPress cache
wp cache flush

# 4. Hard refresh browser
# Ctrl + Shift + R

# 5. Check browser console voor JavaScript errors
# F12 → Console tab
```

### Issue: Styling Mist na Deployment

**Symptom**: Website ziet er anders uit dan lokaal

**Oplossing**:

```bash
# 1. Check of CSS files zijn mee gedeployed
ls -la wp-content/themes/client-website/components/

# 2. Verifieer URLs in theme.json
cat theme.json | grep -i style

# 3. Clear browser cache
# Ctrl + Shift + R

# 4. Check browser DevTools → Network
# Zoek naar 404 errors voor CSS files

# 5. Verify file permissions
chmod -R 644 wp-content/themes/client-website/components/**/*.css
```

---

## Best Practices

### ✅ DO

- **Altijd testen op staging** voordat je naar productie deploy
- **Maak backups** voor elke productie deployment
- **Gebruik version control** (Git) voor alle wijzigingen
- **Test database migrations** eerst op staging
- **Monitor deployments** via GitHub Actions logs
- **Gebruik environment variables** voor configuratie
- **Flush caches** na elke deployment
- **Verifieer website functionaliteit** na deployment

### ❌ DON'T

- ❌ **Direct naar productie deployen** zonder staging test
- ❌ **Database wijzigingen zonder backup** maken
- ❌ **Hard-coded URLs** in code gebruiken
- ❌ **Sensitive data committen** naar Git (API keys, passwords)
- ❌ **FTP zonder SSL/TLS** gebruiken
- ❌ **Deployment tijdens peak hours** uitvoeren
- ❌ **Vergeten om cache te flushen** na deployment

---

## Deployment Checklist

### Pre-Deployment

- [ ] Alle code changes zijn gecommit en gepusht
- [ ] Blocks zijn gebuild (`npm run build`)
- [ ] Lokaal getest in wp-env
- [ ] Geen console errors
- [ ] Database backup gemaakt
- [ ] Changelog bijgewerkt

### Deployment

- [ ] GitHub Actions workflow succesvol
- [ ] Website bereikbaar op nieuwe environment
- [ ] Alle pagina's laden correct
- [ ] WordPress admin toegankelijk
- [ ] Database connectie werkt

### Post-Deployment

- [ ] Functionaliteit getest
- [ ] Forms werken
- [ ] Media/uploads worden getoond
- [ ] Navigatie werkt
- [ ] Cache geflushed
- [ ] Monitoring actief
- [ ] Team geïnformeerd

---

## Volgende Stappen

Nu je deployment pipeline hebt:

1. **Configureer GitHub Secrets** (zie [Configuratie Checklist](#configuratie-checklist))
2. **Test staging deployment** met een kleine wijziging
3. **Verifieer staging website** werkt correct
4. **Configureer productie environment** (hosting, database)
5. **Test productie deployment** naar test/acceptatie omgeving
6. **Plan go-live** met volledige deployment

---

## Hulp Nodig?

- **GitHub Actions Logs**: Bekijk workflow runs voor error details
- **WordPress Logs**: Check `wp-content/debug.log`
- **Server Logs**: Check Apache/Nginx error logs
- **Documentation**:
  - [BLOCKS-DEVELOPMENT.md](./BLOCKS-DEVELOPMENT.md)
  - [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
  - [CLIENT-PROJECT-WORKFLOW.md](./CLIENT-PROJECT-WORKFLOW.md)

---

**Ready to deploy!** 🚀
