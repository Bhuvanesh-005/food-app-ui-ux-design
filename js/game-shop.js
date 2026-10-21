const searchInput = document.getElementById('game-search');
const sortSelect = document.getElementById('game-sort');
const genreButtons = [...document.querySelectorAll('.genre-btn')];
const gameCards = [...document.querySelectorAll('.game-card')];
const cartCount = document.getElementById('game-cart-count');
const cartTotal = document.getElementById('cart-total');
const wishlistCount = document.getElementById('wishlist-count');
const modal = document.getElementById('game-modal');
const modalClose = document.querySelector('.modal-close');
const modalAdd = document.getElementById('modal-add');
const wishlistBtn = document.getElementById('wishlist-btn');

let selectedGenre = 'all';
let cartItems = [];
let wishlistItems = [];

const applyFilters = () => {
  const query = searchInput.value.trim().toLowerCase();
  const sortValue = sortSelect.value;

  const visibleCards = [...gameCards].filter((card) => {
    const textMatch = card.dataset.name.toLowerCase().includes(query);
    const genreMatch = selectedGenre === 'all' || card.dataset.genre === selectedGenre;
    return textMatch && genreMatch;
  });

  const sortedCards = visibleCards.sort((a, b) => {
    if (sortValue === 'price') return Number(a.dataset.price) - Number(b.dataset.price);
    if (sortValue === 'rating') return Number(b.dataset.rating) - Number(a.dataset.rating);
    return Number(b.dataset.popularity) - Number(a.dataset.popularity);
  });

  gameCards.forEach((card) => {
    card.style.display = sortedCards.includes(card) ? 'block' : 'none';
  });
};

genreButtons.forEach((button) => {
  button.addEventListener('click', () => {
    genreButtons.forEach((item) => item.classList.toggle('active', item === button));
    selectedGenre = button.dataset.genre;
    applyFilters();
  });
});

searchInput.addEventListener('input', applyFilters);
sortSelect.addEventListener('change', applyFilters);

const updateTotals = () => {
  const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);
  cartCount.textContent = String(cartItems.length);
  cartTotal.textContent = `$${total}`;
  wishlistCount.textContent = String(wishlistItems.length);
};

gameCards.forEach((card) => {
  const addBtn = card.querySelector('.mini-btn');

  addBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    cartItems.push({ name: card.dataset.name, price: Number(card.dataset.price) });
    updateTotals();
  });

  card.addEventListener('click', () => {
    const modalImage = document.getElementById('modal-image');
    const modalGenre = document.getElementById('modal-genre');
    const modalName = document.getElementById('modal-name');
    const modalDescription = document.getElementById('modal-description');
    const modalRating = document.getElementById('modal-rating');
    const modalPrice = document.getElementById('modal-price');

    modalImage.src = card.querySelector('img').src;
    modalImage.alt = card.dataset.name;
    modalGenre.textContent = card.dataset.genre.toUpperCase();
    modalName.textContent = card.dataset.name;
    modalDescription.textContent = card.dataset.description;
    modalRating.textContent = `⭐ ${card.dataset.rating}`;
    modalPrice.textContent = `$${card.dataset.price}`;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
});

wishlistBtn.addEventListener('click', () => {
  const name = document.getElementById('modal-name').textContent;
  const alreadyExists = wishlistItems.some((game) => game.name === name);

  if (!alreadyExists) {
    wishlistItems.push({ name });
  }

  wishlistBtn.textContent = alreadyExists ? '♡ Wishlist' : '♥ Wishlisted';
  updateTotals();
});

modalAdd.addEventListener('click', () => {
  const name = document.getElementById('modal-name').textContent;
  const price = Number(document.getElementById('modal-price').textContent.replace(/[^\d.]/g, ''));
  cartItems.push({ name, price });
  updateTotals();
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
});

const checkoutButton = document.getElementById('checkout-button');
checkoutButton.addEventListener('click', () => {
  const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);
  checkoutButton.textContent = total ? `Checkout: $${total}` : 'Checkout';
});

applyFilters();
updateTotals();
