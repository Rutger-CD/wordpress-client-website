# Button Component

A flexible, accessible button component with multiple variants, sizes, and states.

## Features

- ✅ Multiple variants (primary, secondary, tertiary, ghost, semantic)
- ✅ Three sizes (small, medium, large)
- ✅ Icon support (leading, trailing, icon-only)
- ✅ Loading state with spinner
- ✅ Disabled state
- ✅ Button groups
- ✅ Full width option
- ✅ Works with `<button>` and `<a>` elements
- ✅ WCAG AA compliant
- ✅ Keyboard navigation support
- ✅ Responsive design
- ✅ All styling uses design tokens

## Basic Usage

```html
<!-- Primary button -->
<button class="btn btn--primary">
  Click me
</button>

<!-- Secondary button -->
<button class="btn btn--secondary">
  Secondary action
</button>

<!-- Tertiary (outline) button -->
<button class="btn btn--tertiary">
  Tertiary action
</button>
```

## Variants

### Primary
Default solid button with primary brand color.

```html
<button class="btn btn--primary">Primary Button</button>
```

### Secondary
Solid button with secondary brand color.

```html
<button class="btn btn--secondary">Secondary Button</button>
```

### Tertiary (Outline)
Outlined button with transparent background.

```html
<button class="btn btn--tertiary">Tertiary Button</button>
```

### Ghost
Minimal button with no border or background (until hover).

```html
<button class="btn btn--ghost">Ghost Button</button>
```

### Semantic Variants
Buttons with semantic meaning for specific actions.

```html
<button class="btn btn--success">Success</button>
<button class="btn btn--warning">Warning</button>
<button class="btn btn--danger">Delete</button>
<button class="btn btn--info">Info</button>
```

## Sizes

Three size options available:

```html
<!-- Small -->
<button class="btn btn--primary btn--small">Small</button>

<!-- Medium (default) -->
<button class="btn btn--primary">Medium</button>

<!-- Large -->
<button class="btn btn--primary btn--large">Large</button>
```

## With Icons

### Icon + Text

```html
<button class="btn btn--primary">
  <svg class="btn__icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 5v10m-5-5h10" stroke="currentColor" stroke-width="2"/>
  </svg>
  <span class="btn__text">Add Item</span>
</button>
```

### Icon Only

```html
<button class="btn btn--primary btn--icon-only" aria-label="Add item">
  <svg class="btn__icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 5v10m-5-5h10" stroke="currentColor" stroke-width="2"/>
  </svg>
</button>
```

**Important:** Always include `aria-label` for icon-only buttons!

## States

### Disabled

```html
<button class="btn btn--primary" disabled>
  Disabled Button
</button>
```

### Loading

```html
<button class="btn btn--primary btn--loading" disabled>
  <span class="btn__spinner" aria-hidden="true"></span>
  <span class="btn__text">Loading...</span>
</button>
```

## Full Width

```html
<button class="btn btn--primary btn--full-width">
  Full Width Button
</button>
```

## Button Groups

### Standard Group

```html
<div class="btn-group">
  <button class="btn btn--primary">Save</button>
  <button class="btn btn--tertiary">Cancel</button>
</div>
```

### Attached Group

```html
<div class="btn-group btn-group--attached">
  <button class="btn btn--tertiary">Previous</button>
  <button class="btn btn--tertiary">Next</button>
</div>
```

### Vertical Group

```html
<div class="btn-group btn-group--vertical">
  <button class="btn btn--primary">Option 1</button>
  <button class="btn btn--primary">Option 2</button>
  <button class="btn btn--primary">Option 3</button>
</div>
```

## Link as Button

You can style links to look like buttons:

```html
<a href="/signup" class="btn btn--primary">
  Sign Up
</a>
```

## Responsive

Buttons automatically stack on mobile devices when using the responsive modifier:

```html
<div class="btn-group btn-group--responsive">
  <button class="btn btn--primary btn--responsive">Save</button>
  <button class="btn btn--tertiary btn--responsive">Cancel</button>
</div>
```

## Accessibility

### Best Practices

