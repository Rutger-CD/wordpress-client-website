# WordPress Patterns Development Guide

Complete gids voor het maken en gebruiken van block patterns voor client websites.

## Inhoudsopgave

- [Wat zijn Patterns?](#wat-zijn-patterns)
- [Pattern Structuur](#pattern-structuur)
- [Nieuwe Pattern Maken](#nieuwe-pattern-maken)
- [Pattern Syntax](#pattern-syntax)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## Wat zijn Patterns?

Block patterns zijn vooraf gebouwde combinaties van blocks die je met één klik kunt toevoegen aan een pagina. Ze zijn perfect voor:

- **Client websites**: Snel pagina's bouwen met consistente layouts
- **Herbruikbare layouts**: Hero + content + CTA secties
- **Snelle prototyping**: Complete pagina templates in één keer toevoegen

### Huidige Patterns (5)

1. **Hero with CTA** - Hero sectie met gradient en dual CTAs
2. **Features Grid** - 3-koloms grid met feature cards
3. **CTA Section** - Full-width call-to-action
4. **Full Page Template** - Complete pagina layout
5. **Content with Sidebar** - Two-column layout

---

## Pattern Structuur

Patterns zijn PHP bestanden in de `patterns/` directory:

```
patterns/
├── hero-with-cta.php
├── features-grid.php
├── cta-section.php
├── full-page-template.php
└── content-with-sidebar.php
```

### Pattern Anatomy

```php
<?php
/**
 * Title: Hero with CTA              ← Naam in WordPress
 * Slug: client-website/hero-cta     ← Unieke identifier
 * Categories: client-website-patterns  ← Categorie
 * Description: Hero met dual CTAs    ← Beschrijving
 */
?>

<!-- Block markup hier -->
```

---

## Nieuwe Pattern Maken

### Stap 1: Maak PHP Bestand

**`patterns/my-new-pattern.php`**

```php
<?php
/**
 * Title: My New Pattern
 * Slug: client-website/my-new-pattern
 * Categories: client-website-patterns
 * Description: Beschrijving van je nieuwe pattern
 */
?>

<!-- Blocks komen hier -->
```

### Stap 2: Voeg Blocks Toe

**BELANGRIJK:** Patterns moeten **volledige block markup** bevatten met:
- JSON attributes in block comment
- Complete HTML output (zoals `save.js` genereert)

#### ❌ FOUT - Self-closing syntax:

```php
<!-- wp:client-website/hero /-->
```

Dit veroorzaakt: **"Block contains unexpected or invalid content"** error!

#### ✅ CORRECT - Volledige markup:

```php
<!-- wp:client-website/hero {"heading":"Welcome","variant":"gradient"} -->
<div class="wp-block-client-website-hero hero hero--gradient">
    <div class="hero__container">
        <div class="hero__content">
            <h1 class="hero__heading">Welcome</h1>
        </div>
    </div>
</div>
<!-- /wp:client-website/hero -->
```

### Stap 3: HTML Output Genereren

**Methode 1: Gebruik WordPress Editor**

1. Maak een test pagina in WordPress
2. Voeg je block toe en configureer hem
3. Klik op **⋮ (three dots)** → **Copy**
4. Plak in je pattern file

**Methode 2: Kopieer van `save.js`**

Check de `save.js` van je block en kopieer de HTML structuur:

```javascript
// blocks/hero/save.js
export default function save( { attributes } ) {
    return (
        <div className="wp-block-client-website-hero hero hero--gradient">
            <div className="hero__container">
                <div className="hero__content">
                    <h1 className="hero__heading">{attributes.heading}</h1>
                </div>
            </div>
        </div>
    );
}
```

Wordt in pattern:

```php
<div class="wp-block-client-website-hero hero hero--gradient">
    <div class="hero__container">
        <div class="hero__content">
            <h1 class="hero__heading">Welcome to Our Website</h1>
        </div>
    </div>
</div>
```

---

## Pattern Syntax

### Basis Block Syntax

```php
<!-- wp:block-namespace/block-name {"attribute":"value"} -->
<div class="block-html-output">
    <!-- Block content -->
</div>
<!-- /wp:block-namespace/block-name -->
```

### Custom Block met Attributes

**Hero Block:**

```php
<!-- wp:client-website/hero {
    "heading":"Welcome to Our Website",
    "subheading":"Build something amazing",
    "description":"Lorem ipsum dolor sit amet",
    "primaryButtonText":"Get Started",
    "primaryButtonUrl":"#",
    "secondaryButtonText":"Learn More",
    "secondaryButtonUrl":"#",
    "variant":"gradient",
    "alignment":"center"
} -->
<div class="wp-block-client-website-hero hero hero--gradient hero--center">
    <div class="hero__container">
        <div class="hero__content">
            <p class="hero__subheading">Build something amazing</p>
            <h1 class="hero__heading">Welcome to Our Website</h1>
            <p class="hero__description">Lorem ipsum dolor sit amet</p>
            <div class="hero__actions">
                <a href="#" class="btn btn--primary btn--large">Get Started</a>
                <a href="#" class="btn btn--secondary btn--large">Learn More</a>
            </div>
        </div>
    </div>
</div>
<!-- /wp:client-website/hero -->
```

### Blocks met InnerBlocks

**Content Section (heeft InnerBlocks):**

```php
<!-- wp:client-website/content-section {"width":"contained","paddingTop":"large","paddingBottom":"large"} -->
<div class="wp-block-client-website-content-section content-section content-section--contained content-section--pt-large content-section--pb-large">
    <div class="content-section__container">
        <!-- InnerBlocks content -->
        <!-- wp:heading {"textAlign":"center"} -->
        <h2 class="has-text-align-center">About Us</h2>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"align":"center"} -->
        <p class="has-text-align-center">Learn more about our company.</p>
        <!-- /wp:paragraph -->
    </div>
</div>
<!-- /wp:client-website/content-section -->
```

### Blocks met Arrays (Cards)

**Card Grid met meerdere cards:**

```php
<!-- wp:client-website/card-grid {
    "columns":3,
    "cards":[
        {
            "id":1,
            "image":"",
            "title":"Feature One",
            "description":"Description for feature one",
            "linkUrl":"#",
            "linkText":"Learn more"
        },
        {
            "id":2,
            "image":"",
            "title":"Feature Two",
            "description":"Description for feature two",
            "linkUrl":"#",
            "linkText":"Learn more"
        },
        {
            "id":3,
            "image":"",
            "title":"Feature Three",
            "description":"Description for feature three",
            "linkUrl":"#",
            "linkText":"Learn more"
        }
    ]
} -->
<div class="wp-block-client-website-card-grid card-grid card-grid--columns-3">
    <div class="card-grid__container">
        <div class="card">
            <div class="card__content">
                <h3 class="card__title">Feature One</h3>
                <p class="card__description">Description for feature one</p>
                <a href="#" class="card__link">Learn more</a>
            </div>
        </div>
        <div class="card">
            <div class="card__content">
                <h3 class="card__title">Feature Two</h3>
                <p class="card__description">Description for feature two</p>
                <a href="#" class="card__link">Learn more</a>
            </div>
        </div>
        <div class="card">
            <div class="card__content">
                <h3 class="card__title">Feature Three</h3>
                <p class="card__description">Description for feature three</p>
                <a href="#" class="card__link">Learn more</a>
            </div>
        </div>
    </div>
</div>
<!-- /wp:client-website/card-grid -->
```

### Core WordPress Blocks

**Je kunt ook core blocks gebruiken:**

```php
<!-- wp:heading {"textAlign":"center","level":2} -->
<h2 class="has-text-align-center">Section Heading</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">This is a paragraph with centered text.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":123,"sizeSlug":"large"} -->
<figure class="wp-block-image size-large">
    <img src="image-url.jpg" alt="" class="wp-image-123"/>
</figure>
<!-- /wp:image -->

<!-- wp:spacer {"height":"50px"} -->
<div style="height:50px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->
```

---

## Complete Pattern Voorbeelden

### Voorbeeld 1: Landing Page Pattern

**`patterns/landing-page.php`**

```php
<?php
/**
 * Title: Landing Page Layout
 * Slug: client-website/landing-page
 * Categories: client-website-patterns
 * Description: Complete landing page met hero, features en CTA
 */
?>

<!-- wp:client-website/hero {"heading":"Transform Your Business","subheading":"Leading Solution","description":"We help businesses grow with innovative solutions","primaryButtonText":"Get Started","primaryButtonUrl":"/contact","secondaryButtonText":"Learn More","secondaryButtonUrl":"/about","variant":"gradient","alignment":"center"} -->
<div class="wp-block-client-website-hero hero hero--gradient hero--center"><div class="hero__container"><div class="hero__content"><p class="hero__subheading">Leading Solution</p><h1 class="hero__heading">Transform Your Business</h1><p class="hero__description">We help businesses grow with innovative solutions</p><div class="hero__actions"><a href="/contact" class="btn btn--primary btn--large">Get Started</a><a href="/about" class="btn btn--secondary btn--large">Learn More</a></div></div></div></div>
<!-- /wp:client-website/hero -->

<!-- wp:client-website/content-section {"width":"contained","paddingTop":"large","paddingBottom":"large"} -->
<div class="wp-block-client-website-content-section content-section content-section--contained content-section--pt-large content-section--pb-large"><div class="content-section__container">
<!-- wp:heading {"textAlign":"center"} -->
<h2 class="has-text-align-center">Our Services</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Discover what we can do for you</p>
<!-- /wp:paragraph -->
</div></div>
<!-- /wp:client-website/content-section -->

<!-- wp:client-website/card-grid {"columns":3,"cards":[{"id":1,"image":"","title":"Web Development","description":"Custom websites built with modern technologies","linkUrl":"/services/web","linkText":"Learn more"},{"id":2,"image":"","title":"Mobile Apps","description":"Native and cross-platform mobile applications","linkUrl":"/services/mobile","linkText":"Learn more"},{"id":3,"image":"","title":"Consulting","description":"Expert advice for your digital transformation","linkUrl":"/services/consulting","linkText":"Learn more"}]} -->
<div class="wp-block-client-website-card-grid card-grid card-grid--columns-3"><div class="card-grid__container"><div class="card"><div class="card__content"><h3 class="card__title">Web Development</h3><p class="card__description">Custom websites built with modern technologies</p><a href="/services/web" class="card__link">Learn more</a></div></div><div class="card"><div class="card__content"><h3 class="card__title">Mobile Apps</h3><p class="card__description">Native and cross-platform mobile applications</p><a href="/services/mobile" class="card__link">Learn more</a></div></div><div class="card"><div class="card__content"><h3 class="card__title">Consulting</h3><p class="card__description">Expert advice for your digital transformation</p><a href="/services/consulting" class="card__link">Learn more</a></div></div></div></div>
<!-- /wp:client-website/card-grid -->

<!-- wp:client-website/cta-section {"heading":"Ready to Start Your Project?","description":"Contact us today for a free consultation","buttonText":"Contact Us","buttonUrl":"/contact","backgroundColor":"gradient","textAlignment":"center"} -->
<div class="wp-block-client-website-cta-section cta-section cta-section--gradient cta-section--align-center"><div class="cta-section__container"><div class="cta-section__content"><h2 class="cta-section__heading">Ready to Start Your Project?</h2><p class="cta-section__description">Contact us today for a free consultation</p><div class="cta-section__button-wrapper"><a href="/contact" class="button button--primary button--large">Contact Us</a></div></div></div></div>
<!-- /wp:client-website/cta-section -->
```

### Voorbeeld 2: About Page Pattern

**`patterns/about-page.php`**

```php
<?php
/**
 * Title: About Page Layout
 * Slug: client-website/about-page
 * Categories: client-website-patterns
 * Description: About page met content sections en team grid
 */
?>

<!-- wp:client-website/hero {"heading":"About Our Company","subheading":"Our Story","description":"Learn more about who we are and what we do","variant":"solid","alignment":"center"} -->
<div class="wp-block-client-website-hero hero hero--solid hero--center"><div class="hero__container"><div class="hero__content"><p class="hero__subheading">Our Story</p><h1 class="hero__heading">About Our Company</h1><p class="hero__description">Learn more about who we are and what we do</p></div></div></div>
<!-- /wp:client-website/hero -->

<!-- wp:client-website/content-section {"width":"contained","paddingTop":"large","paddingBottom":"large"} -->
<div class="wp-block-client-website-content-section content-section content-section--contained content-section--pt-large content-section--pb-large"><div class="content-section__container">
<!-- wp:heading -->
<h2>Our Mission</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>We are dedicated to helping businesses succeed in the digital age through innovative solutions and exceptional service.</p>
<!-- /wp:paragraph -->
</div></div>
<!-- /wp:client-website/content-section -->

<!-- wp:client-website/card-grid {"columns":4,"cards":[{"id":1,"image":"","title":"John Doe","description":"CEO & Founder","linkUrl":"","linkText":""},{"id":2,"image":"","title":"Jane Smith","description":"CTO","linkUrl":"","linkText":""},{"id":3,"image":"","title":"Mike Johnson","description":"Lead Developer","linkUrl":"","linkText":""},{"id":4,"image":"","title":"Sarah Williams","description":"Design Director","linkUrl":"","linkText":""}]} -->
<div class="wp-block-client-website-card-grid card-grid card-grid--columns-4"><div class="card-grid__container"><div class="card"><div class="card__content"><h3 class="card__title">John Doe</h3><p class="card__description">CEO & Founder</p></div></div><div class="card"><div class="card__content"><h3 class="card__title">Jane Smith</h3><p class="card__description">CTO</p></div></div><div class="card"><div class="card__content"><h3 class="card__title">Mike Johnson</h3><p class="card__description">Lead Developer</p></div></div><div class="card"><div class="card__content"><h3 class="card__title">Sarah Williams</h3><p class="card__description">Design Director</p></div></div></div></div>
<!-- /wp:client-website/card-grid -->
```

---

## Troubleshooting

### Probleem 1: "Block contains unexpected or invalid content"

**Oorzaak:** HTML in pattern matcht niet met block's `save.js` output.

**Oplossing:**

1. **Check save.js van de block:**
   ```javascript
   // blocks/my-block/save.js
   export default function save( { attributes } ) {
       return (
           <div className="my-block">
               <h2>{attributes.heading}</h2>
           </div>
       );
   }
   ```

2. **Zorg dat pattern EXACT dezelfde HTML heeft:**
   ```php
   <div class="my-block">
       <h2>My Heading</h2>
   </div>
   ```

3. **Let op:**
   - Class names moeten exact matchen
   - Element types (div, section, article) moeten matchen
   - Nesting moet exact hetzelfde zijn

### Probleem 2: Pattern niet zichtbaar in WordPress

**Check:**

1. **Pattern category bestaat:**
   ```php
   // functions.php
   register_block_pattern_category(
       'client-website-patterns',
       ['label' => __('Client Website - Patterns', 'client-website')]
   );
   ```

2. **Pattern heeft correcte category:**
   ```php
   /**
    * Categories: client-website-patterns  ← Check dit!
    */
   ```

3. **Flush WordPress cache:**
   ```bash
   npx @wordpress/env run cli wp cache flush
   ```

### Probleem 3: Attributes niet correct

**JSON syntax checken:**

```php
<!-- GOED: Correct JSON -->
<!-- wp:client-website/hero {"heading":"Test","variant":"gradient"} -->

<!-- FOUT: Trailing comma -->
<!-- wp:client-website/hero {"heading":"Test","variant":"gradient",} -->

<!-- FOUT: Single quotes -->
<!-- wp:client-website/hero {'heading':'Test'} -->
```

**Online JSON validator gebruiken:**
- Kopieer de attributes JSON
- Check op https://jsonlint.com/

---

## Best Practices

### 1. Beschrijvende Namen

```php
// ✅ GOED
Title: Hero Section with Dual CTAs
Description: Full-width hero with gradient background and two call-to-action buttons

// ❌ SLECHT
Title: Hero
Description: Hero block
```

### 2. Realistic Content

```php
// ✅ GOED: Echte content die client kan aanpassen
"heading":"Transform Your Business with Our Solutions"
"description":"We help companies achieve their digital transformation goals"

// ❌ SLECHT: Lorem ipsum
"heading":"Lorem Ipsum Dolor"
"description":"Lorem ipsum dolor sit amet consectetur"
```

### 3. Consistente Category

```php
/**
 * Categories: client-website-patterns  ← ALTIJD deze!
 */
```

### 4. Semantic Slugs

```php
// ✅ GOED
Slug: client-website/hero-with-cta
Slug: client-website/features-grid-3col
Slug: client-website/about-page-layout

// ❌ SLECHT
Slug: client-website/pattern1
Slug: client-website/test
Slug: client-website/new
```

### 5. Meerdere Varianten

Maak varianten voor verschillende use cases:

```
patterns/
├── hero-with-cta.php           ← 2 buttons
├── hero-single-cta.php         ← 1 button
├── hero-no-cta.php             ← Alleen text
├── features-grid-2col.php      ← 2 kolommen
├── features-grid-3col.php      ← 3 kolommen
└── features-grid-4col.php      ← 4 kolommen
```

### 6. Modulair Bouwen

```php
// ✅ GOED: Kleine herbruikbare patterns
patterns/hero-simple.php
patterns/services-grid.php
patterns/testimonials.php

// Dan combineren in grote patterns:
patterns/landing-page-tech.php  (hero + services + testimonials)
patterns/landing-page-agency.php (hero + portfolio + testimonials)
```

---

## Pattern Workflow

### Voor een nieuwe client website:

1. **Analyseer design:**
   - Welke sections heeft de website?
   - Welke layouts komen vaak terug?

2. **Maak basis patterns:**
   ```php
   patterns/
   ├── client-hero.php         ← Hero voor deze client
   ├── client-services.php     ← Services sectie
   ├── client-testimonials.php ← Testimonials
   └── client-contact-cta.php  ← Contact CTA
   ```

3. **Maak complete pagina patterns:**
   ```php
   patterns/
   ├── client-homepage.php     ← Combinatie van hero + services + testimonials
   ├── client-about.php        ← About page layout
   └── client-contact.php      ← Contact page layout
   ```

4. **Test in WordPress:**
   - Voeg patterns toe aan test pagina's
   - Check op validation errors
   - Test responsive design

5. **Train client:**
   - Laat zien waar patterns te vinden zijn
   - Demonstreer hoe ze content kunnen aanpassen
   - Leg uit dat ze blocks kunnen toevoegen/verwijderen

### Snelle Pattern Maken

**Copy-paste workflow:**

1. **Maak pagina in WordPress met blocks**
2. **Klik op ⋮ → "Copy all blocks"**
3. **Plak in nieuwe pattern file**
4. **Voeg PHP header toe**
5. **Flush cache en test**

---

## Handige Commands

```bash
# Flush cache na pattern changes
npx @wordpress/env run cli wp cache flush

# List all patterns (via WP-CLI)
npx @wordpress/env run cli wp eval "foreach(WP_Block_Patterns_Registry::get_instance()->get_all_registered() as \$pattern) { echo \$pattern['title'] . PHP_EOL; }"

# Check pattern category
grep -r "Categories:" patterns/

# Validate JSON syntax in patterns
grep -A 1 "wp:client-website" patterns/*.php | grep "{"
```

---

## Gerelateerde Documentatie

- [BLOCKS-DEVELOPMENT.md](./BLOCKS-DEVELOPMENT.md) - Guide voor blocks maken
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues
- [LOCAL-DEVELOPMENT.md](./LOCAL-DEVELOPMENT.md) - WordPress setup

---

**Hulp nodig?** Check [WordPress Block Pattern Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-patterns/)
