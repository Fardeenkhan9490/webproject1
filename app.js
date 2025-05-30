const appData = {
  suppliers: [
    {"id": 1, "name": "Ravi's General Store", "specialty": "Household Items & Grains", "rating": 4.5, "distance": "0.2 km", "image": "store1.jpg"},
    {"id": 2, "name": "Maya's Fresh Vegetables", "specialty": "Fresh Vegetables & Fruits", "rating": 4.8, "distance": "0.3 km", "image": "store2.jpg"},
    {"id": 3, "name": "Govind's Dairy", "specialty": "Milk & Dairy Products", "rating": 4.6, "distance": "0.1 km", "image": "store3.jpg"},
    {"id": 4, "name": "Sunita's Spice Corner", "specialty": "Spices & Condiments", "rating": 4.7, "distance": "0.4 km", "image": "store4.jpg"},
    {"id": 5, "name": "Rajesh Provision Store", "specialty": "Packaged Foods & Snacks", "rating": 4.3, "distance": "0.5 km", "image": "store5.jpg"},
    {"id": 6, "name": "Lakshmi's Organic Farm", "specialty": "Organic Vegetables", "rating": 4.9, "distance": "1.2 km", "image": "store6.jpg"}
  ],
  products: [
    {"id": 1, "name": "Fresh Tomatoes", "category": "Vegetables", "price": 40, "unit": "kg", "supplier_id": 2, "image": "tomato.jpg", "description": "Fresh local tomatoes"},
    {"id": 2, "name": "Basmati Rice", "category": "Grains", "price": 85, "unit": "kg", "supplier_id": 1, "image": "rice.jpg", "description": "Premium basmati rice"},
    {"id": 3, "name": "Fresh Milk", "category": "Dairy", "price": 28, "unit": "liter", "supplier_id": 3, "image": "milk.jpg", "description": "Fresh cow milk"},
    {"id": 4, "name": "Onions", "category": "Vegetables", "price": 35, "unit": "kg", "supplier_id": 2, "image": "onion.jpg", "description": "Fresh local onions"},
    {"id": 5, "name": "Turmeric Powder", "category": "Spices", "price": 120, "unit": "500g", "supplier_id": 4, "image": "turmeric.jpg", "description": "Pure turmeric powder"},
    {"id": 6, "name": "Wheat Flour", "category": "Grains", "price": 32, "unit": "kg", "supplier_id": 1, "image": "wheat.jpg", "description": "Fresh ground wheat flour"},
    {"id": 7, "name": "Bananas", "category": "Fruits", "price": 50, "unit": "dozen", "supplier_id": 2, "image": "banana.jpg", "description": "Ripe yellow bananas"},
    {"id": 8, "name": "Paneer", "category": "Dairy", "price": 320, "unit": "kg", "supplier_id": 3, "image": "paneer.jpg", "description": "Fresh cottage cheese"},
    {"id": 9, "name": "Red Chili Powder", "category": "Spices", "price": 150, "unit": "500g", "supplier_id": 4, "image": "chili.jpg", "description": "Spicy red chili powder"},
    {"id": 10, "name": "Potatoes", "category": "Vegetables", "price": 25, "unit": "kg", "supplier_id": 2, "image": "potato.jpg", "description": "Fresh potatoes"},
    {"id": 11, "name": "Green Peas", "category": "Vegetables", "price": 60, "unit": "kg", "supplier_id": 6, "image": "peas.jpg", "description": "Organic green peas"},
    {"id": 12, "name": "Mustard Oil", "category": "Household", "price": 140, "unit": "liter", "supplier_id": 1, "image": "oil.jpg", "description": "Pure mustard oil"},
    {"id": 13, "name": "Curd", "category": "Dairy", "price": 45, "unit": "500g", "supplier_id": 3, "image": "curd.jpg", "description": "Fresh homemade curd"},
    {"id": 14, "name": "Garam Masala", "category": "Spices", "price": 80, "unit": "100g", "supplier_id": 4, "image": "masala.jpg", "description": "Aromatic garam masala"},
    {"id": 15, "name": "Apples", "category": "Fruits", "price": 120, "unit": "kg", "supplier_id": 2, "image": "apple.jpg", "description": "Fresh red apples"}
  ],
  categories: [
    {"name": "Vegetables", "icon": "🥬", "color": "#4CAF50"},
    {"name": "Fruits", "icon": "🍎", "color": "#FF9800"},
    {"name": "Grains", "icon": "🌾", "color": "#8BC34A"},
    {"name": "Dairy", "icon": "🥛", "color": "#2196F3"},
    {"name": "Spices", "icon": "🌶️", "color": "#F44336"},
    {"name": "Household", "icon": "🏠", "color": "#9C27B0"}
  ]
};

