/**
 * Initializes smooth scroll behavior for anchor links targeting the Ravekit product section.
 *
 * This function finds all anchor tags linking to the `#ravekit-product` ID,
 * and overrides the default jump behavior with a smooth scroll effect.
 *
 * Expected HTML structure:
 * - One or more `<a href="#ravekit-product">` links on the page.
 * - A target element with `id="ravekit-product"` somewhere on the page.
 *
 * How it works:
 * 1. Prevents the default anchor jump.
 * 2. Smoothly scrolls to the target element using `scrollIntoView`.
 */
export function initSmoothScrollToRavekit() {
  const links = document.querySelectorAll('a[href="#ravekit-product"]');

  if (!links.length) return;

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const target = document.getElementById('ravekit-product');

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
