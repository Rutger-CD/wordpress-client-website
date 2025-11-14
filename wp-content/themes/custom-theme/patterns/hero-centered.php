<?php
/**
 * Title: Hero Section - Centered
 * Slug: custom-theme/hero-centered
 * Categories: custom-theme-hero
 * Description: Centered hero section with title, description and CTA button
 */
?>

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|3xl","bottom":"var:preset|spacing|3xl"}}},"backgroundColor":"background","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-background-background-color has-background" style="padding-top:var(--wp--preset--spacing--3-xl);padding-bottom:var(--wp--preset--spacing--3-xl)">
	<!-- wp:heading {"textAlign":"center","level":1,"fontSize":"5xl"} -->
	<h1 class="wp-block-heading has-text-align-center has-5-xl-font-size">Welkom bij Brand Name</h1>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","style":{"spacing":{"margin":{"top":"var:preset|spacing|6","bottom":"var:preset|spacing|8"}}},"fontSize":"xl","textColor":"text-secondary"} -->
	<p class="has-text-align-center has-text-secondary-color has-text-color has-xl-font-size" style="margin-top:var(--wp--preset--spacing--6);margin-bottom:var(--wp--preset--spacing--8)">Een moderne website oplossing die perfect past bij jouw business needs.</p>
	<!-- /wp:paragraph -->

	<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
	<div class="wp-block-buttons">
		<!-- wp:button {"backgroundColor":"primary","textColor":"background","style":{"border":{"radius":"8px"},"spacing":{"padding":{"left":"var:preset|spacing|8","right":"var:preset|spacing|8","top":"var:preset|spacing|4","bottom":"var:preset|spacing|4"}}}} -->
		<div class="wp-block-button"><a class="wp-block-button__link has-background-color has-primary-background-color has-text-color has-background wp-element-button" style="border-radius:8px;padding-top:var(--wp--preset--spacing--4);padding-right:var(--wp--preset--spacing--8);padding-bottom:var(--wp--preset--spacing--4);padding-left:var(--wp--preset--spacing--8)">Get Started</a></div>
		<!-- /wp:button -->

		<!-- wp:button {"backgroundColor":"background","textColor":"primary","className":"is-style-outline","style":{"border":{"radius":"8px","width":"2px"},"spacing":{"padding":{"left":"var:preset|spacing|8","right":"var:preset|spacing|8","top":"var:preset|spacing|4","bottom":"var:preset|spacing|4"}}}} -->
		<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-primary-color has-background-background-color has-text-color has-background wp-element-button" style="border-width:2px;border-radius:8px;padding-top:var(--wp--preset--spacing--4);padding-right:var(--wp--preset--spacing--8);padding-bottom:var(--wp--preset--spacing--4);padding-left:var(--wp--preset--spacing--8)">Learn More</a></div>
		<!-- /wp:button -->
	</div>
	<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
