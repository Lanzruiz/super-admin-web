import React, { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    isLoggedIn: localStorage.getItem("token") ? true : false,
    user: null,
    token: localStorage.getItem("token"),
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload.user,
        };
      case "LOGOUT":
        localStorage.removeItem("token");
        return {
          ...state,
          isLoggedIn: false,
          user: null,
          token: null,
        };
      default:
        return state;
    }
  };

  const [state, dispatchAuth] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
