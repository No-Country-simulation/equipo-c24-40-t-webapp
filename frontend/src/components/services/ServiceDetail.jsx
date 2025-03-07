import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Badge } from 'react-bootstrap';
import { FaStar, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const ServiceDetail = ({ services }) => {
  const { id } = useParams(); // Obtener el ID del servicio desde la URL
  const [service, setService] = useState(null);

  useEffect(() => {
    if (services && services.length > 0) {
      const serviceFound = services.find((s) => s.id === id);
      setService(serviceFound);
    }
  }, [id, services]);
  

  if (!service) return <Container className="mt-4"><p>Cargando servicio...</p></Container>;

  const { title, description, price, category, professional } = service;
  const { name, email, location } = professional.user;

  return (
    <Container className="mt-4">
      <Card className="shadow-lg p-3 bg-white rounded" style={{ maxWidth: '28rem' }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text className="text-muted"><strong>Categoría:</strong> {category}</Card.Text>
          <Card.Text className="fw-bold text-primary">${price}</Card.Text>

          <div className="d-flex align-items-center">
            <Badge bg="info" className="me-2">Disponible</Badge>
            <div className="d-flex align-items-center text-warning">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className={index < professional.rating ? 'text-warning' : 'text-muted'} />
              ))}
            </div>
          </div>

          <h5 className="mt-3">Información del Profesional</h5>
          <div className="d-flex flex-column">
            <p><strong>Nombre:</strong> {name}</p>
            <p><FaMapMarkerAlt className="me-2" />{location}</p>
            <p><strong>Experiencia:</strong> {professional.experience}</p>
            <p><strong>Habilidades:</strong> {professional.skills.join(', ')}</p>
            <Button variant="primary" href={`mailto:${email}`}>
              <FaEnvelope className="me-2" /> Contactar
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ServiceDetail;
