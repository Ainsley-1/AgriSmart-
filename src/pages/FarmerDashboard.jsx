import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import { analyticsService, orderService, productService } from '../services/apiService';
import '../styles/Dashboard.css';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes, productsRes] = await Promise.all([
          analyticsService.getFarmerStats(),
          orderService.getFarmerOrders(),
          productService.getFarmerProducts()
        ]);
        setStats(statsRes.data.data);
        setOrders(ordersRes.data.data.slice(0, 5));
        setProducts(productsRes.data.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, Farmer {user?.name}!</h1>
        <p>Your Farm Management Dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <p className="stat-label">Total Revenue</p>
            <h3 className="stat-value">${stats?.totalRevenue || '0.00'}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <p className="stat-label">Total Orders</p>
            <h3 className="stat-value">{stats?.totalOrders || 0}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🌾</div>
          <div className="stat-content">
            <p className="stat-label">Products Listed</p>
            <h3 className="stat-value">{stats?.totalProducts || 0}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <p className="stat-label">Avg Rating</p>
            <h3 className="stat-value">{stats?.averageRating || '0.0'}</h3>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-section">
        <h2>Recent Orders</h2>
        {orders.length > 0 ? (
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Buyer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.orderId}</td>
                    <td>{order.buyerId}</td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge status-${order.status}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <a href={`/order/${order._id}`} className="btn-small">
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-message">No orders yet</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <a href="/add-product" className="action-btn">
          <span>➕</span> Add Product
        </a>
        <a href="/my-products" className="action-btn">
          <span></span> My Products
        </a>
        <a href="/analytics" className="action-btn">
          <span>📊</span> Analytics
        </a>
      </div>
    </div>
  );
};

export default FarmerDashboard;
