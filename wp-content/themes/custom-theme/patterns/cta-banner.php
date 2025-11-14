<?php
/**
 * Title: Call to Action Banner
 * Slug: custom-theme/cta-banner
 * Categories: custom-theme-cta
 * Description: Call to action banner with gradient background
 */
?>

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|3xl","bottom":"var:preset|spacing|3xl"}}},"gradient":"primary-gradient","textColor":"text-inverse","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-text-inverse-color has-primary-gradient-gradient-background has-text-color has-background" style="padding-top:var(--wp--preset--spacing--3-xl);padding-bottom:var(--wp--preset--spacing--3-xl)">
	<!-- wp:heading {"textAlign":"center","level":2,"fontSize":"4xl"} -->
	<h2 class="wp-block-heading has-text-align-center has-4-xl-font-size">Klaar om te starten?</h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","style":{"spacing":{"margin":{"top":"var:preset|spacing|4","bottom":"var:preset|spacing|8"}}},"fontSize":"xl"} -->
	<p class="has-text-align-center has-xl-font-size" style="margin-top:var(--wp--preset--spacing--4);margin-bottom:var(--wp--preset--spacing--8)">Neem vandaag nog contact met ons op en ontdek wat we voor jou kunnen betekenen.</p>
	<!-- /wp:paragraph -->

	<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
	<div class="wp-block-buttons">
		<!-- wp:button {"backgroundColor":"background","textColor":"primary","style":{"border":{"radius":"8px"},"spacing":{"padding":{"left":"var:preset|spacing|10","right":"var:preset|spacing|10","top":"var:preset|spacing|4","bottom":"var:preset|spacing|4"}}}} -->
		<div class="wp-block-button"><a class="wp-block-button__link has-primary-color has-background-background-color has-text-color has-background wp-element-button" style="border-radius:8px;padding-top:var(--wp--preset--spacing--4);padding-right:var(--wp--preset--spacing--10);padding-bottom:var(--wp--preset--spacing--4);padding-left:var(--wp--preset--spacing--10)">Neem Contact Op</a></div>
		<!-- /wp:button -->
	</div>
	<!-- /wp:buttons -->
</div>
<!-- /wp:group -->
