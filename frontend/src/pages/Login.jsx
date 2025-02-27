import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { AuthContext } from '../context/AuthContext';

var texto = "email";
var correo =texto+"@gmail.com";



const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    await signIn(email, password);
    navigate('/profile');
  };

  return <AuthForm onSubmit={handleLogin} />;
};

export default Login;