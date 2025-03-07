import useServices from "../../hooks/useService";
import ServiceList from "./ServiceList";

const Services = () => {
  const { services, loading, error } = useServices();

  return <ServiceList title="Lista de servicios" services={services} loading={loading} error={error} />;
};

export default Services;
