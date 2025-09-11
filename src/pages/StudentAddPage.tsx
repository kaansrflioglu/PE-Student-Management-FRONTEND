import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import type { Student } from "../types/student";
import type { Sports } from "../types/sports";

import StudentHeader from "../components/student-add/StudentHeader";
import PhysicalAttributes from "../components/student-add/PhysicalAttributes";
import SportsSection from "../components/student-add/SportsSection";
import ParentsSection from "../components/student-add/ParentsSection";

const StudentAddPage: React.FC = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Student>({
        id: "",
        name: "",
        surname: "",
        gradeLevel: undefined,
        gradeSection: "",
        height: undefined,
        weight: undefined,
        pace: undefined,
        flexibility: undefined,
        leap: undefined,
        armStrength: undefined,
        legStrength: undefined,
        muscleAnatomy: "",
        preferredSports: [],
        suitableSports: [],
        parents: [],
        picture: "",
    });

    const [allSports, setAllSports] = useState<Sports[]>([]);

    useEffect(() => {
        if (!token) return;

        const fetchSports = async () => {
            try {
                const res = await axios.get("/api/sports", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (Array.isArray(res.data)) setAllSports(res.data);
            } catch (err) {
                console.error("Sporlar alınamadı", err);
                setAllSports([]);
            }
        };

        fetchSports();
    }, [token]);

    const handleSave = async () => {
        if (!formData.name.trim() || !formData.surname.trim()) {
            alert("İsim ve soyisim alanları zorunludur.");
            return;
        }

        if (!window.confirm("Yeni öğrenciyi eklemek istediğinize emin misiniz?")) return;

        try {
            await axios.post("/api/students", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Öğrenci başarıyla eklendi");
            navigate("/students");
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 403) {
                    alert("Bu işlemi yapma yetkiniz yok");
                } else {
                    alert("Öğrenci eklenirken hata oluştu");
                }
            } else {
                alert("Beklenmeyen bir hata oluştu");
            }
        }
    };

    return (
        <div className="container py-4">
            <StudentHeader formData={formData} setFormData={setFormData} />
            <PhysicalAttributes formData={formData} setFormData={setFormData} />
            <SportsSection formData={formData} setFormData={setFormData} allSports={allSports} />
            <ParentsSection formData={formData} setFormData={setFormData} />


            <div className="text-end">
                <button className="btn btn-success mt-3" onClick={handleSave}>
                    Kaydet
                </button>
            </div>
        </div>
    );
};

export default StudentAddPage;