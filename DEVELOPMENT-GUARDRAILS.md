# Development Guardrails

Deze guardrails MOETEN ALTIJD worden gevolgd tijdens development. Dit document dient als single source of truth voor development workflow en standaarden.

---

## 🎯 1. Linear Issue Management

### **KRITISCH: Project Scope**
- ✅ **ALTIJD alleen issues ophalen binnen het huidige project**
- ✅ **NOOIT issues van andere projecten ophalen of bewerken**
- ✅ **Project ID/naam verificeren voordat queries worden uitgevoerd**
- ✅ **Filter altijd op project bij GraphQL queries**

**Huidig Project**: `🌐 WordPress Website - Klant Project`

**Voorbeeld correcte query:**
```javascript
// GOED - Filter op project
query {
  issues(filter: {
    project: { id: { eq: "PROJECT_ID" } }
  }) {
    nodes { ... }
  }
}

// FOUT - Haalt alle issues op (kan andere projecten bevatten)
query {
  issues(first: 50) {
    nodes { ... }
  }
}
```

### Issue Workflow
- ✅ **VOOR** ik aan een taak begin: Linear issue checken en beschrijving lezen
- ✅ **TIJDENS** de taak: Status updaten naar "In Progress"
- ✅ **NA** voltooiing:
  - Status naar "Done" updaten
  - Gedetailleerde comment toevoegen met wat is gedaan
  - Checklist items afvinken
- ✅ **Acceptatiecriteria ALTIJD checken** voordat task als "done" wordt gemarkeerd
- ✅ **NOOIT** een issue sluiten zonder alle deliverables te hebben voltooid

### Linear Updates Timing
- ⏰ **ONMIDDELLIJK** na voltooiing updaten, niet batch updates
- ⏰ **Real-time** status bijhouden
- ⏰ **Direct** comments toevoegen na elke milestone

---

## 💻 2. Code Quality & Standards

### WordPress
- ✅ WordPress Coding Standards volgen (WPCS)
- ✅ Escaping: `esc_html()`, `esc_attr()`, `esc_url()`
- ✅ Sanitization: `sanitize_text_field()`, `sanitize_email()`, etc.
- ✅ Nonces gebruiken voor forms en AJAX
- ✅ Prepared statements voor database queries

### CSS
- ✅ BEM naming convention: `.block__element--modifier`
- ✅ **ALLEEN** design tokens gebruiken (CSS custom properties)
- ✅ Mobile-first approach (min-width media queries)
- ✅ Logical properties waar mogelijk (`inline-start` vs `left`)

### JavaScript
- ✅ ES6+ syntax gebruiken
- ✅ `'use strict'` mode
- ✅ Const/let, NOOIT var
- ✅ Arrow functions waar logisch
- ✅ Template literals voor strings
- ✅ Async/await voor asynchrone code

### PHP
- ✅ Type hints gebruiken (PHP 8.0+)
- ✅ Return type declarations
- ✅ DocBlocks voor alle functions/classes
- ✅ Namespace gebruiken waar van toepassing
- ✅ PSR-4 autoloading volgen

