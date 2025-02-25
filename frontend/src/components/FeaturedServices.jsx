import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ServiceCard from './ServiceCard';
import serviceData from '../mockData/services.json';

const FeaturedService = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        // Simulamos la obtención de datos con un timeout (mock de la API)
        setTimeout(() => {
            setServices(serviceData);
        }, 1000);
    }, []);

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Servicios Destacados</h2>
            <Row>
                {services.map(service => (
                    <Col key={service.id} lg={2} md={3} sm={6} xs={6}  className="mb-4">
                        <ServiceCard {...service} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FeaturedService;
