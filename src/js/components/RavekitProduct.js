/**
 * RavekitProduct
 * 
 * Handles product interactions on a product detail page, including:
 * - Variant selection
 * - Quantity updates
 * - Subscription/single purchase options
 * - Dynamic price updates
 * - Add to cart behavior
 * - Free shipping countdown timer
 */

export default class RavekitProduct {

  constructor(container) {
    this.container    = container;
    const dataEl      = document.getElementById('RavekitProductData');
    this.data         = dataEl ? JSON.parse(dataEl.textContent) : {};
    this.settings     = this.data.settings || {};
    this.variants     = this.data.variants || [];

    this.variantBtns  = container.querySelectorAll('.variant-button');
    this.qtyDec       = container.querySelector('.quantity-decrease');
    this.qtyInc       = container.querySelector('.quantity-increase');
    this.qtyInput     = container.querySelector('.quantity-input');
    this.addBtn       = container.querySelector('.add-to-cart');
    this.btnSurface   = this.addBtn.querySelector('.push-btn__surface .btn-price');

    this.radioSingle  = container.querySelector('input[value="single"]');
    this.radioSub     = container.querySelector('input[value="subscription"]');
    this.singlePrice  = container.querySelector('.single-price');
    this.subsPrice    = container.querySelector('.subs-price');
    this.planSelect   = container.querySelector('#selling_plan_select');

    this.timerBlock   = container.querySelector('.free-shipping-timer');
    this.timerTextEl  = container.querySelector('.timer-text');
    this.timerCountEl = container.querySelector('.timer-countdown');
    this.timerSuffix  = container.querySelector('.timer-suffix');

    this.selectedVariant = null;
    this.purchaseType    = 'single';
    this.timerId         = null;

    this.init();
  }

  init() {
    if (this.variantBtns.length) {
      this.variantBtns[0].classList.add('selected');
      this.onVariantChange(this.variantBtns[0].dataset.variantId);
    }
    this.bind();
    this.updateButtonPrice();
  }

  bind() {
    this.variantBtns.forEach(btn =>
      btn.addEventListener('click', () => {
        this.variantBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.onVariantChange(btn.dataset.variantId);
      })
    );

    this.qtyDec.addEventListener('click', () => this.changeQty(-1));
    this.qtyInc.addEventListener('click', () => this.changeQty(1));
    this.qtyInput.addEventListener('input', () => this.updateButtonPrice());

    [this.radioSingle, this.radioSub].forEach(r =>
      r.addEventListener('change', () => {
        this.purchaseType = r.value;
        this.togglePlanSelect();
        this.updateButtonPrice();
      })
    );

    this.planSelect.addEventListener('change', () => {
      const txt = this.planSelect.selectedOptions[0].text.split('—').pop().trim();
      this.subsPrice.textContent = txt;
      this.updateButtonPrice();
    });

    this.addBtn.addEventListener('click', e => {
      e.preventDefault();
      this.addToCart();
    });
  }

  onVariantChange(variantId) {
    this.selectedVariant = this.variants.find(v => v.id.toString()===variantId);
    if (!this.selectedVariant) return;

    this.singlePrice.textContent = this.selectedVariant.priceFormatted;

    this.renderPlans();

    this.updateButtonPrice();
  }

  renderPlans() {
    this.planSelect.innerHTML = ''

    this.selectedVariant.selling_plans.forEach(plan => {
      const displayName = plan.name.split(',')[0]
      const opt = document.createElement('option')
      opt.value          = plan.price
      opt.dataset.planId = plan.plan_id
      opt.textContent    = displayName
      this.planSelect.appendChild(opt)
    })

    this.radioSingle.checked = true
    this.purchaseType = 'single'
    this.togglePlanSelect()
  }

  togglePlanSelect() {
    this.planSelect.disabled = this.purchaseType !== 'subscription';
  }

  changeQty(delta) {
    let v = parseInt(this.qtyInput.value, 10) || 1;
    v = Math.max(1, v + delta);
    this.qtyInput.value = v;
    this.updateButtonPrice();
  }

  updateButtonPrice() {
    const rawCents = this.purchaseType === 'single'
      ? Number(this.selectedVariant.price) 
      : Number(this.planSelect.value);         
  
    const unit = rawCents / 100;               
  
    const qty = Number(this.qtyInput.value) || 1;
    const total = unit * qty;                     
  
    // console.log('[DEBUG] rawCents, unit, qty, total →', {
    //   rawCents, unit, qty, total
    // });
  
    const formatted = total.toLocaleString('es-CO', {
      style:    'currency',
      currency: 'COP'
    });
  
    this.btnSurface.textContent = ` ${formatted}`;
  
    this.setupTimer(total);
  }

  setupTimer(total) {
    clearInterval(this.timerId);
    const threshold = Number(this.settings.freeShippingThreshold);
    if (total < threshold) {
      this.timerBlock.style.display = 'flex';
      this.timerTextEl.textContent  = this.settings.timerText;
      this.timerSuffix.textContent  = this.settings.timerSuffix;
      const end = Date.now() + this.settings.timerDuration * 60000;
      this.runCountdown(end);
    } else {
      this.timerBlock.style.display = 'none';
    }
    // console.log('[RavekitProduct] timer?', { total, threshold, visible: total < threshold });
  }

  runCountdown(end) {
    const update = () => {
      const diff = end - Date.now();
      if (diff <= 0) {
        clearInterval(this.timerId);
        this.timerCountEl.textContent = '00:00';
        return;
      }
      const mm = String(Math.floor(diff/60000)).padStart(2,'0');
      const ss = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
      this.timerCountEl.textContent = `${mm}:${ss}`;
    };
    update();
    this.timerId = setInterval(update,1000);
  }

  addToCart() {
  if (!this.selectedVariant) {
    return alert('Selecciona una variante.');
  }
  const payload = {
    id:       this.selectedVariant.id,
    quantity: Number(this.qtyInput.value)
  };
  if (this.purchaseType==='subscription') {
    payload.selling_plan = this.planSelect.selectedOptions[0].dataset.planId;
  }
  // console.log('[RavekitProduct] Payload to cart:', payload);
  fetch('/cart/add.js',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  })
    .then(r=>r.ok?r.json():Promise.reject(r))
    .then(data=> {
      //console.log('[RavekitProduct] Cart response:', data);
      this.openMiniCart();
    })
    .catch(err=> console.error('[RavekitProduct] Cart error:', err));
  }

  openMiniCart() {
    const cartButton = document.querySelector('.header__cart');
    if (cartButton) {
      // Simular un click real con evento nativo
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      cartButton.dispatchEvent(clickEvent);
      //console.log('[RavekitProduct] Mini cart opened');
    } else {
      console.warn('[RavekitProduct] Cart button not found');
    }
  }

}
