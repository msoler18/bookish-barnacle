export default class RavekitProduct {
  constructor(container) {
    this.container = container;
    console.log('[RavekitProduct] Init with container:', container);

    this.variantButtons = container.querySelectorAll('.variant-button');
    this.variantInput = container.querySelector('.variant-id-input'); // (opcional si luego lo necesitas)
    this.minusBtn = container.querySelector('.quantity-decrease');
    this.plusBtn = container.querySelector('.quantity-increase');
    this.quantityInput = container.querySelector('.quantity-input');
    this.addToCartBtn = container.querySelector('.add-to-cart');

    this.selectedVariantId = null; 

    this.bindEvents();
  }

  bindEvents() {
    console.log('[RavekitProduct] Binding events...');

    this.variantButtons.forEach(button => {
      button.addEventListener('click', () => this.selectVariant(button));
    });

    this.minusBtn?.addEventListener('click', () => this.changeQuantity(-1));
    this.plusBtn?.addEventListener('click', () => this.changeQuantity(1));

    this.addToCartBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.addToCart();
    });
  }

  selectVariant(button) {
    const variantId = button.getAttribute('data-variant-id');
    console.log('[RavekitProduct] Selecting variant ID:', variantId);

    if (variantId) {
      this.selectedVariantId = variantId;
    }

    this.variantButtons.forEach(b => b.classList.remove('selected'));
    button.classList.add('selected');
  }

  changeQuantity(delta) {
    let qty = parseInt(this.quantityInput.value, 10) || 1;
    qty = Math.max(qty + delta, 1);
    console.log('[RavekitProduct] Changing quantity to:', qty);
    this.quantityInput.value = qty;
  }

  addToCart() {
    const variantId = this.selectedVariantId;
    const quantity = parseInt(this.quantityInput.value, 10) || 1;

    if (!variantId) {
      console.error('[RavekitProduct] No variant selected.');
      alert('Por favor selecciona una variante primero.');
      return;
    }

    console.log('[RavekitProduct] Adding to cart:', { variantId, quantity });

    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: variantId,
        quantity: quantity
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network error');
        }
        return response.json();
      })
      .then(data => {
        console.log('[RavekitProduct] Added to cart successfully!', data);
        // Opcional: Mostrar toast, mensaje de éxito, abrir minicart, etc
        alert('Producto agregado al carrito exitosamente');
      })
      .catch(error => {
        console.error('[RavekitProduct] Failed to add to cart:', error);
        alert('Ocurrió un error al agregar el producto al carrito.');
      });
  }
}
