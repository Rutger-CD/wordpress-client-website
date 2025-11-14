# UI Component Library - Implementation Plan

**Issue**: CRA-7
**Priority**: 1 (High)
**Status**: Planning

---

## 🎯 Doel

Een herbruikbare UI component library bouwen die:
- Gebaseerd is op de brand guide
- Gebruikt kan worden in WordPress blocks
- Consistent is in styling en gedrag
- Goed gedocumenteerd is

---

## 📁 Project Structuur

```
components/
├── README.md                    # Component library documentatie
├── _base/
│   ├── variables.css           # Import van brand guide tokens
│   ├── reset.css               # CSS reset/normalize
│   └── utilities.css           # Utility classes
├── button/
│   ├── button.html             # HTML voorbeeld
│   ├── button.css              # Button styling
│   └── README.md               # Button documentatie
├── card/
│   ├── card.html
│   ├── card.css
│   └── README.md
├── header/
│   ├── header.html
│   ├── header.css
│   └── README.md
├── footer/
│   ├── footer.html
│   ├── footer.css
│   └── README.md
├── hero/
│   ├── hero.html
│   ├── hero.css
│   └── README.md
├── content-section/
│   ├── content-section.html
│   ├── content-section.css
│   └── README.md
├── form/
│   ├── input.html
│   ├── input.css
│   ├── textarea.html
│   ├── textarea.css
│   ├── select.html
│   ├── select.css
│   └── README.md
└── demo/
    └── index.html              # Live component preview page
```

---

## 🧩 Componenten - Gedetailleerd Plan

### 1. Button Component

**Varianten:**
- Primary (gevuld, brand primary color)
- Secondary (outline, primary border)
- Tertiary (text only, geen border)
- Danger (voor destructieve acties)
- Success (voor positieve acties)

**Sizes:**
- Small (compact, voor toolbars)
- Medium (default)
- Large (voor hero sections)

**States:**
- Default
- Hover
- Active
- Disabled
- Loading (met spinner)

**Features:**
- Icon support (voor/na tekst)
- Full width optie
- Link styling (button als `<a>`)

**CSS Classes:**
```css
.btn                    /* Base class */
.btn--primary          /* Primary variant */
.btn--secondary        /* Secondary variant */
.btn--tertiary         /* Tertiary variant */
.btn--danger           /* Danger variant */
.btn--success          /* Success variant */
.btn--small            /* Small size */
.btn--large            /* Large size */
.btn--full-width       /* Full width */
.btn--loading          /* Loading state */
.btn--disabled         /* Disabled state */
```

---

### 2. Card Component

**Varianten:**
- Basic (wit, subtiele shadow)
- Outlined (border, geen shadow)
- Elevated (grotere shadow)
- Horizontal (image links, content rechts)

**Sections:**
- Card header (optioneel)
- Card image (optioneel)
- Card body (content)
- Card footer (optioneel, voor actions)

**Features:**
- Hover effect (lift + shadow)
- Clickable cards
- Image positioning (top, left, right)

**CSS Classes:**
```css
.card
.card--outlined
.card--elevated
.card--horizontal
.card__header
.card__image
.card__body
.card__title
.card__description
.card__footer
```

---

### 3. Header/Navigation Component

**Features:**
- Sticky header
- Mobile responsive (hamburger menu)
- Logo placement
- Primary navigation
- CTA button in header
- Search (optioneel)

**States:**
- Default (transparent of solid)
- Scrolled (background change)
- Mobile menu open/closed

**CSS Classes:**
```css
.header
.header--transparent
.header--scrolled
.header__logo
.header__nav
.header__nav-list
.header__nav-item
.header__nav-link
.header__cta
.header__mobile-toggle
```

---

### 4. Footer Component

**Sections:**
- Footer top (multi-column layout)
- Footer bottom (copyright, legal)

**Features:**
- Multi-column layout
- Social media links
- Newsletter signup (optioneel)
- Back to top button

**CSS Classes:**
```css
.footer
.footer__top
.footer__column
.footer__title
.footer__links
.footer__social
.footer__bottom
.footer__copyright
```

---

### 5. Hero Section Component

**Varianten:**
- Centered (text gecentreerd)
- Left-aligned (text links, image rechts)
- Full-background (achtergrond image)
- Gradient background

**Features:**
- Heading + subheading
- CTA buttons (1-2)
- Optional image/illustration
- Height varianten (small, medium, large, full-screen)

**CSS Classes:**
```css
.hero
.hero--centered
.hero--left-aligned
.hero--full-background
.hero--gradient
.hero__content
.hero__title
.hero__subtitle
.hero__actions
.hero__image
```

---

### 6. Content Section Component

**Varianten:**
- Text only
- Text + image (2 column)
- Feature grid (3/4 columns)

**Features:**
- Flexible layout
- Responsive columns
- Image positioning
- Background color options

**CSS Classes:**
```css
.content-section
.content-section--text-only
.content-section--two-column
.content-section--feature-grid
.content-section__container
.content-section__content
.content-section__image
```

---

### 7. Form Elements

**Input Field:**
- Text input
- Email input
- Password input (met show/hide)
- Number input
- Search input (met icon)

**States:**
- Default
- Focus
- Error
- Success
- Disabled

**Textarea:**
- Auto-resize optie
- Character counter

**Select:**
- Single select
- Multi-select (optioneel)
- Custom styling (geen default browser style)

**Checkbox & Radio:**
- Custom styling
- Groepering

**CSS Classes:**
```css
.form-group
.form-label
.form-input
.form-input--error
.form-input--success
.form-textarea
.form-select
.form-checkbox
.form-radio
.form-help-text
.form-error-text
```

