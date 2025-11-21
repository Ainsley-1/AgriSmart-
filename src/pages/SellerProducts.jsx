import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/apiService';
import '../../styles/seller/SellerProducts.css';

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productService.getSellerProducts();
        setProducts(res.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(productId);
        setProducts(products.filter(p => p._id !== productId));
        alert('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product');
      }
    }
  };

  const filteredProducts = filter === 'all' 
    ? products 
    : filter === 'low-stock' 
    ? products.filter(p => p.quantity < 10)
    : products.filter(p => p.quantity === 0);

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="seller-products-container">
      <div className="page-header">
        <h1>Manage Your Products</h1>
        <Link to="/store/add-product" className="btn-primary">
          ➕ Add New Product
        </Link>
      </div>

      {/* Filters */}
      <div className="filter-tabs">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Products ({products.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'low-stock' ? 'active' : ''}`}
          onClick={() => setFilter('low-stock')}
        >
          Low Stock
        </button>
        <button 
          className={`filter-btn ${filter === 'out-of-stock' ? 'active' : ''}`}
          onClick={() => setFilter('out-of-stock')}
        >
          Out of Stock
        </button>
      </div>

      {/* Products Table */}
      {filteredProducts.length > 0 ? (
        <div className="products-table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Sales</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td className="product-name">{product.name}</td>
                  <td>{product.category}</td>
                  <td className="price">${product.price.toFixed(2)}</td>
                  <td>
                    <span className={`stock-badge ${product.quantity < 10 ? 'low' : ''} ${product.quantity === 0 ? 'out' : ''}`}>
                      {product.quantity}
                    </span>
                  </td>
                  <td>⭐ {product.rating}</td>
                  <td>{product.sales || 0}</td>
                  <td className="actions">
                    <Link to={`/store/edit-product/${product._id}`} className="btn-small">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn-small btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">
          <p>No products found</p>
          <Link to="/store/add-product" className="btn-primary">
            Add Your First Product
          </Link>
        </div>
      )}
    </div>
  );
};

export default SellerProducts;