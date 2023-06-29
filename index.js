const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');

navToggle.addEventListener('click', () => {
  document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
  });
});

// Define an array to store the cart items
let cartItems = [];

// Function to add an item to the cart
function addToCart(name, price) {
  cartItems.push({ name, price });
  updateCartTotal();
  saveCartItems();
  displayCartItems();
}

// Function to remove an item from the cart
function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCartTotal();
  saveCartItems();
  displayCartItems();
}

// Function to update the cart total
function updateCartTotal() {
  const cartTotalElements = document.querySelectorAll("#cart-total");
  cartTotalElements.forEach(element => {
    element.textContent = calculateCartTotal().toFixed(2);
  });
}

// Function to calculate the cart total
function calculateCartTotal() {
  let total = 0;
  for (const item of cartItems) {
    total += item.price;
  }
  return total;
}

// Function to display the cart items
function displayCartItems() {
  const cartItemsElement = document.getElementById("cart-items");
  cartItemsElement.innerHTML = "";
  cartItems.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      removeFromCart(index);
    });

    listItem.appendChild(removeButton);
    cartItemsElement.appendChild(listItem);
  });
}

// Function to save cart items in localStorage
function saveCartItems() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to retrieve cart items from localStorage
function getCartItems() {
  const cartItemsString = localStorage.getItem('cartItems');
  return cartItemsString ? JSON.parse(cartItemsString) : [];
}

// Function to initialize the cart items from localStorage
function initializeCartItems() {
  cartItems = getCartItems();
  updateCartTotal();
  displayCartItems();
}

// Call the initializeCartItems function on page load
initializeCartItems();
