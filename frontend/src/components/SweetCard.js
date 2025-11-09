// src/components/SweetCard.js
import React, { useContext, useState } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const SweetCard = ({ sweet, onUpdated, showAdminControls=false }) => {
  const { role } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const purchase = async () => {
    setLoading(true);
    try {
      await API.post(`/sweets/${sweet.id}/purchase?quantity=1`);
      alert("Purchased successfully");
      onUpdated();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Purchase failed");
    } finally {
      setLoading(false);
    }
  };

  const restock = async () => {
    const qty = parseInt(prompt("Enter restock quantity:", "10"), 10);
    if (!qty || qty <= 0) return;
    try {
      await API.post(`/sweets/${sweet.id}/restock?quantity=${qty}`);
      alert("Restocked");
      onUpdated();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Restock failed");
    }
  };

  const remove = async () => {
    if (!window.confirm("Delete this sweet?")) return;
    try {
      await API.delete(`/sweets/${sweet.id}`);
      alert("Deleted");
      onUpdated();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Delete failed");
    }
  };

  return (
    <div className="sweet-card">
      <h3>{sweet.name}</h3>
      <p>{sweet.category}</p>
      <p>Price: ₹{sweet.price}</p>
      <p>Qty: {sweet.quantity}</p>

      <div className="card-actions">
        <button onClick={purchase} disabled={sweet.quantity <= 0 || loading}>
          {sweet.quantity <= 0 ? "Out of stock" : (loading ? "Purchasing..." : "Purchase")}
        </button>

        {role === "ADMIN" && (
          <>
            <button onClick={restock}>Restock</button>
            <button onClick={remove} className="danger">Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default SweetCard;
