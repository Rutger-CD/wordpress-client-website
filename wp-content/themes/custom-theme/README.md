# Custom Client Theme

Een modern WordPress block theme gebouwd met Full Site Editing (FSE) en geïntegreerd met een uitgebreide brand guide.

## Features

- ✅ Full Site Editing (FSE) support
- 🎨 Brand guide integratie met CSS custom properties
- 📱 Volledig responsive design
- ♿ Toegankelijkheid (WCAG AA compliant)
- ⚡ Performance geoptimaliseerd
- 🎯 SEO vriendelijk
- 🧩 Custom blocks ready
- 📦 Block patterns included

## Vereisten

- **WordPress**: 6.4 of hoger
- **PHP**: 8.0 of hoger
- **Node.js**: 18+ (voor block development)

## Installatie

### 1. Theme Installeren

**Via WordPress Admin:**
1. Ga naar `Appearance → Themes → Add New → Upload Theme`
2. Upload het theme ZIP bestand
3. Klik op "Activate"

**Handmatig:**
1. Upload de theme map naar `/wp-content/themes/`
2. Activeer het theme via WordPress admin

### 2. Vereiste Plugins

Geen vereiste plugins, maar aanbevolen:
- **Yoast SEO** - Voor betere SEO
- **Contact Form 7** - Voor contactformulieren
- **WP Rocket** - Voor caching (optioneel)

### 3. Setup

Na activatie:
1. Ga naar `Appearance → Editor` om de Site Editor te openen
2. Pas templates en template parts aan naar wens
3. Voeg navigatiemenu's toe via `Appearance → Menus`
4. Upload je logo via `Appearance → Customize → Site Identity`

## Theme Structuur

```
custom-theme/
├── assets/
│   ├── css/
│   │   ├── design-tokens.css    # Brand guide CSS custom properties
│   │   └── main.css              # Main theme styles
│   ├── js/
│   │   └── main.js               # Theme JavaScript
│   └── images/                   # Theme images
├── blocks/                       # Custom Gutenberg blocks
├── parts/
│   ├── header.html               # Header template part
│   └── footer.html               # Footer template part
├── patterns/                     # Block patterns
├── templates/
│   ├── index.html                # Blog listing template
│   ├── single.html               # Single post template
│   └── page.html                 # Page template
├── functions.php                 # Theme functions
├── style.css                     # Theme header + styles
├── theme.json                    # Theme configuration
└── README.md                     # This file
```

## Brand Guide Integratie

Het theme is volledig geïntegreerd met de brand guide vanuit `/brand-guide/`:

### Design Tokens
Alle kleuren, typography en spacing worden geladen vanuit `design-tokens.css`:

```css
/* Gebruik brand guide custom properties */
.element {
  color: var(--color-primary-500);
  font-family: var(--font-heading);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
}
```

### theme.json
`theme.json` synchroniseert met de brand guide:
- Kleuren → `colors.json`
- Typography → `typography.json`
- Spacing → `spacing.json`

### Kleuren Aanpassen
Om brand kleuren aan te passen:
1. Update `/brand-guide/colors.json`
2. Regenereer `design-tokens.css`
3. Update `theme.json` color palette

## Custom Blocks

Custom blocks toevoegen:

1. **Maak een block directory:**
   ```
   blocks/hero-section/
   ├── block.json
   ├── index.js
   ├── style.css
   └── editor.css
   ```

2. **Blocks worden automatisch geregistreerd** via `functions.php`

3. **Build blocks:**
   ```bash
   npm install
   npm run build
   ```

## Block Patterns

Block patterns staan in `/patterns/`. Nieuwe patterns toevoegen:

```php
<?php
/**
 * Title: Hero Section
 * Slug: custom-theme/hero-section
 * Categories: custom-theme-hero
 */
?>
<!-- wp:group {"backgroundColor":"primary"} -->
  <!-- Jouw block pattern HTML -->
<!-- /wp:group -->
```

## Image Sizes

Custom image sizes geregistreerd in het theme:

