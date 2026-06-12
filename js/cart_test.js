window.Cart = {
  data: [],
  products: [],

  init(products) {
    this.products = products;

    const saved = JSON.parse(localStorage.getItem("btbread-cart"));

    this.data = Array.isArray(saved) ? saved : [];

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
    this.renderPopup(); // 🔥 ADD THIS
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
    this.renderPopup(); // ensure UI sync
  },

  getTotal() {
    return this.data.reduce((sum, item) => {
      const p = this.products.find(x => x.id === item.id);
      if (!p) return sum;

      const price = Number(p.price);

      return sum + (isNaN(price) ? 0 : price * item.qty);
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

  async checkout() {
    if (this.data.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const btn = document.getElementById("checkout-btn");
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Redirecting...";
    }

    const preferredDate =
      document.getElementById("order-date")?.value || "";

    const orderNotes =
      document.getElementById("order-notes")?.value || "";

    try {
      const items = this.data.map(item => {
        const product = this.products.find(p => p.id === item.id);

        return {
          name: product.name,
          price: product.price,
          quantity: item.qty
        };
      });

      const total = this.getTotal().toFixed(2);

      // 👇 optional confirmation popup BEFORE redirect
      const confirmCheckout = confirm(
        `Confirm checkout?\n\nTotal: $${total} AUD`
      );

      if (!confirmCheckout) {
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Checkout";
        }
        return;
      }

      const res = await fetch("https://btbread-checkout.btbread.workers.dev/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, preferredDate, orderNotes })
      });

      const data = await res.json();
      localStorage.setItem("pendingCheckout", JSON.stringify(this.data));
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Redirecting...";
      }
      window.location.href = data.url;

    } catch (err) {
      console.error(err);
      alert("Checkout failed.");
    }

    document.getElementById("cart-popup")?.classList.remove("active");
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