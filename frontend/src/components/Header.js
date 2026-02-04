import React from 'react';
import './Header.css';

function Header({ cartCount, onCartClick, showCart }) {
  const handleHomeClick = (e) => {
    e.preventDefault();
    if (showCart) {
      onCartClick();
    } else {
      window.location.hash = '#home';
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">SkinGlow</div>
        <nav className="nav">
          <a href="#home" onClick={handleHomeClick}>Home</a>
          <a href="#products">Products</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="cart-btn" onClick={onCartClick}>
          🛒 Cart ({cartCount})
        </button>
      </div>
    </header>
  );
}

export default Header;
