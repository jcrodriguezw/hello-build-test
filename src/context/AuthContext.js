import React, { useState, createContext } from 'react';

const localStorageUser = 'user';

const isAuth = () => !!localStorage.getItem(localStorageUser);

export const AuthContext = createContext({
  isAuthenticated: {},
  setAuthenticated: () => null,
});

export const AuthProvider = (props) => {
  const [isAuthenticated, setAuthenticated] = useState(isAuth);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {props.children}
    </AuthContext.Provider>
  );
};
