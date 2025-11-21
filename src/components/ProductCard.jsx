import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useAuth } from '../utils/AuthContext';

function ProductCard({ product, onEdit, onDelete }) {
  const { user } = useAuth();

  const isOwner = user && user.id === product.farmer._id;

  return (
    <Card className="h-100 product-card">
      <Card.Img 
        variant="top" 
        src={product.image || '/default-product.jpg'} 
        style={{ height: '200px', objectFit: 'cover' }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x200/198754/ffffff?text=';
        }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title>{product.name}</Card.Title>
          {product.isOrganic && <Badge bg="success">Organic</Badge>}
        </div>
        <Card.Text className="text-muted small">
          By: {product.farmer.farmName || product.farmer.name}
        </Card.Text>
        <Card.Text className="flex-grow-1">
          {product.description}
        </Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong className="text-success h5">${product.price}/{product.unit}</strong>
            <span className="text-muted">Qty: {product.quantity}</span>
          </div>
          <div className="d-flex gap-2">
            <Button variant="success" className="flex-fill">
              Add to Cart
            </Button>
            {isOwner && (
              <>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  onClick={() => onEdit && onEdit(product)}
                >
                  Edit
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={() => onDelete && onDelete(product._id)}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;