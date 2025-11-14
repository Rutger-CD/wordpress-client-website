# UI Component Library

A comprehensive, accessible component library built with design tokens from the brand guide.

## 🎯 Overview

This component library provides reusable UI components for the WordPress website. All components follow:

- ✅ **Design Token System** - No hardcoded values, everything uses tokens
- ✅ **BEM Methodology** - Clear, maintainable CSS naming
- ✅ **WCAG AA Compliance** - Accessible by default
- ✅ **Mobile-First** - Responsive across all devices
- ✅ **Print-Friendly** - Optimized for printing
- ✅ **Performance** - Minimal CSS, no JavaScript dependencies

## 📦 Components

### Completed (Phase 1)

1. **[Button](./button/)** - Flexible button with variants, sizes, and states
2. **[Card](./card/)** - Versatile card for grouped content

### Planned (Phase 2-3)

3. **Header** - Site navigation and branding
4. **Footer** - Site footer with links and info
5. **Hero** - Landing page hero sections
6. **Content Section** - Various content layouts
7. **Form** - Input fields, textareas, checkboxes, etc.

## 🚀 Quick Start

### View Demo

Open [components/demo/index.html](./demo/index.html) in your browser to see all components in action.

### Using Components

1. **Import base styles** (required for all components):

```html
<link rel="stylesheet" href="components/_base/variables.css">
<link rel="stylesheet" href="components/_base/reset.css">
<link rel="stylesheet" href="components/_base/utilities.css">
```

2. **Import component styles**:

```html
<link rel="stylesheet" href="components/button/button.css">
<link rel="stylesheet" href="components/card/card.css">
```

3. **Use the components**:

```html
<button class="btn btn--primary">Click me</button>

<div class="card">
  <div class="card__header">
    <h3 class="card__title">Card Title</h3>
  </div>
  <div class="card__body">
    <p class="card__text">Card content</p>
  </div>
</div>
```

## 📁 Directory Structure

```
components/
├── _base/              # Foundation styles (required)
│   ├── variables.css   # Design token imports
│   ├── reset.css       # CSS reset
│   └── utilities.css   # Utility classes
├── button/             # Button component
│   ├── button.html     # Examples
│   ├── button.css      # Styles
│   └── README.md       # Documentation
├── card/               # Card component
│   ├── card.html       # Examples
│   ├── card.css        # Styles
│   └── README.md       # Documentation
├── demo/               # Live demo page
│   └── index.html      # Interactive demo
└── README.md           # This file
```

## 🎨 Design Tokens

All components use design tokens from [brand-guide/design-tokens.css](../brand-guide/design-tokens.css):

### Color Tokens
- Primary: `--color-primary-{50,100,...,900}`
- Secondary: `--color-secondary-{50,100,...,900}`
- Neutral: `--color-neutral-{50,100,...,900}`
- Semantic: `--color-success`, `--color-warning`, `--color-error`, `--color-info`

### Spacing Tokens
- `--spacing-{1,2,3,4,6,8,12,16,20,24}` (4px base grid)

### Typography Tokens
- Font families: `--font-heading`, `--font-body`
- Sizes: `--text-{xs,sm,base,lg,xl,2xl,3xl,4xl}`
- Weights: `--font-{normal,medium,semibold,bold}`
- Line heights: `--line-height-{tight,normal,relaxed}`

### Effect Tokens
- Radius: `--radius-{none,sm,base,md,lg,xl,2xl,full}`
- Shadows: `--shadow-{sm,base,md,lg,xl}`
- Transitions: `--transition-base`

## 🧱 BEM Methodology

All components follow BEM (Block Element Modifier) naming:

```css
/* Block */
.component { }

/* Element */
.component__element { }

/* Modifier */
.component--modifier { }
.component__element--modifier { }
```

### Examples

```html
<!-- Button component -->
<button class="btn btn--primary btn--large">
  <svg class="btn__icon">...</svg>
  <span class="btn__text">Button</span>
</button>

<!-- Card component -->
<div class="card card--elevated card--horizontal">
  <div class="card__header">
    <h3 class="card__title">Title</h3>
  </div>
  <div class="card__body">
    <p class="card__text">Content</p>
  </div>
</div>
```

## ♿ Accessibility

All components follow WCAG 2.1 AA standards:

### Built-in Features
- ✅ Semantic HTML
- ✅ Keyboard navigation support
- ✅ Focus indicators (`:focus-visible`)
- ✅ ARIA labels where needed
- ✅ Color contrast ratios
- ✅ Screen reader support
- ✅ Reduced motion support

### Best Practices

```html
<!-- Good: Semantic button -->
<button class="btn btn--primary">Save</button>

<!-- Good: Icon with label -->
<button class="btn btn--icon-only" aria-label="Close">
  <svg class="btn__icon">...</svg>
</button>

<!-- Good: Clickable card -->
<a href="/details" class="card card--clickable">
  <div class="card__header">
    <h3 class="card__title">Title</h3>
  </div>
</a>
```

## 📱 Responsive Design

