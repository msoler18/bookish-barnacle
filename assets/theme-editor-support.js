/**
 * Theme Editor support
 */

window.theme.designMode = window.theme.designMode || {};
window.theme.designMode.selected = '';

document.addEventListener('shopify:section:select', (e) => {
  window.theme.designMode.selected = e.detail.sectionId;
});

document.addEventListener('shopify:section:deselect', () => {
  window.theme.designMode.selected = '';
});

/**
 * Slideshow management
 */

document.addEventListener('shopify:section:load', (e) => {
  if (!e.target.querySelector('.splide')) return;

  e.target.querySelectorAll('.splide').forEach((splideRoot) => {
    makeSlideshow(splideRoot);
  });
});

document.addEventListener('shopify:section:unload', (e) => {
  if (!e.target.querySelector('.splide')) return;

  e.target.querySelectorAll('.splide').forEach((splideRoot) => {
    destroySlideshow(splideRoot);
  });
});

document.addEventListener('shopify:block:select', (e) => {
  const block = e.target,
    splideRoot = e.target.closest('.splide');

  if (!splideRoot) return;

  const slideIndex = Array.from(
    block.closest('.splide__list').children
  ).indexOf(block);

  window.slideshows[splideRoot.id].go(slideIndex);
});

/**
 * Menu panel management
 */

document.addEventListener('shopify:block:select', (e) => {
  const menuIndex = e.target.dataset.menuIndex,
    menuRoot = e.target.closest('.menu');
  if (!menuIndex) return;

  if (menuRoot.hasAttribute('data-start-tab')) {
    menuRoot.setAttribute('data-start-tab', menuIndex);
  } else {
    Alpine.$data(menuRoot).tab = menuIndex;
  }
});

  // Detectar el desplazamiento de la página
  window.addEventListener('scroll', function() {
    const section = document.querySelector('#shopify-section-template--16358403276890__rich_text_ApmpnL section');
    const scrollPosition = window.scrollY;

    // Agregar o quitar la clase según la posición de scroll
    if (scrollPosition > 100) { // Cambia "100" a la posición en la que quieres que se active
      section.classList.add('fixed-on-scroll');
    } else {
      section.classList.remove('fixed-on-scroll');
    }
  });