### Algemeen
- ✅ **NOOIT** hardcoded waarden - altijd design tokens
- ✅ **NOOIT** `!important` in CSS (behalve utility classes)
- ✅ **NOOIT** inline styles (gebruik classes)
- ✅ DRY principle (Don't Repeat Yourself)

---

## ♿ 3. Toegankelijkheid (A11y)

### WCAG AA Compliance (VERPLICHT)
- ✅ Kleurcontrast minimaal **4.5:1** voor normale tekst
- ✅ Kleurcontrast minimaal **3:1** voor grote tekst (18px+)
- ✅ Semantic HTML gebruiken (`<nav>`, `<main>`, `<article>`, etc.)
- ✅ ARIA labels toevoegen waar nodig
- ✅ Alt text voor ALLE afbeeldingen (of `alt=""` voor decoratieve)
- ✅ Keyboard navigatie: alles bereikbaar via Tab
- ✅ Focus indicators zichtbaar en duidelijk
- ✅ Skip links voor navigatie
- ✅ Form labels correct gekoppeld
- ✅ Error messages duidelijk en beschrijvend

### Testing
- ✅ Keyboard-only navigatie testen
- ✅ Screen reader testen (NVDA/JAWS)
- ✅ WAVE browser extension gebruiken
- ✅ axe DevTools gebruiken

---

## 🧪 4. Testing & Verificatie

### Responsive Testing (VERPLICHT)
- ✅ Mobile: 375px, 414px
- ✅ Tablet: 768px, 1024px
- ✅ Desktop: 1280px, 1920px
- ✅ Touch targets minimaal 44x44px

### Browser Compatibility
- ✅ Chrome (laatste 2 versies)
- ✅ Firefox (laatste 2 versies)
- ✅ Safari (laatste 2 versies)
- ✅ Edge (laatste 2 versies)
- ❌ IE11 NIET ondersteunen

### WordPress Testing
- ✅ Theme activeren zonder errors
- ✅ Gutenberg editor testen
- ✅ FSE site editor testen
- ✅ Blocks correct renderen in frontend
- ✅ Blocks correct werken in editor

### Performance
- ✅ Lighthouse score > 90 (Performance)
- ✅ First Contentful Paint < 2s
- ✅ Largest Contentful Paint < 2.5s
- ✅ Cumulative Layout Shift < 0.1
- ✅ Images geoptimaliseerd (WebP + fallback)
- ✅ CSS/JS minified in productie

---

## 🔀 5. Git & Version Control

### Branch Strategy
- ✅ `main` = Productie (PROTECTED)
- ✅ `develop` = Staging
- ✅ `feature/*` = Feature branches
- ✅ `bugfix/*` = Bug fixes
- ✅ `hotfix/*` = Urgent production fixes

### Commit Messages (Conventional Commits)
```
feat: Add hero section block pattern
fix: Resolve mobile menu toggle issue
docs: Update brand guide README
style: Format CSS according to BEM
refactor: Optimize image loading function
perf: Lazy load images below fold
test: Add accessibility tests
chore: Update dependencies
```

### Workflow
1. ✅ Maak feature branch van `develop`
2. ✅ Werk in feature branch
3. ✅ Commit met duidelijke messages
4. ✅ Push naar GitHub
5. ✅ Maak Pull Request naar `develop`
6. ✅ Review (indien team)
7. ✅ Merge na goedkeuring
8. ✅ **NOOIT** direct naar `main` pushen

### Pre-commit Checklist
- ✅ Code getest (responsive, browsers)
- ✅ Geen console.log statements
- ✅ Geen commented-out code
- ✅ Geen TODO comments (maak Linear issue)
- ✅ Linear issue updated

---

## 📚 6. Documentation

### Code Documentation
- ✅ Inline comments voor **complexe** logica (niet voor obvious code)
- ✅ DocBlocks voor alle functions (PHP)
- ✅ JSDoc voor complexe JavaScript functions
- ✅ Component usage voorbeelden

**PHP DocBlock Template:**
```php
/**
 * Short description of function
 *
 * Longer description if needed
 *
 * @param string $param1 Description of param1
 * @param int    $param2 Description of param2
 * @return bool Returns true on success, false on failure
 * @since 1.0.0
 */
function my_function( $param1, $param2 ) {
    // Function body
}
```

### File Documentation
- ✅ README.md updaten bij nieuwe features
- ✅ CHANGELOG.md bijhouden
- ✅ API/Hook documentatie
- ✅ Setup instructies actueel houden

### What to Document
- ✅ **WHY** code doet wat het doet (niet WHAT)
- ✅ Complexe algoritmes
- ✅ Workarounds voor bugs/browser issues
- ✅ Public API's en hooks
- ❌ **NIET** obvious code documenteren

---

## 🎨 7. Brand Guide Adherence (STRIKT)

### CSS Custom Properties (VERPLICHT)
```css
/* GOED */
.element {
  color: var(--color-primary-500);
  font-size: var(--text-lg);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
}

/* FOUT - Hardcoded values */
.element {
  color: #0ea5e9;
  font-size: 18px;
  padding: 16px;
  border-radius: 8px;
}
```

### Design Token Sources
- ✅ **Kleuren**: ALLEEN uit `brand-guide/colors.json`
- ✅ **Typography**: ALLEEN uit `brand-guide/typography.json`
- ✅ **Spacing**: ALLEEN uit `brand-guide/spacing.json`
- ✅ **Overige**: ALLEEN uit `brand-guide/design-tokens.css`

### Forbidden
- ❌ **NOOIT** hardcoded hex colors
- ❌ **NOOIT** hardcoded px values voor spacing
- ❌ **NOOIT** random font sizes
- ❌ **NOOIT** custom box-shadows (gebruik design tokens)

### Verificatie
- ✅ Grep search voor hardcoded values voor commit
- ✅ Visual check tegen brand guide
- ✅ Kleurcontrast check (WCAG)

---

## 📁 8. File Structure & Organization

### Naming Conventions
**PHP:**
- ✅ Functions: `snake_case` met prefix (`custom_theme_function_name`)
- ✅ Classes: `PascalCase` (`My_Custom_Class`)
- ✅ Files: `lowercase-with-hyphens.php`

**CSS:**
- ✅ Classes: `kebab-case` of BEM (`.block__element--modifier`)
- ✅ Files: `lowercase-with-hyphens.css`

**JavaScript:**
- ✅ Functions: `camelCase` (`myFunctionName`)
- ✅ Classes: `PascalCase` (`MyClass`)
- ✅ Files: `camelCase.js` of `kebab-case.js`

### File Placement
```
wp-content/themes/custom-theme/
├── assets/
│   ├── css/         # Stylesheets
│   ├── js/          # JavaScript
│   └── images/      # Theme images (not content)
├── blocks/          # Custom Gutenberg blocks
├── inc/             # Include files (functions)
├── parts/           # Template parts
├── patterns/        # Block patterns
├── templates/       # Page templates
└── functions.php    # Main functions file
```

### Asset Optimization
- ✅ Images: Compress (TinyPNG/ImageOptim)
- ✅ SVG: Optimize (SVGOMG)
- ✅ CSS: Minify in productie
- ✅ JS: Minify in productie
- ✅ WebP + fallback voor images

### .gitignore
```
# ALTIJD in .gitignore
node_modules/
vendor/
*.log
.env
.DS_Store
wp-config.php
uploads/
```

---

## 🔒 9. Security

### WordPress Security
- ✅ Nonces voor alle forms en AJAX
- ✅ Capability checks (`current_user_can()`)
- ✅ Input validation en sanitization
- ✅ Output escaping
- ✅ Prepared statements voor queries
- ✅ HTTPS enforced in productie

### Sensitive Data
- ❌ **NOOIT** API keys in code
- ❌ **NOOIT** passwords in code
- ❌ **NOOIT** credentials in git
- ✅ **ALTIJD** .env gebruiken voor secrets
- ✅ **ALTIJD** .env in .gitignore

### SQL Injection Prevention
```php
// GOED - Prepared statement
$wpdb->prepare(
    "SELECT * FROM {$wpdb->posts} WHERE ID = %d",
    $post_id
);

// FOUT - Direct query
$wpdb->query( "SELECT * FROM {$wpdb->posts} WHERE ID = " . $post_id );
```

---

## ✅ Pre-Deployment Checklist

Voordat code naar productie gaat:

### Functionality
- [ ] Alle Linear issues voor deze release zijn "Done"
- [ ] Alle acceptatiecriteria zijn gehaald
- [ ] Geen console.log of debug code
- [ ] Geen TODOs in code

### Testing
- [ ] Responsive getest (mobile, tablet, desktop)
- [ ] Cross-browser getest
- [ ] Accessibility getest (WAVE, axe)
- [ ] Performance getest (Lighthouse > 90)
- [ ] Forms getest (validation, submission)

### Security
- [ ] Geen hardcoded credentials
- [ ] Input validation/sanitization
- [ ] Output escaping
- [ ] CSRF protection (nonces)

### Documentation
- [ ] README updated
- [ ] CHANGELOG updated
- [ ] Inline documentation compleet
- [ ] Linear updated

### Assets
- [ ] Images geoptimaliseerd
- [ ] CSS minified
- [ ] JS minified
- [ ] Fonts loaded correctly

---

## 🚨 Red Flags (STOP IMMEDIATELY)

Als je een van deze tegenkomt, STOP en fix eerst:

- 🚨 Hardcoded API keys of passwords
- 🚨 SQL queries zonder prepared statements
- 🚨 User input niet gesanitized
- 🚨 Output niet escaped
- 🚨 Kleurcontrast < 4.5:1
- 🚨 Lighthouse score < 70
- 🚨 Theme errors bij activeren
- 🚨 JavaScript console errors
- 🚨 Broken responsive layout
- 🚨 Keyboard navigatie werkt niet
- 🚨 Issues van andere Linear projecten bewerkt

---

## 📊 Quality Metrics

Minimale standaarden voor alle code:

| Metric | Minimum | Target |
|--------|---------|--------|
| Lighthouse Performance | 70 | 90+ |
| Lighthouse Accessibility | 90 | 100 |
| Lighthouse Best Practices | 90 | 100 |
| Lighthouse SEO | 90 | 100 |
| WCAG Compliance | AA | AA |
| Browser Support | Last 2 versions | Last 2 versions |
| Mobile Responsive | 100% | 100% |
| Code Coverage (tests) | N/A | 80%+ |

---

## 🔄 Review Process

### Self-Review Checklist
Voordat je code commit:
- [ ] Guardrails gevolgd?
- [ ] Code getest?
- [ ] Documentation updated?
- [ ] Linear updated?
- [ ] No hardcoded values?
- [ ] Accessibility checked?
- [ ] Performance OK?

### Peer Review (indien van toepassing)
- Code review door teamlid
- Accessibility review
- Design review tegen brand guide
- Performance review

---

## 📝 Linear Project Scope Verificatie

### Voordat je queries uitvoert:

**STAP 1: Haal project info op**
```javascript
const PROJECT_NAME = '🌐 WordPress Website - Klant Project';

// Verify we're in the right project
const query = `
  query {
    projects(filter: { name: { eq: "${PROJECT_NAME}" } }) {
      nodes {
        id
        name
      }
    }
  }
`;
```

**STAP 2: Gebruik project ID in alle queries**
```javascript
const issuesQuery = `
  query($projectId: String!) {
    issues(filter: {
      project: { id: { eq: $projectId } }
    }) {
      nodes { ... }
    }
  }
`;
```

**STAP 3: Verificatie output**
```javascript
console.log(`✓ Working on project: ${project.name}`);
console.log(`✓ Project ID: ${project.id}`);
console.log(`✓ Found ${issues.length} issues in THIS project`);
```

### NOOIT doen:
```javascript
// FOUT - Haalt alle issues op
query {
  issues(first: 50) { ... }
}

// FOUT - Filter op identifier zonder project check
query {
  issues(filter: { identifier: { in: ["CRA-6"] } }) { ... }
}
```

---

**Versie**: 1.0.0
**Laatst bijgewerkt**: November 2024
**Eigenaar**: Craft Digital NL

---

**BELANGRIJK**: Deze guardrails zijn NIET optioneel. Ze MOETEN worden gevolgd voor alle code die in dit project wordt geschreven.
