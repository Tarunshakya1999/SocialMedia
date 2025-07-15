import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer text-white pt-5 pb-3 mt-5 bg-dark">
      <div className="container">
        <div className="row">

          {/* 🔗 Branding */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold logo-glow">📱 SocialSync</h5>
            <p className="text-light-50">
              Connect. Post. Engage. <br />
              Manage your social presence from one place.
            </p>
          </div>

          {/* 🧭 Navigation Links */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold text-glow">Navigation</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">🏠 Dashboard</Link></li>
              <li><Link to="/profile" className="footer-link">👤 Profile</Link></li>
              <li><Link to="/posts" className="footer-link">📝 Posts</Link></li>
              <li><Link to="/settings" className="footer-link">⚙️ Settings</Link></li>
            </ul>
          </div>

          {/* 🌐 Social Media Icons */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold text-glow">Stay Connected</h6>
            <div className="d-flex gap-3 social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter-x"></i></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-github"></i></a>
            </div>
          </div>
        </div>

        <hr className="border-light" />

        {/* 🔒 Copyright */}
        <div className="text-center text-light-50 small">
          © {new Date().getFullYear()} <strong>SocialSync</strong>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
