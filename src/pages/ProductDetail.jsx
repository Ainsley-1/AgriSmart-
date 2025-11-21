import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { productService, cartService } from '../services/apiService';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productService.getProductById(id);
        setProduct(res.data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await cartService.addToCart(id, quantity);
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      await productService.addReview(id, newReview);
      setNewReview({ rating: 5, comment: '' });
      alert('Review added!');
      // Refresh product
      const res = await productService.getProductById(id);
      setProduct(res.data.data);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  if (loading) return <div className="loading">Loading product...</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail-container">
      <div className="product-main">
        <div className="product-image">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="placeholder">No Image</div>
          )}
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="farmer-info">
            By <strong>{product.farmerName}</strong> from {product.farmerLocation}
          </p>

          <div className="rating">
            <span>⭐ {product.rating} ({product.reviews?.length || 0} reviews)</span>
          </div>

          <p className="description">{product.description}</p>

          <div className="product-meta">
            <span className="category">{product.category}</span>
            {product.isCertified && <span className="certified">✓ Certified Organic</span>}
          </div>

          <div className="price-section">
            <h2 className="price">${product.price.toFixed(2)}</h2>
            <p className="availability">
              {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
            </p>
          </div>

          {product.quantity > 0 && (
            <div className="purchase-section">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} min="1" />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button onClick={handleAddToCart} className="btn-add-cart">
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h2>Customer Reviews</h2>

        {user && (
          <form onSubmit={handleAddReview} className="review-form">
            <h3>Add Your Review</h3>
            <div className="form-group">
              <label>Rating</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
              >
                <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                <option value="4">⭐⭐⭐⭐ Good</option>
                <option value="3">⭐⭐⭐ Average</option>
                <option value="2">⭐⭐ Poor</option>
                <option value="1">⭐ Very Poor</option>
              </select>
            </div>
            <div className="form-group">
              <label>Comment</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Share your experience..."
                rows="4"
              />
            </div>
            <button type="submit" className="btn-submit">Submit Review</button>
          </form>
        )}

        <div className="reviews-list">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                  <strong>{review.userName}</strong>
                  <span className="rating">{'⭐'.repeat(review.rating)}</span>
                </div>
                <p>{review.comment}</p>
                <small>{new Date(review.createdAt).toLocaleDateString()}</small>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;