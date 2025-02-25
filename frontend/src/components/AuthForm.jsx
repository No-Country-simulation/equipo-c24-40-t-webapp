import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';

const AuthForm = ({ onSubmit, isRegister = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(email, password);
      setError(null);
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <Container className="d-flex vh-100 align-items-center justify-content-center">
      <Card className="shadow-lg overflow-hidden" style={{ maxWidth: '800px', width: '100%' }}>
        <Row className="g-0 flex-column flex-lg-row h-100">
          <Col
            xs={12}
            md={6}
            className="order-0 order-lg-1"
          >
            <div
              className="h-100 w-100"
              style={{
                backgroundImage: `url("https://www.creativecoloursolutions.com.au/wp-content/uploads/2011/05/400x400.png")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </Col>
          <Col
            xs={12}
            lg={6}
            className="order-1 order-lg-0 p-4 d-flex flex-column justify-content-center"
          >
            <Form onSubmit={handleSubmit}>
              <h2 className="text-center mb-4">{isRegister ? 'Register' : 'Login'}</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete={isRegister ? 'new-password' : 'current-password'}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                {isRegister ? 'Register' : 'Login'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default AuthForm;