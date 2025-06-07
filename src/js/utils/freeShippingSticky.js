/**
 * Initializes a sticky behavior for the free shipping banner.
 *
 * This function makes the banner text container stick to the top of the viewport
 * once the user scrolls past its original position. It also adds a spacer element
 * below it to avoid layout shift.
 *
 * Expected HTML structure:
 * - An element with `[data-banner-text]` for the sticky banner content.
 * - A sibling element with the class `.free-shipping-banner__spacer` to hold space.
 *
 * How it works:
 * 1. Calculates the banner height and sets it as the spacer's height.
 * 2. Determines the vertical position at which the banner should become sticky.
 * 3. Adds/removes the `--sticky` modifier class based on scroll position.
 */

export function initFreeShippingSticky() {
  const textContainer = document.querySelector('[data-banner-text]');
  const spacer       = document.querySelector('.free-shipping-banner__spacer');
  if (!textContainer || !spacer) return;

  const height = textContainer.offsetHeight;
  spacer.style.height = `${height}px`;

  const triggerAt = textContainer.getBoundingClientRect().top + window.scrollY;

  function onScroll() {
    if (window.scrollY >= triggerAt) {
      textContainer.classList.add('free-shipping-banner__text-container--sticky');
    } else {
      textContainer.classList.remove('free-shipping-banner__text-container--sticky');
    }
  }

  window.addEventListener('scroll', onScroll);
  onScroll();
}
