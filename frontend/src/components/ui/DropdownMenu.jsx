import { useState } from "react";
import useServices from "../../hooks/useService";
import Dropdown from "react-bootstrap/Dropdown";

const DropdownMenu = () => {
    const { services, loading, error } = useServices();
    const [selectedService, setSelectedService] = useState(null);

    const handleSelect = (service) => {
        setSelectedService(service);
        console.log("Servicio seleccionado:", service);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedService ? selectedService.category : "Seleccionar Servicio"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {loading && <Dropdown.Item disabled>Cargando servicios...</Dropdown.Item>}
                {error && <Dropdown.Item disabled>Error al cargar servicios</Dropdown.Item>}
                {!loading && !error && services.length === 0 && (
                    <Dropdown.Item disabled>No hay servicios disponibles</Dropdown.Item>
                )}
                {!loading &&
                    !error &&
                    services.map((service) => (
                        <Dropdown.Item key={service.id} onClick={() => handleSelect(service)}>
                            {service.category}
                        </Dropdown.Item>
                    ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropdownMenu;
