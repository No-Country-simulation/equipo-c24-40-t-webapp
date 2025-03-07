import useServices from "../../hooks/useService";
import ServiceList from "./ServiceList";

const FeaturedService = () => {
  const { services, loading, error } = useServices((service) => service.featured);
  return <ServiceList title="Servicios Destacados" services={services} loading={loading} error={error} />;
};

export default FeaturedService;
