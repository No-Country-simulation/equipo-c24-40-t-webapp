import { Container, Row, Col } from "react-bootstrap";
import ServiceCard from "./ServiceCard";

const ServiceList = ({ title, services, loading, error }) => {
  if (loading)
    return (
      <Container className="mt-4">
        <p>Cargando servicios...</p>
      </Container>
    );
  if (error)
    return (
      <Container className="mt-4">
        <p>Error: {error}</p>
      </Container>
    );

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">{title}</h2>
      {services.length === 0 ? (
        <p className="text-center">No hay servicios disponibles.</p>
      ) : (
        <Row>
          {services.map((service) => (
            <Col key={service.id} lg={2} md={3} sm={6} xs={12} className="mb-4">
              <ServiceCard
                id={service.id}
                title={service.title}
                description={service.description}
                price={service.price}
                image="https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png"
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ServiceList;
