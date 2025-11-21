import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tab, Tabs } from 'react-bootstrap';
import { useAuth } from '../utils/AuthContext';
import Sidebar from '../components/Sidebar';

function Profile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    farmName: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || {
          street: '',
          city: '',
          state: '',
          zipCode: ''
        },
        farmName: user.farmName || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setProfileData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      setTimeout(() => {
        setMessage('Profile updated successfully!');
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMessage('Failed to update profile');
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-4">
          <Container fluid>
            <h2 className="mb-4">My Profile</h2>
            
            <Row>
              <Col lg={8}>
                <Card>
                  <Card.Body>
                    <Tabs defaultActiveKey="profile" className="mb-4">
                      <Tab eventKey="profile" title="Profile Information">
                        {message && (
                          <Alert variant="success" dismissible onClose={() => setMessage('')}>
                            {message}
                          </Alert>
                        )}
                        
                        <Form onSubmit={handleSubmit}>
                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Full Name *</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="name"
                                  value={profileData.name}
                                  onChange={handleChange}
                                  required
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Email *</Form.Label>
                                <Form.Control
                                  type="email"
                                  name="email"
                                  value={profileData.email}
                                  onChange={handleChange}
                                  required
                                  disabled
                                />
                                <Form.Text className="text-muted">
                                  Email cannot be changed
                                </Form.Text>
                              </Form.Group>
                            </Col>
                          </Row>

                          <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              type="tel"
                              name="phone"
                              value={profileData.phone}
                              onChange={handleChange}
                              placeholder="+1 (555) 123-4567"
                            />
                          </Form.Group>

                          {user?.role === 'farmer' && (
                            <Form.Group className="mb-3">
                              <Form.Label>Farm Name *</Form.Label>
                              <Form.Control
                                type="text"
                                name="farmName"
                                value={profileData.farmName}
                                onChange={handleChange}
                                required
                                placeholder="Your Farm Name"
                              />
                            </Form.Group>
                          )}

                          <h6 className="mt-4 mb-3">Address Information</h6>
                          <Row>
                            <Col md={12}>
                              <Form.Group className="mb-3">
                                <Form.Label>Street Address</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="address.street"
                                  value={profileData.address.street}
                                  onChange={handleChange}
                                  placeholder="123 Main St"
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="address.city"
                                  value={profileData.address.city}
                                  onChange={handleChange}
                                  placeholder="City"
                                />
                              </Form.Group>
                            </Col>
                            <Col md={3}>
                              <Form.Group className="mb-3">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="address.state"
                                  value={profileData.address.state}
                                  onChange={handleChange}
                                  placeholder="State"
                                />
                              </Form.Group>
                            </Col>
                            <Col md={3}>
                              <Form.Group className="mb-3">
                                <Form.Label>ZIP Code</Form.Label>
                                <Form.Control
                                  type="text"
                                  name="address.zipCode"
                                  value={profileData.address.zipCode}
                                  onChange={handleChange}
                                  placeholder="12345"
                                />
                              </Form.Group>
                            </Col>
                          </Row>

                          <div className="d-flex justify-content-end">
                            <Button 
                              variant="success" 
                              type="submit" 
                              disabled={loading}
                            >
                              {loading ? 'Updating...' : 'Update Profile'}
                            </Button>
                          </div>
                        </Form>
                      </Tab>

                      <Tab eventKey="security" title="Security">
                        <Card>
                          <Card.Body>
                            <h6>Change Password</h6>
                            <Form>
                              <Form.Group className="mb-3">
                                <Form.Label>Current Password</Form.Label>
                                <Form.Control type="password" />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Label>Confirm New Password</Form.Label>
                                <Form.Control type="password" />
                              </Form.Group>
                              <Button variant="success">Update Password</Button>
                            </Form>
                          </Card.Body>
                        </Card>
                      </Tab>
                    </Tabs>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4}>
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">Account Summary</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="text-center mb-4">
                      <div 
                        className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center text-white mb-3"
                        style={{ width: '80px', height: '80px', fontSize: '2rem' }}
                      >
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <h5>{user?.name}</h5>
                      <p className="text-muted">{user?.email}</p>
                      <span className={`badge ${
                        user?.role === 'farmer' ? 'bg-success' : 'bg-primary'
                      }`}>
                        {user?.role?.toUpperCase()}
                      </span>
                    </div>
                    
                    <hr />
                    
                    <div className="small">
                      <p><strong>Member since:</strong><br />
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                      
                      {user?.role === 'farmer' && (
                        <p><strong>Farm:</strong><br />{user?.farmName || 'Not specified'}</p>
                      )}
                      
                      <p><strong>Phone:</strong><br />{user?.phone || 'Not provided'}</p>
                    </div>
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

export default Profile;