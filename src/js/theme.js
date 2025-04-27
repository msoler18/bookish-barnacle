import { parallaxOnScroll } from './utils/animations';
import { initSmoothScrollToRavekit } from './utils/smoothScrollToRavekit';

import { initScienceAccordion } from './components/scienceAccordion';
import RavekitProduct from './components/RavekitProduct';



document.addEventListener('DOMContentLoaded', () => {
  initScienceAccordion();

  document.querySelectorAll('.ravekit-product').forEach(container => {
    console.log('[theme.js] Initializing RavekitProduct for container:', container);
    new RavekitProduct(container);
  });

  const texture = document.querySelector('.hero-product__texture');
  const product = document.querySelector('.hero-product__product');
  const sticker = document.querySelector('.hero-product__sticker');

  parallaxOnScroll([
    { element: texture, speed: 0.05 },
    { element: product, speed: 0.1 },
    { element: sticker, speed: 0.08 }
  ]);

  initSmoothScrollToRavekit();
});
