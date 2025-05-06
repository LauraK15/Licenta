import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Starea autentificării
  const navigate = useNavigate();

  const login = () => {
    setIsAuthenticated(true);
    navigate('/'); // După autentificare, redirecționează la dashboard
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate('/auth'); // Dacă utilizatorul se deconectează, îl redirecționăm la login
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);