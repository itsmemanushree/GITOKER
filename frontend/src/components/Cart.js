import React from 'react';
import './Cart.css';

function Cart({ cartItems, onRemove, onClear, onContinueShopping }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert(`Proceeding to checkout with ${cartItems.length} item(s) totaling ₹${total.toLocaleString('en-IN')}\n\nOrder placed successfully! Thank you for shopping at SkinGlow! 🎉`);
    onClear();
  };

  return (
    <section className="cart">
      <div className="container">
        <h2>Shopping Cart</h2>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button 
              className="continue-shopping"
              onClick={onContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <span className="item-letter">{item.letter}</span>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => onRemove(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h3>Total: ₹{total.toLocaleString('en-IN')}</h3>
              <button 
                className="checkout-btn"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              <button 
                className="continue-shopping-btn"
                onClick={onContinueShopping}
              >
                Continue Shopping
              </button>
              <button className="clear-btn" onClick={onClear}>Clear Cart</button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Cart;
