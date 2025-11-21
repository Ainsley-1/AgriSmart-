import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/AuthContext';
import { analyticsService, orderService, productService } from '../../services/apiService';
import '../../styles/seller/SellerDashboard.css';

const SellerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, ordersRes, productsRes] = await Promise.all([
          analyticsService.getSellerStats(),
          orderService.getSellerOrders(),
          productService.getSellerProducts()
        ]);
        setStats(statsRes.data.data);
        setRecentOrders(ordersRes.data.data.slice(0, 5));
        setTopProducts(productsRes.data.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching seller data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading store dashboard...</div>;

  return (
    <div className="seller-dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to Your Store, {user?.name}! 🏪</h1>
        <p>Manage your products and track your sales</p>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <p className="metric-label">Total Revenue</p>
            <h3 className="metric-value">${stats?.totalRevenue || '0.00'}</h3>
            <span className="metric-change">+12% this month</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">📦</div>
          <div className="metric-content">
            <p className="metric-label">Total Orders</p>
            <h3 className="metric-value">{stats?.totalOrders || 0}</h3>
            <span className="metric-change">+5 this week</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <p className="metric-label">Active Products</p>
            <h3 className="metric-value">{stats?.totalProducts || 0}</h3>
            <span className="metric-change">2 need restocking</span>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">⭐</div>
          <div className="metric-content">
            <p className="metric-label">Store Rating</p>
            <h3 className="metric-value">{stats?.averageRating || '0.0'}</h3>
            <span className="metric-change">Based on {stats?.reviewCount || 0} reviews</span>
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h2>Recent Orders</h2>
          {recentOrders.length > 0 ? (
            <div className="orders-list">
              {recentOrders.map((order) => (
                <div key={order._id} className="order-item">
                  <div className="order-info">
                    <p className="order-id">{order.orderId}</p>
                    <p className="order-customer">Customer: {order.buyerId}</p>
                  </div>
                  <div className="order-amount">${order.totalAmount.toFixed(2)}</div>
                  <span className={`status-badge status-${order.status}`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-message">No orders yet</p>
          )}
        </div>

        <div className="dashboard-section">
          <h2>Top Selling Products</h2>
          {topProducts.length > 0 ? (
            <div className="products-list">
              {topProducts.map((product, index) => (
                <div key={product._id} className="product-item">
                  <span className="rank">#{index + 1}</span>
                  <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                  </div>
                  <span className="product-rating">⭐ {product.rating}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-message">No products yet</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <a href="/store/add-product" className="action-btn">
          <span>➕</span> Add New Product
        </a>
        <a href="/store/products" className="action-btn">
          <span>📦</span> Manage Products
        </a>
        <a href="/store/orders" className="action-btn">
          <span>🎯</span> View All Orders
        </a>
        <a href="/store/analytics" className="action-btn">
          <span>📊</span> View Analytics
        </a>
      </div>
    </div>
  );
};

export default SellerDashboard;