// Application State
let currentPage = 'home';
let cart = [];
let currentUser = null;
let orders = [];
let currentSupplier = null; // Stores ID of the currently viewed supplier's products
let currentCategory = null; // Stores name of the currently viewed category's products
let currentProduct = null; // Stores ID of the currently viewed product detail
let selectedQuantity = 1;

const productIcons = {
  'Fresh Tomatoes': '🍅',
  'Basmati Rice': '🍚',
  'Fresh Milk': '🥛',
  'Onions': '🧅',
  'Turmeric Powder': '🌶️',
  'Wheat Flour': '🌾',
  'Bananas': '🍌',
  'Paneer': '🧀',
  'Red Chili Powder': '🌶️',
  'Potatoes': '🥔',
  'Green Peas': '🟢',
  'Mustard Oil': '🫗',
  'Curd': '🥛',
  'Garam Masala': '🌶️',
  'Apples': '🍎'
};

const supplierIcons = {
  "Ravi's General Store": '🏪',
  "Maya's Fresh Vegetables": '🥬',
  "Govind's Dairy": '🥛',
  "Sunita's Spice Corner": '🌶️',
  "Rajesh Provision Store": '📦',
  "Lakshmi's Organic Farm": '🌱'
};

document.addEventListener('DOMContentLoaded', function() {
  loadStoredData();
  initializeEventListeners();
  renderHomePage();
  updateCartCount();
});

function loadStoredData() {
  const storedCart = localStorage.getItem('villageGroceryCart');
  const storedUser = localStorage.getItem('villageGroceryUser');
  const storedOrders = localStorage.getItem('villageGroceryOrders');
  
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
  if (storedUser) {
    currentUser = JSON.parse(storedUser);
  }
  if (storedOrders) {
    orders = JSON.parse(storedOrders);
  }
}

function saveToStorage() {
  localStorage.setItem('villageGroceryCart', JSON.stringify(cart));
  if (currentUser) {
    localStorage.setItem('villageGroceryUser', JSON.stringify(currentUser));
  }
  localStorage.setItem('villageGroceryOrders', JSON.stringify(orders));
}

/**
 * Initializes all global event listeners for navigation, back buttons, and search.
 */
function initializeEventListeners() {
  // Navigation buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const page = e.target.dataset.page;
      showPage(page);
    });
  });

  document.getElementById('cartBtn').addEventListener('click', () => showPage('cart'));
  document.getElementById('profileBtn').addEventListener('click', () => showPage('profile'));

  // Back buttons
  document.getElementById('backBtn').addEventListener('click', () => showPage('home'));
  document.getElementById('productBackBtn').addEventListener('click', () => {
    if (currentSupplier) {
      showSupplierProducts(currentSupplier); // Go back to supplier's products
    } else if (currentCategory) {
      showCategoryProducts(currentCategory); // Go back to category's products
    } else {
      showPage('home'); // Fallback to home
    }
  });
  document.getElementById('cartBackBtn').addEventListener('click', () => showPage('home'));
  document.getElementById('checkoutBackBtn').addEventListener('click', () => showPage('cart'));
  document.getElementById('profileBackBtn').addEventListener('click', () => showPage('home'));

  // Search functionality
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', handleSearch);
  searchInput.addEventListener('focus', handleSearch);
  searchInput.addEventListener('blur', () => {
    // Add a small delay to allow click event on search results to fire
    setTimeout(() => {
      document.getElementById('searchResults').classList.add('hidden');
    }, 200);
  });

  // Modal close button
  document.getElementById('closeModalBtn').addEventListener('click', closeOrderModal);
}

