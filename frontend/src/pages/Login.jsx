import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    await signIn(email, password);
    navigate('/profile');
  };

  return <AuthForm title="Login" onSubmit={handleLogin} />;
};

export default Login;
