# Database Synchronization Guide

Complete gids voor het synchroniseren van databases tussen productie, staging en development omgevingen.

## 🎯 Overzicht

Dit project heeft 3 omgevingen:
- **Production**: Live website op https://wp-base.rutgerthus.nl
- **Staging**: Test omgeving (Strato hosting)
- **Development**: Lokale ontwikkel omgeving (wp-env)

## ⚠️ Belangrijke Informatie

**Strato Hosting Beperkingen**:
- ❌ Geen SSH shell access (alleen SFTP)
- ❌ Geen WP-CLI toegang via command line
- ✅ Wel phpMyAdmin beschikbaar
- ✅ Wel SFTP toegang voor file transfers

Dit betekent dat we **geen geautomatiseerde database sync** kunnen doen via WP-CLI. In plaats daarvan gebruiken we een **semi-automatische workflow** met phpMyAdmin en SFTP.

---

## 📋 Workflow 1: Production → Staging/Development

**Doel**: Kopieer productie database naar staging/development voor ontwikkeling met actuele data.

### Stap 1: Exporteer Database van Production

#### Via phpMyAdmin (Aanbevolen)

1. **Login bij Strato hosting panel**
   - Ga naar: https://www.strato.de/apps
   - Login met je Strato credentials

2. **Open phpMyAdmin voor production**
   - Selecteer WordPress 02 (production)
   - Klik op "phpMyAdmin"

3. **Exporteer database**
   - Selecteer de database (meestal `dbs123456_7` of vergelijkbaar)
   - Klik op tabblad "Export"
   - Selecteer "Quick" export method
   - Format: SQL
   - Klik "Go"
   - Bestand wordt gedownload: `database.sql`

4. **Hernoem het bestand**
   ```bash
   # Voeg datum toe voor tracking
   mv database.sql production-backup-20250126.sql
   ```

#### Via WordPress Plugin (Alternatief)

1. **Installeer "All-in-One WP Migration" plugin** op production
2. **Export database**:
   - Dashboard → All-in-One WP Migration → Export
   - Selecteer "Database only" (niet media files)
   - Download `.wpress` bestand

### Stap 2: Importeer naar Staging

#### Via phpMyAdmin

1. **Open phpMyAdmin voor staging**
   - Selecteer WordPress 01 (staging)
   - Klik op "phpMyAdmin"

2. **Backup huidige staging database** (belangrijk!)
   - Export huidige database (zie Stap 1)
   - Sla op als: `staging-backup-20250126.sql`

3. **Importeer production database**
   - Selecteer de database
   - Klik "Import" tabblad
   - Kies bestand: `production-backup-20250126.sql`
   - Klik "Go"
   - Wacht tot import voltooid is

4. **Update Site URLs**
   - Ga naar tabblad "SQL"
   - Voer volgende queries uit:

```sql
-- Update site URL
UPDATE wp_options
SET option_value = 'https://staging.jouwdomain.nl'
WHERE option_name = 'siteurl' OR option_name = 'home';

-- Update posts/pages met absolute URLs (optioneel)
UPDATE wp_posts
SET post_content = REPLACE(
    post_content,
    'https://wp-base.rutgerthus.nl',
    'https://staging.jouwdomain.nl'
);

-- Update wp_postmeta URLs (optioneel)
UPDATE wp_postmeta
SET meta_value = REPLACE(
    meta_value,
    'https://wp-base.rutgerthus.nl',
    'https://staging.jouwdomain.nl'
);
```

5. **Verifieer staging site**
   - Ga naar https://staging.jouwdomain.nl
   - Login bij wp-admin
   - Check of alles werkt

### Stap 3: Importeer naar Development (wp-env)

#### Optie A: Via wp-env CLI (Aanbevolen voor development)

1. **Zet database file in project root**
   ```bash
   # Plaats production-backup-20250126.sql in project root
   ```

2. **Import met wp-env**
   ```bash
   # Start wp-env als die nog niet draait
   npm run wp-env start

   # Import database
   npm run wp-env run cli wp db import production-backup-20250126.sql

   # Update URLs voor localhost
   npm run wp-env run cli wp search-replace 'https://wp-base.rutgerthus.nl' 'http://localhost:8888'

   # Update siteurl en home
   npm run wp-env run cli wp option update home 'http://localhost:8888'
   npm run wp-env run cli wp option update siteurl 'http://localhost:8888'

   # Flush cache
   npm run wp-env run cli wp cache flush
   ```

3. **Verifieer development site**
   - Ga naar http://localhost:8888
   - Login met productie credentials
   - Check of alles werkt

#### Optie B: Via phpMyAdmin (localhost)

