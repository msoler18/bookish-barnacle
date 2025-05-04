/**
 * Initializes the science accordion component.
 *
 * This function binds click event listeners to all elements with the
 * `[data-accordion-trigger]` attribute. When a trigger is clicked, it:
 * 1. Removes the `is-active` class from all triggers and content items.
 * 2. Adds the `is-active` class to the clicked trigger.
 * 3. Finds the corresponding content element (by matching `data-index` with `data-content-index`)
 *    and activates it by adding the `is-active` class.
 *
 * Expected HTML structure:
 *
 * <div data-accordion-trigger data-index="1">Title</div>
 * <div class="science-accordion__item-content" data-accordion-content data-content-index="1">
 *   Content
 * </div>
 */
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
