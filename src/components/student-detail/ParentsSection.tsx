import React from "react";
import type { Student } from "../../types/student";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

interface Props {
  student: Student;
}

const ParentsSection: React.FC<Props> = ({ student }) => {
  const navigate = useNavigate();

  const validParents = student.parents?.filter((p): p is NonNullable<typeof p> => p != null) || [];

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-light">
        <h4 className="mb-0">Veliler</h4>
      </div>

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
    </div>
  );
};

export default ParentsSection;