import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    alert(`Registro exitoso como ${role}`);
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center">Registro</h2>
        <form onSubmit={handleRegister} className="mt-4">
          <label className="block">
            <span className="text-gray-700">Nombre</span>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="block mt-2">
            <span className="text-gray-700">Correo electrónico</span>
            <input
              type="email"
              className="w-full mt-1 p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="block mt-2">
            <span className="text-gray-700">Contraseña</span>
            <input
              type="password"
              className="w-full mt-1 p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="block mt-2">
            <span className="text-gray-700">Rol</span>
            <select
              className="w-full mt-1 p-2 border rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">Usuario</option>
              <option value="professional">Profesional</option>
            </select>
          </label>
          <button className="w-full bg-green-600 text-white py-2 mt-4 rounded">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
