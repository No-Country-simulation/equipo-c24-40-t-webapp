import { Card } from 'react-bootstrap';

const ReviewCard = ({ name, review, rating }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{review}</Card.Text>
        <p>Calificación: {rating}/5</p>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
