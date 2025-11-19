# Hero Component

A full-width hero section component with background image support, overlay, and call-to-action.

## Features

- ✅ Full-width or contained layout
- ✅ Background image support
- ✅ Gradient overlay options
- ✅ Heading and subheading text
- ✅ Call-to-action button
- ✅ Responsive design
- ✅ All styling uses design tokens
- ✅ WCAG AA compliant

## Basic Usage

```html
<section class="hero">
  <div class="hero__overlay"></div>
  <div class="hero__content">
    <h1 class="hero__title">Welcome to Our Site</h1>
    <p class="hero__subtitle">Discover amazing products and services</p>
    <a href="#" class="btn btn--primary btn--large">Get Started</a>
  </div>
</section>
```

## With Background Image

```html
<section class="hero" style="background-image: url('/path/to/image.jpg');">
  <div class="hero__overlay"></div>
  <div class="hero__content">
    <h1 class="hero__title">Welcome to Our Site</h1>
    <p class="hero__subtitle">Discover amazing products and services</p>
    <a href="#" class="btn btn--primary btn--large">Get Started</a>
  </div>
</section>
```

## CSS Classes Reference

### Block
- `.hero` - Base hero class (required)

### Elements
- `.hero__overlay` - Dark overlay for better text readability
- `.hero__content` - Content container (centered)
- `.hero__title` - Main heading
- `.hero__subtitle` - Subheading text

## Design Tokens Used

### Colors
- `--color-primary-*` - Button colors
- `--color-neutral-900` - Overlay color
- `--color-text-inverse` - Text color on dark background

### Spacing
- `--spacing-8`, `--spacing-12` - Padding values

### Typography
- `--font-heading` - Font family
- `--text-4xl`, `--text-xl` - Font sizes
- `--font-bold` - Font weight

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
