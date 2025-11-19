# Content Section Component

A versatile content section component for displaying text content with optional media.

## Features

- ✅ Flexible layout options
- ✅ Support for headings and body text
- ✅ Image/media support
- ✅ Responsive design
- ✅ All styling uses design tokens
- ✅ Semantic HTML structure

## Basic Usage

```html
<section class="content-section">
  <div class="content-section__container">
    <h2 class="content-section__title">Section Title</h2>
    <p class="content-section__text">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </p>
  </div>
</section>
```

## With Image

```html
<section class="content-section">
  <div class="content-section__container">
    <div class="content-section__media">
      <img src="/path/to/image.jpg" alt="Description" />
    </div>
    <div class="content-section__content">
      <h2 class="content-section__title">Section Title</h2>
      <p class="content-section__text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>
</section>
```

## CSS Classes Reference

### Block
- `.content-section` - Base section class (required)

### Elements
- `.content-section__container` - Content container
- `.content-section__media` - Media/image container
- `.content-section__content` - Text content container
- `.content-section__title` - Section heading
- `.content-section__text` - Body text

## Design Tokens Used

### Colors
- `--color-text-primary` - Text color
- `--color-background` - Background color

### Spacing
- `--spacing-6`, `--spacing-8` - Padding and gap values

### Typography
- `--font-body` - Font family
- `--text-2xl`, `--text-base` - Font sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
