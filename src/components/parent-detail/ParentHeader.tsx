import React from "react";
import type { Parent } from "../../types/parent";

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
        {isEditing ? (
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => setEditSection(null)}
          >
            İptal
          </button>
        ) : (
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setEditSection("info")}
          >
            Düzenle
          </button>
        )}
      </div>
      <div className="card-body">
        <div className="mb-2">
          <strong>İsim:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              className="form-control d-inline-block w-auto ms-2"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          ) : (
            parent.name || "-"
          )}
        </div>
        <div className="mb-2">
          <strong>Soyisim:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              className="form-control d-inline-block w-auto ms-2"
              value={formData.surname || ""}
              onChange={(e) =>
                setFormData({ ...formData, surname: e.target.value })
              }
            />
          ) : (
            parent.surname || "-"
          )}
        </div>
        <div className="mb-2">
          <strong>Yakınlık:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              className="form-control d-inline-block w-auto ms-2"
              value={formData.relation || ""}
              onChange={(e) =>
                setFormData({ ...formData, relation: e.target.value })
              }
            />
          ) : (
            parent.relation || "-"
          )}
        </div>
        <div className="mt-2">
          <strong>Telefon:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              className="form-control d-inline-block w-auto ms-2"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          ) : (
            parent.phone || "-"
          )}
        </div>
        <div className="mt-2">
          <strong>Boy:</strong>{" "}
          {isEditing ? (
            <input
              type="number"
              className="form-control d-inline-block w-auto ms-2"
              value={formData.height || ""}
              onChange={(e) =>
                setFormData({ ...formData, height: parseFloat(e.target.value) })
              }
            />
          ) : (
            parent.height ? `${parent.height} cm` : "-"
          )}
        </div>
      </div>
    </div>
  );
};

export default ParentHeader;