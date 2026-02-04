import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Cart from './components/Cart';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [API_URL]);

  const addToCart = (product) => {
    // Show notification
    setNotification(`✅ ${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 2000);
    setCart([...cart, { ...product, id: Math.random() }]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="App">
      {notification && <div className="notification">{notification}</div>}
      <Header 
        cartCount={cart.length} 
        onCartClick={() => setShowCart(!showCart)}
        showCart={showCart}
      />
      
      {showCart ? (
        <Cart 
          cartItems={cart}
          onRemove={removeFromCart}
          onClear={clearCart}
          onContinueShopping={() => setShowCart(false)}
        />
      ) : (
        <>
          <Hero />
          {loading && <div className="loading">Loading products...</div>}
          {error && <div className="error">{error}</div>}
          {!loading && !error && (
            <Products 
              products={products}
              onAddToCart={addToCart}
            />
          )}
          <Contact />
        </>
      )}
      
      <Footer />
    </div>
  );
}

export default App;
