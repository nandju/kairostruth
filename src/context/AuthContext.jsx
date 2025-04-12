import { Alert } from 'antd';
import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profils, setProfils ] = useState();
  const [apiKey, setApiKEy ] = useState();

  const getProfils = (token) =>{
    console.log("token",token)
    axios.get("https://kairos-a-pi.vercel.app/profile", {
      headers:{
        'Authorization': `Bearer ${token.token}`
      }
    }).then((res)=>{setProfils(res.data),console.log(JSON.stringify(res))}).catch((err)=>console.log(err))
  }

  const login =async  (email, password) => {
    axios.post("https://kairos-a-pi.vercel.app/login",{"email":email,"password":password}).then((res)=>{setApiKEy(res.data)}).catch((err)=>{alert(err.response.data)})
    if (apiKey) {
      
      await getProfils(apiKey)
    }
    if (profils){
      console.log("le profils connecté",profils)
      localStorage.setItem('user', JSON.stringify(profils.user));
      setUser(profils.user);
      <Alert
      message="Connexion Reussie"
      description={`Bienvenue ${profils.user.name}`}
      type="success"
      showIcon
      className="!rounded-none"
    />
      return { success: true, role: profils.user.role == "user"? "client" : profils.user.role  };
    }else{
      setApiKEy("")
      
    }
    
    // Simulation de connexion pour client, conducteur et admin
    // if (email === 'client@gmail.com' && password === 'password123') {
    //   const userData = {
    //     id: '1',
    //     email: 'client@gmail.com',
    //     nom: 'Client',
    //     prenom: 'Test',
    //     role: 'client'
    //   };
    //   setUser(userData);
    //   localStorage.setItem('user', JSON.stringify(userData));
    //   return { success: true, role: 'client' };
    // }
    // else if (email === 'conducteur@gmail.com' && password === 'password123') {
    //   const userData = {
    //     id: '2',
    //     email: 'conducteur@gmail.com',
    //     nom: 'Conducteur',
    //     prenom: 'Test',
    //     role: 'conducteur'
    //   };
    //   setUser(userData);
    //   localStorage.setItem('user', JSON.stringify(userData));
    //   return { success: true, role: 'conducteur' };
    // }
    // else if (email === 'admin@gmail.com' && password === 'admin123') {
    //   const userData = {
    //     id: '3',
    //     email: 'admin@gmail.com',
    //     nom: 'Administrateur',
    //     prenom: 'System',
    //     role: 'admin'
    //   };
    //   setUser(userData);
    //   localStorage.setItem('user', JSON.stringify(userData));
    //   return { success: true, role: 'admin' };
    // }
    // return profils;
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