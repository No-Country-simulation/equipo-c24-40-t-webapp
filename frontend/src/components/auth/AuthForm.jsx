import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';

const AuthForm = ({ title, onSubmit }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData.email, formData.password);
      setError(null);
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <Container className="d-flex vh-100 align-items-center justify-content-center">
      <Card className="shadow-lg overflow-hidden" style={{ maxWidth: '800px', width: '100%' }}>
        <Row className="g-0 flex-column flex-lg-row h-100">
          {/* Imagen */}
          <Col xs={12} md={6} className="order-0 order-lg-1">
            <div className="h-100 w-100"
              style={{
                backgroundImage: `url("https://www.creativecoloursolutions.com.au/wp-content/uploads/2011/05/400x400.png")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </Col>

          {/* Formulario */}
          <Col xs={12} lg={6} className="order-1 order-lg-0 p-4 d-flex flex-column justify-content-center">
            <Form onSubmit={handleSubmit}>
              <h2 className="text-center mb-4">{title}</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="ejemplo@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="******"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                {title}
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default AuthForm;
