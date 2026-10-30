const products = [
  {
    id: 1,
    name: "JBL Tune Wireless Headphones",
    category: "Electronics",
    price: 6499,
    oldPrice: 8999,
    rating: 4.5,
    reviews: 120,
    tag: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    category: "Electronics",
    price: 2499,
    oldPrice: 4999,
    rating: 4.2,
    reviews: 98,
    tag: "50% OFF",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 3,
    name: "Nike Style Running Shoes",
    category: "Fashion",
    price: 4799,
    oldPrice: 6999,
    rating: 4.4,
    reviews: 85,
    tag: "POPULAR",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 4,
    name: "Laptop Travel Backpack",
    category: "Fashion",
    price: 1999,
    oldPrice: 2999,
    rating: 4.4,
    reviews: 67,
    tag: "DEAL",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 5,
    name: "Modern LED Table Lamp",
    category: "Home",
    price: 1299,
    oldPrice: 1999,
    rating: 4.1,
    reviews: 52,
    tag: "NEW",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 6,
    name: "Classic Fashion Sunglasses",
    category: "Accessories",
    price: 1499,
    oldPrice: 2499,
    rating: 4.6,
    reviews: 110,
    tag: "TRENDING",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 7,
    name: "Ceramic Coffee Mug",
    category: "Home",
    price: 399,
    oldPrice: 699,
    rating: 4.3,
    reviews: 75,
    tag: "VALUE PICK",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 8,
    name: "Premium Bluetooth Speaker",
    category: "Electronics",
    price: 1899,
    oldPrice: 2999,
    rating: 4.5,
    reviews: 91,
    tag: "HOT DEAL",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 9,
    name: "Classic Men's Wrist Watch",
    category: "Accessories",
    price: 2999,
    oldPrice: 4499,
    rating: 4.4,
    reviews: 63,
    tag: "POPULAR",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 10,
    name: "Casual Cotton T-Shirt",
    category: "Fashion",
    price: 599,
    oldPrice: 999,
    rating: 4.2,
    reviews: 88,
    tag: "40% OFF",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 11,
    name: "Indoor Green Plant",
    category: "Home",
    price: 499,
    oldPrice: 799,
    rating: 4.3,
    reviews: 42,
    tag: "NEW",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 12,
    name: "Portable Power Bank",
    category: "Electronics",
    price: 999,
    oldPrice: 1499,
    rating: 4.1,
    reviews: 56,
    tag: "DEAL",
    image: "https://images.unsplash.com/photo-1609592806596-b43bada0f0e3?auto=format&fit=crop&w=700&q=85"
  }
];

// HTML elements
const $ = id => document.getElementById(id);

const productGrid = $("productGrid");
const searchInput = $("searchInput");
const categoryFilter = $("categoryFilter");
const sortSelect = $("sortSelect");
const emptyState = $("emptyState");

let selectedCategory = "all";
let searchText = "";

let cart = [];

try {
  cart = JSON.parse(localStorage.getItem("shoporaCart")) || [];
  if (!Array.isArray(cart)) cart = [];
} catch {
  cart = [];
}

// Format Indian currency
function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}

// Save cart
function saveCart() {
  localStorage.setItem("shoporaCart", JSON.stringify(cart));
}

// Display products
function displayProducts() {
  let filtered = products.filter(product => {

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  // Sorting
  if (sortSelect.value === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sortSelect.value === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (sortSelect.value === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  $("resultCount").textContent =
    `Showing ${filtered.length} of ${products.length} products`;

  emptyState.hidden = filtered.length !== 0;
  productGrid.style.display = filtered.length ? "grid" : "none";

  productGrid.innerHTML = filtered.map(product => {

    const discount = Math.round(
      ((product.oldPrice - product.price) / product.oldPrice) * 100
    );

    return `
      <article class="product-card">

        <div class="product-visual">

          <span class="product-tag">${product.tag}</span>

          <img
            class="product-photo"
            src="${product.image}"
            alt="${product.name}"
            loading="lazy"
            onerror="this.style.display='none'"
          >

        </div>

        <div class="product-info">

          <div class="product-category">
            ${product.category}
          </div>

          <h3>${product.name}</h3>

          <div class="rating">
            ★★★★★
            <small>${product.rating} (${product.reviews})</small>
          </div>

          <div class="price-row">

            <span class="price">
              ${formatPrice(product.price)}
            </span>

            <span class="old-price">
              ${formatPrice(product.oldPrice)}
            </span>

            <span class="discount">
              ${discount}% OFF
            </span>

          </div>

          <button
            class="add-cart"
            onclick="addToCart(${product.id})"
          >
            🛒 Add to Cart
          </button>

        </div>
      </article>
    `;
  }).join("");
}

// Category selection
function selectCategory(category) {
  selectedCategory = category;

  document.querySelectorAll(".chip").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.cat === category
    );
  });

  document.querySelectorAll(".category-nav a[data-cat]").forEach(link => {
    link.classList.toggle(
      "selected",
      link.dataset.cat === category
    );
  });

  categoryFilter.value = category;
  displayProducts();
}

// Filter buttons
document.querySelectorAll(".chip").forEach(button => {
  button.addEventListener("click", () => {
    selectCategory(button.dataset.cat);
  });
});

// Navigation category links
document.querySelectorAll(".category-nav a[data-cat]").forEach(link => {
  link.addEventListener("click", () => {
    selectCategory(link.dataset.cat);
  });
});

// Search
$("searchForm").addEventListener("submit", function(event) {
  event.preventDefault();

  searchText = searchInput.value.trim().toLowerCase();
  displayProducts();

  $("products").scrollIntoView({ behavior: "smooth" });
});

searchInput.addEventListener("input", function() {
  searchText = this.value.trim().toLowerCase();
  displayProducts();
});

categoryFilter.addEventListener("change", function() {
  selectCategory(this.value);
});

// Sorting
sortSelect.addEventListener("change", displayProducts);

// Clear filters
$("clearSearch").addEventListener("click", resetFilters);
$("resetSearch").addEventListener("click", resetFilters);

function resetFilters() {
  selectedCategory = "all";
  searchText = "";

  searchInput.value = "";
  categoryFilter.value = "all";
  sortSelect.value = "featured";

  selectCategory("all");
  displayProducts();
}

// Add product to cart
function addToCart(id) {
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      id: id,
      qty: 1
    });
  }

  saveCart();
  updateCart();

  showToast("Product added to your cart!");
}

