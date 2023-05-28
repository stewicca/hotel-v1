import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Layout.css";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        <div className="columns">
          {user && user.role === "admin" && (
            <div className="column is-2">
              <Sidebar />
            </div>
          )}
          {user && user.role === "receptionist" && (
            <div className="column is-2">
              <Sidebar />
            </div>
          )}
          <div className="column">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
