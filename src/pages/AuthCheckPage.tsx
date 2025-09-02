import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MainLayout from "./MainLayout";

const AuthCheckPage: React.FC = () => {
  const { token, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  if (token) {
    return (
      <MainLayout>
        <div className="container py-5">
          <h1 className="mb-4">Hoşgeldiniz!</h1>
          <div className="list-group">
            <button
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/students")}
            >
              Öğrenciler
            </button>
            <button
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/parents")}
            >
              Veliler
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="card shadow p-4 text-center">
        <h3 className="mb-3">Lütfen devam etmek için önce giriş yapın</h3>
        <button className="btn btn-primary" onClick={() => navigate("/login")}>
          Giriş Yap
        </button>
      </div>
    </div>
  );
};

export default AuthCheckPage;