// Update cart
function updateCart() {
  cart = cart.filter(item =>
    products.some(product => product.id === item.id) &&
    item.qty > 0
  );

  saveCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.qty, 0
  );

  const totalPrice = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.qty;
  }, 0);

  $("cartCount").textContent = totalItems;
  $("drawerCount").textContent = `(${totalItems})`;
  $("subtotal").textContent = formatPrice(totalPrice);
  $("checkoutTotal").textContent = formatPrice(totalPrice);

  if (cart.length === 0) {
    $("cartItems").innerHTML = `
      <div class="empty-state">
        <div>🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some products to get started.</p>
      </div>
    `;

    $("checkoutBtn").disabled = true;
    $("checkoutBtn").style.opacity = ".5";
  } else {
    $("checkoutBtn").disabled = false;
    $("checkoutBtn").style.opacity = "1";

    $("cartItems").innerHTML = cart.map(item => {
      const product = products.find(p => p.id === item.id);

      return `
        <div class="cart-item">

          <div class="cart-item-art">
            <img src="${product.image}" alt="${product.name}">
          </div>

          <div>
            <h4>${product.name}</h4>

            <strong>${formatPrice(product.price)}</strong>

            <div class="cart-controls">

              <button onclick="changeQuantity(${product.id}, -1)">
                −
              </button>

              <span>${item.qty}</span>

              <button onclick="changeQuantity(${product.id}, 1)">
                +
              </button>

              <button
                class="remove-item"
                onclick="removeFromCart(${product.id})"
                aria-label="Remove product"
              >
                ✕
              </button>

            </div>
          </div>

        </div>
      `;
    }).join("");
  }
}

// Change quantity
function changeQuantity(id, amount) {
  const item = cart.find(item => item.id === id);

  if (!item) return;

  item.qty += amount;

  if (item.qty <= 0) {
    cart = cart.filter(item => item.id !== id);
  }

  saveCart();
  updateCart();
}

// Remove product
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);

  saveCart();
  updateCart();

  showToast("Product removed from cart");
}

// Open cart
function openCart() {
  $("cartDrawer").classList.add("open");
  $("overlay").classList.add("show");
}

// Close cart
function closeCart() {
  $("cartDrawer").classList.remove("open");
  $("overlay").classList.remove("show");
}

$("cartToggle").addEventListener("click", openCart);
$("closeCart").addEventListener("click", closeCart);
$("continueShopping").addEventListener("click", closeCart);
$("overlay").addEventListener("click", closeCart);

// Checkout
$("checkoutBtn").addEventListener("click", function() {

  if (cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }

  closeCart();

  $("checkoutModal").classList.add("show");
});

$("closeCheckout").addEventListener("click", () => {
  $("checkoutModal").classList.remove("show");
});

// Place order
$("checkoutForm").addEventListener("submit", function(event) {

  event.preventDefault();

  if (cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }

  const customer = {
    name: $("customerName").value.trim(),
    phone: $("customerPhone").value.trim(),
    email: $("customerEmail").value.trim(),
    address: $("customerAddress").value.trim()
  };

  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.qty;
  }, 0);

  const orderId = "SHOP" + Date.now().toString().slice(-8);

  const order = {
    orderId: orderId,
    customer: customer,
    items: [...cart],
    total: total,
    date: new Date().toLocaleString()
  };

  // Save demo order
  let orders = [];

  try {
    orders = JSON.parse(localStorage.getItem("shoporaOrders")) || [];
  } catch {
    orders = [];
  }

  orders.push(order);

  localStorage.setItem(
    "shoporaOrders",
    JSON.stringify(orders)
  );

  $("successText").textContent =
    `Your order ${orderId} has been created. Total: ${formatPrice(total)}`;

  // Clear cart
  cart = [];
  saveCart();
  updateCart();

  $("checkoutModal").classList.remove("show");
  $("successModal").classList.add("show");

  $("checkoutForm").reset();
});

// Continue shopping after successful order
$("doneBtn").addEventListener("click", function() {
  $("successModal").classList.remove("show");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Account demo
$("accountBtn").addEventListener("click", function() {
  showToast("Account feature is coming soon!");
});

// Toast notification
function showToast(message) {
  const toast = $("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.shoporaToastTimer);

  window.shoporaToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Initial page load
displayProducts();
updateCart();