All components are mobile-first and responsive:

### Breakpoints
- Mobile: `< 768px` (default)
- Tablet: `768px - 1023px`
- Desktop: `≥ 1024px`

### Responsive Classes

```html
<!-- Hidden on mobile, visible on desktop -->
<div class="md:block hidden">Desktop only</div>

<!-- Stack button groups on mobile -->
<div class="btn-group btn-group--responsive">
  <button class="btn btn--primary btn--responsive">Button 1</button>
  <button class="btn btn--secondary btn--responsive">Button 2</button>
</div>

<!-- Responsive card grid -->
<div class="card-grid">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

## 🔧 Utility Classes

The library includes utility classes for common styling needs:

### Spacing
```html
<div class="mt-4 mb-8 p-6">Spacing utilities</div>
```

### Text
```html
<p class="text-center text-lg font-semibold text-primary">
  Text utilities
</p>
```

### Layout
```html
<div class="flex items-center justify-between gap-4">
  <span>Item 1</span>
  <span>Item 2</span>
</div>
```

### Display
```html
<div class="hidden md:block">Responsive display</div>
```

See [_base/utilities.css](./_base/utilities.css) for complete list.

## 🎯 Usage Examples

### Call to Action Section

```html
<div class="card card--elevated" style="text-align: center;">
  <div class="card__header">
    <h2 class="card__title">Ready to get started?</h2>
  </div>
  <div class="card__body">
    <p class="card__text">
      Join thousands of satisfied customers today.
    </p>
  </div>
  <div class="card__footer">
    <button class="btn btn--primary btn--large">Get Started</button>
    <button class="btn btn--tertiary btn--large">Learn More</button>
  </div>
</div>
```

### Product Grid

```html
<div class="card-grid card-grid--3">
  <div class="card card--elevated">
    <div class="card__badge">Sale</div>
    <div class="card__media">
      <img class="card__image" src="product1.jpg" alt="Product 1">
    </div>
    <div class="card__header">
      <h3 class="card__title">Product Name</h3>
      <p class="card__subtitle">$99.99</p>
    </div>
    <div class="card__body">
      <p class="card__text">Product description here.</p>
    </div>
    <div class="card__footer">
      <button class="btn btn--primary btn--full-width">Add to Cart</button>
    </div>
  </div>
  <!-- More products... -->
</div>
```

### Notification

```html
<div class="card card--success card--compact">
  <div class="card__header">
    <h4 class="card__title">✓ Success</h4>
  </div>
  <div class="card__body">
    <p class="card__text">Your changes have been saved.</p>
  </div>
</div>
```

## 🔄 WordPress Integration

### In Block Theme

Use components in custom blocks:

```php
<!-- wp:html -->
<div class="card card--elevated">
  <div class="card__header">
    <h3 class="card__title"><?php echo esc_html( $title ); ?></h3>
  </div>
  <div class="card__body">
    <p class="card__text"><?php echo esc_html( $content ); ?></p>
  </div>
</div>
<!-- /wp:html -->
```

### Enqueue Styles

In `functions.php`:

```php
function enqueue_component_styles() {
  wp_enqueue_style(
    'component-base',
    get_template_directory_uri() . '/components/_base/variables.css'
  );
  wp_enqueue_style(
    'component-reset',
    get_template_directory_uri() . '/components/_base/reset.css'
  );
  wp_enqueue_style(
    'component-utilities',
    get_template_directory_uri() . '/components/_base/utilities.css'
  );
  wp_enqueue_style(
    'component-button',
    get_template_directory_uri() . '/components/button/button.css'
  );
  wp_enqueue_style(
    'component-card',
    get_template_directory_uri() . '/components/card/card.css'
  );
}
add_action( 'wp_enqueue_scripts', 'enqueue_component_styles' );
```

## 🧪 Testing Checklist

When adding new components, ensure:

- [ ] Uses only design tokens (no hardcoded values)
- [ ] Follows BEM naming convention
- [ ] Includes comprehensive README
- [ ] Has examples in .html file
- [ ] Works on mobile, tablet, and desktop
- [ ] Keyboard accessible
- [ ] Screen reader friendly
- [ ] Passes color contrast checks
- [ ] Respects `prefers-reduced-motion`
- [ ] Includes print styles if applicable
- [ ] Added to demo page

## 📚 Documentation

Each component has its own README with:
- Features overview
- Usage examples
- CSS class reference
- Accessibility guidelines
- Responsive behavior
- Browser support

See individual component directories for detailed documentation.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Components use modern CSS but degrade gracefully in older browsers.

## 🤝 Contributing

When adding new components:

1. Create component directory: `components/component-name/`
2. Add required files:
   - `component-name.html` - Examples
   - `component-name.css` - Styles (BEM + tokens only)
   - `README.md` - Documentation
3. Update demo page with examples
4. Update this README
5. Test accessibility and responsiveness

## 📝 License

Part of the WordPress Website Project.

---

**Last Updated**: November 2024
**Version**: 1.0.0
**Status**: Phase 1 Complete (Button + Card)
