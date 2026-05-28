let cart = JSON.parse(localStorage.getItem("btbread-cart")) || [];

/* safety cleanup */
cart = cart.map(i => ({
  id: i.id,
  qty: i.qty || 1
}));

function saveCart() {
  localStorage.setItem("btbread-cart", JSON.stringify(cart));
}

function getProductById(products, id) {
  return products.find(p => p.id === id);
}

function getCartCount() {
  return cart.reduce((s, i) => s + i.qty, 0);
}

function getCartTotal(products) {
  return cart.reduce((sum, item) => {
    const p = getProductById(products, item.id);
    return sum + (p.price * item.qty);
  }, 0);
}

function updateCartUI(products) {
  const count = document.getElementById("cart-count");
  const total = document.getElementById("cart-total");

  if (count) count.textContent = getCartCount();

  if (total && products) {
    total.textContent = getCartTotal(products).toFixed(2);
  }
}