// src/components/Register.js
import React, { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/register", { username, email, password });
      alert("Registered successfully. Please log in.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.message || "Register failed";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={submit}>
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" required />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" required />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required />
        <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
      </form>
      <p>Have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
