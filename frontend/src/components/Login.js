// src/components/Login.js
import React, { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { username, password });
      const token = res.data.token;
      if (!token) throw new Error("No token returned");
      login(token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || err.response?.data?.message || err.message || "Login failed";
      alert("Login failed: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={submit} className="auth-form">
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" required />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" required />
        <button type="submit" disabled={loading}>{loading ? "Logging..." : "Login"}</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;
