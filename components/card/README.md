# Card Component

A versatile card component for displaying grouped content with header, body, and footer sections.

## Features

- ✅ Multiple layout variants (vertical, horizontal, compact)
- ✅ Style variants (elevated, bordered, semantic)
- ✅ Optional image/media support
- ✅ Clickable cards
- ✅ Badge support
- ✅ Responsive card grids
- ✅ Semantic variants for status messages
- ✅ WCAG AA compliant
- ✅ Print-friendly
- ✅ All styling uses design tokens

## Basic Usage

```html
<div class="card">
  <div class="card__header">
    <h3 class="card__title">Card Title</h3>
  </div>
  <div class="card__body">
    <p class="card__text">Card content goes here.</p>
  </div>
</div>
```

## Card Structure

### Full Structure

```html
<div class="card">
  <!-- Optional media -->
  <div class="card__media">
    <img class="card__image" src="..." alt="..." />
  </div>

  <!-- Optional badge -->
  <div class="card__badge">New</div>

  <!-- Header -->
  <div class="card__header">
    <h3 class="card__title">Title</h3>
    <p class="card__subtitle">Optional subtitle</p>
  </div>

  <!-- Body -->
  <div class="card__body">
    <p class="card__text">Content here.</p>
  </div>

  <!-- Optional footer -->
  <div class="card__footer">
    <button class="btn btn--primary">Action</button>
  </div>
</div>
```

## Layout Variants

### Vertical (Default)

```html
<div class="card">
  <div class="card__header">
    <h3 class="card__title">Vertical Card</h3>
  </div>
  <div class="card__body">
    <p class="card__text">Standard vertical layout.</p>
  </div>
</div>
```

### Horizontal

```html
<div class="card card--horizontal">
  <div class="card__media">
    <img class="card__image" src="..." alt="..." />
  </div>
  <div class="card__content">
    <div class="card__header">
      <h3 class="card__title">Horizontal Card</h3>
    </div>
    <div class="card__body">
      <p class="card__text">Image on left, content on right.</p>
    </div>
  </div>
</div>
```

**Note:** Horizontal cards automatically stack on mobile devices.

### Compact

```html
<div class="card card--compact">
  <div class="card__header">
    <h4 class="card__title">Compact Card</h4>
  </div>
  <div class="card__body">
    <p class="card__text">Reduced padding for tighter layouts.</p>
  </div>
</div>
```

## Style Variants

### Elevated

```html
<!-- Medium elevation -->
<div class="card card--elevated">
  <div class="card__header">
    <h3 class="card__title">Elevated Card</h3>
  </div>
  <div class="card__body">
    <p class="card__text">Has shadow and lifts on hover.</p>
  </div>
</div>

<!-- Large elevation -->
<div class="card card--elevated-lg">
  <div class="card__header">
    <h3 class="card__title">Large Elevation</h3>
  </div>
  <div class="card__body">
    <p class="card__text">More prominent shadow.</p>
  </div>
</div>
```

### Bordered

```html
<div class="card card--bordered">
  <div class="card__header">
    <h3 class="card__title">Bordered Card</h3>
  </div>
  <div class="card__body">
    <p class="card__text">Uses border instead of shadow.</p>
  </div>
</div>
```

### Clickable

```html
<a href="/details" class="card card--clickable">
  <div class="card__header">
    <h3 class="card__title">Clickable Card</h3>
  </div>
  <div class="card__body">
    <p class="card__text">Entire card is clickable.</p>
  </div>
  <div class="card__footer">
    <span class="card__link">View details →</span>
  </div>
</a>
```

## With Images

```html
<div class="card">
  <div class="card__media">
    <img
      class="card__image"
      src="image.jpg"
      alt="Descriptive alt text"
    />
  </div>
  <div class="card__header">
    <h3 class="card__title">Image Card</h3>
  </div>
  <div class="card__body">
    <p class="card__text">Card with image at the top.</p>
  </div>
</div>
```

## With Badge

```html
<div class="card">
  <div class="card__badge">New</div>
  <div class="card__header">
    <h3 class="card__title">Featured Item</h3>
  </div>
  <div class="card__body">
    <p class="card__text">Card with status badge.</p>
  </div>
</div>
```

## Semantic Variants

For status messages and notifications:

```html
<!-- Success -->
<div class="card card--success">
  <div class="card__header">
    <h3 class="card__title">Success</h3>
  </div>
  <div class="card__body">
    <p class="card__text">Operation completed successfully!</p>
  </div>
</div>

<!-- Warning -->
<div class="card card--warning">
  <div class="card__header">
    <h3 class="card__title">Warning</h3>
  </div>
  <div class="card__body">
    <p class="card__text">Please review before continuing.</p>
  </div>
</div>

<!-- Error -->
<div class="card card--error">
  <div class="card__header">
    <h3 class="card__title">Error</h3>
  </div>
  <div class="card__body">
    <p class="card__text">An error occurred.</p>
  </div>
</div>

<!-- Info -->
<div class="card card--info">
  <div class="card__header">
    <h3 class="card__title">Information</h3>
  </div>
  <div class="card__body">
    <p class="card__text">Here's some helpful information.</p>
  </div>
</div>
```

## Card Grids

### Auto-Responsive Grid

```html
<div class="card-grid">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

### Fixed Column Grids

```html
<!-- 2 columns -->
<div class="card-grid card-grid--2">
  <div class="card">...</div>
  <div class="card">...</div>
</div>

<!-- 3 columns -->
<div class="card-grid card-grid--3">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>

<!-- 4 columns -->
<div class="card-grid card-grid--4">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

**Note:** All grids are responsive and adapt to mobile/tablet screens.

## CSS Classes Reference

