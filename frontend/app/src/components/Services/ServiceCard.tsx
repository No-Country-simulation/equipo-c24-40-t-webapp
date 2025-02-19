"use client";
import React, { useEffect, useState } from "react";
import { getRequest } from "../../lib/utils";

interface Service {
  id: number;
  name: string;
  description: string;
}

const ServiceCard = () => {
  const [services, setServices] = useState<Service[]>([]); // Definir el tipo de datos en el estado

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getRequest("/services");
        setServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <h1>Servicios</h1>
      {services.map((service) => (
        <div key={service.id}>
          <h2>{service.name}</h2>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceCard;