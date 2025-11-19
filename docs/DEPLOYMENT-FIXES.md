# Deployment Fixes & Lessons Learned

Documentatie van belangrijke fixes die zijn toegepast tijdens de eerste deployment naar Strato hosting.

## Datum: 18 November 2024

### Probleem 1: Verkeerde WordPress installatie directory

**Symptoom:**
- Theme geüpload maar niet zichtbaar in WordPress admin
- Alle files stonden op de server maar WordPress detecteerde ze niet

**Root Cause:**
- WordPress is geïnstalleerd door Strato's 1-click installer
- Installatie staat in `/STRATO-apps/wordpress_01/app` (staging)
- Installatie staat in `/STRATO-apps/wordpress_02/app` (production)
- Onze scripts uploadden naar `/wp-base-stg` en `/wp-base`

**Oplossing:**
```env
# .env - VOOR
STAGING_PATH=/wp-base-stg
PRODUCTION_PATH=/wp-base

# .env - NA
STAGING_PATH=/STRATO-apps/wordpress_01/app
PRODUCTION_PATH=/STRATO-apps/wordpress_02/app
```

**Lesson Learned:**
Altijd eerst de exacte WordPress installatie directory verifiëren voordat je begint met deployment.

---

### Probleem 2: CSS @import statements werken niet

**Symptoom:**
- Blocks waren zichtbaar maar volledig ongesty LED
- Browser console toonde 404 errors voor CSS files:
  - `design-tokens.css: 404`
  - `hero.css: 404`
  - `button.css: 404`

**Root Cause:**
WordPress laadt CSS via `wp_enqueue_style()` met absolute URLs. CSS files gebruikten `@import` met relatieve paths die de browser niet kan resolven:

```css
/* blocks/button/style.css */
@import "../../components/button/button.css";
```

Wanneer WordPress `style.css` laadt als:
```
https://site.nl/wp-content/themes/client-website/blocks/button/style.css
```

Probeert de browser `button.css` te laden vanaf:
```
https://site.nl/wp-content/themes/client-website/components/button/button.css
```

Maar omdat de `@import` vanuit de CSS context werkt, niet vanuit WordPress, faalt dit.

**Oplossing:**

**Stap 1: Verwijder alle @import uit block CSS**

```bash
# Automated fix
node fix-block-css-imports.js
```

Of handmatig alle `@import` regels verwijderen uit:
- `blocks/*/style.css`
- `blocks/*/editor.css`

**Stap 2: Inline design tokens**

```bash
cp brand-guide/design-tokens.css components/_base/variables.css
```

**Stap 3: Laad component styles via functions.php**

```php
// functions.php
function client_website_enqueue_component_styles() {
    $components = ['button', 'card', 'hero', 'content-section'];

    foreach ($components as $component) {
        $css_path = get_template_directory() . "/components/{$component}/{$component}.css";

        if (file_exists($css_path)) {
            wp_enqueue_style(
                "client-website-{$component}",
                get_template_directory_uri() . "/components/{$component}/{$component}.css",
                ['client-website-variables'],
                '1.0.0'
            );
        }
    }
}

// Load op ALLE admin pages (niet alleen wp_enqueue_scripts)
add_action('wp_enqueue_scripts', 'client_website_enqueue_component_styles', 5);
add_action('enqueue_block_editor_assets', 'client_website_enqueue_component_styles', 5);
add_action('admin_enqueue_scripts', 'client_website_enqueue_component_styles', 5);
```

**Lesson Learned:**
- Gebruik NOOIT `@import` in WordPress theme CSS files
- Laad alle styles via `wp_enqueue_style()`
- Test op een live server, niet alleen lokaal (wp-env gedraagt zich anders)

---

### Probleem 3: Theme cache niet automatisch refreshed

**Symptoom:**
- Theme files geüpload maar WordPress toont theme niet
- Hard refresh (Ctrl+Shift+R) helpt niet
- Theme staat wel op FTP

