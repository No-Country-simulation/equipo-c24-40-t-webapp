import { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";

export default function ServiceListPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/api/services") // Simulación de API
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Lista de Servicios</h2>
      <div className="grid grid-cols-3 gap-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
