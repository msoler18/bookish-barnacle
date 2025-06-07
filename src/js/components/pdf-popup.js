/**
 * Initializes the PDF popup functionality.
 * 
 * This function sets up event listeners for opening and closing
 * a modal popup, typically used to display a PDF or similar content.
 * 
 * Elements must include the following data attributes:
 * - [data-nutri-open]: Triggers to open the popup
 * - [data-nutri-overlay]: The background overlay element
 * - [data-nutri-popup]: The modal content element
 * - [data-nutri-close]: Button or element to close the popup
 */

export function initPdfPopup() {
  const openers = document.querySelectorAll('[data-nutri-open]');
  const overlay = document.querySelector('[data-nutri-overlay]');
  const popup   = document.querySelector('[data-nutri-popup]');
  const closer  = document.querySelector('[data-nutri-close]');

  if (!openers.length || !overlay || !popup || !closer) return;

  function open() {
    overlay.classList.remove('hidden');
    popup.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.add('hidden');
    popup.classList.add('hidden');
    document.body.style.overflow = '';
  }

  openers.forEach(btn => btn.addEventListener('click', open));
  overlay.addEventListener('click', close);
  closer.addEventListener('click', close);
}
