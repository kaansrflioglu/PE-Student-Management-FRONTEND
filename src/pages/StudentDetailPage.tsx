import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentById, updateStudent } from "../api/studentApi";
import type { Student } from "../types/student";
import type { Sports } from "../types/sports";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

import StudentHeader from "../components/student-detail/StudentHeader";
import PhysicalAttributes from "../components/student-detail/PhysicalAttributes";
import SportsSection from "../components/student-detail/SportsSection";
import ParentsSection from "../components/student-detail/ParentsSection";

const StudentDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [student, setStudent] = useState<Student | null>(null);
    const [formData, setFormData] = useState<Student | null>(null);
    const [editSection, setEditSection] = useState<string | null>(null);
    const [allSports, setAllSports] = useState<Sports[]>([]);

    useEffect(() => {
        if (!id) return;

        const fetchStudent = async () => {
            try {
                const res = await getStudentById(id, token!);
                setStudent(res.data);
                setFormData({ ...res.data });
            } catch {
                navigate("/students");
            }
        };

        const fetchSports = async () => {
            try {
                const res = await axios.get("/api/sports", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (Array.isArray(res.data)) {
                    setAllSports(res.data);
                } else {
                    console.error("Beklenmeyen sporlar response formatı:", res.data);
                    setAllSports([]);
                }
            } catch (err) {
                console.error("Sporlar alınamadı", err);
                setAllSports([]);
            }
        };

        fetchStudent();
        fetchSports();
    }, [id, token, navigate]);

    if (!student || !formData) {
        return <p className="text-center mt-5">Yükleniyor...</p>;
    }

    const handleSave = async () => {
        try {
            await updateStudent(student.id, formData, token!);
            setStudent(formData);
            setEditSection(null);
            alert("Bilgiler başarıyla güncellendi");
        } catch {
            alert("Güncelleme sırasında hata oluştu");
        }
    };

    return (
        <div className="container py-4">
            <StudentHeader student={student} formData={formData} />
            <PhysicalAttributes
                student={student}
                formData={formData}
                editSection={editSection}
                setEditSection={setEditSection}
                setFormData={setFormData}
            />
            <SportsSection
                student={student}
                formData={formData}
                editSection={editSection}
                setEditSection={setEditSection}
                setFormData={setFormData}
                allSports={allSports}
            />
            <ParentsSection
                student={student}
                formData={formData}
                editSection={editSection}
                setEditSection={setEditSection}
                setFormData={setFormData}
            />

            <div className="text-end">
                <button className="btn btn-success mt-3" onClick={handleSave}>
                    Kaydet
                </button>
            </div>
        </div>
    );
};

export default StudentDetailPage;