**Root Cause:**
WordPress cached de lijst van beschikbare themes in transients. Na FTP upload worden deze transients niet automatisch gecleared.

**Oplossing:**

**Optie A: WP-CLI (als je SSH access hebt)**
```bash
wp transient delete theme_roots
wp cache flush
```

**Optie B: WordPress Plugin (bij Strato zonder SSH)**

Maak `theme-refresher-plugin.php`:
```php
<?php
/**
 * Plugin Name: Theme Cache Refresher
 * Description: Clears theme cache and forces WordPress to detect new themes
 */

add_action('admin_menu', 'tcr_add_admin_menu');

function tcr_add_admin_menu() {
    add_management_page(
        'Theme Refresher',
        'Theme Refresher',
        'manage_options',
        'theme-refresher',
        'tcr_admin_page'
    );
}

function tcr_admin_page() {
    if (isset($_POST['refresh_themes'])) {
        delete_transient('theme_roots');
        delete_site_transient('theme_roots');
        delete_transient('update_themes');
        delete_site_transient('update_themes');
        search_theme_directories(true);
        wp_cache_delete('themes', 'themes');

        echo '<div class="notice notice-success"><p>✅ Theme cache cleared!</p></div>';
    }

    ?>
    <div class="wrap">
        <h1>Theme Cache Refresher</h1>
        <form method="post">
            <button type="submit" name="refresh_themes" class="button button-primary">
                🔄 Refresh Theme List
            </button>
        </form>
    </div>
    <?php
}
```

Upload naar: `/wp-content/plugins/theme-refresher/theme-refresher.php`

**Lesson Learned:**
- Altijd een cache clearing mechanisme hebben voor shared hosting
- Theme Cache Refresher plugin is handig voor toekomstige deployments

---

## Best Practices voor Toekomstige Deployments

### ✅ Checklist voor Deployment

**VOOR deployment:**
1. Verifieer WordPress installatie directory op server
2. Check `.env` bestand bevat correcte paths
3. Test build proces lokaal
4. Verwijder alle `@import` statements uit CSS
5. Inline critical CSS (zoals design-tokens)

**NA deployment:**
1. Clear WordPress theme cache (via plugin of WP-CLI)
2. Hard refresh browser (Ctrl+Shift+R)
3. Check browser console voor errors (404's, JavaScript errors)
4. Test alle blocks in editor
5. Test frontend rendering

### 🔧 Deployment Scripts

De volgende scripts zijn beschikbaar voor manuele deployment:

```bash
# Deploy theme naar staging
node deploy-theme-staging.js

# Deploy alle blocks (met build files)
node deploy-blocks-complete.js

# Fix CSS @import issues
node fix-block-css-imports.js
```

### 📝 Strato-Specifieke Informatie

**WordPress Directories:**
- Staging: `/STRATO-apps/wordpress_01/app`
- Production: `/STRATO-apps/wordpress_02/app`

**SFTP Access:**
- Host: `ssh.strato.com`
- Port: `22`
- User: `sftp_claude@craftdigital.nl`

**Database Hosts:**
- Staging: `database-5019035203.webspace-host.com`
- Production: `database-5019035225.webspace-host.com`

**Belangrijke notities:**
- Geen SSH/shell access op Strato shared hosting
- WordPress geïnstalleerd via Strato's 1-click installer
- FTP/SFTP is de enige manier om files te uploaden
- Database is alleen toegankelijk vanuit WordPress PHP scripts

---

## Conclusie

De eerste deployment naar Strato hosting was succesvol na het oplossen van:
1. ✅ Verkeerde WordPress directory paths
2. ✅ CSS @import issues
3. ✅ Theme cache problemen

Alle blocks zijn nu volledig functioneel op staging met correcte styling. Deze fixes zijn gedocumenteerd voor toekomstige reference en zullen worden toegepast op de production deployment.

**Volgende stappen:**
1. Synchroniseer fixes naar lokale development omgeving
2. Update GitHub Actions workflows met correcte paths
3. Configureer GitHub Secrets
4. Test automated deployment pipeline
