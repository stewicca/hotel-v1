import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import "./Sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <div>
      <aside className="menu is-hidden-mobile">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <a className="is-active" href="/dashboard">
              Dashboard
            </a>
          </li>
        </ul>
        {user && user.role === "admin" && (
          <div>
            <p className="menu-label">Administration</p>
            <ul className="menu-list">
              <li>
                <a href="/user">User</a>
              </li>
              <li>
                <a href="/tipekamar">Tipe Kamar</a>
              </li>
              <li>
                <a href="/kamar">Kamar</a>
              </li>
            </ul>
          </div>
        )}
        {user && user.role === "receptionist" && (
          <div>
            <p className="menu-label">Receptionist</p>
            <ul className="menu-list">
              <li>
                <a href="/pemesanan">Pemesanan</a>
              </li>
            </ul>
          </div>
        )}
        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <a onClick={logout} href="/login">
              Log out
            </a>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
