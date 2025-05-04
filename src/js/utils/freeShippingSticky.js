// src/utils/freeShippingSticky.js

export function initFreeShippingSticky() {
  const textContainer = document.querySelector('[data-banner-text]');
  const spacer       = document.querySelector('.free-shipping-banner__spacer');
  if (!textContainer || !spacer) return;

  // altura del contenedor de texto
  const height = textContainer.offsetHeight;
  spacer.style.height = `${height}px`;

  // posición a la que debe activarse
  const triggerAt = textContainer.getBoundingClientRect().top + window.scrollY;

  function onScroll() {
    if (window.scrollY >= triggerAt) {
      textContainer.classList.add('free-shipping-banner__text-container--sticky');
    } else {
      textContainer.classList.remove('free-shipping-banner__text-container--sticky');
    }
  }

  window.addEventListener('scroll', onScroll);
  onScroll(); // en caso de que ya estemos scrolleados al cargar
}
