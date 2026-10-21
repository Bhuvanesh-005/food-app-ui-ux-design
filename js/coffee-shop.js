const choiceButtons = [...document.querySelectorAll('.choice')];
const quantityDisplay = document.getElementById('coffee-qty');
const totalDisplay = document.getElementById('coffee-total');
const grandTotalDisplay = document.getElementById('coffee-grand-total');
const placeOrderButton = document.getElementById('place-order');

let quantity = 1;
let basePrice = 6.5;

const updateTotals = () => {
  const subtotal = basePrice * quantity;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  totalDisplay.textContent = `$${subtotal.toFixed(2)}`;
  grandTotalDisplay.textContent = `$${total.toFixed(2)}`;
};

choiceButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const group = button.parentElement.dataset.group;
    const allOptions = button.parentElement.querySelectorAll('.choice');
    allOptions.forEach((item) => item.classList.toggle('active', item === button));

    if (group === 'size') {
      const sizeMap = { Small: 0.9, Medium: 1, Large: 1.2 };
      const chosenSize = button.dataset.value;
      basePrice = 6.5 * sizeMap[chosenSize];
      updateTotals();
    }
  });
});

document.querySelector('.btn-decrease').addEventListener('click', () => {
  quantity = Math.max(1, quantity - 1);
  quantityDisplay.textContent = String(quantity);
  updateTotals();
});

document.querySelector('.btn-increase').addEventListener('click', () => {
  quantity += 1;
  quantityDisplay.textContent = String(quantity);
  updateTotals();
});

placeOrderButton.addEventListener('click', () => {
  placeOrderButton.textContent = 'Order placed!';
  placeOrderButton.disabled = true;
  placeOrderButton.style.opacity = '0.8';
});

updateTotals();
