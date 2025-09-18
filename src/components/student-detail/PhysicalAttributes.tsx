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

const fields = [
  { label: "Boy", key: "height", unit: "cm" },
  { label: "Kilo", key: "weight", unit: "kg" },
  { label: "Koşu", key: "pace", unit: "saniye" },
  { label: "Esneklik", key: "flexibility", unit: "cm" },
  { label: "Sıçrama", key: "leap", unit: "cm" },
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
        <FaEdit
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            color: "#0d6efd",
          }}
          size={18}
          onClick={() => setEditSection("physical")}
        />
      </div>
      <ul className="list-group list-group-flush">
        {fields.map((field) => {
          const isNumberField = [
            "height",
            "weight",
            "pace",
            "leap",
            "armStrength",
            "legStrength",
          ].includes(field.key);

          return (
            <li key={field.key} className="list-group-item">
              <strong>{field.label}:</strong>{" "}
              {editSection === "physical" ? (
                <input
                  type={isNumberField ? "number" : "text"}
                  value={(formData as any)[field.key] || ""}
                  onChange={(e) => {
                    const value = isNumberField
                      ? parseFloat(e.target.value) || 0
                      : e.target.value;
                    setFormData({ ...formData, [field.key]: value });
                  }}
                  className="form-control d-inline-block w-auto ms-2"
                />
              ) : (
                <span>
                  {(student as any)[field.key]} {field.unit || ""}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PhysicalAttributes;