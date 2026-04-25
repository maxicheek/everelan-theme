document.addEventListener("DOMContentLoaded", () => {

  const drawer = document.querySelector(".js-cart-drawer");

  // OPEN
  document.addEventListener("click", (e) => {
    if (e.target.closest(".js-cart-toggle")) {
      drawer.classList.add("active");
    }
  });

  // CLOSE
  document.addEventListener("click", (e) => {
    if (e.target.closest(".js-cart-close")) {
      drawer.classList.remove("active");
    }
  });

  // QUICK ADD + UPDATE
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("js-quick-add")) {

      const id = e.target.dataset.id;

      await fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, quantity: 1 })
      });

      updateCart();
    }
  });

  // PRODUCT FORM
  document.addEventListener("submit", async (e) => {
    if (e.target.classList.contains("js-product-form")) {
      e.preventDefault();

      const formData = new FormData(e.target);

      await fetch("/cart/add.js", {
        method: "POST",
        body: formData
      });

      updateCart();
    }
  });

  async function updateCart() {
    const res = await fetch("/cart.js");
    const cart = await res.json();

    document.querySelectorAll(".cart-count").forEach(el => {
      el.innerText = cart.item_count;
    });

    // перерисовка items
    const container = document.querySelector(".js-cart-items");

    if (container) {
      container.innerHTML = cart.items.map(item => `
        <div class="cart-item">
          <img src="${item.image}" />
          <div>
            <p>${item.product_title}</p>
            <p>${item.quantity} × ${(item.price/100).toFixed(2)}</p>
          </div>
        </div>
      `).join("");
    }

    drawer.classList.add("active");
  }

});