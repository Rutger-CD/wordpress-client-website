<?php
/**
 * Title: Full Page Template
 * Slug: client-website/full-page-template
 * Categories: client-website-patterns
 * Description: Complete page layout with hero, content, features, and CTA
 */
?>

<!-- wp:client-website/hero {"heading":"Welcome to Our Website","subheading":"Build something amazing","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","primaryButtonText":"Get Started","primaryButtonUrl":"#","secondaryButtonText":"Learn More","secondaryButtonUrl":"#","variant":"gradient","alignment":"center"} -->
<div class="wp-block-client-website-hero hero hero--gradient hero--center"><div class="hero__container"><div class="hero__content"><p class="hero__subheading">Build something amazing</p><h1 class="hero__heading">Welcome to Our Website</h1><p class="hero__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><div class="hero__actions"><a href="#" class="btn btn--primary btn--large">Get Started</a><a href="#" class="btn btn--secondary btn--large">Learn More</a></div></div></div></div>
<!-- /wp:client-website/hero -->

<!-- wp:client-website/content-section {"width":"contained","paddingTop":"large","paddingBottom":"large"} -->
<div class="wp-block-client-website-content-section content-section content-section--contained content-section--pt-large content-section--pb-large"><div class="content-section__container">
<!-- wp:heading {"textAlign":"center"} -->
<h2 class="has-text-align-center">About Us</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Learn more about our company and what we do.</p>
<!-- /wp:paragraph -->
</div></div>
<!-- /wp:client-website/content-section -->

<!-- wp:client-website/card-grid {"columns":3,"cards":[{"id":1,"image":"","title":"Feature One","description":"Description for feature one goes here","linkUrl":"#","linkText":"Learn more"},{"id":2,"image":"","title":"Feature Two","description":"Description for feature two goes here","linkUrl":"#","linkText":"Learn more"},{"id":3,"image":"","title":"Feature Three","description":"Description for feature three goes here","linkUrl":"#","linkText":"Learn more"}]} -->
<div class="wp-block-client-website-card-grid card-grid card-grid--columns-3"><div class="card-grid__container"><div class="card"><div class="card__content"><h3 class="card__title">Feature One</h3><p class="card__description">Description for feature one goes here</p><a href="#" class="card__link">Learn more</a></div></div><div class="card"><div class="card__content"><h3 class="card__title">Feature Two</h3><p class="card__description">Description for feature two goes here</p><a href="#" class="card__link">Learn more</a></div></div><div class="card"><div class="card__content"><h3 class="card__title">Feature Three</h3><p class="card__description">Description for feature three goes here</p><a href="#" class="card__link">Learn more</a></div></div></div></div>
<!-- /wp:client-website/card-grid -->

<!-- wp:client-website/content-section {"width":"contained","paddingTop":"large","paddingBottom":"large"} -->
<div class="wp-block-client-website-content-section content-section content-section--contained content-section--pt-large content-section--pb-large"><div class="content-section__container">
<!-- wp:heading {"textAlign":"center"} -->
<h2 class="has-text-align-center">Our Services</h2>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center">Discover what we can do for you.</p>
<!-- /wp:paragraph -->
</div></div>
<!-- /wp:client-website/content-section -->

<!-- wp:client-website/cta-section {"heading":"Ready to get started?","description":"Join thousands of satisfied customers today","buttonText":"Get Started","buttonUrl":"#","backgroundColor":"gradient","textAlignment":"center"} -->
<div class="wp-block-client-website-cta-section cta-section cta-section--gradient cta-section--align-center"><div class="cta-section__container"><div class="cta-section__content"><h2 class="cta-section__heading">Ready to get started?</h2><p class="cta-section__description">Join thousands of satisfied customers today</p><div class="cta-section__button-wrapper"><a href="#" class="button button--primary button--large">Get Started</a></div></div></div></div>
<!-- /wp:client-website/cta-section -->