| Size                | Dimensions  | Crop  | Gebruik               |
|---------------------|-------------|-------|-----------------------|
| hero-desktop        | 1920×1080   | Hard  | Hero sections         |
| hero-tablet         | 1024×576    | Hard  | Hero sections (tablet)|
| hero-mobile         | 768×432     | Hard  | Hero sections (mobile)|
| card-large          | 800×600     | Hard  | Card images           |
| card-medium         | 600×450     | Hard  | Card images (medium)  |
| card-small          | 400×300     | Hard  | Card images (small)   |
| thumbnail-square    | 400×400     | Hard  | Square thumbnails     |
| thumbnail-portrait  | 400×600     | Hard  | Portrait thumbnails   |
| thumbnail-landscape | 600×400     | Hard  | Landscape thumbnails  |

## Performance

### Optimalisaties in het theme:
- ✅ Deferred JavaScript loading
- ✅ Google Fonts preconnect
- ✅ Emoji scripts disabled (gebruik native)
- ✅ WordPress version verborgen (security)
- ✅ Lazy loading voor images
- ✅ Minified assets

### Aanbevolen extra optimalisaties:
- Gebruik een caching plugin (WP Rocket, W3 Total Cache)
- Gebruik een CDN voor static assets
- Optimaliseer afbeeldingen (TinyPNG, ShortPixel)
- Gebruik WebP formaat voor afbeeldingen

## Toegankelijkheid

Het theme voldoet aan WCAG AA standaarden:

- ✅ Correct gebruik van semantic HTML
- ✅ ARIA labels waar nodig
- ✅ Keyboard navigatie support
- ✅ Focus indicators
- ✅ Voldoende kleurcontrast (4.5:1 ratio)
- ✅ Skip to content link
- ✅ Screen reader vriendelijk

Test toegankelijkheid met:
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

## Browser Support

- ✅ Chrome (laatste 2 versies)
- ✅ Firefox (laatste 2 versies)
- ✅ Safari (laatste 2 versies)
- ✅ Edge (laatste 2 versies)
- ⚠️ IE11 (niet ondersteund - gebruik CSS custom properties)

## Development

### Local Development Setup

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd custom-theme
   ```

2. **Install dependencies (voor custom blocks):**
   ```bash
   npm install
   ```

3. **Development mode:**
   ```bash
   npm run dev
   ```

4. **Build voor productie:**
   ```bash
   npm run build
   ```

### Code Style

- **PHP**: Volg WordPress Coding Standards
- **CSS**: BEM methodologie waar mogelijk
- **JavaScript**: ES6+ syntax
- **HTML**: Semantic HTML5

### Hooks & Filters

Belangrijke hooks in het theme:

```php
// Enqueue custom assets
add_action('wp_enqueue_scripts', 'custom_theme_enqueue_assets');

// Add custom body classes
add_filter('body_class', 'custom_theme_body_classes');

// Custom image sizes
add_filter('image_size_names_choose', 'custom_theme_image_size_names');
```

## Deployment

### Staging
Push naar `develop` branch triggert automatische deployment naar staging.

### Production
1. Merge `develop` naar `main`
2. Handmatige goedkeuring required
3. Deployment naar productie

Zie [deployment documentation](../../docs/deployment.md) voor details.

## Troubleshooting

### Theme activeert niet
- Check PHP versie (minimaal 8.0)
- Check WordPress versie (minimaal 6.4)
- Check voor PHP errors in debug.log

### Styling werkt niet
- Clear cache (browser + WordPress)
- Check of `design-tokens.css` correct geladen wordt
- Inspect browser console voor errors

### Blocks verschijnen niet
- Clear cache
- Regenereer blocks: `npm run build`
- Check of `block.json` correct is

### Images worden niet getoond
- Check file permissions (755 voor directories, 644 voor files)
- Regenereer thumbnails met plugin

## Support

Voor vragen en support:
- **Developer**: [Craft Digital NL](https://craftdigital.nl)
- **Documentation**: Zie `/docs` directory
- **Issues**: GitHub Issues (indien repository gebruikt)

## Changelog

### Version 1.0.0 (2024)
- Initial release
- Full Site Editing support
- Brand guide integratie
- Custom blocks
- Block patterns
- Responsive design
- Accessibility compliance

## Licentie

Dit theme is gelicenseerd onder de GPL v2 of later.

---

**Gemaakt met ❤️ door Craft Digital NL**
