import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MainLayout from "./MainLayout";
import axios from "axios";

const AuthCheckPage: React.FC = () => {
  const { token, loading } = useAuth();
  const navigate = useNavigate();

  const [studentCount, setStudentCount] = useState<number>(0);
  const [parentCount, setParentCount] = useState<number>(0);

  useEffect(() => {
    if (!token) return;

    const fetchCounts = async () => {
      try {
        const [studentsRes, parentsRes] = await Promise.all([
          axios.get("/api/students", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/api/parents", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setStudentCount(studentsRes.data.length || 0);
        setParentCount(parentsRes.data.length || 0);
      } catch (err) {
        console.error("Veriler alınamadı:", err);
      }
    };

    fetchCounts();
  }, [token]);

  if (loading) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
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
          <div className="text-center mb-5">
            <img
              src="src/assets/logo.png"
              alt="Logo"
              className="img-fluid mb-3"
              style={{ maxWidth: "150px" }}
            />
            <h2 className="fw-bold">Öğrenci Spor-Sanat Bilgi Sistemine Hoş Geldiniz</h2>
            <p className="text-muted">
              Öğrencilerinizi ve velilerinizi buradan kolayca yönetebilirsiniz.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card text-center border-0">
                <div className="card-body">
                  <i className="bi bi-people-fill display-4 text-primary mb-3"></i>
                  <h5 className="card-title">Toplam Öğrenci</h5>
                  <p className="fs-3 fw-bold">{studentCount}</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-4">
              <div className="card text-center border-0">
                <div className="card-body">
                  <i className="bi bi-person-heart display-4 text-success mb-3"></i>
                  <h5 className="card-title">Toplam Veli</h5>
                  <p className="fs-3 fw-bold">{parentCount}</p>
                </div>
              </div>
            </div>
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