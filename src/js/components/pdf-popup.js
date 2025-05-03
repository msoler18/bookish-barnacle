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
