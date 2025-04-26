export function parallaxOnScroll(elements) {
  if (!elements || elements.length === 0) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    elements.forEach((item) => {
      const { element, speed } = item;
      if (element) {
        const translateY = scrollTop * speed;
        element.style.transform = `translateY(${translateY}px)`;
      }
    });
  });
}
