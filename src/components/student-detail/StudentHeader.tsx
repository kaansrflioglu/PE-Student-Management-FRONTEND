import React from "react";
import type { Student } from "../../types/student";

interface Props {
  student: Student;
  formData: Student;
}

const StudentHeader: React.FC<Props> = ({ student, formData }) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="row g-0 align-items-center">
        <div className="col-3">
          {student.picture && (
            <img
              src={student.picture}
              alt={`${student.name} ${student.surname}`}
              className="img-fluid rounded-start p-3"
              style={{ maxHeight: "256px", objectFit: "contain" }}
            />
          )}
        </div>
        <div className="col-9">
          <div className="card-body">
            <h2 className="card-title">
              {formData.name} {formData.surname}
            </h2>
            <p className="card-text">
              <span
                className="badge bg-primary p-2"
                style={{ fontSize: "1rem", padding: "0.5rem 0.75rem", borderRadius: "0.2rem" }}
              >
                {formData.gradeLevel}
                {formData.gradeSection} Sınıfı
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;