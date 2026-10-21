const foodCards = [...document.querySelectorAll('.food-card')];
const searchInput = document.getElementById('food-search');
const categoryButtons = [...document.querySelectorAll('.category-btn')];
const detailImage = document.getElementById('detail-image');
const detailCategory = document.getElementById('detail-category');
const detailRating = document.getElementById('detail-rating');
const detailName = document.getElementById('detail-name');
const detailDescription = document.getElementById('detail-description');
const detailTime = document.getElementById('detail-time');
const detailPrice = document.getElementById('detail-price');
const quantityDisplay = document.getElementById('quantity-display');
const addToCartButton = document.getElementById('add-to-cart');
const miniCartCount = document.getElementById('mini-cart-count');

let currentCategory = 'all';
let quantity = 1;
let cartCount = 0;

function updateSelectedCard(card) {
  const image = card.querySelector('img')?.src || '';
  const category = card.dataset.category || 'breakfast';
  const rating = card.dataset.rating || '4.8';
  const name = card.dataset.name || 'Dish';
  const price = card.dataset.price || '14';
  const time = card.dataset.time || '10 min';

  detailImage.src = image;
  detailImage.alt = `${name} plated dish`;
  detailCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);
  detailRating.textContent = `⭐ ${rating}`;
  detailName.textContent = name;
  detailPrice.textContent = `$${price}`;
  detailTime.textContent = time;

  const descriptionMap = {
    'Avocado Toast': 'Sourdough toast with smashed avocado, cherry tomatoes, chili flakes, and lemon zest for a fresh, balanced bite.',
    'Chicken Rice Bowl': 'A hearty bowl of grilled chicken, jasmine rice, greens, and a savory sesame dressing.',
    'Berry Smoothie': 'A vibrant, creamy smoothie blending strawberries, blueberries, banana, and yogurt.',
    'Chocolate Lava Cake': 'Warm, molten chocolate cake with a silky center and a soft cocoa finish.',
    'Veggie Wrap': 'Fresh vegetables, hummus, and herbs wrapped in a soft flatbread for a light lunch.',
    'Pancake Stack': 'Fluffy pancakes layered with maple syrup and berries for a rich breakfast treat.'
  };

  detailDescription.textContent = descriptionMap[name] || 'Freshly prepared with premium ingredients and bold flavor.';
}

function filterCards() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  foodCards.forEach((card) => {
    const matchesCategory = currentCategory === 'all' || card.dataset.category === currentCategory;
    const matchesSearch = card.dataset.name.toLowerCase().includes(searchTerm);
    card.style.display = matchesCategory && matchesSearch ? 'block' : 'none';
  });
}

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    categoryButtons.forEach((item) => item.classList.toggle('active', item === button));
    currentCategory = button.dataset.filter;
    filterCards();
  });
});

searchInput.addEventListener('input', filterCards);

foodCards.forEach((card) => {
  card.addEventListener('click', () => {
    updateSelectedCard(card);
    quantity = 1;
    quantityDisplay.textContent = String(quantity);
  });
});

const qtyButtons = [...document.querySelectorAll('.qty-btn')];
qtyButtons[0].addEventListener('click', () => {
  quantity = Math.max(1, quantity - 1);
  quantityDisplay.textContent = String(quantity);
});
qtyButtons[1].addEventListener('click', () => {
  quantity += 1;
  quantityDisplay.textContent = String(quantity);
});

addToCartButton.addEventListener('click', () => {
  cartCount += quantity;
  miniCartCount.textContent = String(cartCount);
  addToCartButton.textContent = `Added ${quantity}`;
  setTimeout(() => {
    addToCartButton.textContent = 'Add to cart';
  }, 900);
});

updateSelectedCard(foodCards[0]);
filterCards();
