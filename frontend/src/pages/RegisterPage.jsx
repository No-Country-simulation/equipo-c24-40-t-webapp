import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Simulación de login
    if (email === "user@example.com" && password === "password") {
      alert("Inicio de sesión exitoso");
      navigate("/dashboard/user");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <Container className="d-flex vh-100 align-items-center justify-content-center">
      <Card className="shadow-lg overflow-hidden" style={{ maxWidth: "800px", width: "100%" }}>
        <Row className="g-0">
          {/* Sección Izquierda: Formulario */}
          <Col md={6} className="p-4 d-flex flex-column justify-content-center">
            <h3 className="text-center mb-4">Registrarse</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control type="email" placeholder="Ingrese su correo" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Ingrese su contraseña" />
              </Form.Group>
              <Button variant="primary" className="w-100">Ingresar</Button>
            </Form>
          </Col>

          {/* Sección Derecha: Imagen */}
          <Col md={6} className="d-none d-md-block">
            <div
              className="h-100"
              style={{
                backgroundImage: `url("https://www.creativecoloursolutions.com.au/wp-content/uploads/2011/05/400x400.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
