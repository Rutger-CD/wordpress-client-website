<?php
/**
 * Title: Content with Sidebar
 * Slug: client-website/content-with-sidebar
 * Categories: client-website-patterns
 * Description: Two-column layout with main content and sidebar
 */
?>

<!-- wp:columns -->
<div class="wp-block-columns">
	<!-- wp:column {"width":"66.66%"} -->
	<div class="wp-block-column" style="flex-basis:66.66%">
		<!-- wp:client-website/content-section {"width":"full","paddingTop":"medium","paddingBottom":"medium"} -->
		<!-- wp:heading -->
		<h2>Main Content</h2>
		<!-- /wp:heading -->

		<!-- wp:paragraph -->
		<p>Add your main content here using the WordPress block editor.</p>
		<!-- /wp:paragraph -->
		<!-- /wp:client-website/content-section -->
	</div>
	<!-- /wp:column -->

	<!-- wp:column {"width":"33.33%"} -->
	<div class="wp-block-column" style="flex-basis:33.33%">
		<!-- wp:heading {"level":3} -->
		<h3>Sidebar</h3>
		<!-- /wp:heading -->

		<!-- wp:paragraph -->
		<p>Add sidebar content here.</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:column -->
</div>
<!-- /wp:columns -->
