import React, { useEffect, useState } from "react";
import type { Parent } from "../../types/parent";
import type { Student } from "../../types/student";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { FaEdit, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
  const { token } = useAuth();
  const navigate = useNavigate();

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
    const exists = selected.some((p) => p.id === parent.id);
    if (exists) {
      selected = selected.filter((p) => p.id !== parent.id);
    } else {
      selected = [...selected, parent];
    }
    setFormData({ ...formData, parents: selected });
  };

  const isSelected = (parent: Parent) =>
    formData.parents?.some((p) => p.id === parent.id);

  const validParents = student.parents?.filter((p): p is Parent => p != null) || [];

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-light d-flex justify-content-between">
        <h4 className="mb-0">Veliler</h4>

        <FaEdit
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            color: "#0d6efd",
          }}
          size={18}
          onClick={() => setEditSection("parents")}
        />
      </div>

      {editSection === "parents" ? (
        <>
          <div className="card-body">
            <input
              type="text"
              className="form-control form-control-sm mb-2"
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
        </>
      ) : (
        <>
          {validParents.length > 0 ? (
            <ul className="list-group list-group-flush">
              {validParents.map((p) => (
                <li
                  key={p.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <p className="mb-1">
                      <strong>{p.relation}:</strong> {p.name} {p.surname}
                    </p>
                    <p className="mb-1">
                      <strong>Telefon:</strong> {p.phone}
                    </p>
                  </div>

                  <FaArrowRight
                    style={{ cursor: "pointer", color: "#0d6efd" }}
                    onClick={() => navigate(`/parents/${p.id}`)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="card-body">
              <p className="mb-0">Veli bilgisi yok.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ParentsSection;