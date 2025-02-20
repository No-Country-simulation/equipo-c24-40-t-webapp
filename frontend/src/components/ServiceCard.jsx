import { Card, Button } from 'react-bootstrap';

const ServiceCard = ({ title, description, price }) => {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button variant="primary">Ver más</Button>
            </Card.Body>
        </Card>
    );
};
export default ServiceCard;