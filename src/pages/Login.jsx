import React, { useState } from 'react';
import { Form, Button, Card, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      
      // For demo - in real app, use actual API call
      // await login(formData.email, formData.password);
      
      // Mock login for demo
      const mockUser = {
        id: '1',
        name: 'Demo User',
        email: formData.email,
        role: formData.email.includes('farmer') ? 'farmer' : 'buyer'
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'demo-token');
      
      login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
    }
    setLoading(false);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                  />
                </Form.Group>
                <Button 
                  disabled={loading} 
                  className="w-100" 
                  type="submit"
                  variant="success"
                >
                  {loading ? 'Logging in...' : 'Log In'}
                </Button>
              </Form>
              <div className="text-center mt-3">
                <Link to="/register">Need an account? Sign up</Link>
              </div>
              <div className="mt-3 p-3 bg-light rounded">
                <small className="text-muted">
                  <strong>Demo credentials:</strong><br/>
                  Farmer: farmer@demo.com / any password<br/>
                  Buyer: buyer@demo.com / any password
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;