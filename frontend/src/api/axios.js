// src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // ✅ backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token for every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// optional: handle 401 globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      // token invalid/expired - clear and redirect (page reload hooks will handle)
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      // optionally: window.location = '/login';
    }
    return Promise.reject(err);
  }
);

export default API;
