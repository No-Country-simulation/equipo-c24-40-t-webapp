"use client";
import React, { useState } from "react";
import { postRequest } from "../../../lib/utils";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await postRequest("/auth/login", { email, password });
      console.log("Login success:", response);
      // Guardar el token o manejar la autenticación
    } catch (err) {
      setError("Error durante el inicio de sesión.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Iniciar sesión</h1>
      {error && <p>{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};

export default Login;
