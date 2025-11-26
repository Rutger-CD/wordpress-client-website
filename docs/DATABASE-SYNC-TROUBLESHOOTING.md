# Database Sync Troubleshooting Guide

Gedetailleerde troubleshooting voor database synchronisatie problemen.

---

## 🔍 Quick Diagnostics

Start hier als je niet zeker weet wat het probleem is:

```sql
-- Check WordPress version
SELECT option_value FROM wp_options WHERE option_name = 'db_version';

-- Check site URLs
SELECT option_name, option_value FROM wp_options
WHERE option_name IN ('siteurl', 'home', 'upload_url_path');

-- Check active theme
SELECT option_value FROM wp_options WHERE option_name = 'stylesheet';

-- Check active plugins
SELECT option_value FROM wp_options WHERE option_name = 'active_plugins';

-- Check recent posts
SELECT ID, post_title, post_status, post_modified FROM wp_posts
WHERE post_status = 'publish'
ORDER BY post_modified DESC LIMIT 10;

-- Check user accounts
SELECT ID, user_login, user_email, user_registered FROM wp_users;
```

---

## 🚨 Problem Categories

### 1. Import/Export Problemen
### 2. URL & Redirect Problemen
### 3. Serialized Data Problemen
### 4. Performance & Timeout Problemen
### 5. Permission & Access Problemen
### 6. Data Integrity Problemen
### 7. Media & Uploads Problemen
### 8. User & Authentication Problemen

---

## 1. Import/Export Problemen

### ❌ Problem: "phpMyAdmin import timeout"

**Symptomen**:
- Import stopt halverwege
- Error: "Maximum execution time exceeded"
- Error: "Script timeout passed"

**Diagnose**:
```bash
# Check bestandsgrootte
ls -lh database.sql

# Als > 50MB, dit is waarschijnlijk het probleem
```

**Oplossing A: Split SQL bestand**

```bash
# Mac/Linux: Split in chunks van 10MB
split -b 10m database.sql database-part-

# Windows PowerShell: Split in chunks
$chunkSize = 10MB
$file = "database.sql"
$content = Get-Content $file -Raw
$chunks = [Math]::Ceiling($content.Length / $chunkSize)

for ($i = 0; $i -lt $chunks; $i++) {
    $start = $i * $chunkSize
    $chunk = $content.Substring($start, [Math]::Min($chunkSize, $content.Length - $start))
    $chunk | Out-File "database-part-$i.sql"
}
```

Dan importeer elk deel afzonderlijk in phpMyAdmin.

**Oplossing B: Gebruik BigDump**

1. Download BigDump: http://www.ozerov.de/bigdump/
2. Upload bigdump.php via SFTP naar je WordPress root
3. Bezoek: https://jouwsite.nl/bigdump.php
4. Selecteer database.sql en klik "Start Import"
5. Verwijder bigdump.php na gebruik (security!)

**Oplossing C: WordPress Plugin**

1. Installeer "All-in-One WP Migration" of "Duplicator"
2. Upload .sql bestand via plugin interface
3. Plugin handelt import automatisch af

---

### ❌ Problem: "SQL syntax error bij import"

**Symptomen**:
- Error: "SQL syntax error near line X"
- Import stopt bij specifieke regel

**Diagnose**:
```bash
# Vind de problematische regel
sed -n 'Xp' database.sql  # Vervang X met regelnummer uit error

# Check bestand encoding
file database.sql
```

**Mogelijke Oorzaken**:
1. Charset mismatch (UTF-8 vs latin1)
2. MySQL versie incompatibiliteit
3. Corrupt SQL bestand

**Oplossing**:

```sql
-- 1. Check target database charset
SHOW CREATE DATABASE your_database_name;

-- 2. Converteer SQL bestand naar UTF-8 (Mac/Linux)
iconv -f LATIN1 -t UTF-8 database.sql > database-utf8.sql

-- 3. Of forceer UTF-8 in SQL bestand (voeg toe aan top)
-- SET NAMES utf8mb4;
-- SET CHARACTER SET utf8mb4;
```

**Als specifieke table faalt**:
```sql
-- Skip die table in import
-- Comment out met -- of /* */

-- Of drop table eerst
DROP TABLE IF EXISTS problematic_table;
```

