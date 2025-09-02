import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import type { Student } from "../../types/student";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
  parentId: string;
}

const StudentsSection: React.FC<Props> = ({ parentId }) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`/api/parents/${parentId}/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(res.data)) setStudents(res.data);
        else setStudents([]);
      } catch (err) {
        console.error("Öğrenciler alınamadı", err);
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    if (parentId) fetchStudents();
  }, [parentId, token]);

  
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Öğrenciler</h4>
        <span className="badge bg-light text-dark">{students.length} öğrenci</span>
      </div>
      <div className="card-body p-0">
        {loading ? (
          <div className="p-4 text-center text-muted">Öğrenciler yükleniyor...</div>
        ) : students.length === 0 ? (
          <div className="p-4 text-center text-muted">Bu veliye ait öğrenci bulunmuyor.</div>
        ) : (
          <ul className="list-group list-group-flush">
            {students.map((s) => (
                
              <li
                key={s.id}
                className="list-group-item d-flex align-items-center position-relative"
              >
                {s.picture ? (
                  <img
                    src={s.picture}
                    alt={`${s.name} ${s.surname}`}
                    className="rounded-circle border me-3"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i className="bi bi-person-circle fs-5"></i>
                  </div>
                )}

                <div>
                  <strong>
                    {s.name} {s.surname}
                  </strong>
                  {s.gradeLevel && s.gradeSection && (
                    <div className="text-muted small">
                      Sınıf: {s.gradeLevel}
                      {s.gradeSection}
                    </div>
                  )}
                </div>

                <FaEdit
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    cursor: "pointer",
                    color: "#0d6efd",
                  }}
                  size={18}
                  onClick={() => navigate(`/students/${s.id}`)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentsSection;