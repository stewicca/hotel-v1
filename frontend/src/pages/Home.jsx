import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <section className="hero is-primary is-fullheight bg-img">
        <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <div className="navbar-item">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/bf/RedDoorz_Logo.png"
                    alt="Logo"
                  />
                </div>
              </div>
              <div id="navbarMenu" className="navbar-menu">
                <div className="navbar-end">
                  <span className="navbar-item">
                    <a className="button is-white is-outlined" href="/">
                      <span className="icon">
                        <i className="fa fa-home"></i>
                      </span>
                      <span>Home</span>
                    </a>
                  </span>
                  <span className="navbar-item">
                    <a className="button is-white is-outlined" href="/cekorder">
                      <span className="icon">
                        <i className="fa fa-book"></i>
                      </span>
                      <span>Cek Order</span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-6 is-offset-3">
              <h1 className="title">
                Hai kamu<b style={{ fontSize: "40px" }}>, mau staycation?</b>
              </h1>
              <p className="control">
                <a className="button is-white is-outlined" href="/search">
                  <span className="icon">
                    <i className="fa fa-bed"></i>
                  </span>
                  <span>Cari Kamar</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
