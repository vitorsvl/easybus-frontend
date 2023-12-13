// authContext.js
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  console.log('AuthProvider being mounted...');

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = (userData) => {

    const userWithRole = { ...userData.user, role: userData.role };

    setUser(userWithRole);
    setToken(userData.token);

    localStorage.setItem('authUser', JSON.stringify(userWithRole));
    localStorage.setItem('authToken', userData.token);
 
  };

  // Verifica se há dados de autenticação ao carregar o contexto
  useEffect(() => {

    const storedUser = localStorage.getItem('authUser');
    const storedToken = localStorage.getItem('authToken');

    // console.log('pegando itens do local storage', storedUser, storedToken);
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
   
  }, []);

  const logout = () => {
    // Lógica para fazer logout: remover o usuário e token do estado
    setUser(null);
    setToken(null);
    
    localStorage.removeItem('authUser');
    localStorage.removeItem('authToken');
  };

  // useEffect(() => {
  //   console.log("User:", user);
  //   console.log("Token:", token);
  // }, [user, token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
