# Textarea Component

A flexible multi-line text input component with validation states, character counter, auto-resize functionality, and full accessibility support.

## Features

- ✅ Three sizes (small, medium, large)
- ✅ Validation states (error, success)
- ✅ Character counter with warning thresholds
- ✅ Auto-resize functionality
- ✅ Multiple resize options (vertical, horizontal, both, none)
- ✅ Labels and helper text
- ✅ Required field indicators
- ✅ Disabled state
- ✅ WCAG AA compliant
- ✅ All styling uses design tokens

## Basic Usage

```html
<div class="textarea">
  <label class="textarea__label" for="message">Message</label>
  <textarea
    id="message"
    class="textarea__field"
    placeholder="Enter your message..."
  ></textarea>
  <span class="textarea__helper">Please provide detailed information.</span>
</div>
```

## Sizes

### Small
```html
<div class="textarea textarea--small">
  <label class="textarea__label" for="small">Small Textarea</label>
  <textarea id="small" class="textarea__field"></textarea>
</div>
```

### Medium (Default)
```html
<div class="textarea textarea--medium">
  <label class="textarea__label" for="medium">Medium Textarea</label>
  <textarea id="medium" class="textarea__field"></textarea>
</div>
```

### Large
```html
<div class="textarea textarea--large">
  <label class="textarea__label" for="large">Large Textarea</label>
  <textarea id="large" class="textarea__field"></textarea>
</div>
```

## Validation States

### Error State
```html
<div class="textarea textarea--error">
  <label class="textarea__label" for="description">Description</label>
  <textarea id="description" class="textarea__field">Too short</textarea>
  <span class="textarea__error-message">
    Description must be at least 20 characters.
  </span>
</div>
```

### Success State
```html
<div class="textarea textarea--success">
  <label class="textarea__label" for="feedback">Feedback</label>
  <textarea id="feedback" class="textarea__field">Great product!</textarea>
  <span class="textarea__success-message">Thank you for your feedback!</span>
</div>
```

## Character Counter

```html
<div class="textarea">
  <label class="textarea__label" for="tweet">Tweet</label>
  <textarea
    id="tweet"
    class="textarea__field"
    maxlength="280"
    oninput="updateCounter(this, 'counter', 280)"
  ></textarea>
  <div class="textarea__counter">
    <span id="counter">0 / 280</span>
  </div>
</div>

<script>
function updateCounter(textarea, counterId, maxLength) {
  const counter = document.getElementById(counterId);
  const length = textarea.value.length;
  counter.textContent = `${length} / ${maxLength}`;

  counter.classList.remove('textarea__counter--warning', 'textarea__counter--error');

  const percentUsed = (length / maxLength) * 100;
  if (percentUsed >= 90) {
    counter.classList.add('textarea__counter--error');
  } else if (percentUsed >= 75) {
    counter.classList.add('textarea__counter--warning');
  }
}
</script>
```

## Counter with Helper Text

```html
<div class="textarea">
  <label class="textarea__label" for="bio">Bio</label>
  <textarea id="bio" class="textarea__field" maxlength="500"></textarea>
  <div class="textarea__footer">
    <span class="textarea__helper">Write a brief description.</span>
    <span class="textarea__counter">0 / 500</span>
  </div>
</div>
```

## Resize Options

### No Resize
```html
<div class="textarea textarea--no-resize">
  <textarea class="textarea__field"></textarea>
</div>
```

### Vertical Resize (Default)
```html
<div class="textarea">
  <textarea class="textarea__field"></textarea>
</div>
```

### Horizontal Resize
```html
<div class="textarea textarea--resize-horizontal">
  <textarea class="textarea__field"></textarea>
</div>
```

### Both Directions
```html
<div class="textarea textarea--resize-both">
  <textarea class="textarea__field"></textarea>
</div>
```

## Auto-Resize

```html
<div class="textarea textarea--auto-resize">
  <label class="textarea__label" for="auto">Auto-Expanding</label>
  <textarea
    id="auto"
    class="textarea__field"
    oninput="autoResize(this)"
  ></textarea>
</div>

<script>
function autoResize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}
</script>
```

## Required Field

```html
<div class="textarea">
  <label class="textarea__label textarea__label--required" for="comments">
    Comments
  </label>
  <textarea id="comments" class="textarea__field" required></textarea>
  <span class="textarea__helper">This field is required.</span>
</div>
```

## CSS Classes Reference

### Block
- `.textarea` - Base textarea wrapper (required)

### Elements
- `.textarea__field` - The actual textarea element (required)
- `.textarea__label` - Label element
- `.textarea__helper` - Helper text
- `.textarea__error-message` - Error message text
- `.textarea__success-message` - Success message text
- `.textarea__counter` - Character counter
- `.textarea__footer` - Container for helper text and counter

### Modifiers
- `.textarea--small` - Small size
- `.textarea--medium` - Medium size (default)
- `.textarea--large` - Large size
- `.textarea--error` - Error validation state
- `.textarea--success` - Success validation state
- `.textarea--no-resize` - Disable resizing
- `.textarea--resize-horizontal` - Allow horizontal resize
- `.textarea--resize-both` - Allow both direction resize
- `.textarea--auto-resize` - Auto-expand with content

### Label Modifiers
- `.textarea__label--required` - Shows required asterisk

### Counter Modifiers
- `.textarea__counter--warning` - Warning color (75%+ used)
- `.textarea__counter--error` - Error color (90%+ used)

## JavaScript Functions

### updateCounter(textarea, counterId, maxLength)
Updates character counter with warning states.

**Parameters:**
- `textarea` - The textarea element
- `counterId` - ID of the counter span element
- `maxLength` - Maximum character length

### autoResize(textarea)
Automatically resizes textarea based on content.

**Parameters:**
- `textarea` - The textarea element

## Accessibility

- Uses semantic HTML with proper `<label>` elements
- All textareas have associated labels via `for` attribute
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
- `--spacing-2` through `--spacing-5`

### Typography
- `--font-body`
- `--text-sm`, `--text-base`, `--text-lg`
- `--font-normal`, `--font-medium`
- `--leading-relaxed`

### Effects
- `--radius-md`
- `--transition-base`
