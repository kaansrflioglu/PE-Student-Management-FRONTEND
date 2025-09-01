import React from "react";
import type { Parent } from "../../types/parent";
import { FaEdit } from "react-icons/fa";

interface Props {
  parent: Parent;
  formData: Parent;
  editSection: string | null;
  setEditSection: (val: string | null) => void;
  setFormData: (data: Parent) => void;
}

const ParentHeader: React.FC<Props> = ({
  parent,
  formData,
  editSection,
  setEditSection,
  setFormData,
}) => {
  const isEditing = editSection === "info";

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header d-flex justify-content-between bg-light">
        <h4 className="mb-0">Veli Bilgileri</h4>

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
      <div className="card-body p-0">
        <ul className="list-group list-group-flush">
          {[
            { key: "name", label: "İsim" },
            { key: "surname", label: "Soyisim" },
            { key: "relation", label: "Yakınlık" },
            { key: "phone", label: "Telefon" },
            { key: "height", label: "Boy", unit: "cm", type: "number" },
          ].map((field) => (
            <li key={field.key} className="list-group-item">
              <strong>{field.label}:</strong>{" "}
              {isEditing ? (
                <input
                  type={field.type || "text"}
                  className="form-control d-inline-block w-auto ms-2"
                  value={(formData as any)[field.key] || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [field.key]:
                        field.type === "number"
                          ? parseFloat(e.target.value)
                          : e.target.value,
                    })
                  }
                />
              ) : (
                <>
                  {(parent as any)[field.key]
                    ? field.unit
                      ? `${(parent as any)[field.key]} ${field.unit}`
                      : (parent as any)[field.key]
                    : "-"}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default ParentHeader;