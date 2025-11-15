# Checkbox Component

A versatile checkbox component with switch variant, validation states, multiple sizes, and group support.

## Features

- ✅ Three sizes (small, medium, large)
- ✅ Multiple states (checked, unchecked, indeterminate, disabled)
- ✅ Switch variant (toggle-style)
- ✅ Error validation state
- ✅ Checkbox groups (vertical & inline)
- ✅ Required field support
- ✅ Custom checkmark styling
- ✅ WCAG AA compliant
- ✅ All styling uses design tokens

## Basic Usage

```html
<label class="checkbox">
  <input type="checkbox" class="checkbox__input" />
  <span class="checkbox__box">
    <svg class="checkbox__checkmark" viewBox="0 0 12 12" fill="none">
      <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="checkbox__label">I agree to the terms</span>
</label>
```

## Sizes

### Small
```html
<label class="checkbox checkbox--small">
  <input type="checkbox" class="checkbox__input" checked />
  <span class="checkbox__box">
    <svg class="checkbox__checkmark" viewBox="0 0 12 12" fill="none">
      <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="checkbox__label">Small checkbox</span>
</label>
```

### Medium (Default)
```html
<label class="checkbox">
  <input type="checkbox" class="checkbox__input" checked />
  <span class="checkbox__box">
    <svg class="checkbox__checkmark" viewBox="0 0 12 12" fill="none">
      <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="checkbox__label">Medium checkbox</span>
</label>
```

### Large
```html
<label class="checkbox checkbox--large">
  <input type="checkbox" class="checkbox__input" checked />
  <span class="checkbox__box">
    <svg class="checkbox__checkmark" viewBox="0 0 12 12" fill="none">
      <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="checkbox__label">Large checkbox</span>
</label>
```

## States

### Checked
```html
<label class="checkbox">
  <input type="checkbox" class="checkbox__input" checked />
  <span class="checkbox__box">
    <svg class="checkbox__checkmark" viewBox="0 0 12 12" fill="none">
      <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="checkbox__label">Checked</span>
</label>
```

### Indeterminate
```html
<label class="checkbox">
  <input type="checkbox" class="checkbox__input" id="indeterminate" />
  <span class="checkbox__box">
    <svg class="checkbox__checkmark" viewBox="0 0 12 12" fill="none">
      <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="checkbox__label">Indeterminate</span>
</label>

<script>
document.getElementById('indeterminate').indeterminate = true;
</script>
```

### Disabled
```html
<label class="checkbox">
  <input type="checkbox" class="checkbox__input" disabled />
  <span class="checkbox__box">
    <svg class="checkbox__checkmark" viewBox="0 0 12 12" fill="none">
      <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="checkbox__label">Disabled</span>
</label>
```

### Error State
```html
<label class="checkbox checkbox--error">
  <input type="checkbox" class="checkbox__input" />
  <span class="checkbox__box">
    <svg class="checkbox__checkmark" viewBox="0 0 12 12" fill="none">
      <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="checkbox__label">You must agree to continue</span>
</label>
```

## Switch Variant

```html
<label class="checkbox checkbox--switch">
  <input type="checkbox" class="checkbox__input" checked />
  <span class="checkbox__box">
    <svg class="checkbox__checkmark" viewBox="0 0 12 12" fill="none">
      <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="checkbox__label">Enable notifications</span>
</label>
```

### Switch Sizes
```html
<!-- Small Switch -->
<label class="checkbox checkbox--switch checkbox--small">
  <input type="checkbox" class="checkbox__input" />
  <span class="checkbox__box">
    <svg class="checkbox__checkmark" viewBox="0 0 12 12" fill="none">
      <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="checkbox__label">Small switch</span>
</label>

<!-- Large Switch -->
<label class="checkbox checkbox--switch checkbox--large">
  <input type="checkbox" class="checkbox__input" />
  <span class="checkbox__box">
    <svg class="checkbox__checkmark" viewBox="0 0 12 12" fill="none">
      <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="checkbox__label">Large switch</span>
</label>
```

