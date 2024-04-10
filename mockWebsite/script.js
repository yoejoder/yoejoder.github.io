// Array to store selected products in the shopping cart
var shoppingCart = [];

// Function to add a product to the shopping cart
function addToCart(product) {
  shoppingCart.push(product);
  updateCart();
}

// Function to remove a product from the shopping cart
function removeFromCart(index) {
  shoppingCart.splice(index, 1);
  updateCart();
}

// Function to calculate the total price of all products in the shopping cart
function calculateTotalPrice() {
  var totalPrice = 0;
  for (var i = 0; i < shoppingCart.length; i++) {
    totalPrice += shoppingCart[i].price;
  }
  return totalPrice;
}

// Function to update the shopping cart UI
function updateCart() {
  var cartItemsElement = document.getElementById('cart-items');
  cartItemsElement.innerHTML = '';

  for (var i = 0; i < shoppingCart.length; i++) {
    var product = shoppingCart[i];

    var listItem = document.createElement('li');
    listItem.innerHTML = `
      <span>${product.name}</span>
      <span>$${product.price}</span>
      <button onclick="removeFromCart(${i})">Remove</button>
    `;

    cartItemsElement.appendChild(listItem);
  }

  var totalPrice = calculateTotalPrice();
  var totalElement = document.getElementById('cart-total');
  totalElement.textContent = `$${totalPrice}`;
}

// Function to toggle the visibility of the shopping cart
function toggleCart() {
  var cartElement = document.getElementById('shopping-cart');
  cartElement.classList.toggle('hidden');
}

// Function to proceed to checkout
function proceedToCheckout() {
  // Save the shopping cart data to local storage
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

  // Navigate to the checkout page
  window.location.href = 'checkout.html';
}

// Example usage
var product1 = { name: 'Product 1', price: 10 };
var product2 = { name: 'Product 2', price: 15 };

addToCart(product1);
addToCart(product2);

console.log('Shopping cart:', shoppingCart);
console.log('Total price:', calculateTotalPrice());
