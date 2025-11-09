// src/components/AdminPage.js
import React, { useState, useEffect } from "react";
import API from "../api/axios";
import SweetCard from "./SweetCard";

const AdminPage = () => {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", price: "", quantity: "" });

  const fetchAll = async () => {
    try {
      const res = await API.get("/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load sweets");
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/sweets", {
        name: form.name,
        category: form.category,
        price: parseFloat(form.price),
        quantity: parseInt(form.quantity, 10)
      });
      alert("Added");
      setForm({ name: "", category: "", price: "", quantity: "" });
      fetchAll();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Add failed");
    }
  };

  return (
    <div className="page">
      <h2>Admin Panel</h2>

      <form className="admin-form" onSubmit={submit}>
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" required />
        <input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} placeholder="Category" required />
        <input value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="Price" required />
        <input value={form.quantity} onChange={e=>setForm({...form,quantity:e.target.value})} placeholder="Quantity" required />
        <button type="submit">Add Sweet</button>
      </form>

      <div className="grid">
        {sweets.map(s => <SweetCard key={s.id} sweet={s} onUpdated={fetchAll} />)}
      </div>
    </div>
  );
};

export default AdminPage;
