import React, { Fragment } from "react";
import { NavLink as Link } from "react-router-dom";

const NavbarComp = () => {
  return (
    <Fragment>
      <div className="navbar-comp">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    to="/home"
                    activeClassName="active"
                    className="nav-link"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/map"
                    activeClassName="active"
                    className="nav-link"
                    aria-current="page"
                  >
                    Map
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link disabled" href="#">
                    Link
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </Fragment>
  );
};

export default NavbarComp;
