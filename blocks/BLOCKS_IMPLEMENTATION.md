# Remaining Blocks Implementation Guide

Omdat we context moeten besparen, hier is de gecomprimeerde implementatie voor de overige 3 blocks.

## Button Block

Alle bestanden volgen dezelfde structuur als Hero en Content Section.

### button/block.json
```json
{
  "apiVersion": 3,
  "name": "client-website/button",
  "title": "Button",
  "category": "design",
  "icon": "button",
  "attributes": {
    "text": { "type": "string", "default": "Click me" },
    "url": { "type": "string", "default": "" },
    "variant": { "type": "string", "default": "primary" },
    "size": { "type": "string", "default": "medium" }
  }
}
```

### button/edit.js - Key features
- RichText voor button text
- URLInput voor link
- SelectControl voor variant (primary, secondary, tertiary, etc.)
- SelectControl voor size (small, medium, large)

### button/style.css
```css
@import '../../components/button/button.css';
```

## Card Grid Block

### card-grid/block.json
```json
{
  "apiVersion": 3,
  "name": "client-website/card-grid",
  "title": "Card Grid",
  "category": "design",
  "attributes": {
    "columns": { "type": "number", "default": 3 },
    "cards": { "type": "array", "default": [] }
  }
}
```

### Features
- Repeater field voor cards
- Elke card heeft: image, title, description, link
- Column selector (2, 3, 4 columns)
- Responsive grid

## CTA Section Block

### cta-section/block.json
```json
{
  "apiVersion": 3,
  "name": "client-website/cta-section",
  "title": "CTA Section",
  "category": "design",
  "attributes": {
    "heading": { "type": "string" },
    "description": { "type": "string" },
    "buttonText": { "type": "string" },
    "buttonUrl": { "type": "string" },
    "backgroundColor": { "type": "string", "default": "primary" }
  }
}
```

### Features
- Editable heading & description
- CTA button
- Background color options
- Centered alignment

## functions.php

```php
<?php
/**
 * Register Custom Blocks
 */
function client_website_register_blocks() {
    $blocks = [
        'hero',
        'content-section',
        'card-grid',
        'button',
        'cta-section'
    ];

    foreach ($blocks as $block) {
        register_block_type( __DIR__ . '/blocks/' . $block );
    }
}
add_action( 'init', 'client_website_register_blocks' );

/**
 * Enqueue Component Library Styles
 */
function client_website_enqueue_styles() {
    // Base
    wp_enqueue_style('client-website-variables', get_template_directory_uri() . '/components/_base/variables.css');
    wp_enqueue_style('client-website-reset', get_template_directory_uri() . '/components/_base/reset.css');

    // Components
    $components = ['button', 'card', 'hero', 'content-section'];
    foreach ($components as $component) {
        wp_enqueue_style(
            "client-website-{$component}",
            get_template_directory_uri() . "/components/{$component}/{$component}.css",
            ['client-website-variables']
        );
    }
}
add_action('wp_enqueue_scripts', 'client_website_enqueue_styles');
add_action('enqueue_block_editor_assets', 'client_website_enqueue_styles');
```

## Status

✅ Hero Block - Complete
✅ Content Section Block - Complete
⏸️ Button Block - Structure defined, needs implementation
⏸️ Card Grid Block - Structure defined, needs implementation
⏸️ CTA Section Block - Structure defined, needs implementation
⏸️ functions.php - Ready to implement

## Next Steps

1. Implement remaining 3 blocks met dezelfde pattern
2. Create functions.php
3. Test in WordPress
4. Create PR
5. Update Linear