Als je lokaal phpMyAdmin draait:

1. **Open phpMyAdmin** (meestal http://localhost:8080/phpmyadmin)
2. **Selecteer WordPress database** (meestal `wordpress`)
3. **Drop alle tabellen** (voorzichtig!)
4. **Import** `production-backup-20250126.sql`
5. **Update URLs** met SQL queries (zie Stap 2.4)

---

## 📋 Workflow 2: Staging → Production

**Doel**: Push content wijzigingen van staging naar production.

⚠️ **WAARSCHUWING**: Dit overschrijft de LIVE production database!

### Pre-Flight Checklist

- [ ] **Backup production database** (VERPLICHT!)
- [ ] **Test alles op staging** - site werkt 100%
- [ ] **Stakeholder approval** - content wijzigingen zijn goedgekeurd
- [ ] **Maintenance mode** - overweeg site offline te zetten tijdens sync
- [ ] **Off-peak hours** - doe dit buiten kantooruren
- [ ] **Rollback plan** - weet hoe je terug kunt naar backup

### Stap 1: Backup Production Database (VERPLICHT!)

1. **Export production database** (zie Workflow 1, Stap 1)
2. **Sla op met timestamp**:
   ```bash
   production-backup-BEFORE-SYNC-20250126-1430.sql
   ```
3. **Bewaar backup veilig** (minimaal 30 dagen)

### Stap 2: Exporteer Staging Database

1. **Open phpMyAdmin voor staging**
2. **Export database**
   - Quick export
   - Format: SQL
   - Download bestand
3. **Hernoem**: `staging-export-20250126.sql`

### Stap 3: Importeer naar Production

1. **Zet site in maintenance mode** (optioneel maar aanbevolen)
   - Via plugin: "WP Maintenance Mode"
   - Of handmatig .maintenance bestand

2. **Open phpMyAdmin voor production**

3. **Drop alle tabellen OF truncate**
   - Check alle tabellen
   - Scroll naar beneden → "Drop" (voorzichtig!)
   - Bevestig

4. **Import staging database**
   - Import tabblad
   - Kies bestand: `staging-export-20250126.sql`
   - Klik "Go"

5. **Update URLs naar production**

```sql
-- Update site URLs
UPDATE wp_options
SET option_value = 'https://wp-base.rutgerthus.nl'
WHERE option_name = 'siteurl' OR option_name = 'home';

-- Update content URLs
UPDATE wp_posts
SET post_content = REPLACE(
    post_content,
    'https://staging.jouwdomain.nl',
    'https://wp-base.rutgerthus.nl'
);

-- Update meta URLs
UPDATE wp_postmeta
SET meta_value = REPLACE(
    meta_value,
    'https://staging.jouwdomain.nl',
    'https://wp-base.rutgerthus.nl'
);
```

6. **Verifieer production site**
   - Ga naar https://wp-base.rutgerthus.nl
   - Test alle belangrijke pagina's
   - Check contact forms, media, etc.

7. **Disable maintenance mode**

### Stap 4: Rollback (alleen als er problemen zijn)

Als er iets mis gaat:

1. **Open phpMyAdmin voor production**
2. **Drop alle tabellen**
3. **Import backup**: `production-backup-BEFORE-SYNC-20250126-1430.sql`
4. **Verifieer site werkt**
5. **Analyseer wat er mis ging**

---

## 🔄 Workflow 3: Development → Staging

**Doel**: Push lokale ontwikkelingen naar staging voor testing.

### Snelle Methode (Alleen Code, GEEN Database)

**Aanbevolen**: Sync alleen code/theme wijzigingen via Git:

```bash
# Commit je wijzigingen
git add .
git commit -m "feat: nieuwe wijzigingen"

# Push naar main (auto-deploy naar staging)
git push origin main
```

GitHub Actions deployt automatisch naar staging (alleen code, niet database).

### Database Sync (Niet Aanbevolen)

Development databases zijn meestal niet schoon genoeg voor staging. Beter:

1. **Sync production → development** voor verse data
2. **Ontwikkel en test**
3. **Sync code via Git**
4. **Test content op staging** (met staging/production database)

---

## 🛠️ Tools & Scripts

### Helper Scripts

We hebben enkele scripts gemaakt om het proces te vereenvoudigen:

#### 1. `test-wpcli-access.js`

Test of WP-CLI beschikbaar is (spoiler: niet op Strato).

```bash
node test-wpcli-access.js
```

#### 2. `database-sync-helper.js` (TODO)

Hulp script voor:
- Download database via SFTP (als Strato dit ondersteunt)
- URL replacement in SQL files
- Backup management

### SQL Snippets

Bewaar deze queries voor hergebruik:

#### Search-Replace URLs in SQL File (Mac/Linux)

```bash
# Replace production URLs met staging URLs in SQL file
sed -i '' 's|https://wp-base.rutgerthus.nl|https://staging.jouwdomain.nl|g' database.sql

# Replace staging URLs met localhost
sed -i '' 's|https://staging.jouwdomain.nl|http://localhost:8888|g' database.sql
```

#### Search-Replace URLs in SQL File (Windows PowerShell)

```powershell
# Replace production URLs met staging URLs
(Get-Content database.sql) -replace 'https://wp-base.rutgerthus.nl', 'https://staging.jouwdomain.nl' | Set-Content database-staging.sql

# Replace staging URLs met localhost
(Get-Content database.sql) -replace 'https://staging.jouwdomain.nl', 'http://localhost:8888' | Set-Content database-local.sql
```

---

## 📊 Database Informatie

### Production
- **Host**: Strato WordPress 02
- **Database**: (zie Strato panel voor exacte naam)
- **Prefix**: `wp_`
- **URL**: https://wp-base.rutgerthus.nl
- **Access**: phpMyAdmin via Strato panel

### Staging
- **Host**: Strato WordPress 01
- **Database**: (zie Strato panel voor exacte naam)
- **Prefix**: `wp_`
- **URL**: https://staging.jouwdomain.nl (vervang met echte staging URL)
- **Access**: phpMyAdmin via Strato panel

### Development (wp-env)
- **Host**: localhost (Docker container)
- **Database**: `wordpress`
- **Prefix**: `wp_`
- **URL**: http://localhost:8888
- **Access**: WP-CLI via `npm run wp-env`

---

## ⚠️ Veelvoorkomende Problemen

### 1. "Serialized data corrupt"

**Probleem**: Na URL replacement werken sommige widgets/options niet.

**Oorzaak**: WordPress slaat data op in serialized PHP format zoals:
```
s:27:"https://wp-base.rutgerthus.nl"
```

Het getal `27` is de string lengte. Als je URL vervangt zonder lengte aan te passen, corrupt je de data.

**Oplossing**:
- Gebruik plugin "Better Search Replace" - handelt serialized data correct af
- Of gebruik WP-CLI search-replace (alleen op development)
- Of gebruik specialized tool zoals "Search Replace DB" script

### 2. "Site URL's kloppen niet"

**Probleem**: Na import zie je nog oude URLs.

**Oplossing**:
```sql
-- Check huidige URLs
SELECT * FROM wp_options WHERE option_name IN ('siteurl', 'home');

-- Update indien nodig
UPDATE wp_options SET option_value = 'https://NIEUWE-URL'
WHERE option_name = 'siteurl' OR option_name = 'home';

-- Clear cache
DELETE FROM wp_options WHERE option_name LIKE '%_transient_%';
```

### 3. "Import timeout in phpMyAdmin"

**Probleem**: Database te groot voor phpMyAdmin import (>50MB).

**Oplossing**:
- Splits SQL bestand in kleinere delen
- Gebruik "BigDump" tool (PHP script voor grote imports)
- Vraag Strato support om import uit te voeren
- Gebruik WordPress plugin voor import (All-in-One WP Migration)

### 4. "Media files missen na database sync"

**Probleem**: Database is gesynced maar afbeeldingen laden niet.

**Oorzaak**: Database bevat alleen REFERENTIES naar media. Files zitten in wp-content/uploads.

**Oplossing**:
- Database sync ≠ media sync
- Media moet apart gesynchroniseerd worden
- Zie: `docs/MEDIA-SYNC.md` (TODO)

### 5. "Kan niet inloggen na database import"

**Probleem**: Oude wachtwoorden werken niet.

**Oplossing**:
```sql
-- Reset wachtwoord voor admin user
UPDATE wp_users SET user_pass = MD5('nieuw-wachtwoord') WHERE user_login = 'admin';

-- Of beter: gebruik "Lost Password" functie op login scherm
```

---

## 📝 Best Practices

### DO's ✅

1. **Altijd backup maken** voor je production database wijzigt
2. **Test eerst op staging** voor je naar production gaat
3. **Gebruik timestamps** in backup bestandsnamen
4. **Bewaar backups** minimaal 30 dagen
5. **Documenteer wijzigingen** in commit messages
6. **Test na elke sync** of site werkt
7. **Gebruik maintenance mode** bij production sync
8. **Sync off-peak hours** voor production

### DON'Ts ❌

1. **Nooit production overschrijven** zonder backup
2. **Nooit direct in production database** wijzigingen maken
3. **Nooit wp-config.php overschrijven** bij database sync
4. **Nooit uploads folder overschrijven** bij database sync
5. **Nooit gevoelige data** in Git commits
6. **Nooit meerdere syncs tegelijk** uitvoeren
7. **Nooit database sync zonder URL update**

---

## 🔐 Security Considerations

### Gevoelige Data

Database kan bevatten:
- User wachtwoorden (hashed, maar toch)
- Email adressen
- API keys in wp_options
- Form submissions
- User IP adressen

### Aanbevelingen

1. **Bewaar database exports NOOIT in Git**
   - Al toegevoegd aan .gitignore: `*.sql`, `*.sql.gz`

2. **Encrypt backups** indien bewaard in cloud
   - Gebruik wachtwoord-beveiligde ZIP
   - Of gebruik encrypted storage (Dropbox, Google Drive encrypted)

3. **Clean development data** als je production data synct
   ```sql
   -- Optioneel: Anonimiseer user data in development
   UPDATE wp_users SET user_email = CONCAT('user', ID, '@example.com') WHERE ID > 1;
   ```

4. **Revoke API keys** na development
   - Als je productie API keys hebt in development, revoke ze na gebruik

---

## 📅 Sync Schedule

### Aanbevolen Frequentie

- **Production → Development**: Weekly (maandag ochtend)
- **Staging → Production**: On-demand (na content updates)
- **Development → Staging**: Continuous (via Git auto-deploy)

### Backup Retention

- **Production backups**: 30 dagen
- **Staging backups**: 14 dagen
- **Pre-sync backups**: 30 dagen (ALTIJD bewaren)

---

## 🆘 Support & Troubleshooting

### Strato Support

- **Panel**: https://www.strato.de/apps
- **Support**: Via Strato customer portal
- **phpMyAdmin**: Direct beschikbaar in panel per WordPress instance

### Internal Documentation

- Main setup guide: `SETUP.md`
- Deployment guide: `docs/DEPLOYMENT.md`
- Troubleshooting: `docs/DATABASE-SYNC-TROUBLESHOOTING.md` (zie volgende sectie)

### Emergency Contacts

**Bij kritieke production problemen**:
1. Check backups in `backups/` folder
2. Rollback via phpMyAdmin (zie Workflow 2, Stap 4)
3. Contact hosting support indien database corrupt

---

## 📚 Volgende Stappen

1. **Lees**: `docs/DATABASE-SYNC-TROUBLESHOOTING.md` voor gedetailleerde troubleshooting
2. **Test**: Voer een test sync uit van production → staging
3. **Backup**: Maak een backup van alle 3 environments
4. **Document**: Noteer environment-specifieke details (database namen, etc.)

---

## ✅ Checklist: Eerste Database Sync

Gebruik deze checklist voor je eerste sync:

### Pre-Sync
- [ ] Strato login credentials beschikbaar
- [ ] Toegang tot phpMyAdmin geverifieerd (staging + production)
- [ ] .gitignore bevat `*.sql` en `*.sql.gz`
- [ ] Backup folder aangemaakt (buiten Git)
- [ ] Deze documentatie gelezen en begrepen

### Production → Staging Sync
- [ ] Production database geëxporteerd via phpMyAdmin
- [ ] Bestand hernoemd met datum (production-backup-YYYYMMDD.sql)
- [ ] Staging database gebackupt (staging-backup-YYYYMMDD.sql)
- [ ] Production database geïmporteerd in staging
- [ ] URLs updated met SQL queries
- [ ] Staging site getest en functioneel
- [ ] Backups opgeslagen buiten Git (30 dagen bewaren)

### Development Import
- [ ] wp-env draait (`npm run wp-env start`)
- [ ] Database file in project root geplaatst
- [ ] Import via wp-env CLI uitgevoerd
- [ ] URLs updated naar localhost:8888
- [ ] Development site getest
- [ ] SQL bestand verwijderd uit project root (security)

### Staging → Production (Only when needed!)
- [ ] **STOP**: Lees hele Workflow 2 eerst
- [ ] Stakeholder approval ontvangen
- [ ] Production backup gemaakt (timestamped!)
- [ ] Staging database geëxporteerd
- [ ] Off-peak hours gepland
- [ ] Maintenance mode overwogen
- [ ] Rollback procedure bekend
- [ ] Import uitgevoerd
- [ ] URLs updated
- [ ] Production site grondig getest
- [ ] Maintenance mode disabled
- [ ] Stakeholders geïnformeerd

---

**Document versie**: 1.0
**Laatst bijgewerkt**: 2025-01-26
**Auteur**: Claude Code
**Status**: In gebruik
