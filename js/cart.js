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

    if (count) count.textContent = this.getCount();
    if (total) total.textContent = this.getTotal().toFixed(2);
  },

  renderPopup() {
    const wrap = document.getElementById("cart-items");
    if (!wrap) return;

    wrap.innerHTML = "";

    this.data.forEach(item => {
      const p = this.products.find(x => x.id === item.id);
      if (!p) return;

      wrap.innerHTML += `
        <div class="cart-item">
          <div>
            <b>${p.name}</b><br>
            $${p.price} × ${item.qty}
          </div>
        </div>
      `;
    });
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