(() => {
  // src/js/utils/animations.js
  function parallaxOnScroll(elements) {
    if (!elements || elements.length === 0) return;
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      elements.forEach((item) => {
        const {
          element,
          speed
        } = item;
        if (element) {
          const translateY = scrollTop * speed;
          element.style.transform = `translateY(${translateY}px)`;
        }
      });
    });
  }

  // src/js/components/scienceAccordion.js
  function initScienceAccordion() {
    const titles = document.querySelectorAll("[data-accordion-trigger]");
    const contents = document.querySelectorAll("[data-accordion-content]");
    if (!titles.length || !contents.length) {
      console.warn("No titles or contents found for science accordion.");
      return;
    }
    console.log("Accordion titles:", titles.length);
    console.log("Accordion contents:", contents.length);
    titles.forEach((title) => {
      title.addEventListener("click", (e) => {
        const index = title.dataset.index;
        console.log("Clicked title index:", index);
        titles.forEach((t) => t.classList.remove("is-active"));
        contents.forEach((c) => c.classList.remove("is-active"));
        title.classList.add("is-active");
        const activeContent = document.querySelector(`.science-accordion__item-content[data-content-index="${index}"]`);
        if (activeContent) {
          console.log("Activating content for index:", index);
          activeContent.classList.add("is-active");
        } else {
          console.warn("No content found for index:", index);
        }
      });
    });
  }

  // src/js/theme.js
  document.addEventListener("DOMContentLoaded", () => {
    initScienceAccordion();
    const texture = document.querySelector(".hero-product__texture");
    const product = document.querySelector(".hero-product__product");
    const sticker = document.querySelector(".hero-product__sticker");
    parallaxOnScroll([{
      element: texture,
      speed: 0.05
    }, {
      element: product,
      speed: 0.1
    }, {
      element: sticker,
      speed: 0.08
    }]);
  });
})();
//# sourceMappingURL=theme.js.map
