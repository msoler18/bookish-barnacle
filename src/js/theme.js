import { initPdfPopup } from './components/pdf-popup';
import { initSmoothScrollToRavekit } from './utils/smoothScrollToRavekit';
import { initScrollEffects } from './utils/scrollEffects';
import { initScienceAccordion } from './components/scienceAccordion';
import { initFreeShippingSticky }   from './utils/freeShippingSticky';
import RavekitProduct from './components/RavekitProduct';


/**
 * Initializes various front-end features once the DOM is fully loaded.
 *
 * This includes:
 * - Scroll effects on elements
 * - Science accordion functionality
 * - Instantiating the Ravekit product component
 * - Enabling smooth scrolling to the Ravekit section
 * - Setting up the PDF popup modal
 * - Making the free shipping banner sticky on scroll
 */

document.addEventListener('DOMContentLoaded', () => {

  initFreeShippingSticky();

  initScrollEffects();

  initScienceAccordion();

  document.querySelectorAll('.ravekit-product').forEach(container => {
    new RavekitProduct(container);
  });

  initSmoothScrollToRavekit();

  initPdfPopup();
  
});
