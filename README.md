# WordPress Website Project

Complete WordPress website setup met custom block theme, brand guide integratie en CI/CD pipeline.

## 📋 Project Overzicht

Dit project bevat:
- **Brand Guide** - Complete design system met kleuren, typography en spacing
- **WordPress Block Theme** - Modern FSE theme met custom blocks
- **UI Component Library** - Herbruikbare componenten
- **CI/CD Pipeline** - Automatische deployment naar staging en productie
- **Linear Integration** - Project management met Linear

## 🏗️ Project Structuur

```
wp-setup/
├── brand-guide/              # Brand guide & design tokens
│   ├── colors.json
│   ├── typography.json
│   ├── spacing.json
│   ├── design-tokens.css
│   ├── assets/
│   └── README.md
├── wp-content/
│   └── themes/
│       └── custom-theme/     # WordPress block theme
│           ├── assets/
│           ├── blocks/
│           ├── parts/
│           ├── patterns/
│           ├── templates/
│           ├── functions.php
│           ├── style.css
│           ├── theme.json
│           └── README.md
├── .github/
│   └── workflows/            # GitHub Actions workflows
│       ├── deploy-staging.yml
│       └── deploy-production.yml
├── docs/                     # Project documentatie
├── .gitignore
└── README.md                 # Dit bestand
```

## 🚀 Quick Start

### Lokale Development Setup

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd wp-setup
   ```

2. **WordPress installeren:**

   **Optie A: Met Local by Flywheel**
   - Importeer project in Local
   - Start site
   - Activeer "Custom Client Theme"

   **Optie B: Met XAMPP/MAMP**
   - Plaats project in htdocs/www directory
   - Maak database aan
   - Doorloop WordPress installatie
   - Activeer theme

3. **Theme activeren:**
   - Ga naar `Appearance → Themes`
   - Activeer "Custom Client Theme"

4. **Navigatie instellen:**
   - Ga naar `Appearance → Editor`
   - Pas header en footer aan
   - Voeg menu items toe

## 🎨 Brand Guide

Alle design tokens zijn gedefinieerd in `/brand-guide/`:

### Kleuren
Zie [brand-guide/colors.json](./brand-guide/colors.json)
- Primary: `#0ea5e9`
- Secondary: `#a855f7`
- Neutral grays, success, warning, error kleuren

### Typography
Zie [brand-guide/typography.json](./brand-guide/typography.json)
- Heading font: Inter
- Body font: Inter
- Font sizes: xs → 7xl
- Line heights en weights

### Spacing
Zie [brand-guide/spacing.json](./brand-guide/spacing.json)
- 4px basis grid
- Semantic spacing voor sections en containers

### Design Tokens Gebruiken

In CSS:
```css
.my-element {
  color: var(--color-primary-500);
  font-family: var(--font-heading);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
}
```

In theme.json:
```json
{
  "color": {
    "background": "var(--wp--preset--color--primary)"
  }
}
```

## 🧩 WordPress Theme

Het custom block theme bevindt zich in `/wp-content/themes/custom-theme/`.

### Features
- ✅ Full Site Editing (FSE)
- ✅ Responsive design
- ✅ Toegankelijk (WCAG AA)
- ✅ Performance geoptimaliseerd
- ✅ SEO vriendelijk

### Templates
- `index.html` - Blog listing
- `single.html` - Single post
- `page.html` - Pages
- `parts/header.html` - Header
- `parts/footer.html` - Footer

### Custom Blocks

Voeg custom blocks toe in `/wp-content/themes/custom-theme/blocks/`:

```
blocks/
└── my-block/
    ├── block.json
    ├── index.js
    ├── style.css
    └── editor.css
```

Blocks worden automatisch geregistreerd via `functions.php`.

## 📦 Deployment

### Workflow
```
development → git push → staging → review → production
```

### Branches
- `main` - Productie
- `develop` - Staging
- `feature/*` - Feature branches

### Staging Deployment
**Automatisch bij push naar `develop` branch:**

```bash
git checkout develop
git add .
git commit -m "Update feature"
git push origin develop
```

GitHub Actions deployt automatisch naar staging URL.

### Production Deployment
**Handmatig goedgekeurd:**

