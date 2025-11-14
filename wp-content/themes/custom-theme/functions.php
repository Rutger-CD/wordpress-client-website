<?php
/**
 * Custom Theme Functions
 *
 * @package CustomTheme
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Theme setup
 */
function custom_theme_setup() {
	// Add support for editor styles
	add_theme_support( 'editor-styles' );

	// Enqueue editor styles
	add_editor_style( 'assets/css/editor-style.css' );

	// Add support for responsive embeds
	add_theme_support( 'responsive-embeds' );

	// Add support for block styles
	add_theme_support( 'wp-block-styles' );

	// Add support for full and wide align images
	add_theme_support( 'align-wide' );

	// Add support for custom line height controls
	add_theme_support( 'custom-line-height' );

	// Add support for custom units
	add_theme_support( 'custom-units' );

	// Add support for custom spacing
	add_theme_support( 'custom-spacing' );

	// Add support for link color
	add_theme_support( 'link-color' );

	// Add support for experimental appearance tools
	add_theme_support( 'appearance-tools' );

	// Add support for border controls
	add_theme_support( 'border' );
}
add_action( 'after_setup_theme', 'custom_theme_setup' );

/**
 * Enqueue theme styles and scripts
 */
function custom_theme_enqueue_assets() {
	// Enqueue brand guide design tokens
	wp_enqueue_style(
		'brand-guide-tokens',
		get_template_directory_uri() . '/assets/css/design-tokens.css',
		array(),
		filemtime( get_template_directory() . '/assets/css/design-tokens.css' )
	);

	// Enqueue Google Fonts
	wp_enqueue_style(
		'google-fonts',
		'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap',
		array(),
		null
	);

	// Enqueue main theme stylesheet
	wp_enqueue_style(
		'custom-theme-style',
		get_stylesheet_uri(),
		array( 'brand-guide-tokens' ),
		wp_get_theme()->get( 'Version' )
	);

	// Enqueue custom styles
	wp_enqueue_style(
		'custom-theme-main',
		get_template_directory_uri() . '/assets/css/main.css',
		array( 'brand-guide-tokens' ),
		filemtime( get_template_directory() . '/assets/css/main.css' )
	);

	// Enqueue theme JavaScript
	wp_enqueue_script(
		'custom-theme-script',
		get_template_directory_uri() . '/assets/js/main.js',
		array(),
		filemtime( get_template_directory() . '/assets/js/main.js' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'custom_theme_enqueue_assets' );

/**
 * Enqueue editor assets
 */
function custom_theme_enqueue_editor_assets() {
	// Enqueue brand guide tokens in editor
	wp_enqueue_style(
		'brand-guide-tokens-editor',
		get_template_directory_uri() . '/assets/css/design-tokens.css',
		array(),
		filemtime( get_template_directory() . '/assets/css/design-tokens.css' )
	);

	// Enqueue Google Fonts in editor
	wp_enqueue_style(
		'google-fonts-editor',
		'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap',
		array(),
		null
	);
}
add_action( 'enqueue_block_editor_assets', 'custom_theme_enqueue_editor_assets' );

/**
 * Register custom image sizes
 */
function custom_theme_image_sizes() {
	// Hero images
	add_image_size( 'hero-desktop', 1920, 1080, true );
	add_image_size( 'hero-tablet', 1024, 576, true );
	add_image_size( 'hero-mobile', 768, 432, true );

	// Card images
	add_image_size( 'card-large', 800, 600, true );
	add_image_size( 'card-medium', 600, 450, true );
	add_image_size( 'card-small', 400, 300, true );

	// Thumbnail variants
	add_image_size( 'thumbnail-square', 400, 400, true );
	add_image_size( 'thumbnail-portrait', 400, 600, true );
	add_image_size( 'thumbnail-landscape', 600, 400, true );
}
add_action( 'after_setup_theme', 'custom_theme_image_sizes' );

/**
 * Add custom image sizes to media library
 */
function custom_theme_image_size_names( $sizes ) {
	return array_merge( $sizes, array(
		'hero-desktop'         => __( 'Hero Desktop', 'custom-theme' ),
		'hero-tablet'          => __( 'Hero Tablet', 'custom-theme' ),
		'hero-mobile'          => __( 'Hero Mobile', 'custom-theme' ),
		'card-large'           => __( 'Card Large', 'custom-theme' ),
		'card-medium'          => __( 'Card Medium', 'custom-theme' ),
		'card-small'           => __( 'Card Small', 'custom-theme' ),
		'thumbnail-square'     => __( 'Thumbnail Square', 'custom-theme' ),
		'thumbnail-portrait'   => __( 'Thumbnail Portrait', 'custom-theme' ),
		'thumbnail-landscape'  => __( 'Thumbnail Landscape', 'custom-theme' ),
	) );
}
add_filter( 'image_size_names_choose', 'custom_theme_image_size_names' );

/**
 * Register block patterns category
 */
function custom_theme_register_block_pattern_categories() {
	register_block_pattern_category(
		'custom-theme-hero',
		array(
			'label'       => __( 'Hero Sections', 'custom-theme' ),
			'description' => __( 'Hero section patterns', 'custom-theme' ),
		)
	);

	register_block_pattern_category(
		'custom-theme-content',
		array(
			'label'       => __( 'Content Sections', 'custom-theme' ),
			'description' => __( 'Content section patterns', 'custom-theme' ),
		)
	);

	register_block_pattern_category(
		'custom-theme-cta',
		array(
			'label'       => __( 'Call to Action', 'custom-theme' ),
			'description' => __( 'CTA section patterns', 'custom-theme' ),
		)
	);
}
add_action( 'init', 'custom_theme_register_block_pattern_categories' );

/**
 * Register custom blocks
 */
function custom_theme_register_blocks() {
	// Auto-register all blocks in /blocks directory
	$blocks_dir = get_template_directory() . '/blocks';

	if ( file_exists( $blocks_dir ) ) {
		$blocks = glob( $blocks_dir . '/*/block.json' );

		foreach ( $blocks as $block ) {
			register_block_type( dirname( $block ) );
		}
	}
}
add_action( 'init', 'custom_theme_register_blocks' );

/**
 * Add custom body classes
 */
function custom_theme_body_classes( $classes ) {
	// Add has-sidebar class for pages with sidebar
	if ( is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'has-sidebar';
	}

	// Add page slug to body class
	if ( is_page() ) {
		global $post;
		$classes[] = 'page-' . $post->post_name;
	}

	return $classes;
}
add_filter( 'body_class', 'custom_theme_body_classes' );

/**
 * Customize excerpt length
 */
function custom_theme_excerpt_length( $length ) {
	return 30;
}
add_filter( 'excerpt_length', 'custom_theme_excerpt_length' );

/**
 * Customize excerpt more
 */
function custom_theme_excerpt_more( $more ) {
	return '...';
}
add_filter( 'excerpt_more', 'custom_theme_excerpt_more' );

/**
 * Add preconnect for Google Fonts
 */
function custom_theme_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = array(
			'href' => 'https://fonts.googleapis.com',
			'crossorigin',
		);
		$urls[] = array(
			'href' => 'https://fonts.gstatic.com',
			'crossorigin',
		);
	}
	return $urls;
}
add_filter( 'wp_resource_hints', 'custom_theme_resource_hints', 10, 2 );

