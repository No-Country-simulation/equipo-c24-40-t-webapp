import { useState, useEffect } from "react";
import { getServices } from "../services";

const useServices = (filterCallback = null) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        const servicesArray = Array.isArray(data) ? data : [];

        const filteredServices = filterCallback
          ? servicesArray.filter(filterCallback)
          : servicesArray;

        setServices(filteredServices);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [filterCallback]);

  return { services, loading, error };
};

export default useServices;
