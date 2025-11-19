<?php
/**
 * Client Website Theme Functions
 *
 * @package ClientWebsite
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Register Custom Gutenberg Blocks
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
        register_block_type(__DIR__ . '/blocks/' . $block);
    }
}
add_action('init', 'client_website_register_blocks');

/**
 * Enqueue Component Library Base Styles
 *
 * Loads design tokens and reset styles globally
 */
function client_website_enqueue_base_styles() {
    // Base styles - Always load first with high priority
    wp_enqueue_style(
        'client-website-variables',
        get_template_directory_uri() . '/components/_base/variables.css',
        [],
        '1.0.0'
    );

    wp_enqueue_style(
        'client-website-reset',
        get_template_directory_uri() . '/components/_base/reset.css',
        ['client-website-variables'],
        '1.0.0'
    );
}
add_action('wp_enqueue_scripts', 'client_website_enqueue_base_styles', 1);
add_action('enqueue_block_editor_assets', 'client_website_enqueue_base_styles', 1);
add_action('admin_enqueue_scripts', 'client_website_enqueue_base_styles', 1);

/**
 * Enqueue Component Library Component Styles
 *
 * Loads individual component styles that are used by blocks
 */
function client_website_enqueue_component_styles() {
    $components = [
        // Phase 1: Foundation
        'button',
        'card',
        // Phase 2: Layout
        'hero',
        'content-section',
        'header',
        'footer',
        // Phase 3: Forms
        'input',
        'textarea',
        'select',
        // Phase 3: Interactive
        'accordion',
        'tabs',
        'modal',
        'alert',
        'tooltip',
        'dropdown'
    ];

    foreach ($components as $component) {
        $css_path = get_template_directory() . "/components/{$component}/{$component}.css";
        $js_path = get_template_directory() . "/components/{$component}/{$component}.js";

        // Enqueue CSS
        if (file_exists($css_path)) {
            wp_enqueue_style(
                "client-website-{$component}",
                get_template_directory_uri() . "/components/{$component}/{$component}.css",
                ['client-website-variables'],
                '1.0.0'
            );
        }

        // Enqueue JS for interactive components
        if (file_exists($js_path)) {
            wp_enqueue_script(
                "client-website-{$component}",
                get_template_directory_uri() . "/components/{$component}/{$component}.js",
                [],
                '1.0.0',
                true
            );
        }
    }
}
add_action('wp_enqueue_scripts', 'client_website_enqueue_component_styles', 5);
add_action('enqueue_block_editor_assets', 'client_website_enqueue_component_styles', 5);
add_action('admin_enqueue_scripts', 'client_website_enqueue_component_styles', 5);

/**
 * Add Theme Support
 */
function client_website_theme_support() {
    // Add support for Block Styles
    add_theme_support('wp-block-styles');

    // Add support for full and wide align images
    add_theme_support('align-wide');

    // Add support for editor styles
    add_theme_support('editor-styles');

    // Add support for responsive embeds
    add_theme_support('responsive-embeds');

    // Add support for custom line height
    add_theme_support('custom-line-height');

    // Add support for custom spacing
    add_theme_support('custom-spacing');

    // Add support for custom units
    add_theme_support('custom-units', 'px', 'rem', 'em', '%', 'vw', 'vh');
}
add_action('after_setup_theme', 'client_website_theme_support');

/**
 * Register Block Categories
 */
function client_website_block_categories($categories) {
    return array_merge(
        [
            [
                'slug'  => 'client-website-blocks',
                'title' => __('Client Website - Blocks', 'client-website'),
                'icon'  => 'admin-customizer',
            ],
        ],
        $categories
    );
}
add_filter('block_categories_all', 'client_website_block_categories');

/**
 * Enqueue Editor Styles
 */
function client_website_editor_styles() {
    add_editor_style('editor-styles.css');
}
add_action('after_setup_theme', 'client_website_editor_styles');

/**
 * Register Block Patterns
 */
function client_website_register_patterns() {
    // Register pattern category
    register_block_pattern_category(
        'client-website-patterns',
        [
            'label' => __('Client Website - Patterns', 'client-website'),
        ]
    );
}
add_action('init', 'client_website_register_patterns');