/**
 * Hides the order success modal and returns to the home page.
 */
function closeOrderModal() {
  // First hide the modal
  const modal = document.getElementById('orderModal');
  modal.classList.add('hidden');
  
  // Reset context
  currentSupplier = null;
  currentCategory = null;
  
  // Small delay to ensure modal is hidden before showing home page
  setTimeout(() => {
    // Show home page
    showPage('home');
    
    // Force re-render of home page content
    renderHomePage();
  }, 100);
}

/**
 * Controls which main page is visible and updates navigation styles.
 * @param {string} pageName - The ID prefix of the page to show (e.g., 'home', 'cart').
 */
function showPage(pageName) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Update navigation buttons active state
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const targetPage = document.getElementById(pageName + 'Page');
  if (targetPage) {
    targetPage.classList.add('active');
  }
  
  // Update active nav button (only for top-level navigation)
  const activeNavBtn = document.querySelector(`.nav-btn[data-page="${pageName}"]`);
  if (activeNavBtn) {
    activeNavBtn.classList.add('active');
  }
  
  currentPage = pageName; 
  // Render content specific to the page
  switch (pageName) {
    case 'home':
      renderHomePage();
      break;
    case 'suppliers':
      renderSuppliersPage();
      break;
    case 'categories':
      renderCategoriesPage();
      break;
    case 'cart':
      renderCartPage();
      break;
    case 'checkout':
      renderCheckoutPage();
      break;
    case 'orders':
      renderOrdersPage();
      break;
    case 'profile':
      renderProfilePage();
      break;
    // Products and ProductDetail pages are handled by specific functions that then call showPage
  }
}

/**
 * Renders content for the Home page, including featured suppliers and quick categories.
 */
function renderHomePage() {
  renderFeaturedSuppliers();
  renderQuickCategories();
}

/**
 * Renders a grid of featured suppliers on the home page.
 */
function renderFeaturedSuppliers() {
  const grid = document.getElementById('featuredSuppliersGrid');
  // Show top 3 suppliers as featured
  const featuredSuppliers = appData.suppliers.slice(0, 3); 
  
  grid.innerHTML = featuredSuppliers.map(supplier => `
    <div class="supplier-card" onclick="showSupplierProducts(${supplier.id})">
      <div class="supplier-icon">${supplierIcons[supplier.name] || '🏪'}</div>
      <div class="supplier-name">${supplier.name}</div>
      <div class="supplier-specialty">${supplier.specialty}</div>
      <div class="supplier-meta">
        <span class="rating">⭐ ${supplier.rating}</span>
        <span class="distance">${supplier.distance}</span>
      </div>
    </div>
  `).join('');
}

/**
 * Renders a grid of quick access categories on the home page.
 */
function renderQuickCategories() {
  const grid = document.getElementById('categoriesGrid');
  
  grid.innerHTML = appData.categories.map(category => `
    <div class="category-card" onclick="showCategoryProducts('${category.name}')">
      <div class="category-icon">${category.icon}</div>
      <div class="category-name">${category.name}</div>
    </div>
  `).join('');
}

/**
 * Renders the full list of suppliers on the suppliers page.
 */
function renderSuppliersPage() {
  const grid = document.getElementById('suppliersGrid');
  
  grid.innerHTML = appData.suppliers.map(supplier => `
    <div class="supplier-card" onclick="showSupplierProducts(${supplier.id})">
      <div class="supplier-icon">${supplierIcons[supplier.name] || '🏪'}</div>
      <div class="supplier-name">${supplier.name}</div>
      <div class="supplier-specialty">${supplier.specialty}</div>
      <div class="supplier-meta">
        <span class="rating">⭐ ${supplier.rating}</span>
        <span class="distance">${supplier.distance}</span>
      </div>
    </div>
  `).join('');
}

/**
 * Renders the full list of categories with product counts on the categories page.
 */
function renderCategoriesPage() {
  const grid = document.getElementById('categoriesDetailGrid');
  
  grid.innerHTML = appData.categories.map(category => {
    const productCount = appData.products.filter(p => p.category === category.name).length;
    return `
      <div class="category-card" onclick="showCategoryProducts('${category.name}')">
        <div class="category-icon">${category.icon}</div>
        <div class="category-name">${category.name}</div>
        <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-top: var(--space-8);">${productCount} products</div>
      </div>
    `;
  }).join('');
}

