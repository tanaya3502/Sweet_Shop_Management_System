// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { parseJwt } from "../utils/jwt";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    if (token) {
      const payload = parseJwt(token);
      const r = payload?.role || payload?.roles || null; // depends on how role claim is set
      if (r) {
        // If role is an array or string
        const roleStr = Array.isArray(r) ? r[0] : r;
        localStorage.setItem("role", roleStr);
        setRole(roleStr);
      }
    } else {
      setRole(null);
      localStorage.removeItem("role");
    }
  }, [token]);

  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    const payload = parseJwt(jwtToken);
    const r = payload?.role || payload?.roles || null;
    const roleStr = Array.isArray(r) ? r[0] : r;
    if (roleStr) {
      localStorage.setItem("role", roleStr);
      setRole(roleStr);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    window.location = "/login"; // force redirect
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
