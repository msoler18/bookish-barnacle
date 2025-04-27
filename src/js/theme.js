import { initSmoothScrollToRavekit } from './utils/smoothScrollToRavekit';
import { initScienceAccordion } from './components/scienceAccordion';
import RavekitProduct from './components/RavekitProduct';



document.addEventListener('DOMContentLoaded', () => {
  initScienceAccordion();

  document.querySelectorAll('.ravekit-product').forEach(container => {
    new RavekitProduct(container);
  });


  initSmoothScrollToRavekit();
});