---

### ❌ Problem: "Access denied during import"

**Symptomen**:
- Error: "Access denied for user"
- Error: "INSERT command denied"

**Oplossing**:
1. Check database user permissions in phpMyAdmin
2. Ensure user heeft `INSERT`, `UPDATE`, `CREATE`, `DROP` rechten
3. Strato: gebruik de admin user die automatisch aangemaakt is

---

## 2. URL & Redirect Problemen

### ❌ Problem: "Site redirect loop na import"

**Symptomen**:
- Browser geeft: "ERR_TOO_MANY_REDIRECTS"
- Site niet toegankelijk
- wp-admin ook niet bereikbaar

**Diagnose**:
```sql
-- Check beide URL settings
SELECT * FROM wp_options WHERE option_name IN ('siteurl', 'home');
```

**Mogelijke Oorzaken**:
1. `siteurl` ≠ `home`
2. URLs hebben http:// terwijl site https:// verwacht
3. URLs hebben trailing slash mismatch

**Oplossing**:
```sql
-- Fix beide URLs identiek maken
UPDATE wp_options SET option_value = 'https://wp-base.rutgerthus.nl'
WHERE option_name = 'siteurl';

UPDATE wp_options SET option_value = 'https://wp-base.rutgerthus.nl'
WHERE option_name = 'home';

-- Flush rewrite rules
DELETE FROM wp_options WHERE option_name = 'rewrite_rules';
```

**Als je nog steeds geen toegang hebt**:

Bewerk wp-config.php via SFTP:
```php
define('WP_HOME','https://wp-base.rutgerthus.nl');
define('WP_SITEURL','https://wp-base.rutgerthus.nl');
```

---

### ❌ Problem: "Mixed content warnings (http/https)"

**Symptomen**:
- Pagina laadt maar sommige resources niet (CSS, JS, afbeeldingen)
- Browser console: "Mixed Content" warnings
- Afbeeldingen tonen niet

**Diagnose**:
```sql
-- Zoek http:// URLs in content
SELECT ID, post_title FROM wp_posts
WHERE post_content LIKE '%http://jouwsite.nl%';

-- Zoek http:// URLs in postmeta
SELECT post_id, meta_key FROM wp_postmeta
WHERE meta_value LIKE '%http://jouwsite.nl%';
```

**Oplossing**:
```sql
-- Update post content
UPDATE wp_posts
SET post_content = REPLACE(post_content, 'http://jouwsite.nl', 'https://jouwsite.nl');

-- Update postmeta
UPDATE wp_postmeta
SET meta_value = REPLACE(meta_value, 'http://jouwsite.nl', 'https://jouwsite.nl');

-- Update options
UPDATE wp_options
SET option_value = REPLACE(option_value, 'http://jouwsite.nl', 'https://jouwsite.nl');
```

**Of gebruik plugin**: "Better Search Replace" (handelt serialized data)

---

### ❌ Problem: "404 errors na database import"

**Symptomen**:
- Homepage werkt
- Alle andere pagina's geven 404
- Permalinks werken niet

**Oorzaak**: Rewrite rules niet goed ingesteld

**Oplossing**:
```sql
-- Clear rewrite rules in database
DELETE FROM wp_options WHERE option_name = 'rewrite_rules';
```

Dan in WordPress admin:
1. Ga naar Settings → Permalinks
2. Klik gewoon "Save Changes" (zonder iets te wijzigen)
3. Dit regenereert de rewrite rules

---

## 3. Serialized Data Problemen

### ❌ Problem: "Widgets verdwijnen na URL replacement"

**Symptomen**:
- Widgets tonen niet na database import
- Theme settings verdwenen
- Plugin configuratie leeg

**Oorzaak**: Serialized data corrupt door verkeerde string length

**Voorbeeld probleem**:
```php
// Voor replacement: (lengte = 27)
s:27:"https://wp-base.rutgerthus.nl"

// Na VERKEERDE replacement: (lengte zou 22 moeten zijn!)
s:27:"https://staging.nl"  // ❌ CORRUPT!

// Juiste replacement: (lengte = 22)
s:22:"https://staging.nl"  // ✅ CORRECT
```

