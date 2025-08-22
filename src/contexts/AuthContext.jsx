import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('precisedTalentToken');
    const storedUser = localStorage.getItem('precisedTalentUser');

    if (storedToken && storedUser) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('precisedTalentToken', token);
    localStorage.setItem('precisedTalentUser', JSON.stringify(userData));

    setIsAuthenticated(true);
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('precisedTalentToken');
    localStorage.removeItem('precisedTalentUser');
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
