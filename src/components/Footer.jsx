import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ background: "#237a3aff", color: "white", padding: "4rem 0 2rem" }}>
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-4 mb-md-0">
            <h4 className="mb-3" style={{ color: "#ffffffff", fontWeight: "700" }}>
              AgriSmart
            </h4>
            <p style={{ color: "#d1d5db" }}>
              Connecting farmers with buyers for fresh, organic produce delivered straight to your doorstep.
            </p>
          </Col>

          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="mb-3" style={{ fontWeight: "600", color: "#ffffffff" }}>Quick Links</h5>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li className="mb-2">
                <Link to="/" style={{ color: "#d1d5db", textDecoration: "none" }}>Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/products" style={{ color: "#d1d5db", textDecoration: "none" }}>Products</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" style={{ color: "#d1d5db", textDecoration: "none" }}>Why Choose AgriSmart</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" style={{ color: "#d1d5db", textDecoration: "none" }}>Contact</Link>
              </li>
            </ul>
          </Col>

          <Col md={4}>
            <h5 className="mb-3" style={{ fontWeight: "600", color: "#ffffffff" }}>Contact Us</h5>
            <ul style={{ listStyle: "none", padding: 0, color: "#d1d5db" }}>
              <li className="mb-2">📍 Nairobi, Kenya</li>
              <li className="mb-2">📞 +254 700 000 000</li>
              <li className="mb-2">✉️ info@agrismart.co.ke</li>
              <li className="mb-2">🕐 Mon - Sat: 8AM - 6PM</li>
            </ul>
          </Col>
        </Row>

        <hr style={{ borderColor: "#2d5016", margin: "2rem 0" }} />

        <Row>
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p style={{ color: "#d1d5db", margin: 0 }}>
              © 2024 AgriSmart. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <Link to="/privacy" style={{ color: "#d1d5db", textDecoration: "none", marginRight: "1.5rem" }}>
              Privacy Policy
            </Link>
            <Link to="/terms" style={{ color: "#d1d5db", textDecoration: "none", marginRight: "1.5rem" }}>
              Terms of Service
            </Link>
            <Link to="/cookies" style={{ color: "#d1d5db", textDecoration: "none" }}>
              Cookie Policy
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
