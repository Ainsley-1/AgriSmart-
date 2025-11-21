import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { orderService } from '../services/apiService';
import '../styles/OrderTracking.css';

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await orderService.getOrderById(id);
        setOrder(res.data.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div className="loading">Loading order...</div>;
  if (!order) return <div className="error">Order not found</div>;

  const statuses = ['pending', 'confirmed', 'shipped', 'delivered'];
  const currentStatusIndex = statuses.indexOf(order.status);

  return (
    <div className="tracking-container">
      <h1>Order Tracking</h1>
      <div className="order-header">
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Status:</strong> <span className={`status-${order.status}`}>{order.status}</span></p>
      </div>

      {/* Timeline */}
      <div className="timeline">
        {statuses.map((status, index) => (
          <div
            key={status}
            className={`timeline-item ${index <= currentStatusIndex ? 'completed' : ''}`}
          >
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <h3>{status.charAt(0).toUpperCase() + status.slice(1)}</h3>
              {index <= currentStatusIndex && (
                <p>{new Date().toLocaleDateString()}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Order Details */}
      <div className="order-details">
        <div className="details-section">
          <h2>Delivery Information</h2>
          <p><strong>Address:</strong> {order.deliveryAddress.street}, {order.deliveryAddress.city}</p>
          <p><strong>Estimated Delivery:</strong> {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
          <p><strong>Delivery Type:</strong> {order.deliveryType}</p>
        </div>

        <div className="details-section">
          <h2>Items</h2>
          {order.items.map((item, index) => (
            <div key={index} className="item-detail">
              <p><strong>{item.productName}</strong> x {item.quantity}</p>
              <p>${item.subtotal.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="details-section">
          <h2>Order Summary</h2>
          <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;