**Diagnose**:
```sql
-- Find serialized data met oude URL
SELECT option_name, option_value FROM wp_options
WHERE option_value LIKE '%s:%"%https://wp-base.rutgerthus.nl%';
```

**Oplossing A: WordPress Plugin (Aanbevolen)**

Gebruik "Better Search Replace" plugin:
1. Installeer plugin
2. Tools → Better Search Replace
3. Voer in:
   - Search for: `https://wp-base.rutgerthus.nl`
   - Replace with: `https://staging.nl`
4. Select all tables
5. ✅ Check "Run as dry run" eerst!
6. Klik "Run Search/Replace"

**Oplossing B: Search Replace DB Script**

1. Download: https://github.com/interconnectit/Search-Replace-DB
2. Upload naar server via SFTP
3. Browse naar: https://jouwsite.nl/Search-Replace-DB/
4. Voer search/replace uit
5. **DELETE script van server na gebruik!** (security!)

**Oplossing C: wp-env CLI (alleen development)**

```bash
npm run wp-env run cli wp search-replace 'https://wp-base.rutgerthus.nl' 'http://localhost:8888' --all-tables
```

---

## 4. Performance & Timeout Problemen

### ❌ Problem: "Site traag na database import"

**Symptomen**:
- Lange laadtijden (>5 seconden)
- wp-admin traag
- Database queries duren lang

**Diagnose**:
```sql
-- Check database size
SELECT
    table_name,
    ROUND((data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
FROM information_schema.tables
WHERE table_schema = 'your_database_name'
ORDER BY (data_length + index_length) DESC;

-- Check transients (cache)
SELECT COUNT(*) FROM wp_options WHERE option_name LIKE '%_transient_%';
```

**Oplossing**:
```sql
-- 1. Clear transients (cache)
DELETE FROM wp_options WHERE option_name LIKE '%_transient_%';

-- 2. Optimize tables
OPTIMIZE TABLE wp_posts;
OPTIMIZE TABLE wp_postmeta;
OPTIMIZE TABLE wp_options;
OPTIMIZE TABLE wp_comments;
```

In WordPress admin:
1. Flush object cache: plugin of `wp cache flush`
2. Regenerate permalinks: Settings → Permalinks → Save
3. Clear browser cache

---

### ❌ Problem: "wp_options table enorm groot"

**Symptomen**:
- wp_options table > 50MB
- Queries op wp_options traag
- autoload data te groot

**Diagnose**:
```sql
-- Check autoload data size
SELECT
    SUM(LENGTH(option_value)) as autoload_size
FROM wp_options
WHERE autoload = 'yes';

-- Find grootste autoload options
SELECT
    option_name,
    LENGTH(option_value) as size
FROM wp_options
WHERE autoload = 'yes'
ORDER BY size DESC
LIMIT 20;
```

**Oplossing**:
```sql
-- Disable autoload voor grote options die niet nodig zijn bij elke page load
UPDATE wp_options
SET autoload = 'no'
WHERE option_name = 'some_large_option_name';

-- Clean orphaned options
-- (check eerst welke plugins/themes je gebruikt!)
DELETE FROM wp_options
WHERE option_name LIKE '%_old_plugin_name_%';
```

---

## 5. Permission & Access Problemen

### ❌ Problem: "Kan niet inloggen na database import"

**Symptomen**:
- Username/wachtwoord niet geaccepteerd
- "ERROR: Invalid username or password"
- Wachtwoord reset email komt niet aan

**Oplossing A: SQL Reset Password**

```sql
-- Check bestaande users
SELECT ID, user_login, user_email FROM wp_users;

-- Reset password voor admin (ID meestal 1)
UPDATE wp_users
SET user_pass = MD5('NieuwWachtwoord123!')
WHERE ID = 1;

-- Of use bcrypt (veiliger, WordPress 4.4+)
-- Genereer bcrypt hash op: https://bcrypt.online
UPDATE wp_users
SET user_pass = '$2y$10$...' -- plak bcrypt hash hier
WHERE ID = 1;
```

**Oplossing B: WordPress Lost Password**

