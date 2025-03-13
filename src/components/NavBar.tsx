import { Container, Navbar, Nav } from "react-bootstrap";

const NavBar: React.FC = () => {
  return (
    <Navbar bg="warning" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/" className="text-white">STORE</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;