/**
 * Displays products from a specific supplier.
 * @param {number} supplierId - The ID of the supplier.
 */
function showSupplierProducts(supplierId) {
  const supplier = appData.suppliers.find(s => s.id === supplierId);
  currentSupplier = supplierId; // Set current context
  currentCategory = null; // Clear other context
  
  const products = appData.products.filter(p => p.supplier_id === supplierId);
  
  document.getElementById('productsTitle').textContent = `${supplier.name} - Products`;
  renderProducts(products);
  showPage('products');
}

/**
 * Displays products from a specific category.
 * @param {string} categoryName - The name of the category.
 */
function showCategoryProducts(categoryName) {
  currentCategory = categoryName; // Set current context
  currentSupplier = null; // Clear other context
  
  const products = appData.products.filter(p => p.category === categoryName);
  
  document.getElementById('productsTitle').textContent = `${categoryName} Products`;
  renderProducts(products);
  showPage('products');
}

/**
 * Renders a grid of products.
 * @param {Array} products - Array of product objects to render.
 */
function renderProducts(products) {
  const grid = document.getElementById('productsGrid');
  
  if (products.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📦</div>
        <p>No products found in this selection.</p>
      </div>
    `;
    return;
  }
  grid.innerHTML = products.map(product => {
    const supplier = appData.suppliers.find(s => s.id === product.supplier_id);
    return `
      <div class="product-card" onclick="showProductDetail(${product.id})">
        <div class="product-image">${productIcons[product.name] || '📦'}</div>
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-price">₹${product.price}/${product.unit}</div>
          <div class="product-supplier">by ${supplier.name}</div>
          <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id}, true)">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Displays the detailed view of a single product.
 * @param {number} productId - The ID of the product to display.
 */
