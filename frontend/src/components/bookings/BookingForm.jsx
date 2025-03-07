import { Form, Button } from 'react-bootstrap';

const BookingForm = () => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Fecha</Form.Label>
        <Form.Control type="date" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Hora</Form.Label>
        <Form.Control type="time" />
      </Form.Group>
      <Button variant="success" type="submit">Reservar</Button>
    </Form>
  );
};

export default BookingForm;