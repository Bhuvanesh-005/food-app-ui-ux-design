const productCards = [...document.querySelectorAll('.product-card')];
const categoryButtons = [...document.querySelectorAll('.filter-chip')];
const shopCartCount = document.getElementById('shop-cart-count');
const cartItems = document.getElementById('cart-items');
const subtotalEl = document.getElementById('subtotal');
const deliveryEl = document.getElementById('delivery');
const totalPriceEl = document.getElementById('total-price');
const checkoutAction = document.getElementById('checkout-action');
const stepButtons = [...document.querySelectorAll('.step-btn')];
const checkoutSections = [...document.querySelectorAll('.checkout-section')];
const modal = document.getElementById('product-modal');
const modalClose = document.querySelector('.modal-close');
const modalAdd = document.getElementById('modal-add');

let cart = [];
let activeCategory = 'all';
let stepIndex = 0;

const updateCart = () => {
  shopCartCount.textContent = String(cart.length);
  cartItems.innerHTML = '';

  const emptyState = document.createElement('li');
  emptyState.innerHTML = '<span>No items yet</span><strong>$0</strong>';

  if (!cart.length) {
    cartItems.appendChild(emptyState);
    subtotalEl.textContent = '$0';
    deliveryEl.textContent = '$0';
    totalPriceEl.textContent = '$0';
    return;
  }

  cart.forEach((product) => {
    const row = document.createElement('li');
    row.innerHTML = `<span>${product.name}</span><strong>$${product.price}</strong>`;
    cartItems.appendChild(row);
  });

  const subtotal = cart.reduce((sum, product) => sum + product.price, 0);
  const delivery = subtotal > 0 ? 12 : 0;
  const total = subtotal + delivery;

  subtotalEl.textContent = `$${subtotal}`;
  deliveryEl.textContent = `$${delivery}`;
  totalPriceEl.textContent = `$${total}`;
};

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeCategory = button.dataset.category;
    categoryButtons.forEach((item) => item.classList.toggle('active', item === button));

    productCards.forEach((card) => {
      const visible = activeCategory === 'all' || card.dataset.category === activeCategory;
      card.style.display = visible ? 'block' : 'none';
    });
  });
});

productCards.forEach((card) => {
  const addBtn = card.querySelector('.small-btn');

  addBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    cart.push({
      name: card.dataset.name,
      price: Number(card.dataset.price)
    });
    updateCart();
  });

  card.addEventListener('click', () => {
    const modalImage = document.getElementById('modal-image');
    const modalCategory = document.getElementById('modal-category');
    const modalName = document.getElementById('modal-name');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const modalRating = document.getElementById('modal-rating');

    modalImage.src = card.querySelector('img').src;
    modalImage.alt = card.dataset.name;
    modalCategory.textContent = card.dataset.category;
    modalName.textContent = card.dataset.name;
    modalDescription.textContent = card.dataset.description;
    modalPrice.textContent = `$${card.dataset.price}`;
    modalRating.textContent = `⭐ ${card.dataset.rating}`;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
});

modalAdd.addEventListener('click', () => {
  const modalName = document.getElementById('modal-name').textContent;
  const modalPrice = Number(document.getElementById('modal-price').textContent.replace(/[^\d.]/g, ''));
  cart.push({ name: modalName, price: modalPrice });
  updateCart();
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
});

stepButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const newStep = button.dataset.step;
    stepIndex = stepButtons.findIndex((item) => item.dataset.step === newStep);
    stepButtons.forEach((item) => item.classList.toggle('active', item === button));
    checkoutSections.forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.panel === newStep);
    });

    const stepNames = ['Cart', 'Shipping', 'Payment', 'Result'];
    document.querySelector('.checkout-header span').textContent = `Step ${stepIndex + 1} of 4`;
    checkoutAction.textContent = stepIndex === stepNames.length - 1 ? 'Place order' : 'Continue';
  });
});

checkoutAction.addEventListener('click', () => {
  if (stepIndex < stepButtons.length - 1) {
    stepIndex += 1;
    const nextButton = stepButtons[stepIndex];
    nextButton.click();
    return;
  }

  checkoutAction.textContent = 'Order placed';
  checkoutAction.disabled = true;
  checkoutAction.style.opacity = '0.7';
});

updateCart();
