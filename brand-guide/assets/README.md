# Brand Assets

Deze directory bevat alle brand assets zoals logo's, afbeeldingen en iconen.

## 📁 Structuur

```
assets/
├── logo/          # Logo bestanden in verschillende formaten
├── images/        # Brand afbeeldingen (hero images, backgrounds, etc.)
└── icons/         # Custom iconen en icon sets
```

## 🖼️ Logo's

### Benodigde Formaten

Plaats de volgende logo varianten in `/logo/`:

#### Primaire Logo's
- `logo.svg` - SVG versie (voorkeur voor web)
- `logo.png` - PNG versie (transparante achtergrond, min. 1000px breed)
- `logo@2x.png` - Retina versie (2000px breed)

#### Logo Varianten
- `logo-dark.svg` / `logo-dark.png` - Voor donkere achtergronden
- `logo-light.svg` / `logo-light.png` - Voor lichte achtergronden
- `logo-icon.svg` / `logo-icon.png` - Alleen het icon/symbool
- `logo-wordmark.svg` / `logo-wordmark.png` - Alleen de tekst/naam
- `favicon.ico` - Favicon (16x16, 32x32, 48x48 sizes)
- `favicon.svg` - SVG favicon

### Logo Specificaties

**Minimum afmetingen**:
- Volledig logo: 150px breed
- Icon only: 48px × 48px
- Favicon: 32px × 32px

**Kleuren**:
- Volledige kleur versie
- Zwart/wit versie
- Enkele kleur versie (voor gebruik op gekleurde achtergronden)

**Formaat**:
- SVG: Geoptimaliseerd, zonder onnodige metadata
- PNG: Transparante achtergrond, gecomprimeerd
- ICO: Multi-size favicon

### Clear Space
Houd minimaal de hoogte van het logo als clear space rondom het logo vrij.

## 🎨 Afbeeldingen

### Image Types

**Hero Images** (`images/hero/`)
- Full-width achtergrond afbeeldingen
- Minimaal 1920px breed
- Aspect ratio: 16:9 of 21:9
- Formaten: WebP (voorkeur), JPG fallback

**Background Images** (`images/backgrounds/`)
- Textures en patronen
- Kunnen tiled worden
- Optimaliseer voor bestandsgrootte

**Content Images** (`images/content/`)
- Afbeeldingen voor gebruik in content
- Verschillende maten beschikbaar
- Formaten: WebP, JPG, PNG

### Image Optimization

Alle afbeeldingen moeten geoptimaliseerd zijn:

- **Compressie**: Gebruik tools zoals TinyPNG, ImageOptim
- **Formaat**: WebP voor moderne browsers, JPG/PNG fallback
- **Responsive**: Meerdere sizes voor verschillende viewports
- **Lazy loading**: Implementeer lazy loading waar mogelijk

**Aanbevolen tools**:
- [TinyPNG](https://tinypng.com/) - PNG/JPG compressie
- [Squoosh](https://squoosh.app/) - Online image converter
- [ImageOptim](https://imageoptim.com/) - Mac tool
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG optimalisatie

### Naming Convention

```
hero-homepage.webp
hero-homepage.jpg
background-pattern-dots.svg
content-team-photo-1.webp
content-team-photo-1-thumb.webp
```

## ⭐ Iconen

### Icon Sets

**Custom Icons** (`icons/custom/`)
- Brand-specifieke iconen
- SVG formaat (voorkeur)
- Consistent stroke width en style

**System Icons** (`icons/system/`)
- UI iconen (close, menu, arrow, etc.)
- 24px × 24px basis size
- Schaalbaar naar 16px, 32px, 48px

### Icon Specifications

**Formaat**: SVG (schaalbaar, kleine bestandsgrootte)

**Grid**: 24px × 24px
- Stroke: 2px
- Corner radius: 2px (waar van toepassing)
- Padding: 2px binnen grid

**Kleuren**:
- Gebruik `currentColor` voor SVG fill/stroke
- Dit maakt iconen thematisch aanpasbaar

**Optimalisatie**:
- Verwijder onnodige metadata
- Gebruik SVGOMG voor optimalisatie
- Inline SVG waar mogelijk voor betere performance

### Icon Naming

```
icon-arrow-right.svg
icon-close.svg
icon-menu.svg
icon-check-circle.svg
icon-alert-triangle.svg
```

## 📋 Asset Checklist

Wanneer je brand assets ontvangt van de klant:

### Logo's
- [ ] SVG versie van volledig logo
- [ ] PNG versie (transparant, high-res)
- [ ] Logo voor donkere achtergrond
- [ ] Logo voor lichte achtergrond
- [ ] Icon-only versie
- [ ] Favicon (ICO + SVG)
- [ ] Alle logo's geoptimaliseerd

### Kleuren
- [ ] Primaire brand kleur(en)
- [ ] Secundaire brand kleur(en)
- [ ] Logo kleuren gedocumenteerd in colors.json

### Afbeeldingen
- [ ] Hero afbeeldingen
- [ ] Background textures/patterns
- [ ] Content afbeeldingen
- [ ] Alle afbeeldingen gecomprimeerd
- [ ] WebP versies gegenereerd
- [ ] Responsive variants gemaakt

### Iconen
- [ ] Custom brand iconen
- [ ] System/UI iconen
- [ ] SVG geoptimaliseerd
- [ ] Consistent style guide

### Licenties
- [ ] Licentie voor fonts geverifieerd
- [ ] Licentie voor iconen geverifieerd
- [ ] Licentie voor stock foto's (indien van toepassing)
- [ ] Gebruiksrechten gedocumenteerd

## 🚀 Deployment

### WordPress Media Library
Sommige assets zullen direct in WordPress Media Library worden geüpload:
- Content afbeeldingen
- Hero afbeeldingen
- Featured images

### Theme Assets
Deze assets blijven in het theme:
- Logo's (behalve favicon)
- Background patterns
- System iconen
- Design-kritieke afbeeldingen

### CDN (optioneel)
Voor betere performance kunnen grote assets op CDN:
- Hero afbeeldingen (>500KB)
- Video bestanden
- Grote media libraries

## 📐 Responsive Images in WordPress

WordPress genereert automatisch verschillende sizes. Custom sizes toevoegen in `functions.php`:

```php
add_image_size('hero-desktop', 1920, 1080, true);
add_image_size('hero-tablet', 1024, 576, true);
add_image_size('hero-mobile', 768, 432, true);
```

## 🔗 Useful Resources

- [TinyPNG](https://tinypng.com/) - Image compression
- [Squoosh](https://squoosh.app/) - Image format converter
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG optimizer
- [Favicon Generator](https://realfavicongenerator.net/) - Favicon generatie
- [WebP Converter](https://developers.google.com/speed/webp) - WebP tools

---

**Let op**: Vergeet niet om `.gitignore` bij te werken als je grote binaire bestanden hebt die niet in version control thuishoren.
