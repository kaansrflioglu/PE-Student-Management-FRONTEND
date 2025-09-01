import React from "react";
import type { Student } from "../../types/student";

interface Props {
  student: Student;
}

const ParentsSection: React.FC<Props> = ({ student }) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-light">
        <h4 className="mb-0">Veliler</h4>
      </div>

      {student.parents && student.parents.length > 0 ? (
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