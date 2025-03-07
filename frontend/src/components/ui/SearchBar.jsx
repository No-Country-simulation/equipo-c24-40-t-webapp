import { Form, Button } from 'react-bootstrap';

const SearchBar = () => {
  return (
    <Form className="d-flex mb-3">
      <Form.Control type="text" placeholder="Buscar servicios..." className="me-2" />
      <Button variant="primary">Buscar</Button>
    </Form>
  );
};

export default SearchBar;