import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getParentById } from "../api/parentApi";
import type { Parent } from "../types/parent";
import type { Sports } from "../types/sports";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

import ParentHeader from "../components/parent-detail/ParentHeader";
import SportsSection from "../components/parent-detail/SportsSection";

const ParentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [parent, setParent] = useState<Parent | null>(null);
  const [formData, setFormData] = useState<Parent | null>(null);
  const [editSection, setEditSection] = useState<string | null>(null);
  const [allSports, setAllSports] = useState<Sports[]>([]);

  useEffect(() => {
    if (!id) return;
    const fetchParent = async () => {
      try {
        const res = await getParentById(id, token!);
        setParent(res.data);
        setFormData({ ...res.data });
      } catch {
        navigate("/parents");
      }
    };
    fetchParent();
  }, [id, token, navigate]);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const res = await axios.get("/api/sports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(res.data)) setAllSports(res.data);
        else setAllSports([]);
      } catch (err) {
        console.error("Sporlar alınamadı", err);
        setAllSports([]);
      }
    };
    fetchSports();
  }, [token]);

  if (!parent || !formData) return <p className="text-center mt-5">Yükleniyor...</p>;

  const handleSave = async () => {
    if (!window.confirm("Veli bilgilerini güncellemek istediğinize emin misiniz?")) return;
    try {
      await axios.put(`/api/parents/${parent.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setParent(formData);
      setEditSection(null);
      alert("Bilgiler başarıyla güncellendi");
    } catch {
      alert("Güncelleme sırasında hata oluştu");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Bu veliyi silmek istediğinize emin misiniz?")) return;
    try {
      await axios.delete(`/api/parents/${parent.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Veli başarıyla silindi");
      navigate("/parents");
    } catch {
      alert("Veli silinirken hata oluştu");
    }
  };

  return (
    <div className="container py-4">
      <ParentHeader
        parent={parent}
        formData={formData}
        editSection={editSection}
        setEditSection={setEditSection}
        setFormData={setFormData}
      />
      <SportsSection
        parent={parent}
        formData={formData}
        editSection={editSection}
        setEditSection={setEditSection}
        setFormData={setFormData}
        allSports={allSports}
      />
      <div className="text-end">
        <button className="btn btn-success me-2 mt-3" onClick={handleSave}>
          Kaydet
        </button>
        <button className="btn btn-danger mt-3" onClick={handleDelete}>
          Sil
        </button>
      </div>
    </div>
  );
};

export default ParentDetailPage;