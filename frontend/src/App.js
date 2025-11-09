// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AdminPage from "./components/AdminPage";
import Header from "./components/Header";

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function RequireAdmin({ children }) {
  const role = localStorage.getItem("role");
  return role === "ADMIN" ? children : <Navigate to="/dashboard" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={
            <RequireAuth><Dashboard /></RequireAuth>
          } />

          <Route path="/admin" element={
            <RequireAuth><RequireAdmin><AdminPage /></RequireAdmin></RequireAuth>
          } />

          <Route path="*" element={<p style={{padding:20}}>Page not found</p>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
