import { createContext, useContext, useState } from "react";
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const storeTokenInLocalStorage = (servertoken) => {
    return localStorage.setItem("token", servertoken);
  };

  const IsLoggedIn = !!token;
  console.log(`isLoggedIn ${IsLoggedIn}`);

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ storeTokenInLocalStorage,LogoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// created a custom hook ---> useAuth
export const useAuth = () => {
  const authCOntextValue = useContext(AuthContext);
  if (!authCOntextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authCOntextValue;
};

// from here storeTokenInLocalStorage can be accessed to any children
