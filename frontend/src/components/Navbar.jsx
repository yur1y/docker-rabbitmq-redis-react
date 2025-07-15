import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          NASA API Demo
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/apod">
            APOD
          </Nav.Link>
          <Nav.Link as={Link} to="/mars-rover">
            Mars Rover
          </Nav.Link>
          <Nav.Link as={Link} to="/epic">
            EPIC
          </Nav.Link>
          <Nav.Link as={Link} to="/neo-stats">
            Neo Stats
          </Nav.Link>
          <Nav.Link as={Link} to="/mars-stats">
            Mars Stats
          </Nav.Link>
          <Nav.Link as={Link} to="/search-images">
            Image Search
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
