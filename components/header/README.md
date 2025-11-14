# Header Component

A responsive navigation header with logo, menu, mobile support, and multiple layout variants.

## Features

- ✅ Responsive navigation with mobile menu
- ✅ Dropdown submenus
- ✅ Sticky header on scroll
- ✅ Transparent header variant
- ✅ Centered logo layout
- ✅ Mobile hamburger menu
- ✅ WCAG AA compliant
- ✅ Keyboard navigation
- ✅ All styling uses design tokens

## Basic Usage

```html
<header class="header">
  <div class="header__container">
    <div class="header__logo">
      <a href="/" class="header__logo-link">
        <span class="header__logo-text">Brand</span>
      </a>
    </div>

    <nav class="header__nav">
      <ul class="header__menu">
        <li class="header__menu-item">
          <a href="#" class="header__menu-link">Home</a>
        </li>
        <li class="header__menu-item">
          <a href="#" class="header__menu-link">About</a>
        </li>
      </ul>
    </nav>

    <div class="header__actions">
      <button class="btn btn--primary btn--small">Get Started</button>
    </div>
  </div>
</header>
```

## Variants

### Sticky Header
```html
<header class="header header--sticky">
  <!-- ... -->
</header>
```

### Transparent Header
```html
<header class="header header--transparent">
  <!-- ... -->
</header>
```

### With Mobile Menu
```html
<header class="header">
  <div class="header__container">
    <!-- Logo, Nav, Actions -->

    <button class="header__toggle" aria-label="Toggle menu" aria-expanded="false">
      <span class="header__toggle-icon"></span>
    </button>
  </div>
</header>
```

### With Dropdown
```html
<li class="header__menu-item header__menu-item--has-submenu">
  <a href="#" class="header__menu-link">
    Services
    <svg class="header__menu-icon" width="16" height="16">...</svg>
  </a>
  <ul class="header__submenu">
    <li class="header__submenu-item">
      <a href="#" class="header__submenu-link">Service 1</a>
    </li>
  </ul>
</li>
```

## JavaScript

Include the JavaScript for mobile menu functionality:

```html
<script src="header.js"></script>
```

Or inline:

```javascript
// Mobile menu toggle
document.querySelectorAll('.header__toggle').forEach(toggle => {
  toggle.addEventListener('click', function() {
    const nav = this.previousElementSibling?.previousElementSibling;
    const isExpanded = this.getAttribute('aria-expanded') === 'true';

    this.setAttribute('aria-expanded', !isExpanded);
    this.classList.toggle('header__toggle--active');
    nav?.classList.toggle('header__nav--open');
  });
});
```

## CSS Classes Reference

### Block
- `.header` - Base header class (required)

### Elements
- `.header__container` - Content container
- `.header__logo` - Logo wrapper
- `.header__logo-link` - Logo link
- `.header__logo-text` - Logo text
- `.header__logo-image` - Logo image
- `.header__nav` - Navigation wrapper
- `.header__menu` - Menu list
- `.header__menu-item` - Menu item
- `.header__menu-link` - Menu link
- `.header__menu-icon` - Dropdown icon
- `.header__submenu` - Submenu list
- `.header__submenu-item` - Submenu item
- `.header__submenu-link` - Submenu link
- `.header__actions` - Action buttons wrapper
- `.header__toggle` - Mobile menu toggle button
- `.header__toggle-icon` - Hamburger icon

### Modifiers
- `.header--sticky` - Sticky header on scroll
- `.header--transparent` - Transparent background
- `.header--centered` - Centered logo layout
- `.header--scrolled` - Applied when scrolled (sticky only)

### State Classes
- `.header__menu-link--active` - Active menu item
- `.header__menu-item--has-submenu` - Item with submenu
- `.header__menu-item--open` - Open submenu (mobile)
- `.header__toggle--active` - Active mobile toggle
- `.header__nav--open` - Open mobile menu

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Design Tokens Used

### Colors
- `--color-background-primary`
- `--color-text-primary`
- `--color-text-secondary`
- `--color-text-inverse`
- `--color-border-light`
- `--color-primary-*`
- `--color-neutral-*`

### Spacing
- `--spacing-1` through `--spacing-12`

### Typography
- `--text-sm`, `--text-base`, `--text-xl`
- `--font-medium`, `--font-bold`

### Effects
- `--radius-sm`, `--radius-base`, `--radius-md`
- `--shadow-md`, `--shadow-lg`
- `--transition-base`

### Layout
- `--container-2xl`
