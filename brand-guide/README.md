# Brand Guide & Design System

Deze brand guide definieert alle design tokens en richtlijnen voor de website. Gebruik deze als **single source of truth** voor alle styling beslissingen.

## 📁 Structuur

```
brand-guide/
├── README.md           # Deze file - overzicht en gebruiksinstructies
├── colors.json         # Complete kleurenpalet
├── typography.json     # Font families, sizes en heading stijlen
├── spacing.json        # Spacing scale voor margins en padding
├── design-tokens.css   # CSS custom properties (gegenereerd)
└── assets/            # Brand assets (logo's, iconen, afbeeldingen)
```

## 🎨 Kleuren

Zie [colors.json](./colors.json) voor het complete kleurenpalet.

### Primary Colors
Gebruik voor belangrijke CTAs, links en accent elementen.
- **Primary 500**: `#0ea5e9` - Hoofdkleur
- **Primary 600**: `#0284c7` - Hover states
- **Primary 700**: `#0369a1` - Active states

### Secondary Colors
Gebruik voor secundaire accenten en variatie.
- **Secondary 500**: `#a855f7`
- **Secondary 600**: `#9333ea`

### Neutral Colors
Gebruik voor text, borders en backgrounds.
- **Text Primary**: `#171717` (Neutral 900)
- **Text Secondary**: `#525252` (Neutral 600)
- **Background**: `#ffffff`
- **Background Secondary**: `#f5f5f5` (Neutral 100)

### Status Colors
- **Success**: `#10b981` (groen)
- **Warning**: `#f59e0b` (oranje)
- **Error**: `#ef4444` (rood)
- **Info**: `#3b82f6` (blauw)

### Toegankelijkheid
- Zorg altijd voor minimaal **4.5:1 contrast ratio** voor normale tekst
- Gebruik **3:1 contrast ratio** voor grote tekst (18px+)
- Test kleuren met [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

## ✍️ Typography

Zie [typography.json](./typography.json) voor alle typografie instellingen.

### Font Families
- **Headings**: Inter (weights: 400, 500, 600, 700, 800)
- **Body**: Inter (weights: 400, 500, 600)
- **Mono**: JetBrains Mono (voor code)

### Font Sizes
We gebruiken een modulaire schaal van `xs` tot `7xl`:
- **Base**: 16px (1rem)
- **Small**: 14px (0.875rem)
- **Large**: 18px (1.125rem)

### Headings
```
H1: 48px (3rem) - Bold - Voor hero sections
H2: 36px (2.25rem) - Bold - Voor section titles
H3: 30px (1.875rem) - Semibold - Voor subsections
H4: 24px (1.5rem) - Semibold - Voor card titles
H5: 18px (1.125rem) - Medium
H6: 16px (1rem) - Medium
```

### Body Text
- **Base size**: 16px
- **Line height**: 1.75 (28px)
- **Font weight**: 400 (normal)

### Responsive Typography
Headings schalen automatisch op verschillende schermgroottes:
- **Mobile**: Kleinere font sizes
- **Tablet**: Medium font sizes
- **Desktop**: Volledige font sizes

## 📏 Spacing

Zie [spacing.json](./spacing.json) voor de complete spacing scale.

### Spacing Scale
We gebruiken een 4px basis grid (0.25rem):
- `1` = 0.25rem (4px)
- `2` = 0.5rem (8px)
- `4` = 1rem (16px)
- `8` = 2rem (32px)
- `12` = 3rem (48px)
- `16` = 4rem (64px)

### Semantic Spacing

**Section Spacing** (tussen grote secties):
- Mobile: 3rem (48px)
- Tablet: 4rem (64px)
- Desktop: 6rem (96px)

**Container Padding**:
- Mobile: 1rem (16px)
- Tablet: 2rem (32px)
- Desktop: 3rem (48px)

**Element Spacing**:
- XS: 0.5rem (8px)
- SM: 1rem (16px)
- MD: 1.5rem (24px)
- LG: 2rem (32px)
- XL: 3rem (48px)

## 🎯 Design Tokens in CSS

Alle design tokens zijn beschikbaar als CSS custom properties:

```css
/* Colors */
--color-primary-500: #0ea5e9;
--color-text-primary: #171717;
--color-background: #ffffff;

/* Typography */
--font-heading: 'Inter', sans-serif;
--font-body: 'Inter', sans-serif;
--text-base: 1rem;
--text-lg: 1.125rem;

/* Spacing */
--spacing-4: 1rem;
--spacing-8: 2rem;
--spacing-section-mobile: 3rem;
```

## �� Component Richtlijnen

### Buttons
- **Primary Button**: Primary 500 background, wit text
- **Secondary Button**: Transparant background, Primary 500 border
- **Padding**: 0.75rem 1.5rem (12px 24px)
- **Border radius**: 0.5rem (8px)
- **Font weight**: 500 (medium)

### Cards
- **Background**: Wit
- **Border**: 1px solid Neutral 200
- **Border radius**: 0.75rem (12px)
- **Padding**: 1.5rem (24px)
- **Shadow**: Subtiele shadow voor depth

### Forms
- **Input height**: 2.75rem (44px)
- **Input padding**: 0.75rem 1rem
- **Border**: 1px solid Neutral 300
- **Border radius**: 0.5rem (8px)
- **Focus state**: Primary 500 border, ring effect

## 🖼️ Assets

### Logo's
Plaats logo's in `assets/logo/`:
- `logo.svg` - Hoofdlogo (primair)
- `logo-dark.svg` - Logo voor donkere achtergronden
- `logo-icon.svg` - Icon-only versie
- `logo-wordmark.svg` - Text-only versie

### Formaten
- SVG: Voor logo's en iconen (voorkeur)
- PNG: Voor foto's en complexe afbeeldingen
- WebP: Voor geoptimaliseerde afbeeldingen

### Optimalisatie
- Comprimeer alle afbeeldingen
- Gebruik responsive afbeeldingen waar mogelijk
- Lazy load afbeeldingen buiten viewport

## 📱 Responsive Breakpoints

```css
/* Mobile first approach */
mobile: 0px (default)
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## 🔄 Aanpassingen Maken

**Belangrijk**: Deze brand guide wordt gebruikt door de hele codebase!

Als je kleuren, fonts of spacing aanpast:

1. Update de JSON files in deze directory
2. Regenereer CSS custom properties (zie WordPress theme)
3. Test alle componenten op de nieuwe styling
4. Update documentatie indien nodig

## 📚 Resources

- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Material Design Guidelines](https://material.io/design)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) (voor referentie)

## ✅ Checklist voor Klant Brand Integration

Bij het ontvangen van klant brand materials:

- [ ] Verzamel logo's (SVG + PNG fallback)
- [ ] Verkrijg brand kleuren (primary, secondary, accent)
- [ ] Verkrijg brand fonts (licentie check!)
- [ ] Vraag om bestaande brand guidelines
- [ ] Update `colors.json` met echte brand kleuren
- [ ] Update `typography.json` met echte brand fonts
- [ ] Plaats logo assets in `assets/logo/`
- [ ] Test nieuwe kleuren op toegankelijkheid
- [ ] Regenereer CSS custom properties
- [ ] Update alle components met nieuwe branding

---

**Laatste update**: {DATUM}
**Versie**: 1.0.0
