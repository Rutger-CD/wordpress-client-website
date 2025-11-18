# Client Project Workflow

Complete workflow voor het bouwen van WordPress websites voor klanten met custom blocks en patterns.

## Inhoudsopgave

- [Project Setup](#project-setup)
- [Design to Code](#design-to-code)
- [Block Development](#block-development)
- [Pattern Creation](#pattern-creation)
- [Content Entry](#content-entry)
- [Testing & QA](#testing--qa)
- [Client Handover](#client-handover)

---

## Project Setup

### Stap 1: Client Briefing

**Verzamel deze informatie:**

- ✅ Gewenste pagina's (Home, About, Services, Contact, etc.)
- ✅ Design mockups (Figma, Adobe XD, Sketch)
- ✅ Branding guidelines (kleuren, fonts, logo's)
- ✅ Content (teksten, afbeeldingen)
- ✅ Functionaliteiten (forms, galleries, etc.)
- ✅ Browser support requirements
- ✅ Timeline en deadlines

### Stap 2: Analyse en Planning

**Identificeer herbruikbare componenten:**

```
Design Analysis:
├── Homepage
│   ├── Hero Section (variant 1: gradient background)
│   ├── Services Grid (3 columns, cards met icons)
│   ├── About Section (text + image, 2 kolommen)
│   └── CTA Section (gradient background, centered)
│
├── About Page
│   ├── Hero Section (variant 2: solid background)
│   ├── Team Grid (4 columns, photo cards)
│   └── Values Section (icon grid)
│
└── Services Page
    ├── Hero Section (variant 1: gradient)
    ├── Service Cards (detailed, with links)
    └── CTA Section

Herbruikbare Blocks:
✅ Hero (2 variants)
✅ Card Grid (flexible columns)
✅ CTA Section
✅ Content Section (text + media)
✅ Icon Grid
```

### Stap 3: Create Linear Issue

**Voor elk nieuw project:**

```bash
# Gebruik Linear API of manual
# Create issue: "Build website for [Client Name]"
# Add to: "Client Projects" team
# Labels: client-work, website

# Beschrijving:
Client: [Name]
Pages: [List]
Timeline: [Dates]
Requirements: [Key features]
```

---

## Design to Code

### Stap 1: Setup Design Tokens

**Extraheer kleuren, fonts en spacing uit design:**

**`brand-guide/design-tokens.css`** (voor deze client)

```css
:root {
	/* Client Colors */
	--color-primary: #667eea;      /* Client brand color */
	--color-secondary: #764ba2;
	--color-accent: #f093fb;

	/* Client Typography */
	--font-family-heading: 'Montserrat', sans-serif;
	--font-family-body: 'Inter', sans-serif;

	/* Client Spacing (als afwijkend) */
	--client-spacing-hero: 120px;
	--client-spacing-section: 80px;
}
```

### Stap 2: Create Component Variants

**Als client specifieke styling nodig heeft:**

**`components/hero/hero-client.css`**

```css
/* Client-specific hero variant */
.hero--client-variant {
	background: linear-gradient(
		135deg,
		var(--color-primary) 0%,
		var(--color-secondary) 100%
	);
	padding: var(--client-spacing-hero) 0;
}

.hero--client-variant .hero__heading {
	font-family: var(--font-family-heading);
	font-size: 4rem;
	text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
```

---

## Block Development

### Workflow voor Nieuwe Blocks

**Scenario: Client heeft specifieke "Testimonial Slider" nodig**

#### Stap 1: Check of Bestaande Block Voldoet

```bash
# Check bestaande blocks
ls blocks/

# Kunnen we card-grid aanpassen?
# Of hebben we nieuwe block nodig?
```

#### Stap 2: Create Nieuwe Block

```bash
cd blocks/
mkdir testimonial-slider
cd testimonial-slider
```

**`blocks/testimonial-slider/block.json`**

```json
{
	"$schema": "https://schemas.wp.org/trunk/block.json",
	"apiVersion": 3,
	"name": "client-website/testimonial-slider",
	"version": "1.0.0",
	"title": "Testimonial Slider",
	"category": "client-website-blocks",
	"icon": "format-quote",
	"description": "Slider met client testimonials",
	"keywords": ["testimonial", "review", "quote", "slider"],
	"textdomain": "client-website",
	"attributes": {
		"testimonials": {
			"type": "array",
			"default": [
				{
					"id": 1,
					"quote": "Great service!",
					"author": "John Doe",
					"company": "Acme Inc",
					"image": ""
				}
			]
		}
	},
	"editorScript": "file:../build/testimonial-slider/index.js",
	"editorStyle": "file:./editor.css",
	"style": "file:./style.css"
}
```

**`blocks/testimonial-slider/index.js`**

```javascript
import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	...metadata,
	edit,
	save,
} );
```

**`blocks/testimonial-slider/edit.js`**

```javascript
import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { Button, PanelBody, IconButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
	const { testimonials } = attributes;
	const blockProps = useBlockProps();

	const addTestimonial = () => {
		setAttributes( {
			testimonials: [
				...testimonials,
				{ id: Date.now(), quote: '', author: '', company: '', image: '' }
			]
		} );
	};

	const removeTestimonial = ( index ) => {
		setAttributes( {
			testimonials: testimonials.filter( ( _, i ) => i !== index )
		} );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Testimonials', 'client-website' ) }>
					<Button isPrimary onClick={ addTestimonial }>
						{ __( 'Add Testimonial', 'client-website' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="testimonial-slider">
					{ testimonials.map( ( testimonial, index ) => (
						<div key={ testimonial.id } className="testimonial-slide">
							<RichText
								tagName="blockquote"
								className="testimonial__quote"
								value={ testimonial.quote }
								onChange={ ( value ) => {
									const newTestimonials = [ ...testimonials ];
									newTestimonials[ index ].quote = value;
									setAttributes( { testimonials: newTestimonials } );
								} }
								placeholder={ __( 'Enter testimonial...', 'client-website' ) }
							/>
							<RichText
								tagName="p"
								className="testimonial__author"
								value={ testimonial.author }
								onChange={ ( value ) => {
									const newTestimonials = [ ...testimonials ];
									newTestimonials[ index ].author = value;
									setAttributes( { testimonials: newTestimonials } );
								} }
								placeholder={ __( 'Author name', 'client-website' ) }
							/>
							<Button
								isDestructive
								onClick={ () => removeTestimonial( index ) }
							>
								{ __( 'Remove', 'client-website' ) }
							</Button>
						</div>
					) ) }
				</div>
			</div>
		</>
	);
}
```

**`blocks/testimonial-slider/save.js`**

```javascript
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { testimonials } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'testimonial-slider',
	} );

	return (
		<div { ...blockProps }>
			<div className="testimonial-slider__container">
				{ testimonials.map( ( testimonial ) => (
					<div key={ testimonial.id } className="testimonial-slide">
						<blockquote className="testimonial__quote">
							<RichText.Content value={ testimonial.quote } />
						</blockquote>
						<p className="testimonial__author">
							<RichText.Content value={ testimonial.author } />
						</p>
						<p className="testimonial__company">
							{ testimonial.company }
						</p>
					</div>
				) ) }
			</div>
		</div>
	);
}
```

**`blocks/testimonial-slider/style.css`**

```css
.testimonial-slider {
	padding: var(--spacing-large) 0;
}

.testimonial-slider__container {
	max-width: var(--content-width-narrow);
	margin: 0 auto;
}

.testimonial-slide {
	text-align: center;
	padding: var(--spacing-large);
}

.testimonial__quote {
	font-size: var(--font-size-xl);
	font-style: italic;
	margin-bottom: var(--spacing-medium);
	position: relative;
}

.testimonial__quote::before {
	content: '"';
	font-size: 4rem;
	color: var(--color-primary);
	opacity: 0.3;
}

.testimonial__author {
	font-weight: var(--font-weight-semibold);
	color: var(--color-text-primary);
}

.testimonial__company {
	color: var(--color-text-secondary);
	font-size: var(--font-size-sm);
}
```

#### Stap 3: Add to Webpack Config

**`blocks/webpack.config.js`**

```javascript
module.exports = {
	...defaultConfig,
	entry: {
		'hero/index': path.resolve(__dirname, 'hero', 'index.js'),
		'content-section/index': path.resolve(__dirname, 'content-section', 'index.js'),
		'button/index': path.resolve(__dirname, 'button', 'index.js'),
		'card-grid/index': path.resolve(__dirname, 'card-grid', 'index.js'),
		'cta-section/index': path.resolve(__dirname, 'cta-section', 'index.js'),
		'testimonial-slider/index': path.resolve(__dirname, 'testimonial-slider', 'index.js'),  // NEW
	},
};
```

#### Stap 4: Register in functions.php

**`functions.php`**

```php
function client_website_register_blocks() {
    $blocks = [
        'hero',
        'content-section',
        'card-grid',
        'button',
        'cta-section',
        'testimonial-slider',  // NEW
    ];

    foreach ($blocks as $block) {
        register_block_type(__DIR__ . '/blocks/' . $block);
    }
}
```

#### Stap 5: Build en Test

```bash
# Build block
cd blocks/
npm run build

# Flush cache
npx @wordpress/env run cli wp cache flush

# Test in WordPress
# http://localhost:8888/wp-admin
```

---

## Pattern Creation

### Workflow voor Nieuwe Patterns

**Scenario: Client homepage layout**

#### Stap 1: Design Analysis

```
Homepage Layout:
1. Hero (gradient, "Transform Your Business")
2. Services Grid (3 services)
3. About Section (text + image)
4. Testimonials
5. CTA (contact)
```

#### Stap 2: Build in WordPress First

```
1. Login: http://localhost:8888/wp-admin
2. Pages → Add New → "Client Homepage Draft"
3. Add blocks en configureer ze
4. Style precies zoals design
5. Save draft
```

#### Stap 3: Extract Pattern

```
1. Klik ⋮ (three dots) → "Copy all blocks"
2. Create patterns/client-homepage.php
3. Paste de markup
4. Add pattern header
```

**`patterns/client-homepage.php`**

```php
<?php
/**
 * Title: Client Homepage
 * Slug: client-website/client-homepage
 * Categories: client-website-patterns
 * Description: Complete homepage layout voor [Client Name]
 */
?>

<!-- wp:client-website/hero {"heading":"Transform Your Business","subheading":"Leading Solutions","description":"We help businesses achieve their digital goals","primaryButtonText":"Get Started","primaryButtonUrl":"/contact","secondaryButtonText":"Our Services","secondaryButtonUrl":"/services","variant":"gradient","alignment":"center"} -->
<div class="wp-block-client-website-hero hero hero--gradient hero--center"><div class="hero__container"><div class="hero__content"><p class="hero__subheading">Leading Solutions</p><h1 class="hero__heading">Transform Your Business</h1><p class="hero__description">We help businesses achieve their digital goals</p><div class="hero__actions"><a href="/contact" class="btn btn--primary btn--large">Get Started</a><a href="/services" class="btn btn--secondary btn--large">Our Services</a></div></div></div></div>
<!-- /wp:client-website/hero -->

<!-- Continue met andere blocks... -->
```

#### Stap 4: Create Page Variations

```bash
patterns/
├── client-homepage.php          # Homepage
├── client-about.php             # About page
├── client-services.php          # Services page
├── client-service-detail.php    # Individual service
└── client-contact.php           # Contact page
```

#### Stap 5: Create Reusable Sections

```bash
patterns/
├── client-hero-home.php         # Hero voor homepage
├── client-hero-about.php        # Hero voor about
├── client-services-grid.php     # Services grid (herbruikbaar)
├── client-testimonials.php      # Testimonials sectie
└── client-cta-contact.php       # Contact CTA
```

---

## Content Entry

### Workflow voor Client Content

#### Optie A: Content in Patterns (Recommended)

**Voordelen:**
- Client krijgt pre-filled content
- Sneller om te starten
- Minder kans op layout problemen

```php
// Pattern met echte client content
"heading":"Welkom bij [Client Name]"
"description":"We zijn gespecialiseerd in [client industry]"
```

#### Optie B: Placeholder Content

**Voordelen:**
- Client vult zelf in
- Meer flexibiliteit

```php
// Pattern met placeholders
"heading":"[Your Heading Here]"
"description":"[Describe your business in 2-3 sentences]"
```

### Content Checklist

Voor elke pagina:

- ✅ Headings zijn H1 (page title), H2 (sections), H3 (subsections)
- ✅ Alt text voor alle afbeeldingen
- ✅ Links hebben duidelijke labels
- ✅ CTA buttons hebben actie-gerichte tekst
- ✅ Contact info is correct
- ✅ Social media links werken

---

## Testing & QA

### Pre-Handover Checklist

#### Functionaliteit

```bash
# Test alle pages
✅ Homepage
✅ About
✅ Services
✅ Contact
✅ Privacy Policy
✅ Terms & Conditions

# Test alle blocks
✅ Blocks laden correct
✅ Editing werkt
✅ Saving werkt zonder errors
✅ Patterns inserteren correct
```

#### Responsive Design

```
✅ Desktop (1920px)
✅ Laptop (1366px)
✅ Tablet (768px)
✅ Mobile (375px)

Test:
- Navigation menu (hamburger op mobile)
- Images schalen correct
- Text is leesbaar
- Buttons zijn klikbaar
- Forms zijn bruikbaar
```

#### Browser Testing

```
✅ Chrome (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Edge (latest)
✅ Mobile Safari (iOS)
✅ Chrome Mobile (Android)
```

#### Performance

```bash
# Test loading speed
✅ Google PageSpeed Insights
✅ GTmetrix
✅ WebPageTest

Targets:
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Largest Contentful Paint < 2.5s
```

#### SEO Basics

```
✅ Meta titles (< 60 chars)
✅ Meta descriptions (< 160 chars)
✅ H1 per page (1x)
✅ Alt text op images
✅ Sitemap.xml
✅ Robots.txt
```

---

## Client Handover

### Stap 1: Create Handover Document

**`docs/CLIENT-HANDOVER-[Name].md`**

```markdown
# Website Handover - [Client Name]

## Login Credentials

- URL: https://client-website.com/wp-admin
- Username: [provided separately]
- Password: [provided separately]

## How to Edit Pages

### Adding New Page
1. Go to Pages → Add New
2. Choose pattern from "Client Website - Patterns"
3. Customize content
4. Click Publish

### Editing Existing Page
1. Go to Pages → All Pages
2. Click page name
3. Edit blocks
4. Click Update

## Available Blocks

### Hero Section
- Use for: Page headers
- Options: Gradient or solid background, 1 or 2 buttons

### Card Grid
- Use for: Services, team members, features
- Options: 2, 3, or 4 columns

[Continue with all blocks...]

## Support

For technical issues:
- Email: support@youragency.com
- Phone: [number]
- Hours: Mon-Fri 9-5
```

### Stap 2: Record Video Tutorial

**Opnemen met Loom/Screen recorder:**

1. **Intro** (1 min)
   - WordPress dashboard overview
   - Where to find things

2. **Editing Pages** (3 min)
   - Open existing page
   - Edit text in blocks
   - Change images
   - Update buttons
   - Publish changes

3. **Adding New Pages** (2 min)
   - Create new page
   - Choose pattern
   - Customize
   - Publish

4. **Managing Media** (2 min)
   - Upload images
   - Image library
   - Replace images in blocks

5. **Common Tasks** (2 min)
   - Update contact info
   - Change social media links
   - Update footer

### Stap 3: Training Session

**1-hour online meeting:**

```
1. Website Overview (10 min)
   - Show live site
   - Explain structure
   - Demonstrate responsive design

2. WordPress Basics (15 min)
   - Login
   - Dashboard tour
   - Pages vs Posts
   - Media library

3. Editing Blocks (20 min)
   - Click through each block type
   - Show editing options
   - Demonstrate patterns
   - Practice together

4. Common Tasks (10 min)
   - Update homepage
   - Add new service
   - Change contact info

5. Q&A (5 min)
   - Answer questions
   - Address concerns
```

### Stap 4: Handover Checklist

```
✅ WordPress login credentials provided
✅ Handover document created
✅ Video tutorials recorded
✅ Training session completed
✅ Client can edit pages independently
✅ Client knows how to add new pages
✅ Client knows who to contact for support
✅ Backup system explained
✅ Update schedule discussed (if applicable)
```

---

## Maintenance Workflow

### Monthly Tasks

```bash
# 1. Backup check
✅ Verify automatic backups are running
✅ Test restore process quarterly

# 2. Updates
✅ WordPress core updates
✅ Plugin updates
✅ Theme updates (if any)

# 3. Performance
✅ Check site speed
✅ Review analytics
✅ Optimize images if needed

# 4. Security
✅ Review security logs
✅ Check for spam/malware
✅ Update SSL certificates (annual)
```

### Client Requests

**Nieuwe content block nodig:**

```bash
# 1. Analyze request
# 2. Check if existing block can be extended
# 3. Create new block (follow Block Development workflow)
# 4. Test thoroughly
# 5. Deploy to staging
# 6. Train client
# 7. Deploy to production
```

---

## Tips voor Efficiency

### Herbruik Patterns

```bash
# Maak een library van proven patterns
patterns/library/
├── hero-standard.php          # Basis hero
├── hero-with-video.php        # Hero met video bg
├── services-3col.php          # 3-column services
├── team-4col.php              # Team grid
└── cta-bottom.php             # Bottom CTA

# Voor nieuwe client: kopieer en customize
```

### Document Alles

```bash
# Per client project:
docs/clients/
├── client-name/
│   ├── HANDOVER.md            # Client-specific handover
│   ├── CREDENTIALS.md         # Login info (encrypted)
│   ├── CUSTOM-BLOCKS.md       # Client-specific blocks
│   └── MAINTENANCE-LOG.md     # Maintenance history
```

### Use Checklists

```bash
# Create templates voor elke fase
checklists/
├── project-setup.md
├── design-analysis.md
├── development-checklist.md
├── testing-qa.md
└── handover-checklist.md
```

---

## Gerelateerde Documentatie

- [BLOCKS-DEVELOPMENT.md](./BLOCKS-DEVELOPMENT.md) - Block development guide
- [PATTERNS-DEVELOPMENT.md](./PATTERNS-DEVELOPMENT.md) - Pattern creation guide
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues
- [LOCAL-DEVELOPMENT.md](./LOCAL-DEVELOPMENT.md) - Development environment

---

**Succesvol project afgerond?** Add lessons learned aan deze guide!
