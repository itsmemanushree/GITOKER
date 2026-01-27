// Product data
const products = [
    {
        id: 1,
        name: "Vitamin C Serum",
        description: "Brightening serum with pure vitamin C",
        price: 399,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Hyaluronic Acid",
        description: "Deep hydration moisturizer",
        price: 299,
        image: "https://media.istockphoto.com/id/2164992982/photo/hyaluronic-acid-skin-solutions.webp?a=1&b=1&s=612x612&w=0&k=20&c=2tDyfbL-vnVbwUwKPQ9jVJLPfEPmI5RUKOcs8uBC7I8="
    },
    {
        id: 3,
        name: "Retinol Night Cream",
        description: "Anti-aging night treatment",
        price: 499,
        image: "https://cdn11.bigcommerce.com/s-ilgxsy4t82/images/stencil/1280x1280/products/119641/277234/81nnxUB60-L__56832.1666593451.jpg?c=1&imbypass=on"
    },
    {
        id: 4,
        name: "Green Tea Cleanser",
        description: "Gentle purifying cleanser",
        price: 249,
        image: "https://images.unsplash.com/photo-1556228481-8f08a92f51c2?w=300&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Sunscreen SPF 50",
        description: "Broad spectrum UV protection",
        price: 349,
        image: "https://images.unsplash.com/photo-1556228881-4f3b5e3b0d82?w=300&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Face Mask",
        description: "Weekly detoxifying treatment",
        price: 299,
        image: "https://images.unsplash.com/photo-1556228552-8ac94f5e5df0?w=300&h=300&fit=crop"
    }
];

// Shopping cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load products on page load
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
});

// Display products
function displayProducts() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">₹${product.price}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})" id="btn-${product.id}">
                    Add to Cart
                </button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartCount();
    
    // Update button
    const btn = document.getElementById(`btn-${productId}`);
    btn.textContent = 'Added!';
    btn.classList.add('added');
    setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.classList.remove('added');
    }, 1500);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    displayCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Toggle cart modal
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('show');
    if (modal.classList.contains('show')) {
        displayCart();
    }
}

// Display cart items
function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        document.querySelector('.checkout-btn').disabled = true;
        return;
    }

    document.querySelector('.checkout-btn').disabled = false;
    cartItemsDiv.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        const itemTotal = (item.price * item.quantity);
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price} x ${item.quantity} = ₹${itemTotal}</div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsDiv.appendChild(cartItem);
    });

    updateTotalPrice();
}

// Update total price
function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total-price').textContent = total;
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Order placed successfully! Total: ₹${total}\n\nThank you for your purchase!`);
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartCount();
    displayCart();
    toggleCart();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target === modal) {
        modal.classList.remove('show');
    }
}