---

## 🎨 Styling Aanpak

### Design Token Gebruik (VERPLICHT)

**Alle componenten MOETEN design tokens gebruiken:**

```css
/* GOED ✅ */
.btn--primary {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  padding: var(--spacing-3) var(--spacing-6);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
}

/* FOUT ❌ - Hardcoded values */
.btn--primary {
  background-color: #0ea5e9;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
}
```

### CSS Methodologie: BEM

**Block Element Modifier** naming:

```css
.block { }              /* Component */
.block__element { }     /* Child element */
.block--modifier { }    /* Variant */
.block__element--modifier { } /* Element variant */
```

**Voorbeeld:**
```css
.card { }                    /* Block */
.card__title { }            /* Element */
.card--elevated { }         /* Modifier */
.card__title--large { }     /* Element modifier */
```

---

## 📚 Documentatie Per Component

Elk component krijgt een README.md met:

### 1. **Overzicht**
- Wat doet dit component?
- Wanneer gebruik je het?

### 2. **HTML Structuur**
- Code voorbeeld
- Alle varianten

### 3. **CSS Classes**
- Volledige lijst met beschrijving
- Modifiers en wanneer te gebruiken

### 4. **Accessibility**
- ARIA labels
- Keyboard navigatie
- Screen reader support

### 5. **Voorbeelden**
- Verschillende use cases
- Screenshots (optioneel)

### 6. **Do's en Don'ts**
- Best practices
- Veelgemaakte fouten

---

## 🎯 Deliverables Checklist

### Componenten
- [ ] Button (met alle varianten)
- [ ] Card
- [ ] Header/Navigation
- [ ] Footer
- [ ] Hero Section
- [ ] Content Section
- [ ] Form Elements (Input, Textarea, Select)

### Basis Bestanden
- [ ] `_base/variables.css` - Import design tokens
- [ ] `_base/reset.css` - CSS reset
- [ ] `_base/utilities.css` - Utility classes

### Documentatie
- [ ] `components/README.md` - Library overzicht
- [ ] Per component: README.md met voorbeelden
- [ ] `demo/index.html` - Live preview pagina

### Kwaliteit
- [ ] Alle componenten gebruiken design tokens
- [ ] BEM naming convention toegepast
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Accessibility (WCAG AA)
- [ ] Cross-browser getest

---

## 🔄 Integratie met WordPress

### Hoe componenten later in WordPress worden gebruikt:

1. **Direct in theme templates:**
   ```php
   <div class="card">
     <div class="card__body">
       <h3 class="card__title"><?php the_title(); ?></h3>
       <p class="card__description"><?php the_excerpt(); ?></p>
     </div>
   </div>
   ```

2. **In custom Gutenberg blocks (CRA-9):**
   - Block patterns gebruiken component HTML
   - Block CSS importeert component styling
   - Blocks worden "wrappers" voor componenten

3. **CSS bundling:**
   - Component CSS wordt geïmporteerd in theme `main.css`
   - Of: Per component CSS laden (performance)

---

## ⏱️ Geschatte Tijd per Component

| Component | Tijd | Prioriteit |
|-----------|------|------------|
| Button | 1-2 uur | Hoog |
| Card | 1-2 uur | Hoog |
| Form Elements | 2-3 uur | Hoog |
| Header | 2-3 uur | Medium |
| Footer | 1-2 uur | Medium |
| Hero Section | 1-2 uur | Medium |
| Content Section | 1 uur | Laag |
| Documentatie | 2-3 uur | Hoog |

**Totaal**: ~12-18 uur werk

---

## 🚀 Implementatie Volgorde

### Phase 1: Basis (Start hier)
1. ✅ Setup component directory structuur
2. ✅ `_base/` bestanden (variables, reset, utilities)
3. ✅ Button component (meest gebruikt)
4. ✅ Card component

### Phase 2: Layout
5. Header/Navigation
6. Footer
7. Hero Section
8. Content Section

### Phase 3: Forms
9. Form elements (input, textarea, select)

### Phase 4: Finish
10. Demo page maken
11. Documentatie finaliseren
12. Testing & verification

---

## 📋 Acceptatie Criteria

Voor CRA-7 als "Done":

- [ ] `/components` directory bestaat met alle componenten
- [ ] Minimaal 7 componenten volledig geïmplementeerd
- [ ] Alle componenten gebruiken brand guide design tokens
- [ ] Elk component heeft README.md documentatie
- [ ] Demo page toont alle componenten
- [ ] Componenten zijn responsive
- [ ] Accessibility compliant (WCAG AA)
- [ ] Code volgt BEM naming convention
- [ ] Geen hardcoded kleuren/spacing
- [ ] Cross-browser getest

---

## 🎨 Demo Page Opzet

De `demo/index.html` toont:
- Alle componenten naast elkaar
- Alle varianten per component
- Interactive voorbeelden
- Copy-paste ready HTML
- Kleurenpalette showcase
- Typography showcase

---

## 💡 Volgende Stappen

**Na goedkeuring van dit plan:**

1. Feature branch aanmaken: `feature/ui-component-library`
2. Directory structuur opzetten
3. Basis bestanden maken
4. Component voor component implementeren
5. Testen en documenteren
6. Pull Request naar `develop`
7. Linear issue CRA-7 updaten naar "Done"

---

**Akkoord om te beginnen met dit plan?**

- Ja → We starten met Phase 1
- Aanpassingen → Welke onderdelen wil je anders?

---

**Versie**: 1.0.0
**Gemaakt**: November 2024
