/**
 * Main Theme JavaScript
 *
 * @package CustomTheme
 * @since 1.0.0
 */

(function () {
  'use strict';

  /**
   * Mobile menu toggle
   */
  function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', function () {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('is-open');
      });
    }
  }

  /**
   * Smooth scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Ignore if href is just "#"
        if (href === '#') {
          return;
        }

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, href);
          }
        }
      });
    });
  }

  /**
   * Add scroll class to header
   */
  function initScrollHeader() {
    const header = document.querySelector('.site-header');

    if (header) {
      let lastScroll = 0;

      window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }

        // Optional: Hide header on scroll down
        if (currentScroll > lastScroll && currentScroll > 500) {
          header.classList.add('is-hidden');
        } else {
          header.classList.remove('is-hidden');
        }

        lastScroll = currentScroll;
      });
    }
  }

  /**
   * Lazy load images
   */
  function initLazyLoad() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');

            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              img.classList.add('loaded');
            }

            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Initialize all functions
   */
  function init() {
    initMobileMenu();
    initSmoothScroll();
    initScrollHeader();
    initLazyLoad();

    console.log('Custom theme initialized');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
