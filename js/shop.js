let filter = "All";
let sort = "name";

function renderProducts(list) {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";

    list.forEach(p => {
        const div = document.createElement("div");
        div.className = "product-card";

        div.innerHTML = `
      <div class="affiliate-image">
        <img src="${p.image}">
        ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ""}
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
    let list = [...PRODUCTS];

    if (filter !== "All") {
        list = list.filter(p => p.tags.includes(filter));
    }

    if (sort === "pricedisplay-asc") {
        list.sort((a, b) => a.price - b.price);
    } else if (sort === "pricedisplay-desc") {
        list.sort((a, b) => b.price - a.price);
    } else {
        list.sort((a, b) => a.name.localeCompare(b.name));
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

function changeSort(value) {
    sort = value;
    applyFilter();
}

function updateCartUI() {
    Cart.update();
}

applyFilter();
updateCartUI();