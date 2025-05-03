import { initSmoothScrollToRavekit } from './utils/smoothScrollToRavekit';
import { initScrollEffects } from './utils/scrollEffects';
import { initScienceAccordion } from './components/scienceAccordion';
import RavekitProduct from './components/RavekitProduct';



document.addEventListener('DOMContentLoaded', () => {

  initScrollEffects();

  initScienceAccordion();

  document.querySelectorAll('.ravekit-product').forEach(container => {
    new RavekitProduct(container);
  });


  initSmoothScrollToRavekit();
});
