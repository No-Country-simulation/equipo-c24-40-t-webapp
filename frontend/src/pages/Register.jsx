import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { register } from '../services/authService';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (email, password) => {
    await register(email, password);
    navigate('/login');
  };

  return <AuthForm onSubmit={handleRegister} isRegister />;
};

export default Register;