## Checkbox Group (Vertical)

```html
<div class="checkbox-group">
  <label class="checkbox-group__label">Select your interests</label>

  <label class="checkbox">
    <input type="checkbox" class="checkbox__input" name="interests" value="web" />
    <span class="checkbox__box">
      <svg class="checkbox__checkmark" viewBox="0 0 12 12" fill="none">
        <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <span class="checkbox__label">Web Development</span>
  </label>

  <label class="checkbox">
    <input type="checkbox" class="checkbox__input" name="interests" value="mobile" />
    <span class="checkbox__box">
      <svg class="checkbox__checkmark" viewBox="0 0 12 12" fill="none">
        <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <span class="checkbox__label">Mobile Development</span>
  </label>

  <span class="checkbox-group__helper">Select all that apply.</span>
</div>
```

## Checkbox Group (Inline)

```html
<div class="checkbox-group checkbox-group--inline">
  <label class="checkbox-group__label" style="width: 100%;">Skills</label>

  <label class="checkbox">
    <input type="checkbox" class="checkbox__input" name="skills" value="html" />
    <span class="checkbox__box">
      <svg class="checkbox__checkmark" viewBox="0 0 12 12" fill="none">
        <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <span class="checkbox__label">HTML</span>
  </label>

  <label class="checkbox">
    <input type="checkbox" class="checkbox__input" name="skills" value="css" />
    <span class="checkbox__box">
      <svg class="checkbox__checkmark" viewBox="0 0 12 12" fill="none">
        <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <span class="checkbox__label">CSS</span>
  </label>
</div>
```

## Required Checkbox Group

```html
<div class="checkbox-group checkbox-group--error">
  <label class="checkbox-group__label checkbox-group__label--required">
    Accept terms
  </label>

  <label class="checkbox checkbox--error">
    <input type="checkbox" class="checkbox__input" required />
    <span class="checkbox__box">
      <svg class="checkbox__checkmark" viewBox="0 0 12 12" fill="none">
        <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </span>
    <span class="checkbox__label">I agree to the Terms</span>
  </label>

  <span class="checkbox-group__error-message">
    You must accept all terms to continue.
  </span>
</div>
```

## CSS Classes Reference

### Checkbox
- `.checkbox` - Base checkbox wrapper (required)
- `.checkbox__input` - Hidden input element (required)
- `.checkbox__box` - Visual checkbox box (required)
- `.checkbox__checkmark` - Checkmark SVG icon (required)
- `.checkbox__label` - Label text

### Checkbox Modifiers
- `.checkbox--small` - Small size
- `.checkbox--large` - Large size
- `.checkbox--error` - Error validation state
- `.checkbox--switch` - Switch/toggle variant

### Checkbox Group
- `.checkbox-group` - Group container
- `.checkbox-group__label` - Group label
- `.checkbox-group__helper` - Helper text
- `.checkbox-group__error-message` - Error message
- `.checkbox-group--inline` - Inline layout
- `.checkbox-group--error` - Error state for group
- `.checkbox-group__label--required` - Required asterisk

## JavaScript

### Setting Indeterminate State
```javascript
const checkbox = document.getElementById('myCheckbox');
checkbox.indeterminate = true;
```

## Accessibility

- Uses semantic HTML with proper `<label>` elements
- Checkboxes are keyboard accessible (Space to toggle)
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
- `--color-text-tertiary`
- `--color-background-primary`
- `--color-border`
- `--color-primary-*`
- `--color-danger-*`
- `--color-neutral-*`

### Spacing
- `--spacing-2` through `--spacing-4`

### Typography
- `--font-body`, `--font-bold`
- `--text-sm`, `--text-base`, `--text-lg`
- `--font-normal`, `--font-medium`
- `--leading-normal`

### Effects
- `--radius-sm`, `--radius-full`
- `--transition-base`
