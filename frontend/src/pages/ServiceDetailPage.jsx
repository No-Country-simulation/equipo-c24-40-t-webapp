import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ServiceListDetail from '../components/services/ServiceListDetail'; // Importa ServiceListDetail
import ServiceDetail from '../components/services/ServiceDetail'; // Importa ServiceDetail
import { useParams } from 'react-router-dom';

const ServiceDetailPage = ({ services }) => {
  const { id } = useParams(); // Obtener el id del servicio en la URL
  const { title } = useParams(); // Obtener el título del servicio en la URL (si es necesario)

  return (
    <Container className="mt-4">
      <Row>
        {/* Columna para los detalles del servicio */}
        <Col md={8}>
          <ServiceDetail services={services} />
        </Col>
        
        {/* Columna para la lista de servicios relacionados */}
        <Col md={4}>
          <ServiceListDetail services={services} />
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceDetailPage;
