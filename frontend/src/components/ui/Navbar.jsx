import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Inicio</Navbar.Brand>
        <DropdownMenu />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
            <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;