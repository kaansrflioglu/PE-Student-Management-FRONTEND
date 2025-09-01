// src/pages/StudentDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStudentById } from "../api/studentApi";
import type { Student } from "../types/student";
import { useAuth } from "../contexts/AuthContext";

const StudentDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { token } = useAuth();
    const navigate = useNavigate();
    const [student, setStudent] = useState<Student | null>(null);

    useEffect(() => {
        if (!id) return;
        const fetchStudent = async () => {
            try {
                const res = await getStudentById(id, token!);
                setStudent(res.data);
            } catch (err) {
                console.warn("Öğrenci bulunamadı veya yetkiniz yok.");
                navigate("/students");
            }
        };
        fetchStudent();
    }, [id, token, navigate]);

    if (!student) {
        return <p className="text-center mt-5">Yükleniyor...</p>;
    }

    return (
        <div className="container py-4">
            {/* Header */}
            <div className="card shadow-sm mb-4">
                <div className="row g-0 align-items-center">
                    <div className="col-md-3 text-center">
                        {student.picture && (
                            <img
                                src={student.picture}
                                alt={`${student.name} ${student.surname}`}
                                className="img-fluid rounded-start p-3"
                                style={{ maxHeight: "200px", objectFit: "contain" }}
                            />
                        )}
                    </div>
                    <div className="col-md-9">
                        <div className="card-body">
                            <h2 className="card-title">
                                {student.name} {student.surname}
                            </h2>
                            <p className="card-text">
                                <span className="badge bg-primary" style={{ fontSize: "1rem", padding: "0.5rem 0.75rem" }}>
                                    {student.gradeLevel}{student.gradeSection} Sınıfı
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fiziksel Özellikler */}
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-light">
                    <h4 className="mb-0">Fiziksel Özellikler</h4>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Boy:</strong> {student.height} cm</li>
                    <li className="list-group-item"><strong>Kilo:</strong> {student.weight} kg</li>
                    <li className="list-group-item"><strong>Koşu:</strong> {student.pace}</li>
                    <li className="list-group-item"><strong>Esneklik:</strong> {student.flexibility}</li>
                    <li className="list-group-item"><strong>Sıçrama:</strong> {student.leap}</li>
                    <li className="list-group-item"><strong>Kol Gücü:</strong> {student.armStrength}</li>
                    <li className="list-group-item"><strong>Bacak Gücü:</strong> {student.legStrength}</li>
                    <li className="list-group-item"><strong>Kas Yapısı:</strong> {student.muscleAnatomy}</li>
                </ul>
            </div>

            {/* Sporlar */}
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-light">
                    <h4 className="mb-0">Sporlar</h4>
                </div>
                <div className="card-body" >
                    <p><strong>Tercih Edilen Sporlar:</strong></p>
                    <div className="mb-3" >
                        {student.preferredSports?.map((sport) => (
                            <span key={sport.id} className="badge bg-danger me-2" style={{ padding: "0.4rem 0.5rem", borderRadius: "0.2rem" }}>
                                {sport.name}
                            </span>
                        ))}
                    </div>
                    <p><strong>Uygun Sporlar:</strong></p>
                    <div>
                        {student.suitableSports?.map((sport) => (
                            <span key={sport.id} className="badge bg-success me-2" style={{ padding: "0.4rem 0.5rem", borderRadius: "0.2rem" }}>
                                {sport.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Parents */}
            <div className="card shadow-sm mb-4">
                <div className="card-header bg-light">
                    <h4 className="mb-0">Veliler</h4>
                </div>
                {student.parents && student.parents.length > 0 ? (
                    <ul className="list-group list-group-flush">
                        {student.parents.map((p) => (
                            <li key={p.id} className="list-group-item">
                                <p className="mb-1">
                                    <strong>{p.relation}:</strong> {p.name} {p.surname}
                                </p>
                                <p className="mb-1">
                                    <strong>Telefon:</strong> {p.phone}
                                </p>
                                {p.height && (
                                    <p className="mb-1">
                                        <strong>Boy:</strong> {p.height} cm
                                    </p>
                                )}
                                {p.sportsBackground && p.sportsBackground.length > 0 && (
                                    <div>
                                        <strong>Spor Geçmişi:</strong> <br />
                                        {p.sportsBackground.map((sport) => (
                                            <span key={sport.id} className="badge bg-info me-2 mt-2" style={{ padding: "0.4rem 0.5rem", borderRadius: "0.2rem" }}> {sport.name}</span>
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="card-body">
                        <p className="mb-0">Veli bilgisi yok.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDetailPage;