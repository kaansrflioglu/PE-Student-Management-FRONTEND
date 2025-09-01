import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <span className="navbar-brand" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          Öğrenci Yönetimi
        </span>
        {token && (
          <div className="ms-auto">
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => {
                logout?.();
                navigate("/login");
              }}
            >
              Çıkış Yap
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;