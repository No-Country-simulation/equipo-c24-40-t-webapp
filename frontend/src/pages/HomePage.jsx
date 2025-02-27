import { Link } from "react-router-dom";
import FeaturedService from "../components/FeaturedServices";
export default function HomePage() {
  return (
    <>
      <div className="text-center p-10">
        <h1 className="text-3xl font-bold">Bienvenido a Servicios</h1>
        <p>Encuentra y reserva servicios profesionales fácilmente</p>
        <Link to="/services" className="bg-blue-600 text-white px-4 py-2 mt-4 inline-block">Explorar Servicios</Link>
      </div>
      <div className="text-center p-10">
        <FeaturedService />
      </div>
    </>

  );
}