function showProductDetail(productId) {
  const product = appData.products.find(p => p.id === productId);
  const supplier = appData.suppliers.find(s => s.id === product.supplier_id);
  currentProduct = productId; // Set current context
  selectedQuantity = 1; // Reset quantity for new product detail view
  
  const detailContainer = document.getElementById('productDetail');
  detailContainer.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-detail-image">${productIcons[product.name] || '📦'}</div>
      <div class="product-detail-info">
        <h3>${product.name}</h3>
        <div class="product-detail-price">₹${product.price}/${product.unit}</div>
        <p><strong>Supplier:</strong> ${supplier.name}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <div class="quantity-selector">
          <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
          <div class="quantity-display" id="quantityDisplay">1</div>
          <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
        </div>
        
        <button class="btn btn--primary btn--full-width" onclick="addToCartWithQuantity(${product.id})">
          Add to Cart
        </button>
      </div>
    </div>
  `;
  
  showPage('productDetailPage');
}

/**
 * Changes the quantity selected for a product on the detail page.
 * @param {number} delta - The amount to change the quantity by (-1 or 1).
 */
function changeQuantity(delta) {
  selectedQuantity = Math.max(1, selectedQuantity + delta);
  const quantityDisplay = document.getElementById('quantityDisplay');
  if (quantityDisplay) {
    quantityDisplay.textContent = selectedQuantity;
  }
}

/**
 * Adds the currently selected product with the chosen quantity to the cart.
 * This function calls `addToCart` multiple times.
 * @param {number} productId - The ID of the product to add.
 */
function addToCartWithQuantity(productId) {
  for (let i = 0; i < selectedQuantity; i++) {
    addToCart(productId, false); // Pass false to prevent individual notifications
  }
  showNotification(`${selectedQuantity} ${selectedQuantity > 1 ? 'items' : 'item'} added to cart!`);
  // Reset selectedQuantity after adding to cart
  selectedQuantity = 1; 
  const quantityDisplay = document.getElementById('quantityDisplay');
  if (quantityDisplay) {
    quantityDisplay.textContent = selectedQuantity;
  }
}

/**
 * Adds a single product to the cart.
 * @param {number} productId - The ID of the product to add.
 * @param {boolean} [showFeedback=true] - Whether to show a notification message.
 */
function addToCart(productId, showFeedback = true) {
  const product = appData.products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      name: product.name,
      price: product.price,
      unit: product.unit,
      supplierId: product.supplier_id,
      quantity: 1
    });
  }
  
  updateCartCount();
  saveToStorage();
  
  if (showFeedback) {
    showNotification('Product added to cart!');
  }
}

/**
 * Removes a product entirely from the cart.
 * @param {number} productId - The ID of the product to remove.
 */
function removeFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);
  updateCartCount();
  saveToStorage();
  renderCartPage(); // Re-render cart to reflect changes
  showNotification('Item removed from cart!');
}

/**
 * Updates the quantity of a specific item in the cart.
 * If quantity becomes 0, the item is removed.
 * @param {number} productId - The ID of the product to update.
 * @param {number} delta - The amount to change the quantity by (-1 or 1).
 */
function updateCartQuantity(productId, delta) {
  const item = cart.find(item => item.productId === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) { // If quantity becomes 0 or less, remove the item
      cart = cart.filter(cartItem => cartItem.productId !== productId);
    }
    updateCartCount();
    saveToStorage();
    renderCartPage(); // Re-render cart to reflect changes
  }
}

/**
 * Updates the shopping cart icon with the total number of items.
 */
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = totalItems;
}

/**
 * Renders the shopping cart page with all items and total.
 */
function renderCartPage() {
  const cartContent = document.getElementById('cartContent');
  
  if (cart.length === 0) {
    cartContent.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🛒</div>
        <p>Your cart is empty!</p>
        <button class="btn btn--primary" onclick="showPage('home')">Start Shopping</button>
      </div>
    `;
    return;
  }
  
  const cartItemsHtml = cart.map(item => {
    const supplier = appData.suppliers.find(s => s.id === item.supplierId);
    return `
      <div class="cart-item">
        <div class="cart-item-image">${productIcons[item.name] || '📦'}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-supplier">by ${supplier.name}</div>
          <div class="cart-item-price">₹${item.price}/${item.unit}</div>
        </div>
        <div class="cart-item-controls">
          <button class="quantity-btn" onclick="updateCartQuantity(${item.productId}, -1)">-</button>
          <div class="quantity-display">${item.quantity}</div>
          <button class="quantity-btn" onclick="updateCartQuantity(${item.productId}, 1)">+</button>
          <button class="btn btn--outline btn--sm" onclick="removeFromCart(${item.productId})">Remove</button>
        </div>
      </div>
    `;
  }).join('');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  cartContent.innerHTML = `
    ${cartItemsHtml}
    <div class="cart-summary">
      <div class="cart-total">Total: ₹${total}</div>
      <button class="btn btn--primary btn--full-width" onclick="showPage('checkout')">
        Proceed to Checkout
      </button>
    </div>
  `;
}

/**
 * Renders the checkout page with delivery and payment forms.
 */
