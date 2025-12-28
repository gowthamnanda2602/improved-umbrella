
import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";

function MyNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* Left side brand */}
        <Navbar.Brand href="#">MyBrand</Navbar.Brand>

        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible content */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Middle links */}
          <Nav className="mx-auto">
            <Nav.Link href="#opportunities">Opportunities</Nav.Link>
            <Nav.Link href="#experience">Experience</Nav.Link>
          </Nav>

          {/* Right side buttons */}
          <div className="d-flex">
            <Button variant="outline-primary" className="me-2">
              Login
            </Button>
            <Button variant="primary">Signup</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;