import React from "react";
import { FaEdit } from "react-icons/fa";
import type { Student } from "../types/student";

interface Props {
  students: Student[];
  onEdit?: (student: Student) => void;
}

const StudentList: React.FC<Props> = ({ students, onEdit }) => {
  if (students.length === 0) {
    return <p className="text-center">No students available.</p>;
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {students.map((s) => (
        <div className="col" key={s.id}>
          <div className="card h-100 shadow-sm position-relative">
            <div className="d-flex align-items-center p-3">
              {s.picture && (
                <img
                  src={s.picture}
                  alt={`${s.name} ${s.surname}`}
                  style={{
                    width: "10vw",
                    height: "auto",
                    objectFit: "contain",
                    marginRight: "1rem",
                  }}
                />
              )}
              <div>
                <h5 className="card-title mb-1">{s.name} {s.surname}</h5>
                {s.gradeLevel && s.gradeSection && (
                  <p className="card-text mb-0">
                    <strong>Sınıf:</strong> {s.gradeLevel}{s.gradeSection}
                  </p>
                )}
              </div>
            </div>
            <FaEdit
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                color: "#0d6efd",
              }}
              onClick={() => onEdit && onEdit(s)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;