import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import ParentAddForm from "../components/parent-add/ParentAddForm";

const ParentAddPage: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSave = async (formData: any) => {
    if (!formData.name.trim() || !formData.surname.trim()) {
      alert("İsim ve soyisim alanları zorunludur.");
      return;
    }

    if (!window.confirm("Yeni veliyi eklemek istediğinize emin misiniz?")) return;

    try {
      await axios.post("/api/parents", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Veli başarıyla eklendi");
      navigate("/parents");
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 403) {
          alert("Bu işlemi yapma yetkiniz yok");
        } else {
          alert("Veli eklenirken hata oluştu");
        }
      } else {
        alert("Beklenmeyen bir hata oluştu");
      }
    }
  };

  return (
    <div className="container py-4">
      <ParentAddForm onSave={handleSave} />
      <div className="text-end">
        <button
          className="btn btn-success"
          onClick={() => {
            const formElement = document.getElementById("parent-add-form") as HTMLFormElement;
            if (formElement) formElement.requestSubmit();
          }}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default ParentAddPage;