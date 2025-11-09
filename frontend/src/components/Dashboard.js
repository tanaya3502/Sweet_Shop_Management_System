// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import API from "../api/axios";
import SweetCard from "./SweetCard";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await API.get("/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error("Failed to fetch sweets", err);
      alert("Failed to fetch sweets: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const doSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // use /sweets/search?name=... (backend implemented)
      const res = await API.get(`/sweets/search?name=${encodeURIComponent(search)}`);
      setSweets(res.data);
    } catch (err) {
      console.error(err);
      alert("Search failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="header-row">
        <h2>Sweet Shop Dashboard</h2>

      </div>

      <form onSubmit={doSearch} className="search-form">
        <input placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} />
        <button type="submit">Search</button>
        <button type="button" onClick={fetchAll}>Reset</button>
      </form>

      {loading ? <p>Loading...</p> : (
        <div className="grid">
          {sweets.length === 0 ? <p>No sweets found.</p> :
            sweets.map(s => <SweetCard key={s.id} sweet={s} onUpdated={fetchAll} />)
          }
        </div>
      )}
    </div>
  );
};

export default Dashboard;
