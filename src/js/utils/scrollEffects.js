/**
 * Simple throttle using requestAnimationFrame.
 * Ensures the provided function is not called more than once per animation frame.
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
 *  • Parallax translation on Y for [data-parallax-speed] (excluyendo al alien)
 *  • Continuous rotation for [data-rotate-on-scroll] (excluyendo al alien)
 *  • Alien (.alien_ravekit): NO translate, gira 0→180° según el porcentaje
 *    de visibilidad en pantalla (0 = fuera, 1 = totalmente dentro).
 */
export function initScrollEffects() {
  const parallaxEls = Array.from(
    document.querySelectorAll('[data-parallax-speed]')
  )
    .filter(el => !el.classList.contains('alien_ravekit'))
    .map(el => ({ el, speed: parseFloat(el.dataset.parallaxSpeed) }));

  const rotationEls = Array.from(
    document.querySelectorAll('[data-rotate-on-scroll]')
  )
    .filter(el => !el.classList.contains('alien_ravekit'))
    .map(el => ({ el, factor: parseFloat(el.dataset.rotateOnScroll) }));

  const alienEls = Array.from(document.querySelectorAll('.alien_ravekit'));

  const onScroll = () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    parallaxEls.forEach(({ el, speed }) => {
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });

    rotationEls.forEach(({ el, factor }) => {
      const base = el.style.transform.replace(/rotate\([^)]+\)/, '');
      el.style.transform = `${base} rotate(${scrollY * factor}deg)`;
    });

    alienEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      const progress = Math.min(
        Math.max((vh - rect.top) / (vh + rect.height), 0),
        1
      );
      const angle = progress * 180;
      el.style.transform = `rotate(${angle}deg)`;
    });
  };

  window.addEventListener('scroll', throttle(onScroll));
  onScroll();
}
