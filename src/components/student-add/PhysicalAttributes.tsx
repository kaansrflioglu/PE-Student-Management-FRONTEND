import React from "react";
import type { Student } from "../../types/student";

interface Props {
    formData: Student;
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

const PhysicalAttributes: React.FC<Props> = ({ formData, setFormData }) => {
    return (
        <div className="card shadow-sm mb-4">
            <div className="card-header bg-light">
                <h4 className="mb-0">Fiziksel Özellikler</h4>
            </div>
            <ul className="list-group list-group-flush">
                {fields.map((field) => (
                    <li key={field.key} className="list-group-item">
                        <strong>{field.label}:</strong>{" "}
                        <input
                            type="text"
                            value={(formData as any)[field.key] || ""}
                            onChange={(e) =>
                                setFormData({ ...formData, [field.key]: e.target.value })
                            }
                            className="form-control d-inline-block w-auto ms-2"
                        />
                        {field.unit && <span className="ms-1">{field.unit}</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PhysicalAttributes;