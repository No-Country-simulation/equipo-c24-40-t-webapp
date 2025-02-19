"use client";
import React, { useState } from "react";
import { postRequest } from "../../../lib/utils";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const response = await postRequest("/auth/register", { email, password, name });
      console.log("Registration success:", response);
    } catch (err) {
      setError("Error durante el registro.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Registrarse</h1>
      {error && <p>{error}</p>}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre"
      />
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
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
};

export default Register;
