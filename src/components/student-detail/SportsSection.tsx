import React from "react";
import type { Student } from "../../types/student";
import type { Sports } from "../../types/sports";

interface Props {
  student: Student;
  formData: Student;
  editSection: string | null;
  setEditSection: (val: string | null) => void;
  setFormData: (data: Student) => void;
  allSports: Sports[];
}

const SportsSection: React.FC<Props> = ({
  student,
  formData,
  editSection,
  setEditSection,
  setFormData,
  allSports,
}) => {
  const toggleSport = (field: "preferredSports" | "suitableSports", sport: Sports) => {
    let updated: Sports[] = formData[field] ? [...formData[field]!] : [];
    const exists = updated.some((s) => s.id === sport.id);

    if (exists) {
      updated = updated.filter((s) => s.id !== sport.id);
    } else {
      updated.push(sport);
    }

    setFormData({ ...formData, [field]: updated });
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-light d-flex justify-content-between">
        <h4 className="mb-0">Sporlar</h4>
        {editSection === "sports" ? (
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => setEditSection(null)}
          >
            İptal
          </button>
        ) : (
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setEditSection("sports")}
          >
            Düzenle
          </button>
        )}
      </div>

      <div className="card-body">
        <p>
          <strong>Tercih Edilen Sporlar:</strong>
        </p>
        {editSection === "sports" ? (
          <div className="d-flex flex-wrap gap-2">
            {allSports.map((sport) => {
              const isSelected = formData.preferredSports?.some((s) => s.id === sport.id);
              return (
                <div
                  key={sport.id}
                  className={`badge ${isSelected ? "bg-danger" : "bg-secondary"} p-2 cursor-pointer`}
                  style={{ cursor: "pointer", borderRadius: "0.2rem" }}
                  onClick={() => toggleSport("preferredSports", sport)}
                >
                  {sport.name} {isSelected ? "✔️" : ""}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mb-3">
            {student.preferredSports?.map((sport) => (
              <span
                key={sport.id}
                className="badge bg-danger p-2 me-2"
                style={{ padding: "0.4rem 0.5rem", borderRadius: "0.2rem" }}
              >
                {sport.name}
              </span>
            ))}
          </div>
        )}

        <p className="mt-3">
          <strong>Uygun Sporlar:</strong>
        </p>
        {editSection === "sports" ? (
          <div className="d-flex flex-wrap gap-2">
            {allSports.map((sport) => {
              const isSelected = formData.suitableSports?.some((s) => s.id === sport.id);
              return (
                <div
                  key={sport.id}
                  className={`badge ${isSelected ? "bg-success" : "bg-secondary"} p-2 cursor-pointer`}
                  style={{ cursor: "pointer", borderRadius: "0.2rem" }}
                  onClick={() => toggleSport("suitableSports", sport)}
                >
                  {sport.name} {isSelected ? "✔️" : ""}
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {student.suitableSports?.map((sport) => (
              <span
                key={sport.id}
                className="badge bg-success p-2 me-2"
                style={{ padding: "0.4rem 0.5rem", borderRadius: "0.2rem" }}
              >
                {sport.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SportsSection;