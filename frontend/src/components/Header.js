// src/components/Header.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { role, logout } = useContext(AuthContext);
  return (
    <header className="topbar">
      <div className="brand"><Link to="/dashboard">Sweet Shop</Link></div>
      <nav>
        <Link to="/dashboard">Home</Link>
        {role === "ADMIN" && <Link to="/admin">Admin</Link>}
		
        <button onClick={logout} className="link-like">Logout</button>
      </nav>
    </header>
  );
};

export default Header;
