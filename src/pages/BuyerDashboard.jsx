import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../utils/AuthContext';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import { dashboardService } from '../services/api';

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({});
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // For demo purposes - in real app, call the API
      // const [statsData, activitiesData] = await Promise.all([
      //   dashboardService.getStats(),
      //   dashboardService.getRecentActivities()
      // ]);
      
      // Mock data for demo
      const mockStats = user?.role === 'farmer' 
        ? { totalProducts: 12, availableProducts: 8, totalOrders: 25, pendingOrders: 3, totalRevenue: 1250.75 }
        : { totalOrders: 8, pendingOrders: 1, totalSpent: 450.50 };
      
      const mockActivities = [
        { _id: '1', orderDate: new Date(), totalAmount: 45.50, status: 'delivered', buyer: { name: 'John Doe' } },
        { _id: '2', orderDate: new Date(), totalAmount: 78.25, status: 'shipped', buyer: { name: 'Jane Smith' } }
      ];

      setStats(mockStats);
      setRecentActivities(mockActivities);
    } catch (error) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-4">
          <Container fluid>
            <h2 className="mb-4">Dashboard</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            {/* Stats Cards */}
            <Row className="mb-4">
              {user.role === 'farmer' ? (
                <>
                  <Col lg={3} md={6} className="mb-3">
                    <StatsCard
                      title="Total Products"
                      value={stats.totalProducts || 0}
                      icon="🌱"
                      variant="success"
                    />
                  </Col>
                  <Col lg={3} md={6} className="mb-3">
                    <StatsCard
                      title="Available Products"
                      value={stats.availableProducts || 0}
                      icon="📦"
                      variant="primary"
                    />
                  </Col>
                  <Col lg={3} md={6} className="mb-3">
                    <StatsCard
                      title="Total Orders"
                      value={stats.totalOrders || 0}
                      icon="📋"
                      variant="info"
                    />
                  </Col>
                  <Col lg={3} md={6} className="mb-3">
                    <StatsCard
                      title="Total Revenue"
                      value={`$${(stats.totalRevenue || 0).toFixed(2)}`}
                      icon="💰"
                      variant="warning"
                    />
                  </Col>
                </>
              ) : (
                <>
                  <Col lg={4} md={6} className="mb-3">
                    <StatsCard
                      title="Total Orders"
                      value={stats.totalOrders || 0}
                      icon="📦"
                      variant="success"
                    />
                  </Col>
                  <Col lg={4} md={6} className="mb-3">
                    <StatsCard
                      title="Pending Orders"
                      value={stats.pendingOrders || 0}
                      icon="⏳"
                      variant="warning"
                    />
                  </Col>
                  <Col lg={4} md={6} className="mb-3">
                    <StatsCard
                      title="Total Spent"
                      value={`$${(stats.totalSpent || 0).toFixed(2)}`}
                      icon="💰"
                      variant="info"
                    />
                  </Col>
                </>
              )}
            </Row>

            {/* Recent Activities */}
            <Row>
              <Col>
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">Recent Activities</h5>
                  </Card.Header>
                  <Card.Body>
                    {recentActivities.length === 0 ? (
                      <p className="text-muted">No recent activities</p>
                    ) : (
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Order ID</th>
                            {user.role === 'farmer' ? <th>Buyer</th> : <th>Status</th>}
                            <th>Amount</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentActivities.map(activity => (
                            <tr key={activity._id}>
                              <td>{new Date(activity.orderDate).toLocaleDateString()}</td>
                              <td>#{activity._id}</td>
                              <td>
                                {user.role === 'farmer' 
                                  ? activity.buyer?.name 
                                  : activity.status
                                }
                              </td>
                              <td>${activity.totalAmount}</td>
                              <td>
                                <span className={`badge ${
                                  activity.status === 'delivered' ? 'bg-success' :
                                  activity.status === 'pending' ? 'bg-warning' :
                                  'bg-secondary'
                                }`}>
                                  {activity.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;