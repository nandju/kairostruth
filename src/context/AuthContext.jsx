import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Simulation de connexion pour client, conducteur et admin
    if (email === 'client@gmail.com' && password === 'password123') {
      const userData = {
        id: '1',
        email: 'client@gmail.com',
        nom: 'Client',
        prenom: 'Test',
        role: 'client'
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, role: 'client' };
    }
    else if (email === 'conducteur@gmail.com' && password === 'password123') {
      const userData = {
        id: '2',
        email: 'conducteur@gmail.com',
        nom: 'Conducteur',
        prenom: 'Test',
        role: 'conducteur'
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, role: 'conducteur' };
    }
    else if (email === 'admin@gmail.com' && password === 'admin123') {
      const userData = {
        id: '3',
        email: 'admin@gmail.com',
        nom: 'Administrateur',
        prenom: 'System',
        role: 'admin'
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, role: 'admin' };
    }
    return { success: false, role: null };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const getRole = () => {
    return user?.role || null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, getRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
}; 