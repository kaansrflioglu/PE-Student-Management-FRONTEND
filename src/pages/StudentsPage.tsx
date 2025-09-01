import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import type { Student } from "../types/student";
import { useAuth } from "../contexts/AuthContext";
import { getStudents } from "../api/studentApi";
import { useNavigate } from "react-router-dom";

const StudentsPage: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getStudents(token!);
        setStudents(res.data);
      } catch (err) {
        console.warn("ADMIN rolünde bir kullanıcı ile giriş yapınız.");
        navigate("/login");
      }
    };

    fetchStudents();
  }, [token, navigate]);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col">
          <div className="card shadow border-0">
            <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Öğrenci Listesi</h5>
              <span className="badge bg-light text-dark">
                {students.length} kişi
              </span>
            </div>
            <div className="card-body p-0">
              {students.length > 0 ? (
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
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
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
              ) : (
                <div className="p-4 text-center text-muted">
                  Hiç öğrenci bulunamadı.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;