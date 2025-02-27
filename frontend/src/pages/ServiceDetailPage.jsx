import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ServiceDetailPage() {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    // Simulación de API
    setService({
      id,
      name: "Servicio de Limpieza",
      description: "Limpieza profunda de hogar con productos ecológicos.",
      price: "30.000 CLP",
      provider: "Juan Pérez",
      rating: 4.5,
    });
  }, [id]);

  if (!service) return <p>Cargando...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{service.name}</h1>
      <p className="text-gray-700 mt-2">{service.description}</p>
      <p className="text-blue-600 font-semibold mt-2">{service.price}</p>
      <p className="text-gray-500 mt-2">Proveedor: {service.provider}</p>
      <p className="text-yellow-500 mt-2">⭐ {service.rating}</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Reservar Servicio
      </button>
    </div>
  );
}
