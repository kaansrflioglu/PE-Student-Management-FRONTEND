import React from "react";
import type { Student } from "../../types/student";

interface Props {
  student: Student;
  formData: Student;
  editSection: string | null;
  setEditSection: (val: string | null) => void;
  setFormData: (data: Student) => void;
}

const fields = [
  { label: "Boy", key: "height", unit: "cm" },
  { label: "Kilo", key: "weight", unit: "kg" },
  { label: "Koşu", key: "pace" },
  { label: "Esneklik", key: "flexibility" },
  { label: "Sıçrama", key: "leap" },
  { label: "Kol Gücü", key: "armStrength" },
  { label: "Bacak Gücü", key: "legStrength" },
  { label: "Kas Yapısı", key: "muscleAnatomy" },
];

const PhysicalAttributes: React.FC<Props> = ({
  student,
  formData,
  editSection,
  setEditSection,
  setFormData,
}) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-light d-flex justify-content-between">
        <h4 className="mb-0">Fiziksel Özellikler</h4>
        {editSection === "physical" ? (
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => setEditSection(null)}
          >
            İptal
          </button>
        ) : (
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setEditSection("physical")}
          >
            Düzenle
          </button>
        )}
      </div>
      <ul className="list-group list-group-flush">
        {fields.map((field) => (
          <li key={field.key} className="list-group-item">
            <strong>{field.label}:</strong>{" "}
            {editSection === "physical" ? (
              <input
                type="text"
                value={(formData as any)[field.key] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field.key]: e.target.value,
                  })
                }
                className="form-control d-inline-block w-auto ms-2"
              />
            ) : (
              <span>
                {(student as any)[field.key]} {field.unit || ""}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhysicalAttributes;