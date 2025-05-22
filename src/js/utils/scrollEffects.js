/**
 * Simple throttle using requestAnimationFrame.
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
 * Initializes scroll-based effects.
 */
export function initScrollEffects() {

  const parallaxEls = Array.from(
    document.querySelectorAll('[data-parallax-speed]')
  ).filter(el => !el.hasAttribute('data-rotate-on-scroll'));

  const rotationEls = Array.from(
    document.querySelectorAll('[data-rotate-on-scroll]')
  ).filter(el => !el.classList.contains('alien_ravekit')); // Excluye alien si existe

  const alienEls = Array.from(document.querySelectorAll('.alien_ravekit'));

  let lastScrollY = window.scrollY;
  const SCROLL_DELTA_THRESHOLD = 0.5;

  const onScroll = () => {
    const scrollY = window.scrollY;
    const delta = scrollY - lastScrollY;
    
    parallaxEls.forEach(el => {
      const speedString = el.dataset.parallaxSpeed;
      const speed = parseFloat(speedString);

      if (isNaN(speed) || speed === 0) {
        return;
      }

      const transformValue = `translateY(${scrollY * -speed}px)`;
      el.style.transform = transformValue;
    });

    rotationEls.forEach(el => {
      const factorString = el.dataset.rotateOnScroll;
      const factor = parseFloat(factorString);

      if (isNaN(factor) || factor === 0) {
        return;
      }

      if (Math.abs(delta) > SCROLL_DELTA_THRESHOLD) {
        el._angle = (el._angle || 0) + delta * factor;
        el.style.transform = `rotate(${el._angle}deg)`;
      }
    });

    const vh = window.innerHeight;
    alienEls.forEach(el => {
      const r = el.getBoundingClientRect();
      const pixelsVisibleFromBottom = vh - r.top;
      const totalScrollDistanceForVisibility = vh + r.height;
      
      let prog = 0;
      if (totalScrollDistanceForVisibility > 0) {
          prog = pixelsVisibleFromBottom / totalScrollDistanceForVisibility;
      }
      
      prog = Math.min(Math.max(prog, 0), 1);

      const ang = prog * 180; 
      el.style.transform = `rotate(${ang}deg)`;
    });
    

    lastScrollY = scrollY;
  };

  window.addEventListener('scroll', throttle(onScroll), { passive: true });

  console.log('[Ravekit Effects] Performing initial onScroll call.');
  onScroll();
}