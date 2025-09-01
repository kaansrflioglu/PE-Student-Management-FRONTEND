import React from "react";
import type { Student } from "../../types/student";
import type { Parent } from "../../types/parent";

interface Props {
  student: Student;
  formData: Student;
  editSection: string | null;
  setEditSection: (val: string | null) => void;
  setFormData: (data: Student) => void;
}

const ParentsSection: React.FC<Props> = ({
  student,
  formData,
  editSection,
  setEditSection,
  setFormData,
}) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-light d-flex justify-content-between">
        <h4 className="mb-0">Veliler</h4>
        {editSection === "parents" ? (
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => setEditSection(null)}
          >
            İptal
          </button>
        ) : (
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setEditSection("parents")}
          >
            Düzenle
          </button>
        )}
      </div>

      {editSection === "parents" ? (
        <div className="card-body">
          {formData.parents?.map((p, idx) => (
            <div key={p.id || idx} className="border p-2 mb-2 rounded">
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Ad"
                value={p.name}
                onChange={(e) => {
                  const newParents = [...(formData.parents ?? [])];
                  newParents[idx] = { ...newParents[idx], name: e.target.value };
                  setFormData({ ...formData, parents: newParents });
                }}
              />
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Soyad"
                value={p.surname}
                onChange={(e) => {
                  const newParents = [...(formData.parents ?? [])];
                  newParents[idx] = { ...newParents[idx], surname: e.target.value };
                  setFormData({ ...formData, parents: newParents });
                }}
              />
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Telefon"
                value={p.phone}
                onChange={(e) => {
                  const newParents = [...(formData.parents ?? [])];
                  newParents[idx] = { ...newParents[idx], phone: e.target.value };
                  setFormData({ ...formData, parents: newParents });
                }}
              />
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Yakınlık"
                value={p.relation}
                onChange={(e) => {
                  const newParents = [...(formData.parents ?? [])];
                  newParents[idx] = { ...newParents[idx], relation: e.target.value };
                  setFormData({ ...formData, parents: newParents });
                }}
              />
            </div>
          ))}
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() =>
              setFormData({
                ...formData,
                parents: [
                  ...(formData.parents ?? []),
                  {
                    id: "",
                    name: "",
                    surname: "",
                    phone: "",
                    height: 0,
                    relation: "",
                    sportsBackground: [],
                  } as Parent,
                ],
              })
            }
          >
            + Veli Ekle
          </button>
        </div>
      ) : student.parents && student.parents.length > 0 ? (
        <ul className="list-group list-group-flush">
          {student.parents.map((p) => (
            <li key={p.id} className="list-group-item">
              <p className="mb-1">
                <strong>{p.relation}:</strong> {p.name} {p.surname}
              </p>
              <p className="mb-1">
                <strong>Telefon:</strong> {p.phone}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="card-body">
          <p className="mb-0">Veli bilgisi yok.</p>
        </div>
      )}
    </div>
  );
};

export default ParentsSection;