### Block
- `.card` - Base card class (required)

### Elements
- `.card__media` - Media container (for images/video)
- `.card__image` - Image element
- `.card__content` - Content wrapper (for horizontal cards)
- `.card__header` - Header section
- `.card__title` - Title text
- `.card__subtitle` - Subtitle text
- `.card__body` - Body/content section
- `.card__text` - Body text
- `.card__footer` - Footer section
- `.card__link` - Link text with arrow
- `.card__badge` - Badge/label overlay

### Layout Modifiers
- `.card--horizontal` - Horizontal layout
- `.card--compact` - Reduced padding

### Style Modifiers
- `.card--elevated` - Medium shadow with hover lift
- `.card--elevated-lg` - Large shadow with hover lift
- `.card--bordered` - Border instead of shadow
- `.card--clickable` - Interactive card with hover effects

### Semantic Modifiers
- `.card--success` - Success variant
- `.card--warning` - Warning variant
- `.card--error` - Error variant
- `.card--info` - Info variant

### Grid Classes
- `.card-grid` - Auto-responsive grid
- `.card-grid--2` - 2 column grid
- `.card-grid--3` - 3 column grid
- `.card-grid--4` - 4 column grid

## Accessibility

### Best Practices

1. **Semantic HTML**: Use appropriate heading levels (`h2`, `h3`, etc.)
2. **Image Alt Text**: Always provide descriptive alt text for images
3. **Clickable Cards**: Use `<a>` elements for clickable cards
4. **Link Text**: Make link text descriptive (avoid "click here")
5. **Focus Indicators**: Cards maintain visible focus indicators

### Clickable Cards

```html
<!-- Good: Semantic link -->
<a href="/article" class="card card--clickable">
  <div class="card__header">
    <h3 class="card__title">Article Title</h3>
  </div>
  <div class="card__body">
    <p class="card__text">Article excerpt...</p>
  </div>
</a>

<!-- Good: Button for actions -->
<button type="button" class="card card--clickable" onclick="openModal()">
  <div class="card__header">
    <h3 class="card__title">Open Details</h3>
  </div>
  <div class="card__body">
    <p class="card__text">Click to view more...</p>
  </div>
</button>
```

### Keyboard Navigation

- `Tab` - Focus next card
- `Shift + Tab` - Focus previous card
- `Enter` - Activate clickable card

## Responsive Behavior

### Mobile (< 768px)
- Horizontal cards stack vertically
- All grids become single column
- Reduced padding

### Tablet (768px - 1023px)
- 3 and 4 column grids become 2 columns
- Horizontal cards maintain layout

### Desktop (≥ 1024px)
- All layouts as designed
- Full grid columns

## Design Tokens Used

### Colors
- `--color-background-primary` - Card background
- `--color-text-primary` - Title color
- `--color-text-secondary` - Body text color
- `--color-border` - Border color
- `--color-primary-500` - Brand accent
- Semantic colors for variants

### Spacing
- `--spacing-1` through `--spacing-6` - Padding and gaps

### Typography
- `--text-xs`, `--text-sm`, `--text-base`, `--text-xl` - Font sizes
- `--font-semibold`, `--font-medium` - Font weights
- `--line-height-tight`, `--line-height-normal`, `--line-height-relaxed` - Line heights

### Effects
- `--radius-lg` - Border radius
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl` - Box shadows
- `--transition-base` - Transition timing

## Examples

### Product Card

```html
<div class="card card--elevated">
  <div class="card__media">
    <img class="card__image" src="product.jpg" alt="Product name" />
    <div class="card__badge">Sale</div>
  </div>
  <div class="card__header">
    <h3 class="card__title">Product Name</h3>
    <p class="card__subtitle">$99.99</p>
  </div>
  <div class="card__body">
    <p class="card__text">
      Product description goes here with key features.
    </p>
  </div>
  <div class="card__footer">
    <button class="btn btn--primary btn--full-width">Add to Cart</button>
  </div>
</div>
```

### Blog Post Card

```html
<a href="/blog/post" class="card card--clickable">
  <div class="card__media">
    <img class="card__image" src="post.jpg" alt="Blog post cover" />
  </div>
  <div class="card__header">
    <h3 class="card__title">Blog Post Title</h3>
    <p class="card__subtitle">March 15, 2024 · 5 min read</p>
  </div>
  <div class="card__body">
    <p class="card__text">
      Post excerpt providing a brief overview of the content...
    </p>
  </div>
  <div class="card__footer">
    <span class="card__link">Read more →</span>
  </div>
</a>
```

### Notification Card

```html
<div class="card card--success card--compact">
  <div class="card__header">
    <h4 class="card__title">✓ Changes Saved</h4>
  </div>
  <div class="card__body">
    <p class="card__text">
      Your changes have been saved successfully.
    </p>
  </div>
</div>
```

### User Profile Card

```html
<div class="card card--horizontal card--bordered">
  <div class="card__media">
    <img class="card__image" src="avatar.jpg" alt="User name" />
  </div>
  <div class="card__content">
    <div class="card__header">
      <h3 class="card__title">John Doe</h3>
      <p class="card__subtitle">Senior Developer</p>
    </div>
    <div class="card__body">
      <p class="card__text">
        Passionate about building great user experiences.
      </p>
    </div>
    <div class="card__footer">
      <button class="btn btn--primary btn--small">Follow</button>
      <button class="btn btn--tertiary btn--small">Message</button>
    </div>
  </div>
</div>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- Cards are print-friendly and avoid breaking across pages
- All hover effects respect `prefers-reduced-motion`
- High contrast mode adds visible borders
- Images use `object-fit: cover` for consistent sizing
- Card grids use CSS Grid with automatic responsiveness
