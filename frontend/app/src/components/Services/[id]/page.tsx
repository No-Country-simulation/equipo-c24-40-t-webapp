"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Mock service data (simulando una respuesta de API)
const mockService = {
  id: "1",
  title: "Professional Home Cleaning",
  description: "Thorough home cleaning service by experienced professionals.",
  price: 80,
  category: "Cleaning",
  provider: {
    name: "Clean Home Services",
    rating: 4.8,
  },
};

export default function ServiceDetailPage() {
  // Aseguramos que params no sea null
  const params = useParams() ?? {};
  const serviceId = params?.id;

  const [service, setService] = useState(mockService);

  useEffect(() => {
    if (serviceId) {
      console.log("Fetching service with id:", serviceId);
      // Aquí se haría una llamada real a la API, por ejemplo:
      // fetch(`/api/services/${serviceId}`).then(res => res.json()).then(setService);
    } else {
      console.warn("No service ID provided.");
    }
  }, [serviceId]);

  const handleBooking = () => {
    console.log("Booking service:", service.id);
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <div className="mb-4">
        <span className="font-bold">Price:</span> ${service.price}
      </div>
      <div className="mb-4">
        <span className="font-bold">Category:</span> {service.category}
      </div>
      <div className="mb-6">
        <span className="font-bold">Provider:</span> {service.provider.name} (Rating: {service.provider.rating})
      </div>
      <Button onClick={handleBooking} className="w-full">
        Book This Service
      </Button>
    </div>
  );
}
