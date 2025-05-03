/**
 * Simple throttle using requestAnimationFrame.
 * Ensures the provided function is not called more than once per animation frame.
 *
 * @param {Function} fn - The function to throttle.
 * @returns {Function} A throttled version of the function.
 */
function throttle(fn) {
  let ticking = false;
  return function (...args) {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        fn(...args);
        ticking = false;
      });
      ticking = true;
    }
  };
}

/**
 * Initializes scroll-based effects:
 *  - Parallax translation on the Y axis, based on `data-parallax-speed`
 *  - Continuous rotation based on `data-rotate-on-scroll`
 *
 * Each element with those data attributes will be updated on scroll.
 *
 * Usage in markup:
 *   <img
 *     src="…"
 *     data-parallax-speed="0.3"
 *     data-rotate-on-scroll="0.001"
 *     alt="…"
 *   />
 */
export function initScrollEffects() {
  const parallaxElements = Array.from(
    document.querySelectorAll('[data-parallax-speed]')
  ).map(el => ({
    el,
    speed: parseFloat(el.dataset.parallaxSpeed),
  }));

  const rotationElements = Array.from(
    document.querySelectorAll('[data-rotate-on-scroll]')
  ).map(el => ({
    el,
    factor: parseFloat(el.dataset.rotateOnScroll),
  }));

  /**
   * Handler that applies transforms based on the current scroll position.
   */
  const onScroll = () => {
    const scrollY = window.scrollY;

    parallaxElements.forEach(({ el, speed }) => {
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });

    rotationElements.forEach(({ el, factor }) => {
      const current = el.style.transform || '';
      el.style.transform = `${current} rotate(${scrollY * factor}deg)`;
    });
  };

  window.addEventListener('scroll', throttle(onScroll));

  onScroll();
}
