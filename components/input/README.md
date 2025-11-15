# Input Component

A versatile input component with validation states, icons, multiple sizes, and full accessibility support.

## Features

- ✅ Multiple input types (text, email, password, number, tel, url, date, time, search)
- ✅ Three sizes (small, medium, large)
- ✅ Validation states (error, success, warning)
- ✅ Icon support (leading, trailing, both)
- ✅ Labels and helper text
- ✅ Required field indicators
- ✅ Disabled state
- ✅ Search variant with rounded style
- ✅ WCAG AA compliant
- ✅ All styling uses design tokens

## Basic Usage

```html
<div class="input">
  <label class="input__label" for="email">Email Address</label>
  <input
    type="email"
    id="email"
    class="input__field"
    placeholder="Enter your email"
  />
  <span class="input__helper">We'll never share your email.</span>
</div>
```

## Sizes

### Small
```html
<div class="input input--small">
  <label class="input__label" for="input-sm">Small Input</label>
  <input type="text" id="input-sm" class="input__field" placeholder="Small">
</div>
```

### Medium (Default)
```html
<div class="input input--medium">
  <label class="input__label" for="input-md">Medium Input</label>
  <input type="text" id="input-md" class="input__field" placeholder="Medium">
</div>
```

### Large
```html
<div class="input input--large">
  <label class="input__label" for="input-lg">Large Input</label>
  <input type="text" id="input-lg" class="input__field" placeholder="Large">
</div>
```

## Validation States

### Error State
```html
<div class="input input--error">
  <label class="input__label" for="username">Username</label>
  <input type="text" id="username" class="input__field" value="ab">
  <span class="input__error-message">Username must be at least 3 characters.</span>
</div>
```

### Success State
```html
<div class="input input--success">
  <label class="input__label" for="password">Password</label>
  <input type="password" id="password" class="input__field" value="secure123">
  <span class="input__success-message">Strong password!</span>
</div>
```

### Warning State
```html
<div class="input input--warning">
  <label class="input__label" for="email">Email</label>
  <input type="email" id="email" class="input__field" value="user@example">
  <span class="input__helper" style="color: var(--color-warning-500);">
    Email format looks incomplete.
  </span>
</div>
```

## With Icons

### Leading Icon
```html
<div class="input input--has-leading-icon">
  <label class="input__label" for="email">Email</label>
  <div class="input__icon input__icon--leading">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <!-- SVG path -->
    </svg>
  </div>
  <input type="email" id="email" class="input__field" placeholder="you@example.com">
</div>
```

### Trailing Icon
```html
<div class="input input--has-trailing-icon input--success">
  <label class="input__label" for="verified">Verified Email</label>
  <input type="email" id="verified" class="input__field" value="user@example.com">
  <div class="input__icon input__icon--trailing">
    <svg width="20" height="20"><!-- checkmark icon --></svg>
  </div>
</div>
```

## Search Variant

```html
<div class="input input--search input--has-leading-icon">
  <div class="input__icon input__icon--leading">
    <svg width="20" height="20"><!-- search icon --></svg>
  </div>
  <input type="search" class="input__field" placeholder="Search...">
</div>
```

## Required Fields

```html
<div class="input">
  <label class="input__label input__label--required" for="name">Full Name</label>
  <input type="text" id="name" class="input__field" required>
  <span class="input__helper">This field is required.</span>
</div>
```

## Input Group

```html
<div class="input-group">
  <div class="input">
    <label class="input__label" for="first">First Name</label>
    <input type="text" id="first" class="input__field">
  </div>
  <div class="input">
    <label class="input__label" for="last">Last Name</label>
    <input type="text" id="last" class="input__field">
  </div>
</div>
```

## CSS Classes Reference

### Block
- `.input` - Base input wrapper (required)

### Elements
- `.input__field` - The actual input element (required)
- `.input__label` - Label element
- `.input__helper` - Helper text
- `.input__error-message` - Error message text
- `.input__success-message` - Success message text
- `.input__icon` - Icon container
- `.input__icon--leading` - Leading icon position
- `.input__icon--trailing` - Trailing icon position

### Modifiers
- `.input--small` - Small size
- `.input--medium` - Medium size (default)
- `.input--large` - Large size
- `.input--error` - Error validation state
- `.input--success` - Success validation state
- `.input--warning` - Warning validation state
- `.input--search` - Search variant with rounded borders
- `.input--has-leading-icon` - Has leading icon
- `.input--has-trailing-icon` - Has trailing icon

### Label Modifiers
- `.input__label--required` - Shows required asterisk

### Input Group
- `.input-group` - Horizontal group container
- `.input-group--vertical` - Vertical group layout

## Input Types Supported

- `text` - Standard text input
- `email` - Email input with validation
- `password` - Password input
- `number` - Number input
- `tel` - Telephone number
- `url` - URL input
- `date` - Date picker
- `time` - Time picker
- `search` - Search input

## Accessibility

- Uses semantic HTML with proper `<label>` elements
- All inputs have associated labels via `for` attribute
- Error messages use descriptive text
- Focus states for keyboard navigation
- Supports `prefers-reduced-motion`
- Supports `prefers-contrast: high`
- Required fields indicated with asterisk

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Design Tokens Used

### Colors
- `--color-text-primary`
- `--color-text-secondary`
- `--color-text-tertiary`
- `--color-background-primary`
- `--color-border`, `--color-border-dark`
- `--color-primary-*`
- `--color-danger-*`
- `--color-success-*`
- `--color-warning-*`
- `--color-neutral-*`

### Spacing
- `--spacing-2` through `--spacing-10`

### Typography
- `--font-body`
- `--text-sm`, `--text-base`, `--text-lg`
- `--font-normal`, `--font-medium`
- `--leading-normal`

### Effects
- `--radius-md`, `--radius-full`
- `--transition-base`
