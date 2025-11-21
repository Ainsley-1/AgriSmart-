import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Alert, Spinner, Badge } from 'react-bootstrap';
import { useAuth } from '../utils/AuthContext';
import Sidebar from '../components/Sidebar';

function MyProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock data for demo
    const mockProducts = [
      {
        _id: '1',
        name: 'Organic Tomatoes',
        description: 'Fresh organic tomatoes from our farm',
        price: 3.99,
        category: 'vegetables',
        quantity: 50,
        unit: 'kg',
        isOrganic: true,
        isAvailable: true,
        farmer: { _id: user?.id, name: user?.name }
      },
      {
        _id: '2',
        name: 'Fresh Carrots',
        description: 'Sweet and crunchy carrots',
        price: 2.50,
        category: 'vegetables',
        quantity: 30,
        unit: 'kg',
        isOrganic: false,
        isAvailable: true,
        farmer: { _id: user?.id, name: user?.name }
      }
    ];
    setProducts(mockProducts);
  }, [user]);

  if (user?.role !== 'farmer') {
    return (
      <Container className="text-center py-5">
        <Alert variant="warning">Access denied. This page is for farmers only.</Alert>
      </Container>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-4">
          <Container fluid>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>My Products</h2>
              <Button variant="success" as="a" href="/add-product">
                + Add New Product
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="success" />
              </div>
            ) : (
              <Card>
                <Card.Body>
                  {products.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-muted">No products found.</p>
                      <Button variant="success" as="a" href="/add-product">
                        Add Your First Product
                      </Button>
                    </div>
                  ) : (
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product._id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div 
                                  className="bg-light rounded me-3 d-flex align-items-center justify-content-center"
                                  style={{ width: '50px', height: '50px' }}
                                >
                                  
                                </div>
                                <div>
                                  <strong>{product.name}</strong>
                                  {product.isOrganic && <Badge bg="success" className="ms-2">Organic</Badge>}
                                  <br />
                                  <small className="text-muted">{product.description}</small>
                                </div>
                              </div>
                            </td>
                            <td>{product.category}</td>
                            <td>${product.price}/{product.unit}</td>
                            <td>{product.quantity}</td>
                            <td>
                              <span className={`badge ${
                                product.isAvailable ? 'bg-success' : 'bg-danger'
                              }`}>
                                {product.isAvailable ? 'Available' : 'Sold Out'}
                              </span>
                            </td>
                            <td>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card.Body>
              </Card>
            )}
          </Container>
        </div>
      </div>
    </div>
  );
}

export default MyProducts;