1. **Use semantic HTML**: Use `<button>` for actions, `<a>` for navigation
2. **Descriptive text**: Button text should clearly describe the action
3. **Icon-only buttons**: Always include `aria-label`
4. **Loading state**: Always disable buttons during loading
5. **Focus indicators**: Don't remove focus outlines (handled automatically)

### Keyboard Navigation

- `Tab` - Focus next button
- `Shift + Tab` - Focus previous button
- `Enter` or `Space` - Activate button

### Screen Reader Support

```html
<!-- Good: Descriptive text -->
<button class="btn btn--primary">Save changes</button>

<!-- Good: Icon with label -->
<button class="btn btn--primary btn--icon-only" aria-label="Close dialog">
  <svg class="btn__icon">...</svg>
</button>

<!-- Good: Loading state -->
<button class="btn btn--primary btn--loading" disabled aria-busy="true">
  <span class="btn__spinner" aria-hidden="true"></span>
  <span class="btn__text">Saving...</span>
</button>
```

## CSS Classes Reference

### Block
- `.btn` - Base button class (required)

### Size Modifiers
- `.btn--small` - Small button
- `.btn--large` - Large button
- `.btn--icon-only` - Icon-only button (square)
- `.btn--full-width` - Full width button

### Variant Modifiers
- `.btn--primary` - Primary variant (default)
- `.btn--secondary` - Secondary variant
- `.btn--tertiary` - Tertiary/outline variant
- `.btn--ghost` - Ghost/minimal variant
- `.btn--success` - Success semantic variant
- `.btn--warning` - Warning semantic variant
- `.btn--danger` - Danger semantic variant
- `.btn--info` - Info semantic variant

### State Modifiers
- `.btn--loading` - Loading state
- `.btn--disabled` - Disabled state (or use `disabled` attribute)

### Elements
- `.btn__icon` - Icon element
- `.btn__text` - Text element
- `.btn__spinner` - Loading spinner

### Button Group
- `.btn-group` - Button group container
- `.btn-group--vertical` - Vertical button group
- `.btn-group--attached` - Attached buttons (no gap)
- `.btn-group--responsive` - Responsive button group

### Responsive Modifiers
- `.btn--responsive` - Full width on mobile

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Design Tokens Used

### Colors
- `--color-primary-*` - Primary brand colors
- `--color-secondary-*` - Secondary brand colors
- `--color-neutral-*` - Neutral colors
- `--color-success` - Success color
- `--color-warning` - Warning color
- `--color-error` - Error/danger color
- `--color-info` - Info color
- `--color-text-inverse` - Inverse text color

### Spacing
- `--spacing-2` through `--spacing-8` - Gap and padding values

### Typography
- `--font-body` - Font family
- `--font-medium` - Font weight
- `--text-sm`, `--text-base`, `--text-lg` - Font sizes
- `--line-height-tight` - Line height

### Effects
- `--radius-md` - Border radius
- `--radius-full` - Full circle radius
- `--shadow-sm`, `--shadow-md` - Box shadows
- `--transition-base` - Transition timing

## Examples

### Call to Action

```html
<button class="btn btn--primary btn--large">
  Get Started
</button>
```

### Form Actions

```html
<div class="btn-group">
  <button type="submit" class="btn btn--primary">
    Save Changes
  </button>
  <button type="button" class="btn btn--tertiary">
    Cancel
  </button>
</div>
```

### Delete Confirmation

```html
<button class="btn btn--danger">
  <svg class="btn__icon" width="20" height="20" viewBox="0 0 20 20">
    <path d="M6 6l8 8m0-8l-8 8" stroke="currentColor" stroke-width="2"/>
  </svg>
  <span class="btn__text">Delete</span>
</button>
```

### Social Login

```html
<button class="btn btn--tertiary btn--full-width">
  <svg class="btn__icon" width="20" height="20">
    <!-- GitHub icon -->
  </svg>
  <span class="btn__text">Continue with GitHub</span>
</button>
```

## Notes

- All color values use design tokens from the brand guide
- Hover effects include subtle transform and shadow
- Loading state automatically hides text and shows spinner
- Disabled buttons have reduced opacity and no pointer events
- Focus indicators follow WCAG 2.1 guidelines
- Respects user preferences for reduced motion
