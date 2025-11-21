import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";

function NavbarComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/products?search=${searchTerm}`;
    }
  };

  const scrollToSection = (sectionId) => {
    if (!isHomePage) {
      // If not on home page, navigate to home page first
      window.location.href = `/#${sectionId}`;
    } else {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <Navbar
      expand="lg"
      className="py-3 shadow-sm"
      style={{ background: "#22c55e" }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold text-white"
          style={{ fontSize: "1.5rem" }}
        >
          AgriSmart
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link
              as={Link}
              to="/"
              className="text-white fw-semibold mx-2"
              style={{ fontSize: "1rem" }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/products"
              className="text-white fw-semibold mx-2"
              style={{ fontSize: "1rem" }}
            >
              Products
            </Nav.Link>
            <Nav.Link
              onClick={() => scrollToSection("why-choose")}
              className="text-white fw-semibold mx-2"
              style={{ fontSize: "1rem", cursor: "pointer" }}
            >
              Why Choose AgriSmart
            </Nav.Link>
            <Nav.Link
              onClick={() => scrollToSection("get-in-touch")}
              className="text-white fw-semibold mx-2"
              style={{ fontSize: "1rem", cursor: "pointer" }}
            >
              Get In Touch
            </Nav.Link>
          </Nav>

          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search products..."
              className="me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: "20px" }}
            />
            <Button
              type="submit"
              style={{
                background: "white",
                color: "#22c55e",
                border: "none",
                borderRadius: "20px",
                fontWeight: "600",
              }}
            >
              Search
            </Button>
          </Form>

          <div className="d-flex gap-2">
            <Button
              as={Link}
              to="/login"
              variant="link"
              className="text-white fw-semibold"
              style={{ textDecoration: "none" }}
            >
              Login
            </Button>
            <Button
              as={Link}
              to="/register"
              style={{
                background: "white",
                color: "#22c55e",
                border: "none",
                borderRadius: "20px",
                fontWeight: "600",
              }}
            >
              Sign Up
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;