function renderCheckoutPage() {
  const checkoutContent = document.getElementById('checkoutContent');
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  if (cart.length === 0) {
    checkoutContent.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🛒</div>
        <p>Your cart is empty. Please add items before checking out.</p>
        <button class="btn btn--primary" onclick="showPage('home')">Back to Shopping</button>
      </div>
    `;
    return;
  }

  // Pre-fill form with existing user data if available
  const userName = currentUser ? currentUser.name : '';
  const userPhone = currentUser ? currentUser.phone : '';
  const userEmail = currentUser ? currentUser.email : '';
  const userAddress = currentUser ? currentUser.address : '';
  
  checkoutContent.innerHTML = `
    <form class="checkout-form" id="checkoutForm">
      <div class="form-section">
        <h3>Delivery Information</h3>
        <div class="form-group">
          <label for="fullName" class="form-label">Full Name</label>
          <input type="text" id="fullName" class="form-control" name="name" value="${userName}" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="phoneNum" class="form-label">Phone Number</label>
            <input type="tel" id="phoneNum" class="form-control" name="phone" value="${userPhone}" required>
          </div>
          <div class="form-group">
            <label for="emailAdd" class="form-label">Email (Optional)</label>
            <input type="email" id="emailAdd" class="form-control" name="email" value="${userEmail}">
          </div>
        </div>
        <div class="form-group">
          <label for="deliveryAddress" class="form-label">Delivery Address</label>
          <textarea id="deliveryAddress" class="form-control" name="address" rows="3" required>${userAddress}</textarea>
        </div>
      </div>
      <div class="form-section">
        <h3>Delivery Options</h3>
        <div class="payment-options" id="deliveryOptions">
          <label class="payment-option selected">
            <input type="radio" name="delivery" value="home" checked>
            <div>🏠 Home Delivery</div>
            <small>Free delivery</small>
          </label>
          <label class="payment-option">
            <input type="radio" name="delivery" value="pickup">
            <div>🏪 Store Pickup</div>
            <small>Pickup from store</small>
          </label>
        </div>
      </div>
      <div class="form-section">
        <h3>Payment Method</h3>
        <div class="payment-options" id="paymentOptions">
          <label class="payment-option selected">
            <input type="radio" name="payment" value="cod" checked>
            <div>💰 Cash on Delivery</div>
          </label>
          <label class="payment-option">
            <input type="radio" name="payment" value="upi">
            <div>📱 UPI Payment</div>
          </label>
          <label class="payment-option">
            <input type="radio" name="payment" value="card">
            <div>💳 Card Payment</div>
          </label>
        </div>
      </div>
      
      <div class="cart-summary">
        <div class="cart-total">Total: ₹${total}</div>
        <button type="submit" class="btn btn--primary btn--full-width">
          Place Order</button>
      </div>
    </form>
  `;
  
  // Add form submission handler
  document.getElementById('checkoutForm').addEventListener('submit', placeOrder);
  
  // Add payment/delivery option selection functionality
  document.querySelectorAll('#deliveryOptions .payment-option').forEach(option => {
    option.addEventListener('click', function() {
      document.querySelectorAll('#deliveryOptions .payment-option').forEach(radioOption => {
        radioOption.classList.remove('selected');
      });
      this.classList.add('selected');
      this.querySelector('input[name="delivery"]').checked = true;
    });
  });

  document.querySelectorAll('#paymentOptions .payment-option').forEach(option => {
    option.addEventListener('click', function() {
      document.querySelectorAll('#paymentOptions .payment-option').forEach(radioOption => {
        radioOption.classList.remove('selected');
      });
      this.classList.add('selected');
      this.querySelector('input[name="payment"]').checked = true;
    });
  });
}

/**
 * Handles the order placement process after form submission.
 * @param {Event} event - The submit event from the checkout form.
 */
function placeOrder(event) {
  event.preventDefault();
  
  if (cart.length === 0) {
    showNotification('Your cart is empty. Add items before placing an order!');
    return;
  }
  
  const formData = new FormData(event.target);
  const orderId = Date.now(); // Simple unique ID for the order
  
  const orderData = {
    id: orderId,
    date: new Date().toLocaleDateString('en-IN'), // Format date for India
    items: [...cart], // Copy cart items
    total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    customerInfo: {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email') || '',
      address: formData.get('address')
    },
    delivery: formData.get('delivery'),
    payment: formData.get('payment'),
    status: 'Confirmed'
  };
  
  orders.unshift(orderData); // Add new order to the beginning of the list
  
  // Update user info for future checkouts
  currentUser = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email') || '',
    address: formData.get('address')
  };
  
  // Clear cart
  cart = [];
  updateCartCount();
  saveToStorage();
  
  // Show success modal
  const orderIdDisplay = document.getElementById('orderIdDisplay');
  if (orderIdDisplay) {
    orderIdDisplay.textContent = orderId;
  }
  const modal = document.getElementById('orderModal');
  modal.classList.remove('hidden');
  
  // Add event listener to the modal's close button
  const closeBtn = document.getElementById('closeModalBtn');
  if (closeBtn) {
    // Remove any existing event listeners
    closeBtn.replaceWith(closeBtn.cloneNode(true));
    // Add new event listener
    document.getElementById('closeModalBtn').addEventListener('click', closeOrderModal);
  }
}

/**
 * Renders the user's order history page.
 */
function renderOrdersPage() {
  const ordersContent = document.getElementById('ordersContent');
  
  if (orders.length === 0) {
    ordersContent.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <p>You haven't placed any orders yet.</p>
        <button class="btn btn--primary" onclick="showPage('home')">Start Shopping</button>
      </div>
    `;
    return;
  }
  
  ordersContent.innerHTML = orders.map(order => `
    <div class="card">
      <div class="card__body">
        <div class="flex justify-between items-center mb-8">
          <h4>Order #${order.id}</h4>
          <span class="status status--success">${order.status}</span>
        </div>
        <p class="mb-8"><strong>Date:</strong> ${order.date}</p>
        <p class="mb-8"><strong>Total:</strong> ₹${order.total}</p>
        <p class="mb-8"><strong>Items:</strong> ${order.items.length} unique products</p>
        <p class="mb-8"><strong>Payment Method:</strong> ${order.payment.toUpperCase()}</p>
        <p class="m-0"><strong>Customer:</strong> ${order.customerInfo.name}</p>
      </div>
    </div>
  `).join('');
}

