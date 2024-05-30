import { createContext, useContext } from "react";
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const storeTokenInLocalStorage = (servertoken) => {
    return localStorage.setItem("token", servertoken);
  };

  return (
    <AuthContext.Provider value={{ storeTokenInLocalStorage }}>
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
