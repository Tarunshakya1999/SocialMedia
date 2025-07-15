import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Nav({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm nav-gradient">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3 text-white" to="/">
          <i className="fas fa-store me-2"></i>Social Media App
        </Link>

        <button
          className="navbar-toggler bg-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-lg-2">
            <li className="nav-item">
              <Link className="nav-link nav-link-hover" to="/">
                <i className="fas fa-home me-1"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-hover" to="/about">
                <i className="fas fa-user me-1"></i> About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-hover" to="/services">
                <i className="fas fa-tools me-1"></i> Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-link-hover" to="/contact">
                <i className="fas fa-phone me-1"></i> Contact
              </Link>
            </li>

            {!username && (
              <li className="nav-item">
                <Link className="nav-link nav-link-hover" to="/login">
                  <i className="fas fa-sign-in-alt me-1"></i> Login
                </Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">
            {/* Search */}
            <li className="nav-item w-100 w-lg-auto">
              <form className="d-flex my-2 my-lg-0" onSubmit={(e) => e.preventDefault()}>
                <input
                  className="form-control me-2 rounded-pill shadow-sm"
                  type="search"
                  placeholder="Search products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-light rounded-pill shadow-sm" type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </li>

            {username && (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle rounded-pill px-3"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-user-circle me-2"></i>
                  Welcome, {username}
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <i className="fas fa-user me-2"></i> Create Profile
                    </Link>
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/my-profile">
                      <i className="fas fa-user me-2"></i> My Profile
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item fw-semibold" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
