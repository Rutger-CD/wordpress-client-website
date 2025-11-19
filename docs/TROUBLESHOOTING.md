# Troubleshooting Guide

Complete oplossingen voor veelvoorkomende problemen bij WordPress blocks en patterns development.

## Inhoudsopgave

- [Blocks Issues](#blocks-issues)
- [Patterns Issues](#patterns-issues)
- [Build Issues](#build-issues)
- [WordPress Issues](#wordpress-issues)
- [Development Environment](#development-environment)

---

## Blocks Issues

### Issue #1: Blocks niet zichtbaar in editor

**Symptomen:**
- Custom blocks verschijnen niet in de block inserter
- Block categorie "Client Website - Blocks" is leeg
- Geen errors in console

**Root Cause:**
Blocks zijn niet correct gebouwd of de JavaScript wordt niet geladen.

**Diagnose Steps:**

```bash
# 1. Check of block.json bestaat
ls blocks/my-block/block.json

# 2. Check of build output bestaat
ls blocks/build/my-block/index.js
ls blocks/build/my-block/index.asset.php

# 3. Verifieer block registratie in WordPress
npx @wordpress/env run cli wp eval "print_r(array_keys(WP_Block_Type_Registry::get_instance()->get_all_registered()));" | grep client-website

# 4. Check block category
grep "category" blocks/my-block/block.json
```

**Oplossing:**

```bash
# Stap 1: Rebuild blocks
cd blocks/
npm run build

# Stap 2: Verifieer editorScript path in block.json
# Moet zijn: "file:../build/my-block/index.js"
cat blocks/my-block/block.json | grep editorScript

# Stap 3: Check webpack config
cat blocks/webpack.config.js | grep my-block

# Stap 4: Flush WordPress cache
npx @wordpress/env run cli wp cache flush

# Stap 5: Restart WordPress
npx @wordpress/env restart

# Stap 6: Hard refresh browser
# Chrome: Ctrl + Shift + R
```

**Verificatie:**

```bash
# Block moet nu zichtbaar zijn
npx @wordpress/env run cli wp eval "print_r(WP_Block_Type_Registry::get_instance()->get_registered('client-website/my-block'));"
```

---

### Issue #2: "Block contains unexpected or invalid content"

**Symptomen:**
- Block geeft validation error in editor
- "Attempt Block Recovery" button verschijnt
- Block kan niet correct worden geopend

**Root Cause:**
De HTML output in `save.js` matcht niet met de opgeslagen content in de database. Dit gebeurt wanneer:
- `save.js` is gewijzigd na blocks zijn toegevoegd
- HTML structuur is veranderd
- Class names zijn aangepast
- Pattern heeft verkeerde HTML

**Diagnose:**

```bash
# 1. Check de save.js file
cat blocks/my-block/save.js

# 2. Check of block recent is gerebuild
ls -lt blocks/build/my-block/index.js

# 3. Inspect HTML in WordPress database
npx @wordpress/env run cli wp post list --post_type=page --fields=ID,post_title
npx @wordpress/env run cli wp post get <POST_ID> --field=post_content
```

**Oplossing A - Rebuild block:**

```bash
# 1. Rebuild blocks
cd blocks/
npm run build

# 2. Flush cache
npx @wordpress/env run cli wp cache flush

# 3. Hard refresh browser
# Ctrl + Shift + R

# 4. In WordPress: Klik "Attempt Block Recovery"
```

**Oplossing B - Fix save.js:**

Als de HTML structuur bewust is gewijzigd:

```javascript
// blocks/my-block/save.js

// VOOR (oude structuur):
return (
    <div className="my-block">
        <h2>{attributes.heading}</h2>
    </div>
);

// NA (nieuwe structuur):
return (
    <section className="my-block">
        <div className="my-block__container">
            <h2 className="my-block__heading">{attributes.heading}</h2>
        </div>
    </section>
);
```

Dan moet je:
1. Rebuild block
2. ALLE pagina's met deze block updaten
3. Of: Maak een deprecation in `block.json`

**Oplossing C - Fix pattern:**

Als error komt van een pattern:

```php
<!-- FOUT: HTML matcht niet met save.js -->
<div class="my-block">
    <h3>{heading}</h3>  <!-- Verkeerde element! -->
</div>

<!-- CORRECT: Exact zoals save.js -->
<div class="my-block">
    <h2 class="my-block__heading">My Heading</h2>
</div>
```

---

### Issue #3: Block changes niet zichtbaar na rebuild

**Symptomen:**
- Block is gerebuild maar changes verschijnen niet
- Oude versie van block wordt nog steeds getoond
- Console toont geen errors

**Root Cause:**
Caching op meerdere levels:
- WordPress object cache
- Browser cache
- Service worker cache
- PHP opcache

**Oplossing:**

```bash
# 1. Rebuild blocks
cd blocks/
npm run build

# 2. Flush WordPress cache
npx @wordpress/env run cli wp cache flush

# 3. Restart WordPress (cached PHP files)
npx @wordpress/env restart

# 4. Clear browser cache
# - Open DevTools (F12)
# - Right-click refresh button → "Empty Cache and Hard Reload"
# - Of: Ctrl + Shift + R

# 5. Check build timestamp
ls -lt blocks/build/my-block/index.js

# 6. Verify new version is loaded
# In browser DevTools → Network tab
# Find: my-block/index.js
# Check timestamp/size
```

**Prevention:**

```bash
# Development: Use watch mode
cd blocks/
npm run start  # Auto-rebuild bij changes
```

---

### Issue #4: JavaScript errors in console

**Error: "wp is not defined"**

**Root Cause:**
WordPress script dependencies niet correct geladen.

**Oplossing:**

```bash
# 1. Check index.asset.php
cat blocks/build/my-block/index.asset.php

# Moet bevatten:
# 'dependencies' => array('react', 'wp-blocks', 'wp-element', ...)

# 2. Als leeg of verkeerd: Rebuild
cd blocks/
rm -rf build/
npm run build

# 3. Verifieer dependencies
cat blocks/build/my-block/index.asset.php
```

**Error: "registerBlockType is not a function"**

**Root Cause:**
Verkeerde import in `index.js`.

**Oplossing:**

```javascript
// blocks/my-block/index.js

// ❌ FOUT
import registerBlockType from '@wordpress/blocks';

// ✅ CORRECT
import { registerBlockType } from '@wordpress/blocks';
```

**Error: "Cannot read property 'X' of undefined"**

**Root Cause:**
Attribute heeft geen default value.

**Oplossing:**

```json
// blocks/my-block/block.json
{
    "attributes": {
        "heading": {
            "type": "string",
            "default": "Default Heading"  // ✅ Altijd een default!
        }
    }
}
```

---

## Patterns Issues

### Issue #5: "Block contains unexpected or invalid content" in patterns

**Symptomen:**
- Pattern toevoegen geeft validation error
- "This block contains unexpected or invalid content"
- Pattern werkte eerst wel, nu niet meer

**Root Cause:**
Pattern gebruikt self-closing syntax of HTML matcht niet met block's save.js.

**Verkeerde Syntax:**

```php
<!-- ❌ FOUT: Self-closing tag -->
<!-- wp:client-website/hero {"variant":"gradient"} /-->

<!-- ❌ FOUT: Geen HTML output -->
<!-- wp:client-website/hero {"variant":"gradient"} -->
<!-- /wp:client-website/hero -->

<!-- ❌ FOUT: Verkeerde HTML -->
<!-- wp:client-website/hero {"variant":"gradient"} -->
<div class="hero">  <!-- Verkeerde class! -->
    <h1>Title</h1>
</div>
<!-- /wp:client-website/hero -->
```

**Correcte Syntax:**

```php
<!-- ✅ CORRECT: Volledige markup met attributes + HTML -->
<!-- wp:client-website/hero {"heading":"Welcome","variant":"gradient","alignment":"center"} -->
<div class="wp-block-client-website-hero hero hero--gradient hero--center">
    <div class="hero__container">
        <div class="hero__content">
            <h1 class="hero__heading">Welcome</h1>
        </div>
    </div>
</div>
<!-- /wp:client-website/hero -->
```

**Hoe correcte markup krijgen:**

```bash
# Methode 1: WordPress Editor
# 1. Maak test pagina
# 2. Voeg block toe en configureer
# 3. Klik ⋮ → "Copy"
# 4. Plak in pattern file

# Methode 2: Inspect save.js
cat blocks/my-block/save.js
# Kopieer de return() HTML
# Replace {attributes.X} met actual values
```

---

### Issue #6: Pattern niet zichtbaar in WordPress

**Symptomen:**
- Pattern bestand bestaat maar verschijnt niet
- Categorie "Client Website - Patterns" is leeg

**Diagnose:**

```bash
# 1. Check pattern file
ls patterns/my-pattern.php

# 2. Check header syntax
head -n 10 patterns/my-pattern.php

# 3. Check category registration in functions.php
grep "client-website-patterns" functions.php
```

**Oplossing:**

```php
// 1. Verifieer pattern header
<?php
/**
 * Title: My Pattern Name         ← Verplicht
 * Slug: client-website/my-pattern  ← Verplicht, uniek
 * Categories: client-website-patterns  ← Correct category
 * Description: Pattern description  ← Optioneel
 */
?>

// 2. Check category registratie in functions.php
function client_website_register_patterns() {
    register_block_pattern_category(
        'client-website-patterns',  // ← Moet matchen met pattern
        ['label' => __('Client Website - Patterns', 'client-website')]
    );
}
add_action('init', 'client_website_register_patterns');

// 3. Flush cache
```

```bash
npx @wordpress/env run cli wp cache flush
```

---

## Build Issues

### Issue #7: npm run build fails

**Error: "Cannot find module '@wordpress/scripts'"**

**Oplossing:**

```bash
cd blocks/
npm install
npm run build
```

**Error: "EACCES: permission denied"**

**Oplossing (Windows):**

```bash
# Run as Administrator
# Of: Check file permissions

# Als het blijft falen:
cd blocks/
rm -rf node_modules/
rm package-lock.json
npm install
npm run build
```

**Error: "Webpack config not found"**

**Oplossing:**

```bash
# 1. Check of webpack.config.js bestaat
ls blocks/webpack.config.js

# 2. Als niet: Maak aan
cat > blocks/webpack.config.js << 'EOF'
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		'hero/index': path.resolve(__dirname, 'hero', 'index.js'),
		// Add other blocks here
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'build'),
	},
};
EOF

# 3. Rebuild
npm run build
```

---

### Issue #8: Build succeeds maar geen output

**Symptomen:**
- `npm run build` geeft geen errors
- Maar `blocks/build/` is leeg of ontbreekt

**Diagnose:**

```bash
# 1. Check build output
ls blocks/build/

# 2. Check webpack config entries
cat blocks/webpack.config.js | grep entry

# 3. Run build with verbose output
cd blocks/
npm run build -- --verbose
```

**Oplossing:**

```javascript
// webpack.config.js - Verifieer entry points
module.exports = {
	...defaultConfig,
	entry: {
		'my-block/index': path.resolve(__dirname, 'my-block', 'index.js'),
		// ⚠️ Path moet kloppen met directory naam!
	},
};
```

---

## WordPress Issues

### Issue #9: Theme not activating

**Symptomen:**
- "Stylesheet is missing" error
- "Template is missing" error

**Oplossing:**

```bash
# 1. Verifieer vereiste bestanden
ls style.css      # Moet bestaan
ls index.php      # Moet bestaan

# 2. Check style.css header
head -n 15 style.css

# Moet bevatten:
/*
Theme Name: Client Website
...
*/

# 3. Als bestanden ontbreken: Maak aan
```

---

### Issue #10: Blocks registered maar niet geladen

**Symptomen:**
- `wp eval` toont blocks
- Maar blocks niet zichtbaar in editor

**Diagnose:**

```bash
# 1. Check block registratie
npx @wordpress/env run cli wp eval "print_r(WP_Block_Type_Registry::get_instance()->get_registered('client-website/my-block'));"

# 2. Check editor script handle
npx @wordpress/env run cli wp eval "\$block = WP_Block_Type_Registry::get_instance()->get_registered('client-website/my-block'); print_r(\$block->editor_script);"

# Output moet zijn: client-website-my-block-editor-script
```

**Oplossing:**

```bash
# 1. Check block.json editorScript path
cat blocks/my-block/block.json | grep editorScript

# Moet zijn:
"editorScript": "file:../build/my-block/index.js"

# 2. Verifieer build bestand bestaat
ls blocks/build/my-block/index.js

# 3. Rebuild indien nodig
cd blocks/ && npm run build

# 4. Restart WordPress
npx @wordpress/env restart
```

---

## Development Environment

### Issue #11: wp-env not starting

**Error: "Docker is not running"**

**Oplossing:**

```bash
# 1. Start Docker Desktop
# (Windows: Zoek "Docker Desktop" in Start menu)

# 2. Wait for Docker to fully start

# 3. Verify Docker is running
docker ps

# 4. Start wp-env
npx @wordpress/env start
```

**Error: "Port 8888 already in use"**

**Oplossing:**

```bash
# Option 1: Stop andere service op port 8888
# Windows: netstat -ano | findstr :8888
# Kill process: taskkill /PID <process-id> /F

# Option 2: Change port in .wp-env.json
```

```json
{
	"port": 8889,  // Use different port
	// ... rest of config
}
```

```bash
npx @wordpress/env start
```

---

### Issue #12: Changes niet zichtbaar in wp-env

**Symptomen:**
- Code wijzigingen verschijnen niet
- Oude bestanden worden nog steeds gebruikt

**Oplossing:**

```bash
# 1. Rebuild blocks
cd blocks/ && npm run build

# 2. Flush WordPress cache
npx @wordpress/env run cli wp cache flush

# 3. Restart wp-env (reloads all files)
npx @wordpress/env restart

# 4. Hard refresh browser
# Ctrl + Shift + R
```

---

### Issue #13: Block styling ontbreekt (geen CSS)

**Symptomen:**
- Blocks zijn zichtbaar maar hebben geen styling
- Buttons, cards, hero sections tonen als plain HTML
- Console toont 404 errors voor CSS files zoals `design-tokens.css`, `hero.css`, etc.

**Root Cause:**
CSS files gebruiken `@import` statements die niet werken in WordPress omdat:
1. WordPress laadt CSS via `wp_enqueue_style()` met absolute URLs
2. `@import` gebruikt relatieve paths die WordPress niet kan resolven
3. Browser kan imported files niet vinden → 404 errors

**Diagnose Steps:**

```bash
# 1. Check browser console voor 404 errors
# Open DevTools (F12) → Console tab
# Look for: "Failed to load resource: 404" voor .css files

# 2. Check welke CSS files @import gebruiken
grep -r "@import" blocks/ components/ --include="*.css"

# 3. Check of base styles worden geladen
# In browser DevTools → Network tab → Filter: CSS
# Zoek naar: variables.css, reset.css
```

**Oplossing:**

**Stap 1: Verwijder @import uit block CSS files**

```bash
# Run fix script
node fix-block-css-imports.js
```

Of handmatig:

```css
/* blocks/button/style.css - VOOR */
@import "../../components/button/button.css";

.button-block {
    display: flex;
}

/* blocks/button/style.css - NA */
/* Component styles worden geladen via functions.php */

.button-block {
    display: flex;
}
```

**Stap 2: Inline design tokens in variables.css**

```bash
# Kopieer design tokens naar variables.css
cp brand-guide/design-tokens.css components/_base/variables.css
```

Of handmatig:

```css
/* components/_base/variables.css - VOOR */
@import url('../../brand-guide/design-tokens.css');

:root {
  /* Component variables */
}

/* components/_base/variables.css - NA */
/* Alle design tokens inline */
:root {
  --color-primary-500: #0ea5e9;
  --spacing-4: 1rem;
  /* ... rest van tokens */
}
```

**Stap 3: Verifieer functions.php laadt alle styles**

```php
// functions.php - Check deze hooks bestaan
add_action('wp_enqueue_scripts', 'client_website_enqueue_base_styles', 1);
add_action('enqueue_block_editor_assets', 'client_website_enqueue_base_styles', 1);
add_action('admin_enqueue_scripts', 'client_website_enqueue_base_styles', 1);

add_action('wp_enqueue_scripts', 'client_website_enqueue_component_styles', 5);
add_action('enqueue_block_editor_assets', 'client_website_enqueue_component_styles', 5);
add_action('admin_enqueue_scripts', 'client_website_enqueue_component_styles', 5);
```

**Verificatie:**

```bash
# 1. Check geen @import meer
grep -r "@import" blocks/ components/ --include="*.css"
# Should only show comments

# 2. Test in browser
# - Hard refresh (Ctrl+Shift+R)
# - DevTools → Console: Geen 404 errors
# - DevTools → Network → CSS: Alle files 200 OK
# - Blocks hebben nu styling
```

**Waarom deze aanpak:**

1. **Base styles eerst** (priority 1): CSS variabelen beschikbaar maken
2. **Component styles daarna** (priority 5): Styling voor components laden
3. **Block styles automatisch** (via block.json): Block-specifieke styling
4. **Geen @import**: Alle CSS direct via WordPress enqueueing

---

## Quick Diagnostics Checklist

Gebruik deze checklist voor nieuwe issues:

```bash
# ✅ 1. Check build output exists
ls -la blocks/build/my-block/

# ✅ 2. Check webpack config
grep "my-block" blocks/webpack.config.js

# ✅ 3. Check functions.php registration
grep "my-block" functions.php

# ✅ 4. Check block.json paths
cat blocks/my-block/block.json | grep "Script\|Style"

# ✅ 5. Verify WordPress registration
npx @wordpress/env run cli wp eval "print_r(array_keys(WP_Block_Type_Registry::get_instance()->get_all_registered()));" | grep client-website

# ✅ 6. Check browser console for errors
# Open DevTools (F12) → Console tab

# ✅ 7. Check Network tab for 404s
# Open DevTools (F12) → Network tab
# Filter: JS, CSS

# ✅ 8. Flush all caches
npx @wordpress/env run cli wp cache flush
npx @wordpress/env restart
# Browser: Ctrl + Shift + R
```

---

## Common Solutions Summary

| Issue | Quick Fix |
|-------|----------|
| Blocks niet zichtbaar | `cd blocks && npm run build && npx @wordpress/env run cli wp cache flush` |
| Pattern validation error | Check save.js output, verifieer HTML matcht |
| Build fails | `cd blocks && rm -rf node_modules && npm install` |
| Changes niet zichtbaar | Rebuild + flush cache + restart wp-env + hard refresh |
| JavaScript errors | Check console, verifieer dependencies in .asset.php |
| wp-env issues | Restart Docker, check port conflicts |

---

## Getting Help

Als probleem blijft bestaan na troubleshooting:

1. **Check documentation:**
   - [BLOCKS-DEVELOPMENT.md](./BLOCKS-DEVELOPMENT.md)
   - [PATTERNS-DEVELOPMENT.md](./PATTERNS-DEVELOPMENT.md)
   - [LOCAL-DEVELOPMENT.md](./LOCAL-DEVELOPMENT.md)

2. **Collect diagnostics:**
   ```bash
   # Run all diagnostic commands
   # Copy output
   ```

3. **Check WordPress logs:**
   ```bash
   npx @wordpress/env run cli wp eval "error_log('Debug test');"
   npx @wordpress/env logs
   ```

4. **Check browser console:**
   - Open DevTools (F12)
   - Console tab
   - Network tab
   - Screenshot errors

5. **WordPress Block Editor Handbook:**
   - https://developer.wordpress.org/block-editor/

---

**Nieuw probleem?** Voeg toe aan deze guide voor toekomstige referentie!
