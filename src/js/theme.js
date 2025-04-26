import { parallaxOnScroll } from './utils/animations';
import { initScienceAccordion } from './components/scienceAccordion';

document.addEventListener('DOMContentLoaded', () => {

  initScienceAccordion();

  const texture = document.querySelector('.hero-product__texture');
  const product = document.querySelector('.hero-product__product');
  const sticker = document.querySelector('.hero-product__sticker');

  parallaxOnScroll([
    { element: texture, speed: 0.05 },
    { element: product, speed: 0.1 },
    { element: sticker, speed: 0.08 }
  ]);

  
});
