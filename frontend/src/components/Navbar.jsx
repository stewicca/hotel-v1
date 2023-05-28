import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <nav className="navbar is-white">
      <div className="container">
        {!user && (
          <div className="navbar-brand">
            <div className="navbar-item">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/bf/RedDoorz_Logo.png"
                alt="Logo"
              />
            </div>
          </div>
        )}
        {user && user.role === "admin" && (
          <div className="navbar-brand">
            <a className="navbar-item brand-text" href="/dashboard">
              Administrator
            </a>
          </div>
        )}
        {user && user.role === "receptionist" && (
          <div className="navbar-brand">
            <a className="navbar-item brand-text" href="/dashboard">
              Management
            </a>
          </div>
        )}
        <div id="navMenu" className="navbar-menu">
          <div className="navbar-end">
            {!user && (
              <span className="navbar-item">
                <a className="button is-outlined" href="/">
                  <span className="icon">
                    <i className="fa fa-home"></i>
                  </span>
                  <span>Home</span>
                </a>
              </span>
            )}
            {!user && (
              <span className="navbar-item">
                <a className="button is-outlined" href="/cekorder">
                  <span className="icon">
                    <i className="fa fa-book"></i>
                  </span>
                  <span>Cek Order</span>
                </a>
              </span>
            )}
            {user && user.role === "admin" && (
              <div className="navbar-item">
                <div className="buttons">
                  <button onClick={logout} className="button">
                    Log out
                  </button>
                </div>
              </div>
            )}
            {user && user.role === "receptionist" && (
              <div className="navbar-item">
                <div className="buttons">
                  <button onClick={logout} className="button">
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
