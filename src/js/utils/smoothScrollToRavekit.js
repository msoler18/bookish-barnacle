export function initSmoothScrollToRavekit() {
  const links = document.querySelectorAll('a[href="#ravekit-product"]');

  if (!links.length) return;

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      const target = document.getElementById('ravekit-product');

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