/**
 * Security: Remove WordPress version from head
 */
remove_action( 'wp_head', 'wp_generator' );

/**
 * Performance: Disable emoji scripts
 */
function custom_theme_disable_emojis() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
}
add_action( 'init', 'custom_theme_disable_emojis' );

/**
 * Performance: Defer non-critical JavaScript
 */
function custom_theme_defer_scripts( $tag, $handle, $src ) {
	// Don't defer jQuery or admin scripts
	if ( is_admin() || strpos( $handle, 'jquery' ) !== false ) {
		return $tag;
	}

	// Defer our custom scripts
	if ( strpos( $handle, 'custom-theme' ) !== false ) {
		return str_replace( ' src', ' defer src', $tag );
	}

	return $tag;
}
add_filter( 'script_loader_tag', 'custom_theme_defer_scripts', 10, 3 );

/**
 * Add SVG support to media uploader
 */
function custom_theme_mime_types( $mimes ) {
	$mimes['svg']  = 'image/svg+xml';
	$mimes['svgz'] = 'image/svg+xml';
	return $mimes;
}
add_filter( 'upload_mimes', 'custom_theme_mime_types' );

/**
 * Fix SVG thumbnails in media library
 */
function custom_theme_fix_svg_thumb_display() {
	echo '<style>
		.attachment-svg.type-image svg {
			width: 100% !important;
			height: auto !important;
		}
	</style>';
}
add_action( 'admin_head', 'custom_theme_fix_svg_thumb_display' );
