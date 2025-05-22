(() => {
  // src/js/components/pdf-popup.js
  function initPdfPopup() {
    const openers = document.querySelectorAll("[data-nutri-open]");
    const overlay = document.querySelector("[data-nutri-overlay]");
    const popup = document.querySelector("[data-nutri-popup]");
    const closer = document.querySelector("[data-nutri-close]");
    if (!openers.length || !overlay || !popup || !closer) return;
    function open() {
      overlay.classList.remove("hidden");
      popup.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    }
    function close() {
      overlay.classList.add("hidden");
      popup.classList.add("hidden");
      document.body.style.overflow = "";
    }
    openers.forEach((btn) => btn.addEventListener("click", open));
    overlay.addEventListener("click", close);
    closer.addEventListener("click", close);
  }

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
    const parallaxEls = Array.from(document.querySelectorAll("[data-parallax-speed]")).filter((el) => !el.hasAttribute("data-rotate-on-scroll"));
    const rotationEls = Array.from(document.querySelectorAll("[data-rotate-on-scroll]")).filter((el) => !el.classList.contains("alien_ravekit"));
    const alienEls = Array.from(document.querySelectorAll(".alien_ravekit"));
    let lastScrollY = window.scrollY;
    const SCROLL_DELTA_THRESHOLD = 0.5;
    const onScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      parallaxEls.forEach((el) => {
        const speedString = el.dataset.parallaxSpeed;
        const speed = parseFloat(speedString);
        if (isNaN(speed) || speed === 0) {
          return;
        }
        const transformValue = `translateY(${scrollY * -speed}px)`;
        el.style.transform = transformValue;
      });
      rotationEls.forEach((el) => {
        const factorString = el.dataset.rotateOnScroll;
        const factor = parseFloat(factorString);
        if (isNaN(factor) || factor === 0) {
          return;
        }
        if (Math.abs(delta) > SCROLL_DELTA_THRESHOLD) {
          el._angle = (el._angle || 0) + delta * factor;
          el.style.transform = `rotate(${el._angle}deg)`;
        }
      });
      const vh = window.innerHeight;
      alienEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        const pixelsVisibleFromBottom = vh - r.top;
        const totalScrollDistanceForVisibility = vh + r.height;
        let prog = 0;
        if (totalScrollDistanceForVisibility > 0) {
          prog = pixelsVisibleFromBottom / totalScrollDistanceForVisibility;
        }
        prog = Math.min(Math.max(prog, 0), 1);
        const ang = prog * 180;
        el.style.transform = `rotate(${ang}deg)`;
      });
      lastScrollY = scrollY;
    };
    window.addEventListener("scroll", throttle(onScroll), {
      passive: true
    });
    console.log("[Ravekit Effects] Performing initial onScroll call.");
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

  // src/js/utils/freeShippingSticky.js
  function initFreeShippingSticky() {
    const textContainer = document.querySelector("[data-banner-text]");
    const spacer = document.querySelector(".free-shipping-banner__spacer");
    if (!textContainer || !spacer) return;
    const height = textContainer.offsetHeight;
    spacer.style.height = `${height}px`;
    const triggerAt = textContainer.getBoundingClientRect().top + window.scrollY;
    function onScroll() {
      if (window.scrollY >= triggerAt) {
        textContainer.classList.add("free-shipping-banner__text-container--sticky");
      } else {
        textContainer.classList.remove("free-shipping-banner__text-container--sticky");
      }
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
  }

  // src/js/components/RavekitProduct.js
  var RavekitProduct = class {
    constructor(container) {
      this.container = container;
      const dataEl = document.getElementById("RavekitProductData");
      this.data = dataEl ? JSON.parse(dataEl.textContent) : {};
      this.settings = this.data.settings || {};
      this.variants = this.data.variants || [];
      this.variantBtns = container.querySelectorAll(".variant-button");
      this.qtyDec = container.querySelector(".quantity-decrease");
      this.qtyInc = container.querySelector(".quantity-increase");
      this.qtyInput = container.querySelector(".quantity-input");
      this.addBtn = container.querySelector(".add-to-cart");
      this.btnSurface = this.addBtn.querySelector(".push-btn__surface .btn-price");
      this.radioSingle = container.querySelector('input[value="single"]');
      this.radioSub = container.querySelector('input[value="subscription"]');
      this.singlePrice = container.querySelector(".single-price");
      this.subsPrice = container.querySelector(".subs-price");
      this.planSelect = container.querySelector("#selling_plan_select");
      this.timerBlock = container.querySelector(".free-shipping-timer");
      this.timerTextEl = container.querySelector(".timer-text");
      this.timerCountEl = container.querySelector(".timer-countdown");
      this.timerSuffix = container.querySelector(".timer-suffix");
      this.selectedVariant = null;
      this.purchaseType = "single";
      this.timerId = null;
      this.init();
    }
    init() {
      if (this.variantBtns.length) {
        this.variantBtns[0].classList.add("selected");
        this.onVariantChange(this.variantBtns[0].dataset.variantId);
      }
      this.bind();
      this.updateButtonPrice();
    }
    bind() {
      this.variantBtns.forEach((btn) => btn.addEventListener("click", () => {
        this.variantBtns.forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        this.onVariantChange(btn.dataset.variantId);
      }));
      this.qtyDec.addEventListener("click", () => this.changeQty(-1));
      this.qtyInc.addEventListener("click", () => this.changeQty(1));
      this.qtyInput.addEventListener("input", () => this.updateButtonPrice());
      [this.radioSingle, this.radioSub].forEach((r) => r.addEventListener("change", () => {
        this.purchaseType = r.value;
        this.togglePlanSelect();
        this.updateButtonPrice();
      }));
      this.planSelect.addEventListener("change", () => {
        const txt = this.planSelect.selectedOptions[0].text.split("\u2014").pop().trim();
        this.subsPrice.textContent = txt;
        this.updateButtonPrice();
      });
      this.addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.addToCart();
      });
    }
    onVariantChange(variantId) {
      this.selectedVariant = this.variants.find((v) => v.id.toString() === variantId);
      if (!this.selectedVariant) return;
      this.singlePrice.textContent = this.selectedVariant.priceFormatted;
      this.renderPlans();
      this.updateButtonPrice();
    }
    renderPlans() {
      this.planSelect.innerHTML = "";
      this.selectedVariant.selling_plans.forEach((plan) => {
        const displayName = plan.name.split(",")[0];
        const opt = document.createElement("option");
        opt.value = plan.price;
        opt.dataset.planId = plan.plan_id;
        opt.textContent = displayName;
        this.planSelect.appendChild(opt);
      });
      this.radioSingle.checked = true;
      this.purchaseType = "single";
      this.togglePlanSelect();
    }
    togglePlanSelect() {
      this.planSelect.disabled = this.purchaseType !== "subscription";
    }
    changeQty(delta) {
      let v = parseInt(this.qtyInput.value, 10) || 1;
      v = Math.max(1, v + delta);
      this.qtyInput.value = v;
      this.updateButtonPrice();
    }
    updateButtonPrice() {
      const rawCents = this.purchaseType === "single" ? Number(this.selectedVariant.price) : Number(this.planSelect.value);
      const unit = rawCents / 100;
      const qty = Number(this.qtyInput.value) || 1;
      const total = unit * qty;
      const formatted = total.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP"
      });
      this.btnSurface.textContent = ` ${formatted}`;
      this.setupTimer(total);
    }
    setupTimer(total) {
      clearInterval(this.timerId);
      const threshold = Number(this.settings.freeShippingThreshold);
      if (total < threshold) {
        this.timerBlock.style.display = "flex";
        this.timerTextEl.textContent = this.settings.timerText;
        this.timerSuffix.textContent = this.settings.timerSuffix;
        const end = Date.now() + this.settings.timerDuration * 6e4;
        this.runCountdown(end);
      } else {
        this.timerBlock.style.display = "none";
      }
    }
    runCountdown(end) {
      const update = () => {
        const diff = end - Date.now();
        if (diff <= 0) {
          clearInterval(this.timerId);
          this.timerCountEl.textContent = "00:00";
          return;
        }
        const mm = String(Math.floor(diff / 6e4)).padStart(2, "0");
        const ss = String(Math.floor(diff % 6e4 / 1e3)).padStart(2, "0");
        this.timerCountEl.textContent = `${mm}:${ss}`;
      };
      update();
      this.timerId = setInterval(update, 1e3);
    }
    addToCart() {
      if (!this.selectedVariant) {
        return alert("Selecciona una variante.");
      }
      const payload = {
        id: this.selectedVariant.id,
        quantity: Number(this.qtyInput.value)
      };
      if (this.purchaseType === "subscription") {
        payload.selling_plan = this.planSelect.selectedOptions[0].dataset.planId;
      }
      fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }).then((r) => r.ok ? r.json() : Promise.reject(r)).then((data) => console.log("[RavekitProduct] Cart response:", data)).catch((err) => console.error("[RavekitProduct] Cart error:", err));
    }
  };

  // src/js/theme.js
  document.addEventListener("DOMContentLoaded", () => {
    initFreeShippingSticky();
    initScrollEffects();
    initScienceAccordion();
    document.querySelectorAll(".ravekit-product").forEach((container) => {
      new RavekitProduct(container);
    });
    initSmoothScrollToRavekit();
    initPdfPopup();
  });
})();
//# sourceMappingURL=theme.js.map
