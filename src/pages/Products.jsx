import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = ["All Categories", "Vegetables", "Fruits", "Grains", "Dairy", "Organic"];

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, minPrice, maxPrice]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = "http://localhost:5000/api/products?";
      
      if (selectedCategory !== "All Categories") {
        url += `category=${selectedCategory}&`;
      }
      if (minPrice) {
        url += `minPrice=${minPrice}&`;
      }
      if (maxPrice) {
        url += `maxPrice=${maxPrice}&`;
      }
      if (searchTerm) {
        url += `search=${searchTerm}&`;
      }

      const response = await axios.get(url);
      setProducts(response.data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-container">
      <Container>
        <h1 className="mb-4">Fresh Farm Produce</h1>

        {/* Filters Section */}
        <Form onSubmit={handleSearch}>
          <Row className="filters-section mb-4">
            <Col md={4} className="mb-3 mb-md-0">
              <Form.Control
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="filter-input"
              />
            </Col>
            <Col md={3} className="mb-3 mb-md-0">
              <Form.Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={2} className="mb-3 mb-md-0">
              <Form.Control
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="filter-input"
              />
            </Col>
            <Col md={2} className="mb-3 mb-md-0">
              <Form.Control
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="filter-input"
              />
            </Col>
            <Col md={1}>
              <Button
                type="submit"
                style={{
                  background: "#22c55e",
                  border: "none",
                  width: "100%",
                }}
              >
                Filter
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" style={{ color: "#22c55e" }} />
            <p className="mt-3">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-5">
            <h3 className="text-muted">No products found</h3>
            <p className="text-muted">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <p className="text-muted mb-4">
              Showing {filteredProducts.length} product(s)
            </p>

            {/* Products Grid */}
            <Row className="products-grid g-4">
              {filteredProducts.map((product) => (
                <Col key={product._id} sm={6} md={4} lg={3}>
                  <Card className="product-card h-100 border-0 shadow-sm">
                    <div className="product-image">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                          }}
                        />
                      ) : (
                        <div className="placeholder">No Image Available</div>
                      )}
                    </div>
                    <Card.Body className="product-info">
                      <div className="product-meta mb-2">
                        <span className="category">{product.category}</span>
                        {product.rating > 0 && (
                          <span className="rating ms-2">⭐ {product.rating}</span>
                        )}
                      </div>
                      <h3 className="h5 mb-2">{product.name}</h3>
                      <p className="description text-muted small">
                        {product.description}
                      </p>
                      {product.farmer && (
                        <p className="farmer-name">
                          By: {product.farmer.name || "Local Farmer"}
                        </p>
                      )}
                      <div className="product-footer mt-auto">
                        <div>
                          <span className="price">KSh {product.price}</span>
                          <span className="text-muted small d-block">
                            per {product.unit}
                          </span>
                        </div>
                        <Button
                          as={Link}
                          to={`/products/${product._id}`}
                          className="btn-add-cart"
                        >
                          View Details
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}

export default Products;
