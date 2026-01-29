import React from 'react';
import './Products.css';

function Products({ products, onAddToCart }) {
  return (
    <section id="products" className="products">
      <div className="container">
        <h2>Our Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <span className="letter-badge">{product.letter}</span>
              </div>
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <p className="price">₹{product.price.toLocaleString('en-IN')}</p>
              <button 
                className="add-btn"
                onClick={() => onAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
