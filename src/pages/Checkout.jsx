import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService, cartService } from '../services/apiService';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    deliveryType: 'standard'
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        deliveryAddress: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        deliveryType: formData.deliveryType
      };

      const res = await orderService.createOrder(orderData);
      alert('Order created successfully!');
      navigate(`/order/${res.data.data._id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error creating order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-section">
          <h2>Delivery Address</h2>
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={formData.street}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-section">
          <h2>Delivery Options</h2>
          <select
            name="deliveryType"
            value={formData.deliveryType}
            onChange={handleInputChange}
          >
            <option value="standard">Standard (5 days) - Free</option>
            <option value="express">Express (2 days) - $10</option>
            <option value="same-day">Same Day - $25</option>
          </select>
        </div>

        <button type="submit" disabled={loading} className="btn-submit">
          {loading ? 'Processing...' : 'Complete Order'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;