1. Ga naar wp-login.php
2. Klik "Lost your password?"
3. Voer email adres in
4. Check email voor reset link

**Als email niet werkt**:
```sql
-- Update email naar een die je WEL ontvangt
UPDATE wp_users
SET user_email = 'jouw-werkende-email@example.com'
WHERE ID = 1;
```

---

### ❌ Problem: "Admin heeft geen rechten meer"

**Symptomen**:
- Inloggen lukt
- Maar admin menu items ontbreken
- "You do not have sufficient permissions"

**Diagnose**:
```sql
-- Check user role in wp_usermeta
SELECT meta_key, meta_value
FROM wp_usermeta
WHERE user_id = 1 AND meta_key = 'wp_capabilities';

-- Moet zijn: a:1:{s:13:"administrator";b:1;}
```

**Oplossing**:
```sql
-- Herstel administrator role
UPDATE wp_usermeta
SET meta_value = 'a:1:{s:13:"administrator";b:1;}'
WHERE user_id = 1 AND meta_key = 'wp_capabilities';

-- Ensure user level is 10 (admin)
UPDATE wp_usermeta
SET meta_value = '10'
WHERE user_id = 1 AND meta_key = 'wp_user_level';
```

---

## 6. Data Integrity Problemen

### ❌ Problem: "Missing posts/pages na import"

**Symptomen**:
- Aantal posts klopt niet
- Belangrijke pagina's ontbreken
- Content lijkt incomplete

**Diagnose**:
```sql
-- Tel posts in source database
SELECT post_type, post_status, COUNT(*) as count
FROM wp_posts
GROUP BY post_type, post_status;

-- Compare met target database (run same query)

-- Check voor import errors
SELECT post_type, post_title, post_status
FROM wp_posts
WHERE post_status = 'auto-draft' OR post_status = 'inherit'
ORDER BY post_modified DESC
LIMIT 20;
```

**Mogelijke Oorzaken**:
1. Incomplete export
2. Import timeout (partial import)
3. Table truncated but not fully imported

**Oplossing**:
1. Re-export source database
2. Import opnieuw (zie Timeout oplossingen boven)
3. Verify import compleet is:
```sql
-- Check laatste post date
SELECT MAX(post_modified) FROM wp_posts;
-- Vergelijk met source database
```

---

### ❌ Problem: "Duplicate posts verschijnen"

**Symptomen**:
- Posts bestaan dubbel
- Slugs met -2, -3, etc
- Chaos in content

**Oorzaak**: Database 2x geïmporteerd zonder eerst te clearen

**Diagnose**:
```sql
-- Find duplicate slugs
SELECT post_name, COUNT(*)
FROM wp_posts
WHERE post_type = 'post'
GROUP BY post_name
HAVING COUNT(*) > 1;

-- Find duplicate titles
SELECT post_title, COUNT(*)
FROM wp_posts
WHERE post_status = 'publish'
GROUP BY post_title
HAVING COUNT(*) > 1;
```

**Oplossing**:
1. Truncate alle tables
2. Import opnieuw (1x!)

```sql
-- Truncate all WordPress tables (VOORZICHTIG!)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE wp_posts;
TRUNCATE TABLE wp_postmeta;
TRUNCATE TABLE wp_options;
TRUNCATE TABLE wp_users;
TRUNCATE TABLE wp_usermeta;
TRUNCATE TABLE wp_comments;
TRUNCATE TABLE wp_commentmeta;
TRUNCATE TABLE wp_terms;
TRUNCATE TABLE wp_term_taxonomy;
TRUNCATE TABLE wp_term_relationships;
SET FOREIGN_KEY_CHECKS = 1;
```

Dan import database.sql opnieuw.

---

## 7. Media & Uploads Problemen

### ❌ Problem: "Afbeeldingen laden niet na database sync"

**Symptomen**:
- Broken image icons
- Media library leeg
- 404 errors op /wp-content/uploads/

**Oorzaak**: Database sync ≠ files sync

**Diagnose**:
```sql
-- Check media in database
SELECT COUNT(*) FROM wp_posts WHERE post_type = 'attachment';

-- Check upload paths
SELECT option_value FROM wp_options WHERE option_name = 'upload_path';
SELECT option_value FROM wp_options WHERE option_name = 'upload_url_path';
```

