import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  const topProducts = [
  {
    id: 1,
    name: "Seasonal Baskets",
    price: "KSh 550",
    image: "https://images.pexels.com/photos/1268101/pexels-photo-1268101.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
    description: "Fresh seasonal vegetables in a basket"
  },
  {
    id: 2,
    name: "Fruits & Veggies",
    price: "KSh 200",
    image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
    description: "Fresh organic fruits and vegetables"
  },
  {
    id: 3,
    name: "Fresh Meats",
    price: "KSh 700",
    image: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
    description: "Premium quality fresh meats"
  },
  {
    id: 4,
    name: "Dairy Products",
    price: "KSh 600",
    image: "https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop",
    description: "Farm-fresh dairy products"
  }
];


  return (
    <div className="home-page">
      
   {/* Hero Section */}
      
  <section className="hero-section" style={{
  backgroundImage: 'url(https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=1920)'
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh'
  }}>
      
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1
  }}></div>
  <Container style={{ position: 'relative', zIndex: 2 }}>
    <Row className="align-items-center" style={{ minHeight: '100vh' }}>
      <Col lg={8}>
        <div className="hero-content">
          <h1 className="display-3 fw-bold mb-4">
            Fresh Farm Produce, Direct to You
          </h1>
          <p className="lead mb-4">
            Connect directly with local farmers. Get the freshest, most nutritious produce 
            delivered straight to your doorstep. Support local agriculture while enjoying 
            premium quality food.
          </p>
          <div className="d-flex gap-3 flex-wrap">
            <Button
              as={Link}
              to="/register"
              size="lg"
              className="btn-primary-pro"
            >
              Get Started Free
            </Button>
            <Button
              as={Link}
              to="/products"
              size="lg"
              variant="outline-light"
              className="btn-outline-pro"
            >
              Browse Products
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
</section>

    {/* Features Section */}
     <section id="why-choose" className="py-5 bg-white">
        <Container>
          <h2 className="text-center mb-5 fw-bold">Why Choose AgriSmart?</h2>
          <p className="text-center text-muted mb-5">
            Experience the future of farm-to-table shopping
          </p>
          <Row className="g-4">
            <Col md={4}>
              <div className="pro-card p-4 text-center h-100">
                <div className="pro-icon mb-3">
                  <img 
                    src="https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
                    alt="Farm Fresh Quality" 
                    style={{ width: '90%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
                <h3 className="h5 fw-bold mb-3">Farm Fresh Quality</h3>
                <p className="text-muted">
                  Produce harvested at peak freshness, packed with flavor and nutrients.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="pro-card p-4 text-center h-100">
                <div className="pro-icon mb-3">
                  <img 
                    src="https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
                    alt="Direct Connection" 
                    style={{ width: '90%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
                <h3 className="h5 fw-bold mb-3">Direct Connection</h3>
                <p className="text-muted">
                  Buy directly from farmers, ensuring fair prices and quality products.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="pro-card p-4 text-center h-100">
                <div className="pro-icon mb-3">
                  <img 
                    src="https://images.pexels.com/photos/6169659/pexels-photo-6169659.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop"
                    alt="Fast Delivery" 
                    style={{ width: '90%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
                <h3 className="h5 fw-bold mb-3">Fast Delivery</h3>
                <p className="text-muted">
                  Quick and reliable delivery from farm to your doorstep.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    {/* Top Products Section */}

    <section id="top-products" className="py-5" style={{ background: "#f8f9fa" }}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2">
              <span style={{ borderLeft: "4px solid #22c55e", paddingLeft: "15px" }}>
                Top Products
              </span>
            </h2>
          </div>
          <Row className="g-4">
            {topProducts.map((product) => (
              <Col key={product.id} sm={6} lg={3}>
                <Card className="h-100 border-0 shadow-sm product-card-hover">
                  <div
                    style={{
                      height: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#f3f4f6",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/500x500/10b981/ffffff?text=No+Image";
                      }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title className="h5 mb-2">{product.name}</Card.Title>
                    <Card.Text className="text-muted small mb-3">
                      {product.description}
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <span
                        className="fw-bold"
                        style={{ color: "#22c55e", fontSize: "1.1rem" }}
                      >
                        {product.price}
                      </span>
                      <Button
                        as={Link}
                        to="/products"
                        size="sm"
                        style={{
                          background: "#22c55e",
                          border: "none",
                          borderRadius: "20px",
                          padding: "8px 20px"
                        }}
                      >
                        View →
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Our Story Section */}
     
      <section id="our-story" className="our-story-section" style={{
       backgroundImage: 'url(https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=1920)',
       backgroundSize: 'cover',
       backgroundPosition: 'center',
       backgroundRepeat: 'no-repeat'
       }}>
        {/* Dark overlay for better text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }}></div>
        
        <Container style={{ position: 'relative', zIndex: 2 }}>
          <Row className="align-items-center" style={{ minHeight: '600px' }}>
            <Col lg={6}>
              <div className="story-content">
                <h2 className="display-4 fw-bold mb-4 text-white">
                  Handpicked,<br />
                  Home Delivered,<br />
                  Organic Food<br />
                  <span style={{ color: "#16dd5fff" }}>Since 2024.</span>
                </h2>
              </div>
            </Col>
            <Col lg={6}>
              <div className="story-text text-white">
                <p className="mb-4">
                  Thank you for choosing AgriSmart, your trusted source for handpicked, 
                  home-delivered, organic food. Since our establishment in 2024, we have 
                  been dedicated to providing our customers with the finest organic products 
                  available in Kenya.
                </p>
                <p className="mb-4">
                  As a family-owned business, we take great pride in our extensive experience 
                  and expertise in the organic food industry. We firmly believe that organic 
                  food goes beyond just what you consume—it encompasses the entire process 
                  of cultivation.
                </p>
                <p className="mb-4">
                  That's why we practice agroecology, a sustainable farming approach that 
                  focuses on enhancing food yields while preserving the environment.
                </p>
                <Button 
                  as={Link}
                  to="/about"
                  size="lg"
                  className="px-5"
                  style={{
                    background: "#22c55e",
                    border: "none",
                    borderRadius: "50px",
                    fontWeight: "600",
                    color: "#ffffff"
                  }}
                >
                  Our Full Story
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
     <section id="get-in-touch" className="py-5 bg-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="fw-bold mb-4">Get In Touch</h2>
              <p className="text-muted mb-4">
                Have questions about our products or services? We'd love to hear from you!
              </p>
              <div className="mb-3">
                <strong style={{ color: "#22c55e" }}>📍 Location:</strong>
                <p className="mb-2">Nairobi, Kenya</p>
              </div>
              <div className="mb-3">
                <strong style={{ color: "#22c55e" }}>📞 Phone:</strong>
                <p className="mb-2">+254 700 000 000</p>
              </div>
              <div className="mb-3">
                <strong style={{ color: "#22c55e" }}>✉️ Email:</strong>
                <p className="mb-2">info@agrismart.co.ke</p>
              </div>
              <div className="mb-3">
                <strong style={{ color: "#22c55e" }}>🕐 Hours:</strong>
                <p className="mb-2">Monday - Saturday: 8:00 AM - 6:00 PM</p>
              </div>
            </Col>
            <Col lg={6}>
              <div className="p-4 rounded-3" style={{ background: "#f8f9fa" }}>
                <h4 className="mb-4">Send us a message</h4>
                <form>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Your Name"
                      style={{ borderRadius: "10px", padding: "12px" }}
                    />
                  </div>
                  <div className="mb-3">
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Your Email"
                      style={{ borderRadius: "10px", padding: "12px" }}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea 
                      className="form-control" 
                      rows="4" 
                      placeholder="Your Message"
                      style={{ borderRadius: "10px", padding: "12px" }}
                    ></textarea>
                  </div>
                  <Button 
                    type="submit"
                    style={{ 
                      background: "#22c55e", 
                      border: "none",
                      borderRadius: "10px",
                      padding: "12px 40px",
                      fontWeight: "600"
                    }}
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{ background: "#f8f9fa" }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h2 className="fw-bold mb-3">Ready to get started?</h2>
              <p className="text-muted mb-0">
                Join thousands of satisfied customers enjoying fresh farm produce.
              </p>
            </Col>
            <Col lg={4} className="text-lg-end mt-3 mt-lg-0">
              <Button
                as={Link}
                to="/register"
                size="lg"
                style={{ background: "#22c55e", border: "none", borderRadius: "10px" }}
              >
                Sign Up Now
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Home;
