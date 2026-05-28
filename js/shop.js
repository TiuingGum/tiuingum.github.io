let filter = "All";

function renderProducts(list) {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";

    list.forEach(p => {
        const div = document.createElement("div");
        div.className = "product-card";

        div.innerHTML = `
      <div class="product-image">
        <img src="${p.image}">
      </div>

      <div class="product-info">
        <div>
          <div class="product-name">${p.name}</div>
          <div class="product-price">$${p.price}</div>
        </div>

        <button class="add-btn">Add to cart</button>
      </div>
    `;

        div.querySelector("button").onclick = () => Cart.add(p.id);

        grid.appendChild(div);
    });
}

function applyFilter() {
    let list = PRODUCTS;

    if (filter !== "All") {
        list = list.filter(p => p.tags.includes(filter));
    }

    renderProducts(list);
}

function filterProducts(tag) {
    filter = tag;

    document.querySelectorAll(".filter-btn").forEach(b => {
        b.classList.toggle("active", b.dataset.filter === tag);
    });

    applyFilter();
}

applyFilter();
updateCartUI();