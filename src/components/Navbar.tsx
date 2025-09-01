import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <span
          className="navbar-brand"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Öğrenci Yönetimi
        </span>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarSupportedContent"
          aria-expanded={!collapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${collapsed ? "" : "show"}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token && (
              <>
                <li className="nav-item">
                  <button
                    className={`nav-link btn btn-link ${isActive("/students") ? "active" : ""}`}
                    onClick={() => navigate("/students")}
                  >
                    Öğrenciler
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link btn btn-link ${isActive("/parents") ? "active" : ""}`}
                    onClick={() => navigate("/parents")}
                  >
                    Veliler
                  </button>
                </li>
              </>
            )}
          </ul>

          {token && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <span
                  className="nav-link logout-link"
                  onClick={() => {
                    logout?.();
                    navigate("/login");
                  }}
                >
                  Çıkış Yap
                </span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;