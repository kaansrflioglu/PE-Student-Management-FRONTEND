import React from "react";
import { FaEdit } from "react-icons/fa";
import type { Student } from "../types/student";
import { useNavigate } from "react-router-dom";

interface Props {
  students: Student[];
}

const StudentList: React.FC<Props> = ({ students }) => {
  const navigate = useNavigate();

  if (students.length === 0) {
    return (
      <div className="text-center text-muted py-4">
        <i className="bi bi-exclamation-circle me-2"></i>
        No students available.
      </div>
    );
  }

  return (
    <div className="card shadow border-0">
      <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className="bi bi-mortarboard-fill me-2"></i> Öğrenci Listesi
        </h5>
        <span className="badge bg-light text-dark">{students.length} kişi</span>
      </div>

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
    </div>
  );
};

export default StudentList;