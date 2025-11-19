# Select Component

A customizable select dropdown component with validation states, icons, option groups, and multi-select support.

## Features

- ✅ Three sizes (small, medium, large)
- ✅ Validation states (error, success)
- ✅ Icon support (leading icon)
- ✅ Option groups (optgroup)
- ✅ Multi-select support
- ✅ Disabled options
- ✅ Labels and helper text
- ✅ Required field indicators
- ✅ Custom dropdown arrow
- ✅ WCAG AA compliant
- ✅ All styling uses design tokens

## Basic Usage

```html
<div class="select">
  <label class="select__label" for="country">Country</label>
  <select id="country" class="select__field">
    <option value="">Select a country...</option>
    <option value="nl">Netherlands</option>
    <option value="be">Belgium</option>
    <option value="de">Germany</option>
  </select>
  <span class="select__helper">Choose your country.</span>
</div>
```

## Sizes

### Small
```html
<div class="select select--small">
  <label class="select__label" for="size">Size</label>
  <select id="size" class="select__field">
    <option value="s">Small</option>
    <option value="m">Medium</option>
    <option value="l">Large</option>
  </select>
</div>
```

### Medium (Default)
```html
<div class="select select--medium">
  <label class="select__label" for="size">Size</label>
  <select id="size" class="select__field">
    <option value="m">Medium</option>
  </select>
</div>
```

### Large
```html
<div class="select select--large">
  <label class="select__label" for="size">Size</label>
  <select id="size" class="select__field">
    <option value="l">Large</option>
  </select>
</div>
```

## Validation States

### Error State
```html
<div class="select select--error">
  <label class="select__label" for="category">Category</label>
  <select id="category" class="select__field">
    <option value="">Select category...</option>
  </select>
  <span class="select__error-message">Please select a category.</span>
</div>
```

### Success State
```html
<div class="select select--success">
  <label class="select__label" for="payment">Payment Method</label>
  <select id="payment" class="select__field">
    <option value="card" selected>Credit Card</option>
  </select>
  <span class="select__success-message">Valid payment method selected.</span>
</div>
```

## With Icon

```html
<div class="select select--has-leading-icon">
  <label class="select__label" for="location">Location</label>
  <div class="select__icon">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
      <!-- SVG path -->
    </svg>
  </div>
  <select id="location" class="select__field">
    <option value="amsterdam">Amsterdam</option>
    <option value="rotterdam">Rotterdam</option>
  </select>
</div>
```

## Option Groups

```html
<div class="select">
  <label class="select__label" for="job">Job Category</label>
  <select id="job" class="select__field">
    <option value="">Select a category...</option>
    <optgroup label="Technology">
      <option value="frontend">Frontend Developer</option>
      <option value="backend">Backend Developer</option>
    </optgroup>
    <optgroup label="Design">
      <option value="ui">UI Designer</option>
      <option value="ux">UX Designer</option>
    </optgroup>
  </select>
</div>
```

## Multi-Select

```html
<div class="select select--multiple">
  <label class="select__label" for="skills">Select Skills</label>
  <select id="skills" class="select__field" multiple size="8">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
  </select>
  <span class="select__helper">Hold Ctrl/Cmd to select multiple.</span>
</div>
```

## Disabled Options

```html
<div class="select">
  <label class="select__label" for="plan">Plan</label>
  <select id="plan" class="select__field">
    <option value="free">Free</option>
    <option value="pro" disabled>Pro (Coming Soon)</option>
  </select>
</div>
```

## Required Field

```html
<div class="select">
  <label class="select__label select__label--required" for="dept">Department</label>
  <select id="dept" class="select__field" required>
    <option value="">Select department...</option>
    <option value="sales">Sales</option>
  </select>
  <span class="select__helper">This field is required.</span>
</div>
```

## CSS Classes Reference

### Block
- `.select` - Base select wrapper (required)

### Elements
- `.select__field` - The actual select element (required)
- `.select__label` - Label element
- `.select__helper` - Helper text
- `.select__error-message` - Error message text
- `.select__success-message` - Success message text
- `.select__icon` - Icon container

### Modifiers
- `.select--small` - Small size
- `.select--medium` - Medium size (default)
- `.select--large` - Large size
- `.select--error` - Error validation state
- `.select--success` - Success validation state
- `.select--has-leading-icon` - Has leading icon
- `.select--multiple` - Multi-select variant

### Label Modifiers
- `.select__label--required` - Shows required asterisk

## Accessibility

- Uses semantic HTML with proper `<label>` elements
- All selects have associated labels via `for` attribute
- Error messages use descriptive text
- Focus states for keyboard navigation
- Supports `prefers-reduced-motion`
- Supports `prefers-contrast: high`
- Required fields indicated with asterisk
- Keyboard navigable with arrow keys

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
- `--color-text-inverse`
- `--color-background-primary`
- `--color-border`, `--color-border-dark`
- `--color-primary-*`
- `--color-danger-*`
- `--color-success-*`
- `--color-neutral-*`

### Spacing
- `--spacing-2` through `--spacing-11`

### Typography
- `--font-body`, `--font-bold`
- `--text-sm`, `--text-base`, `--text-lg`
- `--font-normal`, `--font-medium`
- `--leading-normal`

### Effects
- `--radius-md`, `--radius-sm`
- `--transition-base`
