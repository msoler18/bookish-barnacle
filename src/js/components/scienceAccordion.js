export function initScienceAccordion() {
  const titles = document.querySelectorAll('[data-accordion-trigger]');
  const contents = document.querySelectorAll('[data-accordion-content]');

  if (!titles.length || !contents.length) {
    console.warn('No titles or contents found for science accordion.');
    return;
  }

  titles.forEach((title) => {
    title.addEventListener('click', (e) => {
      const index = title.dataset.index;

      titles.forEach(t => t.classList.remove('is-active'));
      contents.forEach(c => c.classList.remove('is-active'));

      title.classList.add('is-active');
      const activeContent = document.querySelector(`.science-accordion__item-content[data-content-index="${index}"]`);

      if (activeContent) {
        activeContent.classList.add('is-active');
      } else {
        console.warn('No content found for index:', index);
      }
    });
  });
}
