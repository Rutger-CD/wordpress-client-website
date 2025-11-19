# Custom WordPress Blocks

Custom Gutenberg blocks voor Client Website die de UI Component Library gebruiken.

## Blocks Overzicht

### 1. Hero Block (`client-website/hero`)
- **Beschrijving**: Hero sectie met gradient background, heading, text en CTA buttons
- **Component**: Gebruikt `hero` component uit UI library
- **Features**:
  - 3 variants (gradient, solid, minimal)
  - 2 alignment opties (left, center)
  - Editable heading, subheading, description
  - Primary & secondary CTA buttons met URL controls
  - Support voor full/wide alignment

### 2. Content Section Block (`client-website/content-section`)
- **Beschrijving**: Content wrapper met verschillende layouts
- **Component**: Gebruikt `content-section` component uit UI library
- **Features**:
  - InnerBlocks voor flexibele content
  - Container width opties (contained, wide, full)
  - Spacing controls (padding top/bottom)

### 3. Card Grid Block (`client-website/card-grid`)
- **Beschrijving**: Responsive grid van cards
- **Component**: Gebruikt `card` component uit UI library
- **Features**:
  - Repeatable card items
  - Column opties (2, 3, 4 columns)
  - Card variants (default, elevated, outlined)
  - Image, title, description per card
  - CTA button per card

### 4. Button Block (`client-website/button`)
- **Beschrijving**: Custom button met alle UI library variants
- **Component**: Gebruikt `button` component uit UI library
- **Features**:
  - 7 variants (primary, secondary, tertiary, danger, success, warning, ghost)
  - 3 sizes (small, medium, large)
  - Icon support (leading/trailing)
  - Loading state
  - URL control

### 5. CTA Section Block (`client-website/cta-section`)
- **Beschrijving**: Call-to-action sectie met background
- **Component**: Combineert meerdere UI components
- **Features**:
  - Background color/gradient opties
  - Centered text alignment
  - Heading & description
  - Multiple CTA buttons
  - Spacing controls

## Development

### Setup
```bash
cd blocks
npm install
```

### Build voor productie
```bash
npm run build
```

### Development watch mode
```bash
npm start
```

### Linting
```bash
npm run lint:js
npm run lint:css
```

## Block Registration

Alle blocks worden geregistreerd in `functions.php`:

```php
function client_website_register_blocks() {
    register_block_type( __DIR__ . '/blocks/hero' );
    register_block_type( __DIR__ . '/blocks/content-section' );
    register_block_type( __DIR__ . '/blocks/card-grid' );
    register_block_type( __DIR__ . '/blocks/button' );
    register_block_type( __DIR__ . '/blocks/cta-section' );
}
add_action( 'init', 'client_website_register_blocks' );
```

## File Structure

```
blocks/
├── package.json
├── hero/
│   ├── block.json
│   ├── index.js
│   ├── edit.js
│   ├── save.js
│   ├── style.css
│   └── editor.css
├── content-section/
│   ├── block.json
│   ├── index.js
│   ├── edit.js
│   ├── save.js
│   ├── style.css
│   └── editor.css
├── card-grid/
│   ├── block.json
│   ├── index.js
│   ├── edit.js
│   ├── save.js
│   ├── style.css
│   └── editor.css
├── button/
│   ├── block.json
│   ├── index.js
│   ├── edit.js
│   ├── save.js
│   ├── style.css
│   └── editor.css
└── cta-section/
    ├── block.json
    ├── index.js
    ├── edit.js
    ├── save.js
    ├── style.css
    └── editor.css
```

## Component Library Integration

Alle blocks gebruiken de componenten uit `/components`:
- Hero Block → `/components/hero/hero.css`
- Content Section → `/components/content-section/content-section.css`
- Card Grid → `/components/card/card.css`
- Button → `/components/button/button.css`
- Design tokens → `/components/_base/variables.css`

## WordPress Integration

### Theme `functions.php`
```php
/**
 * Enqueue UI Component Library Styles
 */
function client_website_enqueue_component_styles() {
    // Base styles
    wp_enqueue_style(
        'client-website-variables',
        get_template_directory_uri() . '/components/_base/variables.css',
        array(),
        '1.0.0'
    );

    wp_enqueue_style(
        'client-website-reset',
        get_template_directory_uri() . '/components/_base/reset.css',
        array('client-website-variables'),
        '1.0.0'
    );

    // Component styles
    $components = ['button', 'card', 'hero', 'content-section'];
    foreach ($components as $component) {
        wp_enqueue_style(
            "client-website-{$component}",
            get_template_directory_uri() . "/components/{$component}/{$component}.css",
            array('client-website-variables'),
            '1.0.0'
        );
    }
}
add_action( 'wp_enqueue_scripts', 'client_website_enqueue_component_styles' );
add_action( 'enqueue_block_editor_assets', 'client_website_enqueue_component_styles' );
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility
- WCAG AA compliant
- Keyboard navigable
- Screen reader friendly
- Semantic HTML

## Testing Checklist
- [ ] Blocks appear in Gutenberg editor
- [ ] Blocks use UI component styling correctly
- [ ] Block controls work (InspectorControls)
- [ ] Blocks are responsive (mobile, tablet, desktop)
- [ ] Blocks save and render correctly on frontend
- [ ] No JavaScript errors in console
- [ ] Accessibility: keyboard navigation works
- [ ] Accessibility: screen reader announces correctly

## Implementation Status

✅ **Completed Blocks**:
1. Hero Block - Full implementation with 3 variants and alignment options
2. Content Section Block - InnerBlocks support with width and spacing controls
3. Button Block - 6 variants, 3 sizes, URL controls
4. Card Grid Block - Responsive grid with repeater, 2-4 columns
5. CTA Section Block - 4 background options, text alignment

## Notes
- Alle blocks gebruiken BEM naming convention
- Alle blocks gebruiken design tokens (geen hardcoded waarden)
- Blocks zijn server-side rendered voor betere performance
- Block styles zijn gescheiden (editor.css vs style.css)
- Alle blocks integreren met UI Component Library

## Resources
- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [@wordpress/scripts Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/)
- [UI Component Library](../components/README.md)
