import React, { createContext, useState, useEffect } from 'react';
import { login, logout, getProfile } from '../services/authService';
import { getToken, setToken, removeToken } from '../utils/storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (getToken()) {
        try {
          const profile = await getProfile();
          setUser(profile.user);
        } catch (error) {
          signOut();
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const signIn = async (email, password) => {
    const data = await login(email, password);
    setToken(data.token);
    setUser(data.user);
  };

  const signOut = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