/**
 * Renders the user's profile page, displaying saved information and order statistics.
 */
function renderProfilePage() {
  const profileContent = document.getElementById('profileContent');
  
  if (!currentUser) {
    profileContent.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">👤</div>
        <p>No profile information available.</p>
        <p>Your profile will be created automatically when you place your first order.</p>
      </div>
    `;
    return;
  }
  
  profileContent.innerHTML = `
    <div class="card">
      <div class="card__body">
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${currentUser.name}</p>
        <p><strong>Phone:</strong> ${currentUser.phone}</p>
        <p><strong>Email:</strong> ${currentUser.email || 'Not provided'}</p>
        <p><strong>Address:</strong> ${currentUser.address}</p>
      </div>
    </div>
    
    <div class="card" style="margin-top: var(--space-24);">
      <div class="card__body">
        <h3>Order Statistics</h3>
        <p><strong>Total Orders:</strong> ${orders.length}</p>
        <p><strong>Total Spent:</strong> ₹${orders.reduce((sum, order) => sum + order.total, 0)}</p> 
      </div>
    </div>
  `;
}

/**
 * Handles product search input, filtering and displaying results.
 * @param {Event} event - The input or focus event from the search bar.
 */
function handleSearch(event) {
  const query = event.target.value.toLowerCase().trim();
  const resultsContainer = document.getElementById('searchResults');
  
  if (query.length === 0) {
    resultsContainer.classList.add('hidden');
    return;
  }
  
  const results = appData.products.filter(product => 
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    appData.suppliers.find(s => s.id === product.supplier_id)?.name.toLowerCase().includes(query)
  );
  
  if (results.length === 0) {
    resultsContainer.innerHTML = '<div class="search-result-item">No products found</div>';
  } else {
    resultsContainer.innerHTML = results.slice(0, 5).map(product => {
      const supplier = appData.suppliers.find(s => s.id === product.supplier_id);
      return `
        <div class="search-result-item" onclick="showProductDetail(${product.id})">
          <span>${productIcons[product.name] || '📦'}</span>
          <div>
            <div><strong>${product.name}</strong></div>
            <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">₹${product.price}/${product.unit} - ${supplier.name}</div>
          </div>
        </div>
      `;
    }).join('');
  }
  
  resultsContainer.classList.remove('hidden');
}

/**
 * Displays a temporary notification message at the top right of the screen.
 * @param {string} message - The message to display.
 */
function showNotification(message) {
  // Remove any existing notifications to prevent stacking
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--village-green); /* Using a CSS variable for consistency */
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 1000;
    box-shadow: var(--shadow-md); /* Using a CSS variable for consistency */
    font-weight: var(--font-weight-medium); /* Using a CSS variable for consistency */
    animation: slideIn 0.3s forwards, fadeOut 0.5s 2.5s forwards;
  `;
  
  document.body.appendChild(notification);
  
  // Add keyframes for animation
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;
  document.head.appendChild(styleSheet);

  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
      styleSheet.remove(); // Clean up the added style sheet
    }
  }, 3000); // Notification lasts for 3 seconds (0.3s slideIn + 2.5s display + 0.5s fadeOut)
}