1. Merge develop naar main:
   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```

2. Ga naar GitHub Actions
3. Approve deployment
4. Deploy naar productie

## 🔧 Development

### Requirements
- PHP 8.0+
- WordPress 6.4+
- Node.js 18+ (voor block development)

### Theme Development

**Watch mode (voor CSS/JS changes):**
```bash
cd wp-content/themes/custom-theme
npm install
npm run dev
```

**Build voor productie:**
```bash
npm run build
```

### Brand Guide Aanpassen

1. Update JSON files in `/brand-guide/`
2. Regenereer `design-tokens.css` indien nodig
3. Update `theme.json` kleuren/fonts
4. Test componenten

### Custom Blocks Maken

1. Maak block directory in `/blocks/`
2. Voeg `block.json` toe
3. Build met `npm run build`
4. Block is automatisch beschikbaar in editor

## 📚 Documentatie

- [Brand Guide README](./brand-guide/README.md) - Design system documentatie
- [Theme README](./wp-content/themes/custom-theme/README.md) - Theme documentatie
- [Deployment Guide](./docs/deployment.md) - Deployment instructies (TODO)
- [Component Library](./docs/components.md) - UI components (TODO)

## 🔗 Linear Integration

Project tasks worden beheerd in Linear:

**Project**: 🌐 WordPress Website - Klant Project

**Issues**:
- [CRA-6] Brand Guide & Design System Setup
- [CRA-7] UI Component Library
- [CRA-8] WordPress Block Theme Foundation
- [CRA-9] Custom WordPress Blocks
- [CRA-10] GitHub Repository Setup
- [CRA-11] CI/CD Pipeline & Staging Deployment
- [CRA-12] Production Deployment Workflow
- [CRA-13] Documentation & Handover

Zie Linear voor gedetailleerde task beschrijvingen en voortgang.

## 🌐 Environments

### Staging
- **URL**: https://staging.example.com
- **Branch**: `develop`
- **Deployment**: Automatisch via GitHub Actions
- **Purpose**: Testing en client review

### Production
- **URL**: https://example.com
- **Branch**: `main`
- **Deployment**: Handmatig goedgekeurd
- **Purpose**: Live website

## 🛠️ Tech Stack

- **CMS**: WordPress 6.4+
- **Theme**: Custom Block Theme (FSE)
- **Build**: webpack/npm scripts
- **Version Control**: Git + GitHub
- **CI/CD**: GitHub Actions
- **Project Management**: Linear
- **Hosting**: TBD

## ✅ Checklist voor Klant Onboarding

Bij start van een nieuw project:

### Design Assets
- [ ] Logo's ontvangen (SVG + PNG)
- [ ] Brand kleuren gedocumenteerd
- [ ] Brand fonts ontvangen (+ licentie check)
- [ ] Brand guidelines review

### Content
- [ ] Sitemap ontvangen
- [ ] Content structure bepaald
- [ ] Images & media ontvangen
- [ ] Copy/teksten ontvangen

### Technical
- [ ] Hosting credentials
- [ ] Domain DNS toegang
- [ ] Email setup requirements
- [ ] Third-party integrations lijst

### Brand Guide Update
- [ ] Update `colors.json` met echte kleuren
- [ ] Update `typography.json` met echte fonts
- [ ] Upload logo's naar `brand-guide/assets/logo/`
- [ ] Test toegankelijkheid van kleuren

## 🐛 Troubleshooting

### Theme activeert niet
- Check PHP versie (min. 8.0)
- Check WordPress versie (min. 6.4)

### Styling werkt niet
- Clear cache (browser + WordPress)
- Check of design-tokens.css geladen wordt

### Blocks verschijnen niet
- Run `npm run build` in theme directory
- Clear WordPress cache

### Deployment faalt
- Check GitHub Actions logs
- Verify server credentials
- Check file permissions op server

## 🤝 Contributing

Voor team members:

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes en commit
3. Push naar GitHub: `git push origin feature/my-feature`
4. Create Pull Request naar `develop`
5. Na review: merge en deploy naar staging

## 📄 Licentie

Proprietary - © 2024 Craft Digital NL

---

## 📞 Support & Contact

**Developer**: Craft Digital NL
**Website**: https://craftdigital.nl
**Email**: info@craftdigital.nl

Voor vragen over dit project, neem contact op met het development team.

---

**Laatste update**: November 2024
**Project Status**: ✅ Setup Complete - Ready for Development
