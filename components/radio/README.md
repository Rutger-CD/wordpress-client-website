# Radio Component

A versatile radio button component with card variant, validation states, multiple sizes, and group support.

## Features

- ✅ Three sizes (small, medium, large)
- ✅ Multiple states (selected, unselected, disabled)
- ✅ Card variant for rich selection options
- ✅ Error validation state
- ✅ Radio groups (vertical & inline)
- ✅ Required field support
- ✅ Custom styling with smooth transitions
- ✅ WCAG AA compliant
- ✅ All styling uses design tokens

## Basic Usage

```html
<label class="radio">
  <input type="radio" class="radio__input" name="option" value="1" />
  <span class="radio__circle">
    <span class="radio__dot"></span>
  </span>
  <span class="radio__label">Option 1</span>
</label>
```

## Sizes

### Small
```html
<label class="radio radio--small">
  <input type="radio" class="radio__input" name="size" value="small" checked />
  <span class="radio__circle">
    <span class="radio__dot"></span>
  </span>
  <span class="radio__label">Small radio</span>
</label>
```

### Medium (Default)
```html
<label class="radio">
  <input type="radio" class="radio__input" name="size" value="medium" checked />
  <span class="radio__circle">
    <span class="radio__dot"></span>
  </span>
  <span class="radio__label">Medium radio</span>
</label>
```

### Large
```html
<label class="radio radio--large">
  <input type="radio" class="radio__input" name="size" value="large" checked />
  <span class="radio__circle">
    <span class="radio__dot"></span>
  </span>
  <span class="radio__label">Large radio</span>
</label>
```

## States

### Selected
```html
<label class="radio">
  <input type="radio" class="radio__input" name="state" value="selected" checked />
  <span class="radio__circle">
    <span class="radio__dot"></span>
  </span>
  <span class="radio__label">Selected</span>
</label>
```

### Disabled
```html
<label class="radio">
  <input type="radio" class="radio__input" name="state" value="disabled" disabled />
  <span class="radio__circle">
    <span class="radio__dot"></span>
  </span>
  <span class="radio__label">Disabled</span>
</label>
```

### Error State
```html
<label class="radio radio--error">
  <input type="radio" class="radio__input" name="error" value="option" />
  <span class="radio__circle">
    <span class="radio__dot"></span>
  </span>
  <span class="radio__label">Option with error</span>
</label>
```

## Radio Group (Vertical)

```html
<div class="radio-group">
  <label class="radio-group__label">Select a payment method</label>

  <label class="radio">
    <input type="radio" class="radio__input" name="payment" value="card" />
    <span class="radio__circle">
      <span class="radio__dot"></span>
    </span>
    <span class="radio__label">Credit Card</span>
  </label>

  <label class="radio">
    <input type="radio" class="radio__input" name="payment" value="paypal" />
    <span class="radio__circle">
      <span class="radio__dot"></span>
    </span>
    <span class="radio__label">PayPal</span>
  </label>

  <span class="radio-group__helper">Choose your preferred option.</span>
</div>
```

## Radio Group (Inline)

```html
<div class="radio-group radio-group--inline">
  <label class="radio-group__label" style="width: 100%;">Select size</label>

  <label class="radio">
    <input type="radio" class="radio__input" name="size" value="s" />
    <span class="radio__circle">
      <span class="radio__dot"></span>
    </span>
    <span class="radio__label">S</span>
  </label>

  <label class="radio">
    <input type="radio" class="radio__input" name="size" value="m" checked />
    <span class="radio__circle">
      <span class="radio__dot"></span>
    </span>
    <span class="radio__label">M</span>
  </label>

  <label class="radio">
    <input type="radio" class="radio__input" name="size" value="l" />
    <span class="radio__circle">
      <span class="radio__dot"></span>
    </span>
    <span class="radio__label">L</span>
  </label>
</div>
```

## Required Radio Group

```html
<div class="radio-group radio-group--error">
  <label class="radio-group__label radio-group__label--required">
    Select your plan
  </label>

  <label class="radio radio--error">
    <input type="radio" class="radio__input" name="plan" value="free" required />
    <span class="radio__circle">
      <span class="radio__dot"></span>
    </span>
    <span class="radio__label">Free Plan</span>
  </label>

  <label class="radio radio--error">
    <input type="radio" class="radio__input" name="plan" value="pro" required />
    <span class="radio__circle">
      <span class="radio__dot"></span>
    </span>
    <span class="radio__label">Pro Plan</span>
  </label>

  <span class="radio-group__error-message">
    Please select a plan to continue.
  </span>
</div>
```

## Radio Card Variant

```html
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
  <label class="radio radio--card">
    <input type="radio" class="radio__input" name="plan" value="starter" checked />
    <span class="radio__circle">
      <span class="radio__dot"></span>
    </span>
    <div>
      <div class="radio__label">Starter Plan</div>
      <div class="radio__description">Perfect for individuals getting started.</div>
    </div>
  </label>

  <label class="radio radio--card">
    <input type="radio" class="radio__input" name="plan" value="pro" />
    <span class="radio__circle">
      <span class="radio__dot"></span>
    </span>
    <div>
      <div class="radio__label">Professional Plan</div>
      <div class="radio__description">For growing teams with advanced features.</div>
    </div>
  </label>
</div>
```

## CSS Classes Reference

### Radio
- `.radio` - Base radio wrapper (required)
- `.radio__input` - Hidden input element (required)
- `.radio__circle` - Visual radio circle (required)
- `.radio__dot` - Inner dot indicator (required)
- `.radio__label` - Label text
- `.radio__description` - Description text (for card variant)

### Radio Modifiers
- `.radio--small` - Small size
- `.radio--large` - Large size
- `.radio--error` - Error validation state
- `.radio--card` - Card variant with padding and border

### Radio Group
- `.radio-group` - Group container
- `.radio-group__label` - Group label
- `.radio-group__helper` - Helper text
- `.radio-group__error-message` - Error message
- `.radio-group--inline` - Inline layout
- `.radio-group--error` - Error state for group
- `.radio-group__label--required` - Required asterisk

## Accessibility

- Uses semantic HTML with proper `<label>` elements
- Radio buttons are keyboard accessible (Arrow keys to navigate, Space/Enter to select)
- Only one option can be selected at a time within a group
- Focus states for keyboard navigation
- Supports `prefers-reduced-motion`
- Supports `prefers-contrast: high`
- Required fields indicated with asterisk
- Disabled state prevents interaction

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
- `--color-border`
- `--color-primary-*`
- `--color-danger-*`
- `--color-neutral-*`

### Spacing
- `--spacing-1` through `--spacing-4`

### Typography
- `--font-body`
- `--text-sm`, `--text-base`, `--text-lg`
- `--font-normal`, `--font-medium`
- `--leading-normal`, `--leading-relaxed`

### Effects
- `--radius-sm`, `--radius-md`, `--radius-full`
- `--transition-base`
