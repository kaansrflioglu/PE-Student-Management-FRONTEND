import React from "react";
import type { Student } from "../../types/student";
import { FaEdit } from "react-icons/fa";

interface Props {
  student: Student;
  formData: Student;
  editSection: string | null;
  setEditSection: (val: string | null) => void;
  setFormData: (data: Student) => void;
}

const StudentHeader: React.FC<Props> = ({
  student,
  formData,
  editSection,
  setEditSection,
  setFormData,
}) => {
  const isEditing = editSection === "info";

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header d-flex justify-content-between bg-light">
        <h4 className="mb-0">Öğrenci Bilgileri</h4>
        <FaEdit
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            color: "#0d6efd",
          }}
          size={18}
          onClick={() => setEditSection("info")}
        />
      </div>
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
          <div className="card-body position-relative">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="İsim"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={formData.surname || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, surname: e.target.value })
                  }
                  placeholder="Soyisim"
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  value={formData.gradeLevel || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gradeLevel: parseInt(e.target.value) || undefined,
                    })
                  }
                  placeholder="Sınıf Seviyesi"
                />
                <input
                  type="text"
                  className="form-control"
                  value={formData.gradeSection || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, gradeSection: e.target.value })
                  }
                  placeholder="Sınıf Bölümü"
                />
              </div>
            ) : (
              <>
                <h2 className="card-title">
                  {formData.name} {formData.surname}
                </h2>
                <p className="card-text">
                  <span
                    className="badge bg-primary p-2"
                    style={{
                      fontSize: "1rem",
                      padding: "0.5rem 0.75rem",
                      borderRadius: "0.2rem",
                    }}
                  >
                    {formData.gradeLevel}
                    {formData.gradeSection} Sınıfı
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHeader;