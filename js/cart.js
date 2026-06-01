window.Cart = {
  data: [],
  products: [],

  init(products) {
    this.products = products;

    this.data = JSON.parse(localStorage.getItem("btbread-cart")) || [];

    this.data = this.data.filter(item =>
      products.some(p => p.id === item.id)
    );

    this.save();
    this.update();
    this.bind();
  },

  save() {
    localStorage.setItem("btbread-cart", JSON.stringify(this.data));
  },

  add(id) {
    const item = this.data.find(i => i.id === id);

    if (item) item.qty++;
    else this.data.push({ id, qty: 1 });

    this.save();
    this.update();
  },

  remove(id) {
    const index = this.data.findIndex(i => i.id === id);
    if (index === -1) return;

    if (this.data[index].qty > 1) {
      this.data[index].qty--;
    } else {
      this.data.splice(index, 1);
    }

    this.save();
    this.update();
    this.renderPopup();
  },

  getTotal() {
    return this.data.reduce((sum, item) => {
      const p = this.products.find(x => x.id === item.id);
      return p ? sum + p.price * item.qty : sum;
    }, 0);
  },

  getCount() {
    return this.data.reduce((s, i) => s + i.qty, 0);
  },

  update() {
    const count = document.getElementById("cart-count");
    const total = document.getElementById("cart-total");
    const popupTotal = document.getElementById("popup-cart-total");

    if (count) count.textContent = this.getCount();
    if (total) total.textContent = "$" + this.getTotal().toFixed(2);
    if (popupTotal) popupTotal.textContent = "$" + this.getTotal().toFixed(2);
  },

  renderPopup() {
    const wrap = document.getElementById("cart-items");
    if (!wrap) return;

    wrap.innerHTML = "";

    if (this.data.length === 0) {
      wrap.innerHTML = `<p style="color: var(--text-muted); text-align: center; margin-top: 2rem;">Your cart is empty.</p>`;
      this.update();
      return;
    }

    this.data.forEach(item => {
      const p = this.products.find(x => x.id === item.id);
      if (!p) return;

      const div = document.createElement("div");
      div.className = "cart-item";

      div.innerHTML = `
        <div>
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">$${p.price} × ${item.qty}</div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <button class="qty-btn remove-btn" data-id="${p.id}" title="Remove one">−</button>
          <span style="font-weight: 800; min-width: 1.2rem; text-align: center;">${item.qty}</span>
          <button class="qty-btn add-btn-cart" data-id="${p.id}" title="Add one">+</button>
        </div>
      `;

      div.querySelector(".remove-btn").onclick = () => this.remove(p.id);
      div.querySelector(".add-btn-cart").onclick = () => { this.add(p.id); this.renderPopup(); };

      wrap.appendChild(div);
    });

    this.update();
  },

  bind() {
    const open = document.getElementById("open-cart-btn");
    const popup = document.getElementById("cart-popup");
    const close = document.getElementById("close-cart-btn");

    if (open && popup) {
      open.onclick = (e) => {
        e.preventDefault();
        this.renderPopup();
        popup.classList.add("active");
      };
    }

    if (close && popup) {
      close.onclick = () => popup.classList.remove("active");
    }
  }
};