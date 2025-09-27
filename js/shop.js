// Shop functionality with Supabase integration
class Shop {
  static async loadProducts() {
    try {
      const products = await ProductsAPI.getAll();
      this.displayProducts(products);
    } catch (error) {
      console.error('Error loading products:', error);
      // Fallback to show error message
      document.getElementById('shop').innerHTML = `
        <div class="titleshop">
          <h2>Our Products</h2>
          <p style="color: #8b0000;">Unable to load products. Please check your connection.</p>
        </div>
      `;
    }
  }

  static displayProducts(products) {
    const shopSection = document.getElementById('shop');
    if (!shopSection) return;

    // Group products by category
    const productsByCategory = {};
    products.forEach(product => {
      const categoryName = product.categories ? product.categories.name : 'Uncategorized';
      if (!productsByCategory[categoryName]) {
        productsByCategory[categoryName] = [];
      }
      productsByCategory[categoryName].push(product);
    });

    let html = `
      <div class="titleshop">
        <h2>Our Products</h2>
      </div>
    `;

    // Display products by category
    Object.keys(productsByCategory).forEach(categoryName => {
      html += `
        <div class="category-section" id="${categoryName.toLowerCase().replace(/\s+/g, '-')}">
          <h3>${categoryName}</h3>
          <div class="product-container">
      `;

      productsByCategory[categoryName].forEach(product => {
        const soldOutClass = !product.in_stock ? 'sold-out' : '';
        const imageUrl = product.image_url || 'https://via.placeholder.com/200x200?text=No+Image';
        
        html += `
          <div class="product-card ${soldOutClass}">
            <img src="${imageUrl}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/200x200?text=No+Image'">
            <h3>${product.name}</h3>
            <p>${product.description || ''}</p>
            <span class="price">₦${parseFloat(product.price).toLocaleString()}</span>
            ${product.in_stock ? 
              `<button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>` : 
              ''
            }
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    shopSection.innerHTML = html;

    // Re-attach cart event listeners
    this.attachCartListeners();
  }

  static attachCartListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', event => {
        const productElement = event.target.closest('.product-card');
        const productName = productElement.querySelector('h3').textContent;
        const productPrice = parseFloat(productElement.querySelector('.price').textContent.replace(/[^0-9.]/g, ''));

        const existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${productName} added to cart!`);
      });
    });
  }

  static async loadCategories() {
    try {
      const categories = await CategoriesAPI.getAll();
      this.updateNavigationDropdown(categories);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }

  static updateNavigationDropdown(categories) {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (!dropdownMenu) return;

    dropdownMenu.innerHTML = categories.map(category => {
      const categoryId = category.name.toLowerCase().replace(/\s+/g, '-');
      return `<a href="#${categoryId}" class="category-link">${category.name}</a>`;
    }).join('');
  }
}

// Initialize shop when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  Shop.loadProducts();
  Shop.loadCategories();
});