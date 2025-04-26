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

  // src/js/theme.js
  document.addEventListener("DOMContentLoaded", () => {
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
