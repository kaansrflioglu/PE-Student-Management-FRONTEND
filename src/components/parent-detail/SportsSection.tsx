import React from "react";
import type { Parent } from "../../types/parent";
import type { Sports } from "../../types/sports";
import { FaEdit } from "react-icons/fa";

interface Props {
  parent: Parent;
  formData: Parent;
  editSection: string | null;
  setEditSection: (val: string | null) => void;
  setFormData: (data: Parent) => void;
  allSports: Sports[];
}

const SportsSection: React.FC<Props> = ({
  parent,
  formData,
  editSection,
  setEditSection,
  setFormData,
  allSports,
}) => {
  const isEditing = editSection === "sports";

  const toggleSport = (sport: Sports) => {
    let updated: Sports[] = formData.sportsBackground ? [...formData.sportsBackground] : [];
    const exists = updated.some((s) => s.id === sport.id);

    if (exists) {
      updated = updated.filter((s) => s.id !== sport.id);
    } else {
      updated.push(sport);
    }

    setFormData({ ...formData, sportsBackground: updated });
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header d-flex justify-content-between bg-light">
        <h4 className="mb-0">Spor Geçmişi</h4>

        <FaEdit
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            color: "#0d6efd",
          }}
          size={18}
          onClick={() => setEditSection("sports")}
        />

      </div>
      <div className="card-body">
        {isEditing ? (
          <div className="d-flex flex-wrap gap-2">
            {allSports.map((sport) => {
              const isSelected = formData.sportsBackground?.some((s) => s.id === sport.id);
              return (
                <div
                  key={sport.id}
                  className={`badge ${isSelected ? "bg-success" : "bg-secondary"} p-2 cursor-pointer`}
                  style={{ cursor: "pointer", borderRadius: "0.2rem" }}
                  onClick={() => toggleSport(sport)}
                >
                  {sport.name} {isSelected ? "✔️" : ""}
                </div>
              );
            })}
          </div>
        ) : parent.sportsBackground && parent.sportsBackground.length > 0 ? (
          <div className="d-flex flex-wrap gap-2">
            {parent.sportsBackground.map((sport) => (
              <span
                key={sport.id}
                className="badge bg-success p-2"
                style={{ borderRadius: "0.2rem" }}
              >
                {sport.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-muted">Spor geçmişi yok</p>
        )}
      </div>
    </div>
  );
};

export default SportsSection;