# WordPress Blocks Development Guide

Complete gids voor het ontwikkelen, builden en troubleshooten van custom WordPress Gutenberg blocks.

## Inhoudsopgave

- [Overzicht](#overzicht)
- [Block Structuur](#block-structuur)
- [Nieuwe Block Maken](#nieuwe-block-maken)
- [Build Proces](#build-proces)
- [Block Registratie](#block-registratie)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## Overzicht

Dit project gebruikt custom Gutenberg blocks gebouwd met `@wordpress/scripts`. Alle blocks worden gebundeld met webpack en geregistreerd via `functions.php`.

### Huidige Blocks (5)

1. **Hero Block** - Hero sectie met gradient, heading, beschrijving en dual CTAs
2. **Content Section** - Flexibele content wrapper met InnerBlocks support
3. **Button Block** - Customizable button (6 variants, 3 sizes)
4. **Card Grid** - Responsive grid van cards (2-4 kolommen)
5. **CTA Section** - Call-to-action sectie met gradient achtergrond

### Tech Stack

- **Build Tool**: `@wordpress/scripts` (webpack, babel, postcss)
- **Block API**: WordPress Block API v3
- **React**: Voor block editor components
- **CSS**: Component-based styling met design tokens

---

## Block Structuur

Elke block heeft de volgende bestanden:

```
blocks/
└── block-name/
    ├── block.json          # Block metadata en configuratie
    ├── index.js            # Entry point - registreert de block
    ├── edit.js             # Editor component (React)
    ├── save.js             # Frontend output (React -> HTML)
    ├── style.css           # Frontend styling
    └── editor.css          # Editor-only styling
```

### Gebouwde Bestanden (na build)

```
blocks/build/
└── block-name/
    ├── index.js            # Gebundelde JavaScript
    ├── index.asset.php     # Auto-generated dependencies
    ├── index.css           # Gebundelde editor styles
    ├── style-index.css     # Gebundelde frontend styles
    └── *.rtl.css          # RTL stylesheets
```

---

## Nieuwe Block Maken

### Stap 1: Directory Structuur Aanmaken

```bash
cd blocks/
mkdir my-new-block
cd my-new-block
```

### Stap 2: block.json Aanmaken

**`blocks/my-new-block/block.json`**

```json
{
	"$schema": "https://schemas.wp.org/trunk/block.json",
	"apiVersion": 3,
	"name": "client-website/my-new-block",
	"version": "1.0.0",
	"title": "My New Block",
	"category": "client-website-blocks",
	"icon": "admin-customizer",
	"description": "Description van je nieuwe block",
	"keywords": ["keyword1", "keyword2"],
	"textdomain": "client-website",
	"supports": {
		"html": false,
		"align": ["wide", "full"],
		"spacing": {
			"margin": true,
			"padding": true
		}
	},
	"attributes": {
		"heading": {
			"type": "string",
			"default": "Default heading"
		},
		"content": {
			"type": "string",
			"default": "Default content"
		}
	},
	"editorScript": "file:../build/my-new-block/index.js",
	"editorStyle": "file:./editor.css",
	"style": "file:./style.css"
}
```

**Belangrijke velden:**

- `name`: Moet starten met `client-website/`
- `category`: Gebruik altijd `client-website-blocks`
- `editorScript`: Verwijst naar **build directory** (`../build/my-new-block/index.js`)
- `attributes`: Definieer alle block instellingen hier

### Stap 3: index.js - Entry Point

**`blocks/my-new-block/index.js`**

```javascript
/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Register My New Block
 */
registerBlockType( metadata.name, {
	...metadata,
	edit,
	save,
} );
```

### Stap 4: edit.js - Editor Component

**`blocks/my-new-block/edit.js`**

```javascript
/**
 * WordPress dependencies
 */
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Edit component - Wordt getoond in de WordPress editor
 */
export default function Edit( { attributes, setAttributes } ) {
	const { heading, content } = attributes;
	const blockProps = useBlockProps();

	return (
		<>
			{/* Sidebar Controls */}
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'client-website' ) }>
					<TextControl
						label={ __( 'Custom Setting', 'client-website' ) }
						value={ attributes.customSetting }
						onChange={ ( value ) => setAttributes( { customSetting: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			{/* Block Content */}
			<div { ...blockProps }>
				<RichText
					tagName="h2"
					className="my-new-block__heading"
					value={ heading }
					onChange={ ( value ) => setAttributes( { heading: value } ) }
					placeholder={ __( 'Enter heading...', 'client-website' ) }
				/>
				<RichText
					tagName="p"
					className="my-new-block__content"
					value={ content }
					onChange={ ( value ) => setAttributes( { content: value } ) }
					placeholder={ __( 'Enter content...', 'client-website' ) }
				/>
			</div>
		</>
	);
}
```

### Stap 5: save.js - Frontend Output

**`blocks/my-new-block/save.js`**

```javascript
/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Save component - Output die in de database wordt opgeslagen
 *
 * BELANGRIJK: Deze output moet EXACT matchen met de HTML in patterns!
 */
export default function save( { attributes } ) {
	const { heading, content } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'my-new-block',
	} );

	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="h2"
				className="my-new-block__heading"
				value={ heading }
			/>
			<RichText.Content
				tagName="p"
				className="my-new-block__content"
				value={ content }
			/>
		</div>
	);
}
```

### Stap 6: CSS Styling

**`blocks/my-new-block/style.css`** - Frontend styling

```css
/* Frontend styling - wordt geladen op de website */
.my-new-block {
	padding: var(--spacing-large);
	background: var(--color-background);
}

.my-new-block__heading {
	font-size: var(--font-size-2xl);
	font-weight: var(--font-weight-bold);
	margin-bottom: var(--spacing-medium);
}

.my-new-block__content {
	font-size: var(--font-size-base);
	line-height: var(--line-height-relaxed);
}
```

**`blocks/my-new-block/editor.css`** - Editor-only styling

```css
/* Editor styling - alleen in de WordPress editor */
.wp-block-client-website-my-new-block {
	border: 2px dashed var(--color-border);
	padding: var(--spacing-medium);
}
```

### Stap 7: Webpack Config Updaten

**`blocks/webpack.config.js`**

```javascript
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
	...defaultConfig,
	entry: {
		'hero/index': path.resolve(__dirname, 'hero', 'index.js'),
		'content-section/index': path.resolve(__dirname, 'content-section', 'index.js'),
		'button/index': path.resolve(__dirname, 'button', 'index.js'),
		'card-grid/index': path.resolve(__dirname, 'card-grid', 'index.js'),
		'cta-section/index': path.resolve(__dirname, 'cta-section', 'index.js'),
		// VOEG NIEUWE BLOCK TOE:
		'my-new-block/index': path.resolve(__dirname, 'my-new-block', 'index.js'),
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'build'),
	},
};
```

### Stap 8: Block Registreren in functions.php

**`functions.php`**

```php
function client_website_register_blocks() {
    $blocks = [
        'hero',
        'content-section',
        'card-grid',
        'button',
        'cta-section',
        'my-new-block',  // VOEG TOE
    ];

    foreach ($blocks as $block) {
        register_block_type(__DIR__ . '/blocks/' . $block);
    }
}
add_action('init', 'client_website_register_blocks');
```

---

## Build Proces

### Blocks Builden

**Eenmalig builden:**
```bash
cd blocks/
npm run build
```

**Development mode (auto-rebuild bij changes):**
```bash
cd blocks/
npm run start
```

### Wat gebeurt er tijdens de build?

1. **Webpack bundelt alle JavaScript** van `blocks/*/index.js` → `blocks/build/*/index.js`
2. **Babel transpileert ES6+ naar browser-compatible JavaScript**
3. **PostCSS verwerkt CSS** en genereert RTL stylesheets
4. **Auto-generated .asset.php** bestanden met dependencies:
   ```php
   <?php return array(
       'dependencies' => array('react', 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n'),
       'version' => '379ba2c3b415a9101e80'
   );
   ```

### Build Output Structuur

```
blocks/build/
├── my-new-block/
│   ├── index.js              # Gebundelde JavaScript (minified)
│   ├── index.asset.php       # Dependencies array
│   ├── index.css             # Editor styles
│   ├── index-rtl.css         # Editor RTL styles
│   ├── style-index.css       # Frontend styles
│   └── style-index-rtl.css   # Frontend RTL styles
```

---

## Block Registratie

WordPress blocks worden automatisch geregistreerd via `functions.php`:

```php
/**
 * Register Custom Gutenberg Blocks
 */
function client_website_register_blocks() {
    $blocks = [
        'hero',
        'content-section',
        'card-grid',
        'button',
        'cta-section'
    ];

    foreach ($blocks as $block) {
        // Registreert block via block.json
        register_block_type(__DIR__ . '/blocks/' . $block);
    }
}
add_action('init', 'client_website_register_blocks');
```

### Hoe het werkt:

1. `register_block_type()` leest `blocks/my-block/block.json`
2. Laadt de `editorScript` vanuit `blocks/build/my-block/index.js`
3. Laadt de bijbehorende `.asset.php` voor dependencies
4. Registreert alle attributes, supports en metadata
5. Block is nu beschikbaar in de WordPress editor

---

## Troubleshooting

### Probleem 1: Block niet zichtbaar in editor

**Symptomen:**
- Block staat niet in de block inserter
- Block categorie is leeg

**Oplossing:**

1. **Check of block gebouwd is:**
   ```bash
   cd blocks/
   npm run build
   ```

2. **Verifieer build output:**
   ```bash
   ls -la blocks/build/my-block/
   # Moet bevatten: index.js, index.asset.php
   ```

3. **Check block.json editorScript path:**
   ```json
   "editorScript": "file:../build/my-block/index.js"
   ```
   ⚠️ Moet verwijzen naar `../build/` directory!

4. **Verifieer block registratie:**
   ```bash
   npx @wordpress/env run cli wp eval "print_r(array_keys(WP_Block_Type_Registry::get_instance()->get_all_registered()));" | grep client-website
   ```

5. **Flush WordPress cache:**
   ```bash
   npx @wordpress/env run cli wp cache flush
   ```

### Probleem 2: "Block contains unexpected or invalid content"

**Symptomen:**
- Block geeft validation error in editor
- "Attempt Block Recovery" button verschijnt

**Oorzaak:**
De HTML output in `save.js` matcht NIET met de opgeslagen content in de database.

**Oplossing:**

1. **Check save.js output:**
   ```javascript
   // save.js moet EXACT deze HTML genereren:
   return (
       <div className="my-block">
           <h2>Heading</h2>
       </div>
   );
   ```

2. **Rebuild blocks:**
   ```bash
   cd blocks/
   npm run build
   ```

3. **Clear browser cache + hard refresh:**
   - Chrome/Edge: `Ctrl + Shift + R`
   - Firefox: `Ctrl + F5`

4. **Als probleem blijft: Fix de block in WordPress:**
   - Klik "Attempt Block Recovery"
   - Of: Verwijder block en voeg opnieuw toe

### Probleem 3: Changes niet zichtbaar na rebuild

**Oplossing:**

1. **Flush WordPress cache:**
   ```bash
   npx @wordpress/env run cli wp cache flush
   ```

2. **Restart WordPress environment:**
   ```bash
   npx @wordpress/env restart
   ```

3. **Clear browser cache:**
   - Hard refresh: `Ctrl + Shift + R`
   - Of: Open DevTools → Network tab → "Disable cache"

### Probleem 4: JavaScript errors in console

**Check console voor specifieke errors:**

1. **"Cannot read property 'X' of undefined":**
   - Check of alle attributes een default waarde hebben in `block.json`

2. **"ReferenceError: wp is not defined":**
   - Check of `index.asset.php` correct is gegenereerd
   - Rebuild: `npm run build`

3. **"registerBlockType is not a function":**
   - Check import in `index.js`:
     ```javascript
     import { registerBlockType } from '@wordpress/blocks';
     ```

### Probleem 5: CSS niet geladen

**Check welke CSS bestanden geladen moeten worden:**

```json
// block.json
{
    "editorStyle": "file:./editor.css",    // Editor styles
    "style": "file:./style.css"            // Frontend styles
}
```

**Rebuild en check output:**
```bash
cd blocks/
npm run build
ls -la blocks/build/my-block/*.css
```

---

## Best Practices

### 1. Attribute Naming

```json
{
	"attributes": {
		// ✅ GOED: camelCase
		"backgroundColor": { "type": "string" },
		"paddingTop": { "type": "string" },

		// ❌ SLECHT: snake_case of kebab-case
		"background_color": { "type": "string" },
		"padding-top": { "type": "string" }
	}
}
```

### 2. Altijd Default Values

```json
{
	"attributes": {
		"heading": {
			"type": "string",
			"default": "Default heading"  // ✅ Voorkomt undefined errors
		}
	}
}
```

### 3. Component Library Gebruiken

**Gebruik de bestaande components:**

```javascript
// ✅ GOED: Gebruik component library
import '../components/button/button.css';

// Block gebruikt .btn classes uit component library
<a href="#" className="btn btn--primary btn--large">
	Click me
</a>
```

**Voordelen:**
- Consistente styling
- Minder CSS schrijven
- Design tokens automatisch toegepast

### 4. Block Categorie

```json
{
	// ✅ ALTIJD client-website-blocks gebruiken
	"category": "client-website-blocks"
}
```

### 5. Semantic HTML

```javascript
// ✅ GOED: Semantic HTML
<article className="card">
	<header>
		<h3>{title}</h3>
	</header>
	<div className="card__content">
		<p>{description}</p>
	</div>
</article>

// ❌ SLECHT: Alleen divs
<div className="card">
	<div>
		<div>{title}</div>
	</div>
	<div>
		<div>{description}</div>
	</div>
</div>
```

### 6. Internationalization (i18n)

```javascript
import { __ } from '@wordpress/i18n';

// ✅ Vertaalbare strings
<TextControl
	label={ __( 'Button Text', 'client-website' ) }
	help={ __( 'Enter the text for the button', 'client-website' ) }
/>
```

### 7. BEM CSS Naming

```css
/* ✅ GOED: BEM naming */
.hero {
	/* Block */
}

.hero__heading {
	/* Element */
}

.hero--gradient {
	/* Modifier */
}

.hero__button--large {
	/* Element + Modifier */
}
```

---

## Development Workflow

### Voor een nieuwe client website:

1. **Start development mode:**
   ```bash
   cd blocks/
   npm run start
   ```

2. **Maak nieuwe blocks** (zie [Nieuwe Block Maken](#nieuwe-block-maken))

3. **Test in WordPress:**
   - Open http://localhost:8888/wp-admin
   - Maak nieuwe pagina
   - Test block in editor

4. **Maak patterns** (zie [PATTERNS-DEVELOPMENT.md](./PATTERNS-DEVELOPMENT.md))

5. **Build voor productie:**
   ```bash
   npm run build
   ```

6. **Commit changes:**
   ```bash
   git add blocks/
   git commit -m "feat: Add new block for client project"
   ```

### Snelle Block Duplicatie

**Kopieer bestaande block:**
```bash
cd blocks/
cp -r hero my-new-block
cd my-new-block

# Update alle references van 'hero' naar 'my-new-block'
# Update block.json: name, title, description
# Update save.js en edit.js met nieuwe functionality
```

---

## Handige Commands

```bash
# Build alle blocks
cd blocks/ && npm run build

# Development mode (auto-rebuild)
cd blocks/ && npm run start

# Check WordPress blocks
npx @wordpress/env run cli wp eval "print_r(array_keys(WP_Block_Type_Registry::get_instance()->get_all_registered()));" | grep client-website

# Flush cache
npx @wordpress/env run cli wp cache flush

# Restart WordPress
npx @wordpress/env restart

# Check build output
ls -la blocks/build/*/

# Check webpack config
cat blocks/webpack.config.js
```

---

## Gerelateerde Documentatie

- [PATTERNS-DEVELOPMENT.md](./PATTERNS-DEVELOPMENT.md) - Guide voor patterns maken
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues en oplossingen
- [LOCAL-DEVELOPMENT.md](./LOCAL-DEVELOPMENT.md) - Lokale WordPress setup

---

**Hulp nodig?** Check de [Troubleshooting sectie](#troubleshooting) of raadpleeg de [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/).
