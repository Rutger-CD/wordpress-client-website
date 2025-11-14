<?php
/**
 * Title: Content Section - Two Columns
 * Slug: custom-theme/content-two-columns
 * Categories: custom-theme-content
 * Description: Two column content section with image and text
 */
?>

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|2xl","bottom":"var:preset|spacing|2xl"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull" style="padding-top:var(--wp--preset--spacing--2-xl);padding-bottom:var(--wp--preset--spacing--2-xl)">
	<!-- wp:columns {"verticalAlignment":"center","style":{"spacing":{"blockGap":{"top":"var:preset|spacing|12","left":"var:preset|spacing|12"}}}} -->
	<div class="wp-block-columns are-vertically-aligned-center">
		<!-- wp:column {"verticalAlignment":"center"} -->
		<div class="wp-block-column is-vertically-aligned-center">
			<!-- wp:image {"sizeSlug":"large","linkDestination":"none","style":{"border":{"radius":"12px"}}} -->
			<figure class="wp-block-image size-large has-custom-border"><img src="" alt="" style="border-radius:12px"/></figure>
			<!-- /wp:image -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"verticalAlignment":"center"} -->
		<div class="wp-block-column is-vertically-aligned-center">
			<!-- wp:heading {"fontSize":"4xl"} -->
			<h2 class="wp-block-heading has-4-xl-font-size">Waarom kiezen voor ons?</h2>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"var:preset|spacing|4","bottom":"var:preset|spacing|6"}}},"textColor":"text-secondary","fontSize":"lg"} -->
			<p class="has-text-secondary-color has-text-color has-lg-font-size" style="margin-top:var(--wp--preset--spacing--4);margin-bottom:var(--wp--preset--spacing--6)">We leveren hoogwaardige oplossingen die perfect aansluiten bij jouw zakelijke doelen. Met jarenlange ervaring en een passie voor kwaliteit.</p>
			<!-- /wp:paragraph -->

			<!-- wp:list {"style":{"spacing":{"margin":{"top":"0","bottom":"var:preset|spacing|8"}}}} -->
			<ul style="margin-top:0;margin-bottom:var(--wp--preset--spacing--8)">
				<!-- wp:list-item -->
				<li>Expertise en ervaring</li>
				<!-- /wp:list-item -->

				<!-- wp:list-item -->
				<li>Persoonlijke benadering</li>
				<!-- /wp:list-item -->

				<!-- wp:list-item -->
				<li>Resultaatgericht werken</li>
				<!-- /wp:list-item -->

				<!-- wp:list-item -->
				<li>Uitstekende ondersteuning</li>
				<!-- /wp:list-item -->
			</ul>
			<!-- /wp:list -->

			<!-- wp:buttons -->
			<div class="wp-block-buttons">
				<!-- wp:button {"backgroundColor":"primary","textColor":"background"} -->
				<div class="wp-block-button"><a class="wp-block-button__link has-background-color has-primary-background-color has-text-color has-background wp-element-button">Meer informatie</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
