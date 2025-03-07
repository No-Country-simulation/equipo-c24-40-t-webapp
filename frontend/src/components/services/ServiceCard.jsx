import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const ServiceCard = ({ id,title, description, price, image }) => {
    return (
        <Card className="mb-3 shadow-sm text-center">
            {/* Header con el título alineado a la izquierda */}
            <Card.Header className="fw-bold text-start">{title}</Card.Header>

            {/* Imagen en el body con border-radius */}
            <Card.Body>
                <Card.Img variant="top" src={image} alt={title} className="mb-2 rounded" />
            </Card.Body>

            {/* Footer con precio, descripción y botón */}
            <Card.Footer className="d-flex flex-column align-items-center">
                <Card.Text className="text-muted mb-1">{description}</Card.Text>
                <Card.Text className="fw-bold text-primary">${price}</Card.Text>
                <Link to={`/services/${id}`}>
                    <Button variant="primary">Ver más</Button>
                </Link>
            </Card.Footer>
        </Card>
    );
};

export default ServiceCard;
