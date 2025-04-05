import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchUser, logout } from "../redux/userSlice";

import "../css/Navbar.css";

import { useSelector } from "react-redux";

function Navbar({ openResetModal }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isAdmin = user?.permissions.includes("**");

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
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
      {isAdmin && (
        <div className="nav" onClick={openResetModal}>
          Reset
        </div>
      )}
      <div className="nav end" onClick={handleLogout}>
        <i style={{ fontSize: "2vw" }} className="fa">
          &#xf08b;
        </i>
      </div>
    </nav>
  );
}

export default Navbar;
