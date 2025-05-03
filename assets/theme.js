(() => {
  // src/js/utils/smoothScrollToRavekit.js
  function initSmoothScrollToRavekit() {
    const links = document.querySelectorAll('a[href="#ravekit-product"]');
    if (!links.length) return;
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.getElementById("ravekit-product");
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      });
    });
  }

  // src/js/utils/scrollEffects.js
  function throttle(fn) {
    let ticking = false;
    return function(...args) {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          fn(...args);
          ticking = false;
        });
        ticking = true;
      }
    };
  }
  function initScrollEffects() {
    const parallaxElements = Array.from(document.querySelectorAll("[data-parallax-speed]")).map((el) => ({
      el,
      speed: parseFloat(el.dataset.parallaxSpeed)
    }));
    const rotationElements = Array.from(document.querySelectorAll("[data-rotate-on-scroll]")).map((el) => ({
      el,
      factor: parseFloat(el.dataset.rotateOnScroll)
    }));
    const onScroll = () => {
      const scrollY = window.scrollY;
      parallaxElements.forEach(({
        el,
        speed
      }) => {
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
      rotationElements.forEach(({
        el,
        factor
      }) => {
        const current = el.style.transform || "";
        el.style.transform = `${current} rotate(${scrollY * factor}deg)`;
      });
    };
    window.addEventListener("scroll", throttle(onScroll));
    onScroll();
  }

  // src/js/components/scienceAccordion.js
  function initScienceAccordion() {
    const titles = document.querySelectorAll("[data-accordion-trigger]");
    const contents = document.querySelectorAll("[data-accordion-content]");
    if (!titles.length || !contents.length) {
      console.warn("No titles or contents found for science accordion.");
      return;
    }
    titles.forEach((title) => {
      title.addEventListener("click", (e) => {
        const index = title.dataset.index;
        titles.forEach((t) => t.classList.remove("is-active"));
        contents.forEach((c) => c.classList.remove("is-active"));
        title.classList.add("is-active");
        const activeContent = document.querySelector(`.science-accordion__item-content[data-content-index="${index}"]`);
        if (activeContent) {
          activeContent.classList.add("is-active");
        } else {
          console.warn("No content found for index:", index);
        }
      });
    });
  }

  // src/js/components/RavekitProduct.js
  var RavekitProduct = class {
    constructor(container) {
      this.container = container;
      this.variantButtons = container.querySelectorAll(".variant-button");
      this.variantInput = container.querySelector(".variant-id-input");
      this.minusBtn = container.querySelector(".quantity-decrease");
      this.plusBtn = container.querySelector(".quantity-increase");
      this.quantityInput = container.querySelector(".quantity-input");
      this.addToCartBtn = container.querySelector(".add-to-cart");
      this.selectedVariantId = null;
      this.bindEvents();
    }
    bindEvents() {
      var _a, _b, _c;
      this.variantButtons.forEach((button) => {
        button.addEventListener("click", () => this.selectVariant(button));
      });
      (_a = this.minusBtn) == null ? void 0 : _a.addEventListener("click", () => this.changeQuantity(-1));
      (_b = this.plusBtn) == null ? void 0 : _b.addEventListener("click", () => this.changeQuantity(1));
      (_c = this.addToCartBtn) == null ? void 0 : _c.addEventListener("click", (e) => {
        e.preventDefault();
        this.addToCart();
      });
    }
    selectVariant(button) {
      const variantId = button.getAttribute("data-variant-id");
      console.log("[RavekitProduct] Selecting variant ID:", variantId);
      if (variantId) {
        this.selectedVariantId = variantId;
      }
      this.variantButtons.forEach((b) => b.classList.remove("selected"));
      button.classList.add("selected");
    }
    changeQuantity(delta) {
      let qty = parseInt(this.quantityInput.value, 10) || 1;
      qty = Math.max(qty + delta, 1);
      console.log("[RavekitProduct] Changing quantity to:", qty);
      this.quantityInput.value = qty;
    }
    addToCart() {
      const variantId = this.selectedVariantId;
      const quantity = parseInt(this.quantityInput.value, 10) || 1;
      if (!variantId) {
        console.error("[RavekitProduct] No variant selected.");
        alert("Por favor selecciona una variante primero.");
        return;
      }
      fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: variantId,
          quantity
        })
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      }).then((data) => {
        alert("Producto agregado al carrito exitosamente");
      }).catch((error) => {
        console.error("[RavekitProduct] Failed to add to cart:", error);
      });
    }
  };

  // src/js/theme.js
  document.addEventListener("DOMContentLoaded", () => {
    initScrollEffects();
    initScienceAccordion();
    document.querySelectorAll(".ravekit-product").forEach((container) => {
      new RavekitProduct(container);
    });
    initSmoothScrollToRavekit();
  });
})();
//# sourceMappingURL=theme.js.map
