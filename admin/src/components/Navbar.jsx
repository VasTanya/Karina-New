import React from "react";
import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

import "../css/Navbar.css";

function Navbar() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="navbar">
      <NavLink to="/basics/slices" className="nav">
        Slices
      </NavLink>
      <NavLink to="/basics/regular" className="nav">
        Regulars
      </NavLink>
      <NavLink to="/albums" className="nav">
        Albums
      </NavLink>
      <NavLink to="/add" className="nav">
        Add Product
      </NavLink>
      <div className="nav end" onClick={handleLogout}>
        <i style={{ fontSize: "2vw" }} className="fa">
          &#xf08b;
        </i>
      </div>
    </nav>
  );
}

export default Navbar;