**Oplossing**: Sync uploads folder separaat

**Via SFTP**:
1. Download /wp-content/uploads/ van production
2. Upload naar staging /wp-content/uploads/
3. Check permissions (755 voor folders, 644 voor files)

**Update upload URLs**:
```sql
-- If upload URL stored in wp_postmeta
UPDATE wp_postmeta
SET meta_value = REPLACE(meta_value, 'https://wp-base.rutgerthus.nl/wp-content/uploads', 'https://staging.nl/wp-content/uploads')
WHERE meta_value LIKE '%wp-content/uploads%';

-- If in post content
UPDATE wp_posts
SET post_content = REPLACE(post_content, 'https://wp-base.rutgerthus.nl/wp-content/uploads', 'https://staging.nl/wp-content/uploads');
```

**Regenerate thumbnails**:
1. Installeer plugin: "Regenerate Thumbnails"
2. Tools → Regenerate Thumbnails
3. Klik "Regenerate All Thumbnails"

---

### ❌ Problem: "Upload folder permissions error"

**Symptomen**:
- "Unable to create directory"
- "The uploaded file could not be moved"
- Media uploads falen

**Diagnose**:
Via SFTP of SSH (if available):
```bash
ls -la wp-content/uploads/
# Should be: drwxr-xr-x (755)
```

**Oplossing**:
Via Strato File Manager of SFTP client:
1. Navigate to wp-content/uploads/
2. Right-click → Permissions → 755
3. Apply to all subfolders recursively

**Alternative**: Update upload path in database
```sql
-- Reset upload path to default
UPDATE wp_options SET option_value = '' WHERE option_name = 'upload_path';
UPDATE wp_options SET option_value = '' WHERE option_name = 'upload_url_path';
```

WordPress zal dan standaard `wp-content/uploads` gebruiken.

---

## 8. User & Authentication Problemen

### ❌ Problem: "Session/cookie problemen na sync"

**Symptomen**:
- Logout direct na login
- "You are logged in" maar geen admin menu
- Cookies werken niet

**Diagnose**:
```sql
-- Check auth keys in wp-config.php (kan niet via SQL)
-- Check cookie domain setting
SELECT option_value FROM wp_options WHERE option_name = 'WPLANG';
```

**Oplossing**: Regenerate auth keys

1. Bezoek: https://api.wordpress.org/secret-key/1.1/salt/
2. Copy nieuwe keys
3. Edit wp-config.php via SFTP
4. Replace oude auth keys met nieuwe

```php
define('AUTH_KEY',         'nieuwe-key-hier');
define('SECURE_AUTH_KEY',  'nieuwe-key-hier');
define('LOGGED_IN_KEY',    'nieuwe-key-hier');
define('NONCE_KEY',        'nieuwe-key-hier');
define('AUTH_SALT',        'nieuwe-key-hier');
define('SECURE_AUTH_SALT', 'nieuwe-key-hier');
define('LOGGED_IN_SALT',   'nieuwe-key-hier');
define('NONCE_SALT',       'nieuwe-key-hier');
```

4. Clear browser cookies
5. Login opnieuw

---

## 🛠️ Debug Tools & Queries

### Handy SQL Queries

```sql
-- Get database size
SELECT
    table_schema AS 'Database',
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
FROM information_schema.tables
WHERE table_schema = 'your_database_name'
GROUP BY table_schema;

-- Get all option names (to find plugin settings)
SELECT option_name FROM wp_options ORDER BY option_name;

-- Get all active plugins
SELECT option_value FROM wp_options WHERE option_name = 'active_plugins';

-- Find all URLs in database (slow, for reference only)
SELECT 'wp_posts' AS table_name, ID, post_content AS content
FROM wp_posts WHERE post_content LIKE '%https://wp-base.rutgerthus.nl%'
UNION
SELECT 'wp_postmeta', post_id, meta_value
FROM wp_postmeta WHERE meta_value LIKE '%https://wp-base.rutgerthus.nl%'
UNION
SELECT 'wp_options', option_id, option_value
FROM wp_options WHERE option_value LIKE '%https://wp-base.rutgerthus.nl%';

-- Check database charset
SHOW CREATE DATABASE your_database_name;

-- Check table charsets
SELECT table_name, table_collation
FROM information_schema.tables
WHERE table_schema = 'your_database_name';
```

