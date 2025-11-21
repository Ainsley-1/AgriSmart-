import React, { useState, useEffect } from 'react';
import { analyticsService } from '../services/apiService';
import '../styles/Analytics.css';

const FarmerAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await analyticsService.getFarmerStats();
        setStats(res.data.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="loading">Loading analytics...</div>;
  if (!stats) return <div className="error">Failed to load analytics</div>;

  return (
    <div className="analytics-container">
      <h1>Sales Analytics</h1>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Revenue</h3>
          <p className="metric-value">${stats.totalRevenue}</p>
        </div>
        <div className="metric-card">
          <h3>Total Orders</h3>
          <p className="metric-value">{stats.totalOrders}</p>
        </div>
        <div className="metric-card">
          <h3>Products Listed</h3>
          <p className="metric-value">{stats.totalProducts}</p>
        </div>
        <div className="metric-card">
          <h3>Average Rating</h3>
          <p className="metric-value">⭐ {stats.averageRating}</p>
        </div>
      </div>

      {/* Monthly Revenue */}
      <div className="chart-section">
        <h2>Monthly Revenue</h2>
        <div className="revenue-list">
          {stats.monthlyRevenue && stats.monthlyRevenue.map((item, index) => (
            <div key={index} className="revenue-item">
              <span>{item.month}</span>
              <div className="revenue-bar">
                <div
                  className="bar-fill"
                  style={{
                    width: `${(parseFloat(item.revenue) / 1000) * 100}%`
                  }}
                ></div>
              </div>
              <span>${item.revenue}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className="chart-section">
        <h2>Top Selling Products</h2>
        <div className="top-products">
          {stats.topProducts && stats.topProducts.map((product, index) => (
            <div key={index} className="product-item">
              <span className="rank">#{index + 1}</span>
              <span className="name">{product.productName}</span>
              <span className="sales">{product.sales} sold</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerAnalytics;
