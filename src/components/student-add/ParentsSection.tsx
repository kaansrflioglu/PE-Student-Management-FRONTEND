import React, { useEffect, useState } from "react";
import type { Parent } from "../../types/parent";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

interface Props {
  formData: any; // Student tipinde
  setFormData: (data: any) => void;
}

const ParentsSection: React.FC<Props> = ({ formData, setFormData }) => {
  const { token } = useAuth();
  const [parents, setParents] = useState<Parent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchParents = async () => {
      try {
        const res = await axios.get("/api/parents", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (Array.isArray(res.data)) setParents(res.data);
      } catch (err) {
        console.error("Veliler alınamadı", err);
        setParents([]);
      }
    };

    fetchParents();
  }, [token]);

  const filteredParents = parents.filter((p) =>
    `${p.name} ${p.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleParent = (parent: Parent) => {
    let selected = formData.parents || [];
    const exists = selected.some((p: Parent) => p.id === parent.id);
    if (exists) {
      selected = selected.filter((p: Parent) => p.id !== parent.id);
    } else {
      selected = [...selected, parent];
    }
    setFormData({ ...formData, parents: selected });
  };

  const isSelected = (parent: Parent) =>
    formData.parents?.some((p: Parent) => p.id === parent.id);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-light d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Veliler</h4>
        <input
          type="text"
          className="form-control form-control-sm"
          style={{ maxWidth: "200px" }}
          placeholder="Veli Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredParents.length > 0 ? (
        <ul className="list-group list-group-flush">
          {filteredParents.map((p) => (
            <li
              key={p.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${isSelected(p) ? "bg-primary text-white" : ""
                }`}
              style={{ cursor: "pointer" }}
              onClick={() => toggleParent(p)}
            >
              <div>
                <p className="mb-1">
                  <strong>{p.relation}:</strong> {p.name} {p.surname}
                </p>
                <p className="mb-1">
                  <strong>Telefon:</strong> {p.phone}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="card-body">
          <p className="mb-0">Aramaya uygun veli bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

export default ParentsSection;