### Enable WordPress Debug Mode

Add to wp-config.php (via SFTP):
```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
@ini_set('display_errors', 0);
```

Then check `/wp-content/debug.log` for errors.

### Check PHP Error Log

Via SFTP, check:
- `/error_log`
- `/wp-content/debug.log`
- Strato panel → Logs section

---

## 📋 Troubleshooting Checklist

Als je vastloopt, werk deze lijst af:

### Level 1: Basic Checks
- [ ] Correct database geïmporteerd? (check timestamps)
- [ ] URLs updated? (check wp_options siteurl/home)
- [ ] Logged in met correcte credentials?
- [ ] Browser cache cleared?
- [ ] Permalinks flushed? (Settings → Permalinks → Save)

### Level 2: Database Integrity
- [ ] Import 100% voltooid? (geen timeout errors)
- [ ] Character set correct? (UTF-8 / utf8mb4)
- [ ] All tables aanwezig? (wp_posts, wp_options, etc.)
- [ ] Table sizes logisch? (compare met source)
- [ ] No duplicate data? (run duplicate queries)

### Level 3: WordPress Configuration
- [ ] wp-config.php correct? (database credentials)
- [ ] Auth keys regenerated?
- [ ] Plugins compatible? (staging vs production)
- [ ] Theme active and present?
- [ ] Rewrite rules regenerated?

### Level 4: Advanced Debugging
- [ ] WP_DEBUG enabled?
- [ ] Error logs checked?
- [ ] PHP version compatible?
- [ ] MySQL version compatible?
- [ ] Serialized data intact? (use Better Search Replace)

### Level 5: Nuclear Option
- [ ] Backup current state
- [ ] Truncate all tables
- [ ] Re-import from source
- [ ] Follow checklist from start

---

## 🆘 Emergency Recovery

Als alles faalt en site is down:

### Production Emergency Recovery

1. **Access phpMyAdmin** via Strato panel
2. **Truncate all tables**:
```sql
SET FOREIGN_KEY_CHECKS = 0;
-- Drop all wp_ tables
SET FOREIGN_KEY_CHECKS = 1;
```

3. **Import laatste werkende backup**:
   - Bestandsnaam: `production-backup-BEFORE-SYNC-YYYYMMDD.sql`
   - Import via phpMyAdmin
   - Wacht tot 100% compleet

4. **Verify site werkt**:
   - Bezoek homepage
   - Bezoek wp-admin
   - Test belangrijkste features

5. **Analyse wat er mis ging**:
   - Check error logs
   - Review sync procedure
   - Update documentatie met learnings

### Staging Emergency Recovery

Minder kritiek - kan altijd fresh sync doen van production:

1. Re-sync van production → staging (zie main guide)
2. Of restore van laatste staging backup

### Development Emergency Recovery

Simpelste - destroy en rebuild:

```bash
# Nuclear option
npm run wp-env destroy

# Fresh start
npm run wp-env start

# Re-import fresh production data
npm run wp-env run cli wp db import production-backup-latest.sql
npm run wp-env run cli wp search-replace 'https://wp-base.rutgerthus.nl' 'http://localhost:8888'
```

---

## 📚 Additional Resources

### WordPress Codex
- Database Description: https://codex.wordpress.org/Database_Description
- Moving WordPress: https://wordpress.org/support/article/moving-wordpress/

### Tools
- Better Search Replace: https://wordpress.org/plugins/better-search-replace/
- Search Replace DB: https://github.com/interconnectit/Search-Replace-DB
- BigDump: http://www.ozerov.de/bigdump/

### SQL Tutorials
- phpMyAdmin Docs: https://docs.phpmyadmin.net/
- MySQL Search Replace: https://dev.mysql.com/doc/refman/8.0/en/replace.html

---

**Document versie**: 1.0
**Laatst bijgewerkt**: 2025-01-26
**Auteur**: Claude Code

Voor main setup guide, zie: `docs/DATABASE-SYNC.md`
