# Form Component

A comprehensive form component with form controls (input, select, textarea, checkbox, radio).

## Features

- ✅ Complete form structure
- ✅ Input fields with labels
- ✅ Select dropdowns
- ✅ Textarea support
- ✅ Checkbox and radio buttons
- ✅ Form validation states
- ✅ Error message display
- ✅ Responsive design
- ✅ All styling uses design tokens
- ✅ WCAG AA compliant

## Basic Usage

```html
<form class="form">
  <div class="form__group">
    <label for="name" class="form__label">Name</label>
    <input type="text" id="name" class="form__input" required />
  </div>

  <div class="form__group">
    <label for="email" class="form__label">Email</label>
    <input type="email" id="email" class="form__input" required />
  </div>

  <button type="submit" class="btn btn--primary">Submit</button>
</form>
```

## With Validation

```html
<form class="form">
  <div class="form__group form__group--error">
    <label for="email" class="form__label">Email</label>
    <input type="email" id="email" class="form__input" aria-invalid="true" />
    <span class="form__error">Please enter a valid email address</span>
  </div>
</form>
```

## CSS Classes Reference

### Block
- `.form` - Base form class (required)

### Elements
- `.form__group` - Form field container
- `.form__label` - Field label
- `.form__input` - Text input field
- `.form__select` - Select dropdown
- `.form__textarea` - Textarea field
- `.form__error` - Error message
- `.form__help` - Help text

### Modifiers
- `.form__group--error` - Error state for field group

## Sub-Components

This component uses the following form control components:
- Input (text, email, password, etc.)
- Select (dropdown)
- Textarea (multi-line text)
- Checkbox
- Radio

See individual component READMEs for detailed usage.

## Design Tokens Used

### Colors
- `--color-text-primary` - Label text
- `--color-border` - Input borders
- `--color-error` - Error states

### Spacing
- `--spacing-2` through `--spacing-4` - Form spacing

### Typography
- `--font-body` - Font family
- `--text-sm`, `--text-base` - Font sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
