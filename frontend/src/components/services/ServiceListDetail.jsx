import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ServiceListDetail = ({ services }) => {
  const { title } = useParams();
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    const matchingServices = services.filter(service => service.title === title);
    setFilteredServices(matchingServices);
  }, [title, services]);

  if (filteredServices.length === 0) return <Container className="mt-4"><p>No se encontraron servicios para este título.</p></Container>;

  return (
    <Container className="mt-4">
      <Row>
        {filteredServices.map((service) => (
          <Col key={service.id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="shadow-lg p-3 bg-white rounded">
              <Card.Body>
                <Card.Title>{service.title}</Card.Title>
                <Card.Text>{service.description}</Card.Text>
                <Card.Text className="fw-bold text-primary">${service.price}</Card.Text>

                <div className="d-flex align-items-center">
                  <Badge bg="info" className="me-2">Disponible</Badge>
                  <div className="d-flex align-items-center text-warning">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} className={index < service.professional.rating ? 'text-warning' : 'text-muted'} />
                    ))}
                  </div>
                </div>

                <h6 className="mt-3">Información del Profesional</h6>
                <p><FaMapMarkerAlt className="me-2" />{service.professional.user.location}</p>
                <Button as={Link} to={`/service/${service.id}`} variant="primary">Ver más</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ServiceListDetail;
