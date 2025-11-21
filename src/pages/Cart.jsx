import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartService } from '../services/apiService';
import '../styles/Cart.css';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await cartService.getCart();
        setCart(res.data.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      const res = await cartService.updateCartItem(productId, quantity);
      setCart(res.data.data);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const res = await cartService.removeFromCart(productId);
      setCart(res.data.data);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) return <div className="loading">Loading cart...</div>;

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {cart && cart.items.length > 0 ? (
        <div className="cart-content">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item.productId} className="cart-item">
                <div className="item-details">
                  <h3>{item.productId?.name}</h3>
                  <p className="farmer">From: {item.farmerName}</p>
                  <p className="price">${item.price.toFixed(2)} each</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>+</button>
                </div>
                <div className="item-subtotal">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.productId)}
                  className="btn-remove"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${cart.totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${cart.totalPrice.toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} className="btn-checkout">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <a href="/products" className="btn-continue-shopping">
            Continue Shopping
          </a>
        </div>
      )}
    </div>
  );
};

export default Cart;