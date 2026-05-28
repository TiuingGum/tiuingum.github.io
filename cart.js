let cart = JSON.parse(localStorage.getItem("btbread-cart")) || [];

/* ─────────────────────────
   CLEAN OLD DATA ON LOAD
───────────────────────── */
cart = cart
    .filter(i => i && typeof i === "object" && "id" in i)
    .map(i => ({
        id: i.id,
        qty: i.qty || 1
    }));

/* ─────────────────────────
   SAVE
───────────────────────── */
function saveCart() {
    localStorage.setItem("btbread-cart", JSON.stringify(cart));
}

/* ─────────────────────────
   CART API
───────────────────────── */
const Cart = {

    add(id) {
        const item = cart.find(i => i.id === id);

        if (item) item.qty++;
        else cart.push({ id, qty: 1 });

        saveCart();
        this.updateUI();
    },

    remove(id) {
        cart = cart.filter(i => i.id !== id);
        saveCart();
        this.updateUI();
        this.renderPopup();
    },

    changeQty(id, delta) {
        const item = cart.find(i => i.id === id);
        if (!item) return;

        item.qty += delta;

        if (item.qty <= 0) {
            this.remove(id);
            return;
        }

        saveCart();
        this.updateUI();
        this.renderPopup();
    },

    getTotal(products) {
        return cart.reduce((sum, i) => {
            const p = products.find(x => x.id === i.id);
            return sum + (p.price * i.qty);
        }, 0);
    },

    getCount() {
        return cart.reduce((sum, i) => sum + i.qty, 0);
    },

    updateUI() {
        document.getElementById("cart-count") &&
            (document.getElementById("cart-count").textContent = this.getCount());

        // fallback if product list not passed yet
        const totalEl = document.getElementById("cart-total");
        if (totalEl && window.PRODUCTS) {
            totalEl.textContent = `$${this.getTotal(window.PRODUCTS).toFixed(2)}`;
        }
    },

    renderPopup(products) {
        const wrap = document.getElementById("cart-items");
        const totalEl = document.getElementById("popup-total") ||
            document.getElementById("popup-cart-total");

        if (!wrap) return;

        wrap.innerHTML = "";

        if (cart.length === 0) {
            wrap.innerHTML = "<p>Your cart is empty.</p>";
        }

        cart.forEach(i => {
            const p = products.find(x => x.id === i.id);
            if (!p) return;

            const div = document.createElement("div");
            div.className = "cart-item";

            div.innerHTML = `
        <div>
          <b>${p.name}</b><br>
          $${p.price} × ${i.qty}
        </div>

        <div class="qty-controls">
          <button class="qty-btn">-</button>
          <button class="qty-btn">+</button>
        </div>
      `;

            const [minus, plus] = div.querySelectorAll("button");

            minus.onclick = () => this.changeQty(i.id, -1);
            plus.onclick = () => this.changeQty(i.id, 1);

            wrap.appendChild(div);
        });

        const total = this.getTotal(products);
        if (totalEl) totalEl.textContent = total.toFixed(2);
    },

    init(products) {

        window.PRODUCTS = products;

        this.updateUI();

        const popup = document.getElementById("cart-popup");

        document.getElementById("open-cart-btn")?.addEventListener("click", (e) => {
            e.preventDefault();
            this.renderPopup(products);
            popup.classList.add("active");
        });

        document.getElementById("close-cart-btn")?.addEventListener("click", () => {
            popup.classList.remove("active");
        });

        popup?.addEventListener("click", (e) => {
            if (e.target === popup) popup.classList.remove("active");
        });
    }
};